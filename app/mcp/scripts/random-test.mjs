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

const transport = new StdioClientTransport({
  command: 'node',
  args: [serverPath],
});

const client = new Client({ name: 'mondave-mcp-random', version: '0.1.0' });
await client.connect(transport);

const randomTests = [
  {
    label: 'Random test 1 — Modal props + a11y',
    calls: [
      ['get-mondave-component-metadata', { componentName: 'Modal' }],
      ['get-mondave-component-accessibility', { componentName: 'Modal' }],
    ],
  },
  {
    label: 'Random test 2 — Docs search "checkbox"',
    calls: [['search-mondave-docs', { query: 'checkbox', limit: 4 }]],
  },
  {
    label: 'Random test 3 — Token + icon edge cases',
    calls: [
      ['list-mondave-tokens', { query: 'space', source: 'tokens', limit: 5 }],
      ['get-mondave-icon', { iconName: 'trash' }],
      ['get-mondave-component-examples', { componentName: 'TextField' }],
    ],
  },
];

for (const test of randomTests) {
  console.log(`\n${'='.repeat(60)}\n${test.label}\n${'='.repeat(60)}`);
  for (const [name, args] of test.calls) {
    try {
      const parsed = await callTool(client, name, args);
      console.log(`\n[OK] ${name}`);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (error) {
      console.log(`\n[FAIL] ${name}`);
      console.log(String(error.message ?? error));
    }
  }
}

await client.close();
