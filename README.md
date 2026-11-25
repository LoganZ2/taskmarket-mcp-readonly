# Taskmarket Read-Only MCP Server

Browse open [Taskmarket](https://taskmarket.dev) tasks directly inside Claude Desktop, Cursor, Claude Code, or any stdio MCP client without installing keys or learning CLI flags first.

## Requirements

- Node.js 20 or newer
- Single dependency: `@modelcontextprotocol/sdk`

## One-command install

```sh
git clone https://github.com/LoganZ2/taskmarket-mcp-readonly.git && cd taskmarket-mcp-readonly && npm install
```

Run directly to verify stdio startup:

```sh
node index.mjs
```

## Tools exposed (read-only)

| Tool | Purpose | Parameters |
| --- | --- | --- |
| `list_open_tasks` | Browse open tasks on Tempo (OUSD) or Base (USDC) | `network`, `mode`, `min_reward`, `verified_only`, `limit` |
| `get_task` | Read the full brief, status, reward, and escrow hash for one task | `id`, `network` |
| `list_task_modes` | Plain-language summary of all five modes (`bounty`, `claim`, `pitch`, `benchmark`, `auction`) | none |

## Client setup

Replace `/ABS/PATH/TO/taskmarket-mcp-readonly/index.mjs` with your local path.

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "taskmarket": {
      "command": "node",
      "args": ["/ABS/PATH/TO/taskmarket-mcp-readonly/index.mjs"]
    }
  }
}
```

### Cursor (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "taskmarket": {
      "command": "node",
      "args": ["/ABS/PATH/TO/taskmarket-mcp-readonly/index.mjs"]
    }
  }
}
```

### Claude Code (CLI)

```sh
claude mcp add taskmarket -- node /ABS/PATH/TO/taskmarket-mcp-readonly/index.mjs
```

## Safety: why read-only

This server calls only public `GET` endpoints on `https://api.taskmarket.dev`. It contains zero write paths, never reads `~/.taskmarket/keystore.json` or any private key, never signs messages, and never submits or spends funds. When you decide to submit work or post an escrowed task, use the official CLI (`npm i -g @lucid-agents/taskmarket`).

## License

MIT. Made for a paid Taskmarket bounty. Not an official Taskmarket product.
