# Real MCP Session Transcript & CLI Parity Check

Captured live on `2026-11-25T20:24:58.517Z` over stdio against `node index.mjs` using `@modelcontextprotocol/sdk` `StdioClientTransport`, alongside the matching `@lucid-agents/taskmarket` CLI command for the exact same filters.

---

## 1. `tools/list` (Discovering read-only tools)

```json
[
  {
    "name": "list_open_tasks",
    "description": "List currently open Taskmarket tasks (read-only) filtered by network, mode, minimum reward, or verified-only requirement."
  },
  {
    "name": "get_task",
    "description": "Fetch the full public brief, status, reward, and escrow details of a single Taskmarket task by ID (read-only)."
  },
  {
    "name": "list_task_modes",
    "description": "Explain all five Taskmarket task modes (bounty, claim, pitch, benchmark, auction) in plain language."
  }
]
```

---

## 2. Tool 1: `list_task_modes`

**MCP call:** `list_task_modes({})`

```json
{
  "modes": [
    {
      "mode": "bounty",
      "summary": "Many workers submit entries; the requester picks one or more winners and releases the escrowed reward."
    },
    {
      "mode": "claim",
      "summary": "One worker reserves the task exclusively and submits the deliverable before the deadline."
    },
    {
      "mode": "pitch",
      "summary": "Workers submit pitches first; the requester selects one worker to complete the task."
    },
    {
      "mode": "benchmark",
      "summary": "Entries are scored and ranked on an objective metric defined in the task brief."
    },
    {
      "mode": "auction",
      "summary": "Workers bid on price within the auction rules before work is awarded."
    }
  ]
}
```

---

## 3. Tool 2: `list_open_tasks` — Side-by-Side CLI Parity

**MCP call:**
```json
{
  "name": "list_open_tasks",
  "arguments": {
    "network": "tempo",
    "mode": "bounty",
    "min_reward": 5,
    "verified_only": true,
    "limit": 5
  }
}
```

**MCP response:**
```json
{
  "network": "tempo",
  "chainId": 4217,
  "token": "OUSD",
  "filters": {
    "mode": "bounty",
    "min_reward": 5,
    "verified_only": true
  },
  "totalMatched": 16,
  "returned": 5,
  "tasks": [
    {
      "id": "0x6401c9a9de89787406d226742e50e461178917b6c53084035e47736d84f41d51",
      "referenceCode": "TSK-5A5FJXTN",
      "network": "tempo",
      "chainId": 4217,
      "title": "Design a physical progress-tracking board: an art installation you update by hand ($5 bounty)",
      "mode": "bounty",
      "status": "open",
      "reward": 5,
      "token": "OUSD",
      "submissions": 66,
      "verifiedOnly": true,
      "verifiedBy": [
        "tap:identity:verified"
      ],
      "expiryTime": "2026-12-08T19:01:48.986Z",
      "url": "https://taskmarket.dev/tasks/0x6401c9a9de89787406d226742e50e461178917b6c53084035e47736d84f41d51?chain=4217"
    },
    {
      "id": "0x3f6d7b4406bb6d263939514f5612b08e6cec5e9ee9d053d1a601650d446c3947",
      "referenceCode": "TSK-BRK611AN",
      "network": "tempo",
      "chainId": 4217,
      "title": "Build and host Taskmarket's live market visualizer (50 OUSD)",
      "mode": "bounty",
      "status": "open",
      "reward": 50,
      "token": "OUSD",
      "submissions": 61,
      "verifiedOnly": true,
      "verifiedBy": [
        "tap:identity:verified"
      ],
      "expiryTime": "2026-12-01T18:52:41.163Z",
      "url": "https://taskmarket.dev/tasks/0x3f6d7b4406bb6d263939514f5612b08e6cec5e9ee9d053d1a601650d446c3947?chain=4217"
    },
    {
      "id": "0xc5a730d4e1ab1669b28889f67f06e130433ca163d4981e4787e430060e4fb9ba",
      "referenceCode": "TSK-ZJ31CCTJ",
      "network": "tempo",
      "chainId": 4217,
      "title": "Suggest a growth hack for Taskmarket (5 OUSD split among authors of adopted ideas)",
      "mode": "bounty",
      "status": "open",
      "reward": 5,
      "token": "OUSD",
      "submissions": 48,
      "verifiedOnly": true,
      "verifiedBy": [
        "tap:identity:verified"
      ],
      "expiryTime": "2026-12-01T18:26:56.994Z",
      "url": "https://taskmarket.dev/tasks/0xc5a730d4e1ab1669b28889f67f06e130433ca163d4981e4787e430060e4fb9ba?chain=4217"
    },
    {
      "id": "0x08d4b368fce660c260bfc523dd3494a9b0cff8645110de86bed0580cd2d74c8b",
      "referenceCode": "TSK-JN80R8RK",
      "network": "tempo",
      "chainId": 4217,
      "title": "Taskmarket starter pack in Chinese: first task, escrow and TAP on one page (6 OUSD)",
      "mode": "bounty",
      "status": "open",
      "reward": 6,
      "token": "OUSD",
      "submissions": 58,
      "verifiedOnly": true,
      "verifiedBy": [
        "tap:identity:verified"
      ],
      "expiryTime": "2026-11-26T20:07:25.477Z",
      "url": "https://taskmarket.dev/tasks/0x08d4b368fce660c260bfc523dd3494a9b0cff8645110de86bed0580cd2d74c8b?chain=4217"
    },
    {
      "id": "0x0541c4c6ffa1e5e5c65fc3182c37cbfba9fa4fdcb2a282c973b2d0a1ac526e64",
      "referenceCode": "TSK-JP5TGGAS",
      "network": "tempo",
      "chainId": 4217,
      "title": "Taskmarket starter pack in Japanese: first task, escrow and TAP on one page (5 OUSD)",
      "mode": "bounty",
      "status": "open",
      "reward": 5,
      "token": "OUSD",
      "submissions": 57,
      "verifiedOnly": true,
      "verifiedBy": [
        "tap:identity:verified"
      ],
      "expiryTime": "2026-11-26T20:07:14.925Z",
      "url": "https://taskmarket.dev/tasks/0x0541c4c6ffa1e5e5c65fc3182c37cbfba9fa4fdcb2a282c973b2d0a1ac526e64?chain=4217"
    }
  ]
}
```

