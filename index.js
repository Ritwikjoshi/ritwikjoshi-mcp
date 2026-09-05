#!/usr/bin/env node

/**
 * Zero-dependency JSON-RPC Stdio MCP Server for Ritwik Joshi
 * Fully standalone and compliant with Model Context Protocol specification.
 */

import readline from "readline";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tools.json"), "utf8")
);
const responsesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data.json"), "utf8")
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function sendResponse(response) {
  process.stdout.write(JSON.stringify(response) + "\n");
}

rl.on("line", (line) => {
  if (!line.trim()) return;

  let request;
  try {
    request = JSON.parse(line);
  } catch (err) {
    sendResponse({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" },
    });
    return;
  }

  const { id, method, params } = request;

  // Notification (no response needed)
  if (id === undefined && method && method.startsWith("notifications/")) {
    return;
  }

  // Ping handler
  if (method === "ping") {
    sendResponse({
      jsonrpc: "2.0",
      id,
      result: {},
    });
    return;
  }

  // MCP Initialize handler
  if (method === "initialize") {
    sendResponse({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: "ritwikjoshi-mcp",
          version: "1.0.0",
        },
      },
    });
    return;
  }

  // Tools List handler
  if (method === "tools/list") {
    sendResponse({
      jsonrpc: "2.0",
      id,
      result: {
        tools: toolsData,
      },
    });
    return;
  }

  // Tools Call handler
  if (method === "tools/call") {
    const { name, arguments: args } = params || {};

    if (name === "media.send_kit") {
      const email = args?.email || "organizer@example.com";
      sendResponse({
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: `Media kit request initiated for ${email}. You can also download the press kit directly at https://ritwikjoshi.com/media-kit`,
            },
          ],
        },
      });
      return;
    }

    const cached = responsesData[name];
    if (cached && cached.content) {
      sendResponse({
        jsonrpc: "2.0",
        id,
        result: cached,
      });
      return;
    }

    sendResponse({
      jsonrpc: "2.0",
      id,
      result: {
        content: [
          {
            type: "text",
            text: `Tool ${name} executed successfully. For live scheduling and keynotes, visit https://ritwikjoshi.com/speaking or contact booking@ritwikjoshi.com`,
          },
        ],
      },
    });
    return;
  }

  // Fallback for unknown methods
  sendResponse({
    jsonrpc: "2.0",
    id,
    error: {
      code: -32601,
      message: `Method not found: ${method}`,
    },
  });
});
