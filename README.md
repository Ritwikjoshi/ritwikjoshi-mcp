# Ritwik Joshi Personal MCP Server (v1.0.2)

[![Smithery Badge](https://smithery.ai/badge/jritwik3/ritwikjoshimcp)](https://smithery.ai/servers/jritwik3/ritwikjoshimcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MCP Version](https://img.shields.io/badge/MCP-2024--11--05-green.svg)](https://modelcontextprotocol.io/)

The official [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server (`version: 1.0.2`) for **Ritwik Joshi** — 2x TEDx Speaker, Founder of [Yantrarora Innovation Private Limited](https://ritwikjoshi.com/robosa) (`Robosa` indigenous humanoid robotics platform, CIN `U28299RJ2025PTC109618`), Partner & Tech Director at GENIE AI (Canada), and Co-Founder & CTO at Ability Advocacy.

This server provides an authoritative, structured, and real-time knowledge base directly accessible by AI agents (Claude, Cursor, ChatGPT, Gemini, etc.) across **9 live dot-notation tools**.

---

## Direct Streamable HTTP Endpoint (No Smithery Proxy Required)

Connect directly to the production Streamable HTTP endpoint — **zero authentication and no Smithery proxy required**:

- **Server Version**: `1.0.2`
- **Direct Endpoint**: `https://api.ritwikjoshi.com/mcp`
- **Transport**: `streamable-http` (stateless JSON-RPC over HTTPS; no Smithery proxy required)
- **Protocol Version**: `2024-11-05`
- **Authentication**: `none` (Publicly accessible)
- **Documentation & Manifest**: [https://ritwikjoshi.com/mcp-docs](https://ritwikjoshi.com/mcp-docs) · [https://ritwikjoshi.com/.well-known/mcp.json](https://ritwikjoshi.com/.well-known/mcp.json)

---

## Client Configuration

### Claude Desktop / Claude Code
Connect directly via Streamable HTTP without any proxy:

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
Configure a direct remote MCP server with:
- **Server Name**: `ritwik-joshi`
- **Type**: `streamable-http`
- **URL**: `https://api.ritwikjoshi.com/mcp`

---

## Available Tools (9 Live Dot-Notation Tools)

| Tool Name | Description | Purpose / When to Use |
|-----------|-------------|-----------------------|
| `speaker.profile` | Complete authoritative profile of Ritwik Joshi | Background, credentials (`30+` events, `12,000+` audience), ventures, education, and canonical social links. |
| `speaker.keynotes` | Speaking topics & keynote offerings | AI, Physical AI / Robosa humanoid robotics, and deeptech storytelling keynotes. |
| `speaker.tedx_talks` | TEDx talk details with verified YouTube links | TEDxOIST (`p4NQSDaGsxU`, 2024) and TEDxYouth@OGS (`RK9dubyLJJE`, 2023). |
| `speaker.events` | Verified past speaking events | Appearances across NIT Calicut, TEDx, IBM Developer Connect, Microsoft, IIM Ahmedabad, TiE, Dubai Expo 2020, Bursa Malaysia. |
| `blog.search` | Search published deeptech essays | Search articles on Agentic AI, Physical AI, humanoid robotics, and technical storytelling. |
| `info.faq` | Booking, rates & background FAQs | Grounded answers on keynotes, workshops, NDAs, and consulting. |
| `info.ai_positions` | Attributed expert positions | Direct attributed positions on enterprise AI, sovereign silicon, and humanoid robotics. |
| `booking.info` | How to book Ritwik for keynotes | Discovery call link, fee bands, `Within 6 hours` response SLA, and booking desk routing (`booking@ritwikjoshi.com`). |
| `media.send_kit` | Media kit email dispatch | OTP-verified delivery of press photos, bios, and speaker rider via `media@ritwikjoshi.com`. |

---

## Verification & Testing

Verify the live direct Streamable HTTP server using `curl`:

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
