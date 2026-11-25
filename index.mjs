#!/usr/bin/env node
/**
 * Read-only Taskmarket MCP Server (stdio transport).
 * Exposes public task browsing over https://api.taskmarket.dev.
 * Never signs transactions, never spends funds, and never reads or stores private keys.
 */
import {Server} from '@modelcontextprotocol/sdk/server/index.js'
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import {CallToolRequestSchema, ListToolsRequestSchema} from '@modelcontextprotocol/sdk/types.js'

const API_BASE = 'https://api.taskmarket.dev'
const HEADERS = {'User-Agent': 'taskmarket-mcp-readonly/1.0', Accept: 'application/json'}

const NETWORKS = {
  tempo: {chainId: 4217, token: 'OUSD', label: 'Tempo'},
  base: {chainId: 8453, token: 'USDC', label: 'Base'},
  '4217': {chainId: 4217, token: 'OUSD', label: 'Tempo'},
  '8453': {chainId: 8453, token: 'USDC', label: 'Base'},
}

const TASK_MODES = [
  {
    mode: 'bounty',
    summary: 'Many workers submit entries; the requester picks one or more winners and releases the escrowed reward.',
  },
  {
    mode: 'claim',
    summary: 'One worker reserves the task exclusively and submits the deliverable before the deadline.',
  },
  {
    mode: 'pitch',
    summary: 'Workers submit pitches first; the requester selects one worker to complete the task.',
  },
  {
    mode: 'benchmark',
    summary: 'Entries are scored and ranked on an objective metric defined in the task brief.',
  },
  {
    mode: 'auction',
    summary: 'Workers bid on price within the auction rules before work is awarded.',
  },
]

function resolveNetwork(name = 'tempo') {
  const key = String(name || 'tempo').trim().toLowerCase()
  const net = NETWORKS[key]
  if (!net) throw new Error(`Unsupported network "${name}". Use "tempo" (4217) or "base" (8453).`)
  return net
}

function toTokenAmount(baseUnits) {
  const n = Number(baseUnits ?? 0)
  return Number.isFinite(n) ? Number((n / 1e6).toFixed(6)) : 0
}

function firstLineTitle(desc) {
  if (!desc || typeof desc !== 'string') return 'Untitled task'
  return desc.split('\n').map(s => s.trim()).find(Boolean)?.slice(0, 140) || 'Untitled task'
}

async function fetchJson(path) {
  const res = await fetch(`${API_BASE}${path}`, {headers: HEADERS, signal: AbortSignal.timeout(20000)})
  if (!res.ok) throw new Error(`Taskmarket API returned HTTP ${res.status} for ${path}`)
  return res.json()
}

function summarizeTask(t, net) {
  const verified = Array.isArray(t.verifiedBy) && t.verifiedBy.length > 0
  return {
    id: t.id,
    referenceCode: t.referenceCode ?? null,
    network: net.label.toLowerCase(),
    chainId: net.chainId,
    title: firstLineTitle(t.description),
    mode: t.mode,
    status: t.status,
    reward: toTokenAmount(t.reward),
    token: net.token,
    submissions: Number(t.submissionCount ?? 0),
    verifiedOnly: verified,
    verifiedBy: t.verifiedBy ?? [],
    expiryTime: t.expiryTime ?? null,
    url: `https://taskmarket.dev/tasks/${t.id}?chain=${net.chainId}`,
  }
}

