import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.resolve(__dirname, '../dist/server.js');

async function callTool(client, name, args) {
  const result = await client.callTool({ name, arguments: args });
  const text = result.content?.find((c) => c.type === 'text')?.text ?? '';
  return JSON.parse(text);
}

async function runSuite(label, envExtra = {}) {
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath],
    env: { ...process.env, ...envExtra },
  });
  const client = new Client({ name: 'mondave-mcp-smoke', version: '0.1.0' });
  await client.connect(transport);

  console.log(`\n######## ${label} ########`);

  const checks = [
    ['list-mondave-components', { limit: 3 }],
    ['get-mondave-component-metadata', { componentName: 'Button' }],
    ['get-mondave-component-examples', { componentName: 'Button' }],
    ['search-mondave-docs', { query: 'loading', limit: 5 }],
    ['get-mondave-doc', { title: 'Components/Button' }],
    ['list-mondave-icons', { query: 'gear', limit: 5 }],
    ['get-mondave-icon', { iconName: 'gear' }],
    ['mondave-migration-analysis', { projectPath: path.resolve(__dirname, '../..') }],
  ];

  for (const [name, args] of checks) {
    try {
      const parsed = await callTool(client, name, args);
      console.log(`\n✓ ${name}`);
      console.log(JSON.stringify(parsed, null, 2).slice(0, 1200));
    } catch (error) {
      console.log(`\n✗ ${name}`);
      console.log(String(error.message ?? error));
    }
  }

  await client.close();
}

await runSuite('DEFAULT (no MONDAVE_APP_ROOT)');
