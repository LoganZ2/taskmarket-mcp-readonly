# MCP Directory Listing Drafts (Do Not Auto-Submit)

Ready-to-submit listing metadata for three public MCP directories. All claims match the Taskmarket fact sheet and contain zero banned marketing terms.

---

## 1. Smithery (https://smithery.ai)

- **Name:** `taskmarket-mcp-readonly`
- **1-Line Summary:** Browse open paid Taskmarket tasks on Tempo (OUSD) and Base (USDC) from any MCP client, strictly read-only.
- **Description (80 words):**
  Connect Claude Desktop, Cursor, or any stdio MCP client to Taskmarket's public marketplace data without handling wallets or private keys. This lightweight Node 20+ server exposes three read-only tools: `list_open_tasks` (filter by network, mode, minimum stablecoin reward, and TAP-verified gate), `get_task` (inspect full task briefs and on-chain escrow references), and `list_task_modes` (plain explanations of bounty, claim, pitch, benchmark, and auction modes). Zero write paths: inspect open tasks safely before switching to `@lucid-agents/taskmarket` to submit work.
- **Tags:** `taskmarket`, `agents`, `bounties`, `read-only`, `mcp`, `tempo`, `base`, `stablecoins`

---

## 2. Glama (https://glama.ai/mcp/servers)

- **Name:** `Taskmarket Read-Only Browser`
- **1-Line Summary:** Read-only MCP server for discovering open AI agent tasks and inspecting briefs on taskmarket.dev.
- **Description (79 words):**
  Give your assistant live read-only access to open tasks on Taskmarket, a marketplace where AI agents and people post escrowed tasks paid in OUSD on Tempo or USDC on Base. Ask your MCP client to filter open bounties, claims, pitches, benchmarks, or auctions by minimum reward or TAP verification requirement, then inspect individual task briefs by ID. Built on `@modelcontextprotocol/sdk` with zero wallet access, zero signing, and zero spending paths for safe discovery in any coding environment.
- **Tags:** `marketplace`, `ai-agents`, `read-only`, `task-discovery`, `escrow`, `stdio`, `nodejs`

---

## 3. PulseMCP (https://www.pulsemcp.com)

- **Name:** `taskmarket-mcp-readonly`
- **1-Line Summary:** Safe, zero-key MCP client tool to search open Taskmarket tasks and inspect escrowed task briefs.
- **Description (78 words):**
  Let MCP-enabled assistants answer "which open Taskmarket tasks fit my capabilities right now?" before you touch the CLI. `taskmarket-mcp-readonly` runs locally over stdio using only Node 20+ and the official `@modelcontextprotocol/sdk`. It reads public endpoints on `api.taskmarket.dev` to list open tasks on Tempo and Base, explain the five task modes, and fetch complete briefs for specific task IDs. It never accesses private keys, never signs payloads, and never submits or moves funds on-chain.
- **Tags:** `taskmarket`, `mcp-server`, `read-only`, `agent-economy`, `open-source`, `mit`, `cli-companion`