async function handleListOpenTasks(args = {}) {
  const net = resolveNetwork(args.network || 'tempo')
  const mode = args.mode ? String(args.mode).toLowerCase() : null
  if (mode && !TASK_MODES.some(m => m.mode === mode)) {
    throw new Error(`Invalid mode "${mode}". Expected one of: bounty, claim, pitch, benchmark, auction.`)
  }
  const minReward = args.min_reward != null ? Number(args.min_reward) : null
  if (minReward != null && (!Number.isFinite(minReward) || minReward < 0)) {
    throw new Error('min_reward must be a non-negative number.')
  }
  const verifiedOnly = args.verified_only === true
  const limit = Math.min(50, Math.max(1, Number(args.limit ?? 20)))

  const qs = new URLSearchParams({
    chainId: String(net.chainId),
    status: 'open',
    sort: 'newest',
    limit: '100',
  })
  if (mode) qs.set('mode', mode)
  if (minReward != null) qs.set('rewardMin', String(Math.round(minReward * 1e6)))
  if (verifiedOnly) qs.set('verifiedBy', 'tap:identity:verified')

  const raw = await fetchJson(`/api/tasks?${qs.toString()}`)
  const tasks = Array.isArray(raw) ? raw : (raw.tasks ?? [])

  const filtered = tasks.filter(t => {
    if (mode && t.mode !== mode) return false
    if (minReward != null && toTokenAmount(t.reward) < minReward) return false
    if (verifiedOnly && !(Array.isArray(t.verifiedBy) && t.verifiedBy.length > 0)) return false
    return true
  })

  return {
    network: net.label.toLowerCase(),
    chainId: net.chainId,
    token: net.token,
    filters: {mode, min_reward: minReward, verified_only: verifiedOnly},
    totalMatched: filtered.length,
    returned: Math.min(limit, filtered.length),
    tasks: filtered.slice(0, limit).map(t => summarizeTask(t, net)),
  }
}

async function handleGetTask(args = {}) {
  const id = String(args.id || '').trim()
  if (!id) throw new Error('Task "id" is required.')
  const net = resolveNetwork(args.network || 'tempo')
  const raw = await fetchJson(`/api/tasks/${encodeURIComponent(id)}?chainId=${net.chainId}`)
  const t = raw.task ?? raw
  return {
    ...summarizeTask(t, net),
    requester: t.requester ?? null,
    escrowTxHash: t.escrowTxHash ?? null,
    createdAt: t.createdAt ?? null,
    tags: t.tags ?? [],
    capabilities: t.capabilities ?? [],
    description: t.description ?? '',
  }
}

const server = new Server(
  {name: 'taskmarket-mcp-readonly', version: '1.0.0'},
  {capabilities: {tools: {}}},
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_open_tasks',
      description: 'List currently open Taskmarket tasks (read-only) filtered by network, mode, minimum reward, or verified-only requirement.',
      inputSchema: {
        type: 'object',
        properties: {
          network: {type: 'string', enum: ['tempo', 'base'], default: 'tempo', description: 'Chain network: tempo (OUSD) or base (USDC).'},
          mode: {type: 'string', enum: ['bounty', 'claim', 'pitch', 'benchmark', 'auction'], description: 'Filter by task mode.'},
          min_reward: {type: 'number', minimum: 0, description: 'Minimum reward in OUSD (Tempo) or USDC (Base).'},
          verified_only: {type: 'boolean', default: false, description: 'If true, return only tasks requiring TAP-verified workers.'},
          limit: {type: 'integer', minimum: 1, maximum: 50, default: 20, description: 'Maximum tasks to return (1-50).'},
        },
      },
    },
    {
      name: 'get_task',
      description: 'Fetch the full public brief, status, reward, and escrow details of a single Taskmarket task by ID (read-only).',
      inputSchema: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {type: 'string', description: 'Task ID (0x... hash or reference code).'},
          network: {type: 'string', enum: ['tempo', 'base'], default: 'tempo', description: 'Chain network: tempo (4217) or base (8453).'},
        },
      },
    },
    {
      name: 'list_task_modes',
      description: 'Explain all five Taskmarket task modes (bounty, claim, pitch, benchmark, auction) in plain language.',
      inputSchema: {type: 'object', properties: {}},
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async request => {
  const {name, arguments: args} = request.params
  try {
    let result
    if (name === 'list_open_tasks') result = await handleListOpenTasks(args)
    else if (name === 'get_task') result = await handleGetTask(args)
    else if (name === 'list_task_modes') result = {modes: TASK_MODES}
    else throw new Error(`Unknown read-only tool: ${name}`)
    return {content: [{type: 'text', text: JSON.stringify(result, null, 2)}]}
  } catch (err) {
    return {isError: true, content: [{type: 'text', text: `Error: ${err.message}`}]}
  }
})

const transport = new StdioServerTransport()
await server.connect(transport)
