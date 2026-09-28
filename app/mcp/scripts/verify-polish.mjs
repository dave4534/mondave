import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.resolve(__dirname, '../dist/server.js');

const transport = new StdioClientTransport({ command: 'node', args: [serverPath] });
const client = new Client({ name: 'polish-verify', version: '0.1.0' });
await client.connect(transport);

async function call(name, args) {
  const result = await client.callTool({ name, arguments: args });
  const text = result.content?.find((c) => c.type === 'text')?.text ?? '';
  return JSON.parse(text);
}

const search = await call('search-mondave-docs', { query: 'checkbox', limit: 4 });
console.log('SEARCH "checkbox" ranking:');
for (const item of search.items) {
  console.log(`  ${item.score} — ${item.title}`);
}

const tf = await call('get-mondave-component-examples', { componentName: 'TextField' });
const withoutLabel = tf.storyExamples.find((e) => e.storyName === 'WithoutLabel');
console.log('\nWithoutLabel snippet:', withoutLabel?.snippet ?? '(missing)');

await client.close();
