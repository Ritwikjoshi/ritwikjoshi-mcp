import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Verify tools.json and data.json are valid JSON
console.log("Testing JSON configuration files...");
const tools = JSON.parse(fs.readFileSync(path.join(__dirname, "tools.json"), "utf8"));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json"), "utf8"));

if (!Array.isArray(tools) || tools.length === 0) {
  console.error("❌ tools.json must be a non-empty array");
  process.exit(1);
}
console.log(`✓ tools.json valid with ${tools.length} registered tools`);

// 2. Spawn index.js and test JSON-RPC initialization
console.log("Testing MCP Server JSON-RPC lifecycle...");
const server = spawn("node", ["index.js"], {
  cwd: __dirname,
  stdio: ["pipe", "pipe", "inherit"],
});

let buffer = "";
server.stdout.on("data", (chunk) => {
  buffer += chunk.toString();
  const lines = buffer.split("\n");
  buffer = lines.pop(); // keep remainder

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const msg = JSON.parse(line);
      if (msg.id === 1) {
        console.log("✓ initialize handshake response received:", msg.result.serverInfo.name);
        
        // Call tools/list
        const listRequest = JSON.stringify({
          jsonrpc: "2.0",
          id: 2,
          method: "tools/list",
          params: {},
        }) + "\n";
        server.stdin.write(listRequest);
      } else if (msg.id === 2) {
        console.log(`✓ tools/list returned ${msg.result.tools.length} tools`);
        console.log("\n✅ All MCP server tests passed successfully!");
        server.kill();
        process.exit(0);
      }
    } catch (err) {
      console.error("Failed to parse JSON-RPC message:", line);
    }
  }
});

server.on("exit", (code) => {
  if (code !== 0 && code !== null) {
    console.error(`❌ Server exited unexpectedly with code ${code}`);
    process.exit(code || 1);
  }
});

// Send initialize request
const initRequest = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0.0" },
  },
}) + "\n";

server.stdin.write(initRequest);

setTimeout(() => {
  console.error("❌ Test timed out waiting for server response");
  server.kill();
  process.exit(1);
}, 5000);
