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

const client = new Client({ name: 'mondave-mcp-random-five', version: '0.1.0' });
await client.connect(transport);

const tests = [
  {
    label: '1 — Dropdown metadata + examples',
    calls: [
      ['get-mondave-component-metadata', { componentName: 'Dropdown' }],
      ['get-mondave-component-examples', { componentName: 'Dropdown' }],
    ],
  },
  {
    label: '2 — Docs search "primary color"',
    calls: [['search-mondave-docs', { query: 'primary color', limit: 5 }]],
  },
  {
    label: '3 — Icon alias "bell" + get Token --warning-color',
    calls: [
      ['get-mondave-icon', { iconName: 'bell' }],
      ['get-mondave-token', { tokenName: '--warning-color' }],
    ],
  },
  {
    label: '4 — get-doc Design System/Typography + list icons query "arrow"',
    calls: [
      ['get-mondave-doc', { title: 'Design System/Typography' }],
      ['list-mondave-icons', { query: 'arrow', limit: 5 }],
    ],
  },
  {
    label: '5 — unknown component + list components query "Toast"',
    calls: [
      ['get-mondave-component-metadata', { componentName: 'Toaster' }],
      ['list-mondave-components', { query: 'Toast', limit: 5 }],
    ],
  },
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  console.log(`\n${'='.repeat(60)}\n${test.label}\n${'='.repeat(60)}`);
  for (const [name, args] of test.calls) {
    try {
      const parsed = await callTool(client, name, args);
      passed += 1;
      console.log(`\n[OK] ${name}`);
      console.log(JSON.stringify(parsed, null, 2).slice(0, 1400));
    } catch (error) {
      // Expected soft-fail for "Toaster" suggestion path — still count as OK if message has Did you mean
      const message = String(error.message ?? error);
      if (name === 'get-mondave-component-metadata' && message.includes('Did you mean')) {
        passed += 1;
        console.log(`\n[OK expected] ${name}`);
        console.log(message);
      } else {
        failed += 1;
        console.log(`\n[FAIL] ${name}`);
        console.log(message);
      }
    }
  }
}

console.log(`\n${'='.repeat(60)}\nSummary: ${passed} passed, ${failed} failed\n${'='.repeat(60)}`);
await client.close();
process.exit(failed > 0 ? 1 : 0);
