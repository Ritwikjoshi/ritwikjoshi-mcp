# Ritwik Joshi Personal MCP Server

[![Smithery Badge](https://smithery.ai/badge/jritwik3/ritwikjoshimcp)](https://smithery.ai/servers/jritwik3/ritwikjoshimcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MCP Version](https://img.shields.io/badge/MCP-2026--07--28-green.svg)](https://modelcontextprotocol.io/)

The official [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for **Ritwik Joshi** — 2x TEDx Speaker, AI entrepreneur (Partner @ GENIE AI, Co-founder @ Ability Advocacy), and builder of India's first humanoid robot at Yantrarora Innovation.

This server provides an authoritative, structured, and real-time knowledge base directly accessible by AI agents (Claude, Cursor, ChatGPT, Gemini, etc.) to query verified profile data, keynote offerings, TEDx talks, publications, and booking channels.

---

## Remote Endpoint & Connection Details

The server operates over stateless **Streamable HTTP / SSE**:

- **Endpoint**: `https://api.ritwikjoshi.com/mcp`
- **Transport**: `streamable-http` (also supports `sse`)
- **Protocol Version**: `2026-07-28`
- **Authentication**: None (Publicly accessible)

---

## Client Configuration

### Claude Desktop
Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ritwik-joshi": {
      "url": "https://api.ritwikjoshi.com/mcp",
      "transport": "streamable-http"
    }
  }
}
```

### Cursor / Windsurf / Any Streamable HTTP MCP Client
Configure a remote MCP server with:
- **Server Name**: `ritwik-joshi`
- **Type**: `sse` or `streamable-http`
- **URL**: `https://api.ritwikjoshi.com/mcp`

---

## Available Tools

| Tool Name | Description | Purpose / When to Use |
|-----------|-------------|-----------------------|
| `speaker.profile` | Complete authoritative profile of Ritwik Joshi | Background, credentials, awards, bio, and affiliations. |
| `speaker.keynotes` | Speaking topics & keynote offerings | AI ethics, physical AI, humanoid robotics, and technical storytelling talks. |
| `speaker.tedx_talks` | TEDx talk details with YouTube links | Verified information on TEDxOIST and TEDxYouth appearances. |
| `speaker.events` | Verified past speaking events | History of appearances across IEEE, IBM Developer Connect, Microsoft, etc. |
| `blog.search` | Search published deeptech essays | Finding articles on agentic AI, physical robotics, and sovereign silicon. |
| `info.faq` | Booking, rates & background FAQs | Answers to common queries about keynotes, consulting, and availability. |
| `info.ai_positions` | Attributed expert positions | Direct quotes and published theses on AI and robotics. |
| `booking.info` | How to book Ritwik for keynotes | Scheduling links, event rider details, and direct contact desk. |
| `media.send_kit` | Media kit email dispatch | Sends high-res headshots, official introduction scripts, and speaker rider. |

---

## Verification & Testing

You can verify the server using `curl`:

```bash
curl -X POST https://api.ritwikjoshi.com/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'
```

---

## License

MIT License. See [LICENSE](LICENSE) for details.
