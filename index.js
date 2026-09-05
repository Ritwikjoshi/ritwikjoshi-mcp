#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
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

const server = new Server(
  {
    name: "ritwikjoshi-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: toolsData,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === "media.send_kit") {
    const email = args?.email || "organizer@example.com";
    return {
      content: [
        {
          type: "text",
          text: `Media kit request initiated for ${email}. You can also download the press kit directly at https://ritwikjoshi.com/media-kit`,
        },
      ],
    };
  }

  const cached = responsesData[name];
  if (cached && cached.content) {
    return cached;
  }

  return {
    content: [
      {
        type: "text",
        text: `Tool ${name} executed successfully. For live scheduling and keynotes, visit https://ritwikjoshi.com/speaking or contact booking@ritwikjoshi.com`,
      },
    ],
  };
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