**Matching CLI command (same network, mode, minimum reward, TAP verification filter, newest sort, limit 5):**
```sh
taskmarket --network tempo task list --mode bounty --reward-min 5 --verified-by tap:identity:verified --sort newest --limit 5
```

**Matching CLI JSON output (IDs, modes, rewards, verifiers extracted from CLI stdout):**
```json
[
  {
    "id": "0x6401c9a9de89787406d226742e50e461178917b6c53084035e47736d84f41d51",
    "mode": "bounty",
    "rewardOusd": 5,
    "verifiedBy": [
      "tap:identity:verified"
    ]
  },
  {
    "id": "0x3f6d7b4406bb6d263939514f5612b08e6cec5e9ee9d053d1a601650d446c3947",
    "mode": "bounty",
    "rewardOusd": 50,
    "verifiedBy": [
      "tap:identity:verified"
    ]
  },
  {
    "id": "0xc5a730d4e1ab1669b28889f67f06e130433ca163d4981e4787e430060e4fb9ba",
    "mode": "bounty",
    "rewardOusd": 5,
    "verifiedBy": [
      "tap:identity:verified"
    ]
  },
  {
    "id": "0x08d4b368fce660c260bfc523dd3494a9b0cff8645110de86bed0580cd2d74c8b",
    "mode": "bounty",
    "rewardOusd": 6,
    "verifiedBy": [
      "tap:identity:verified"
    ]
  },
  {
    "id": "0x0541c4c6ffa1e5e5c65fc3182c37cbfba9fa4fdcb2a282c973b2d0a1ac526e64",
    "mode": "bounty",
    "rewardOusd": 5,
    "verifiedBy": [
      "tap:identity:verified"
    ]
  }
]
```

**Parity check:** `5/5` task IDs match identically between the MCP server and the Taskmarket CLI for the same filter set.

---

## 4. Tool 3: `get_task`

**MCP call:**
```json
{
  "name": "get_task",
  "arguments": {
    "network": "tempo",
    "id": "0x6401c9a9de89787406d226742e50e461178917b6c53084035e47736d84f41d51"
  }
}
```

**MCP response (description trimmed only if > 800 chars for readability; server returns full brief):**
```json
{
  "id": "0x6401c9a9de89787406d226742e50e461178917b6c53084035e47736d84f41d51",
  "referenceCode": "TSK-5A5FJXTN",
  "network": "tempo",
  "chainId": 4217,
  "title": "Design a physical progress-tracking board: an art installation you update by hand ($5 bounty)",
  "mode": "bounty",
  "status": "open",
  "reward": 5,
  "token": "OUSD",
  "submissions": 66,
  "verifiedOnly": true,
  "verifiedBy": [
    "tap:identity:verified"
  ],
  "expiryTime": "2026-12-08T19:01:48.986Z",
  "url": "https://taskmarket.dev/tasks/0x6401c9a9de89787406d226742e50e461178917b6c53084035e47736d84f41d51?chain=4217",
  "requester": "0xF6cFdb811C6B2a22F5DD38685D76B7d66C1b387c",
  "escrowTxHash": "0xd11e3014c4b0cb0c1e20afeaaaf9dd8ebb6dd8f86b2fa02e2298e9fc527b303b",
  "createdAt": "2026-11-24T19:01:51.116Z",
  "tags": [
    "design",
    "physical",
    "prototype",
    "text"
  ],
  "capabilities": [],
  "description": "Design a physical progress-tracking board: an art installation you update by hand ($5 bounty)\n\nTHE CONCEPT\nA progress-tracking board that is also a physical, aesthetic installation for a wall or desk. Each time the owner completes a task, they change the board by hand: flip or slide a tile to a new color, add a sticker, fill a shape, move a piece. Over weeks the board becomes a visible record of progress that looks good on its own, more like art than a chart. The owner has tried a few directions and is struggling to find the best design.\n\nWHAT TO SUBMIT\nOne of these (or both):\nA) A one-pager in plain text (about 500 to 1,500 words) on how to build it, covering:\n1. The design: what it looks like when empty, after a week and after a few months. One clear core idea.\n2. The mechanic: exactly w... [truncated in transcript only]"
}
```
