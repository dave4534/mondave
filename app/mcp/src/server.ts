import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { resolveIconName, resolveIconQuery } from './icons.js';
import {
  cleanMdxContent,
  extractAccessibilitySection,
  extractDocTitle,
  extractFirstCodeBlock,
  extractStoryExamples,
  extractStoryNames,
  extractSummary,
  getProjectSourceFiles,
  isPublicComponentName,
  parseComponentProps,
  scoreMatch,
  scoreDocSearch,
  suggestMatches,
} from './parsers.js';

type DocEntry = {
  title: string;
  filePath: string;
  content: string;
  cleanedContent: string;
  kind: 'foundation' | 'component';
};

type ComponentEntry = {
  name: string;
  dirPath: string;
  storyPath?: string;
  mdxPath?: string;
  componentPath?: string;
};

const TOOL_NAMES = {
  listComponents: 'list-mondave-components',
  getComponentMetadata: 'get-mondave-component-metadata',
  getComponentExamples: 'get-mondave-component-examples',
  getComponentAccessibility: 'get-mondave-component-accessibility',
  searchDocs: 'search-mondave-docs',
  getDoc: 'get-mondave-doc',
  listIcons: 'list-mondave-icons',
  getIcon: 'get-mondave-icon',
  listTokens: 'list-mondave-tokens',
  getToken: 'get-mondave-token',
  migration: 'mondave-migration-analysis',
} as const;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultAppRoot = path.resolve(__dirname, '../..');
const appRoot = process.env.MONDAVE_APP_ROOT ? path.resolve(process.env.MONDAVE_APP_ROOT) : defaultAppRoot;

const docsRoot = path.join(appRoot, 'src/docs');
const componentsRoot = path.join(appRoot, 'src/components');
const iconGalleryPath = path.join(componentsRoot, 'Icon/IconIconsList.tsx');
const tokenCssPath = path.join(appRoot, 'src/styles/generated/tokens.css');
const typographyCssPath = path.join(appRoot, 'src/styles/generated/typography.css');

const maybeString = z.string().trim().min(1).optional();

const paginationSchema = z.object({
  limit: z.number().int().min(1).max(200).default(50),
  offset: z.number().int().min(0).default(0),
});

const listComponentInputSchema = paginationSchema.extend({
  query: z.string().trim().optional(),
});

const componentByNameSchema = z.object({
  componentName: z.string().trim().min(1),
});

const searchDocsSchema = paginationSchema.extend({
  query: z.string().trim().min(1),
});

const getDocSchema = z.object({
  title: z.string().trim().min(1),
});

const listIconsSchema = paginationSchema.extend({
  query: maybeString,
});

const getIconSchema = z.object({
  iconName: z.string().trim().min(1),
});

const listTokensSchema = paginationSchema.extend({
  query: maybeString,
  source: z.enum(['all', 'tokens', 'typography']).default('all'),
});

const getTokenSchema = z.object({
  tokenName: z.string().trim().min(1),
});

const migrationSchema = z.object({
  projectPath: z.string().trim().optional(),
});

const toolCatalog = [
  {
    name: TOOL_NAMES.listComponents,
    description: 'List Mondave public components with optional search and pagination.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number', minimum: 1, maximum: 200, default: 50 },
        offset: { type: 'number', minimum: 0, default: 0 },
      },
    },
  },
  {
    name: TOOL_NAMES.getComponentMetadata,
    description: 'Get metadata, props API, and file links for a specific Mondave component.',
    inputSchema: {
      type: 'object',
      required: ['componentName'],
      properties: {
        componentName: { type: 'string' },
      },
    },
  },
  {
    name: TOOL_NAMES.getComponentExamples,
    description: 'Return usage snippets from stories and MDX for a Mondave component.',
    inputSchema: {
      type: 'object',
      required: ['componentName'],
      properties: {
        componentName: { type: 'string' },
      },
    },
  },
  {
    name: TOOL_NAMES.getComponentAccessibility,
    description: 'Get accessibility guidance for a component from MDX and system docs.',
    inputSchema: {
      type: 'object',
      required: ['componentName'],
      properties: {
        componentName: { type: 'string' },
      },
    },
  },
  {
    name: TOOL_NAMES.searchDocs,
    description: 'Search Mondave foundation and component MDX docs by keyword.',
    inputSchema: {
      type: 'object',
      required: ['query'],
      properties: {
        query: { type: 'string' },
        limit: { type: 'number', minimum: 1, maximum: 200, default: 50 },
        offset: { type: 'number', minimum: 0, default: 0 },
      },
    },
  },
  {
    name: TOOL_NAMES.getDoc,
    description: 'Retrieve a Mondave doc by title (foundation or Components/Name) with cleaned MDX body.',
    inputSchema: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
      },
    },
  },
  {
    name: TOOL_NAMES.listIcons,
    description: 'List icons documented in Mondave Icon gallery with optional search and aliases.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number', minimum: 1, maximum: 200, default: 50 },
        offset: { type: 'number', minimum: 0, default: 0 },
      },
    },
  },
  {
    name: TOOL_NAMES.getIcon,
    description: 'Get icon detail and Mondave usage snippet for a single icon name or alias.',
    inputSchema: {
      type: 'object',
      required: ['iconName'],
      properties: {
        iconName: { type: 'string' },
      },
    },
  },
  {
    name: TOOL_NAMES.listTokens,
    description: 'List Mondave design tokens from generated token and typography CSS.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        source: { type: 'string', enum: ['all', 'tokens', 'typography'], default: 'all' },
        limit: { type: 'number', minimum: 1, maximum: 200, default: 50 },
        offset: { type: 'number', minimum: 0, default: 0 },
      },
    },
  },
  {
    name: TOOL_NAMES.getToken,
    description: 'Get details and usage guidance for a specific Mondave token.',
    inputSchema: {
      type: 'object',
      required: ['tokenName'],
      properties: {
        tokenName: { type: 'string' },
      },
    },
  },
  {
    name: TOOL_NAMES.migration,
    description: 'Analyze a project for Mondave adoption gaps and produce migration steps.',
    inputSchema: {
      type: 'object',
      properties: {
        projectPath: { type: 'string' },
      },
    },
  },
] as const;

type TokenEntry = {
  name: string;
  value: string;
  source: 'tokens' | 'typography';
};

function asJsonResult(payload: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(payload, null, 2),
      },
    ],
  };
}

function page<T>(items: T[], offset: number, limit: number): T[] {
  return items.slice(offset, offset + limit);
}

async function readMaybe(filePath?: string): Promise<string> {
  if (!filePath) {
    return '';
  }
  return readFile(filePath, 'utf8');
}

async function getFoundationDocs(): Promise<DocEntry[]> {
  const entries = await readdir(docsRoot, { withFileTypes: true });
  const docs: DocEntry[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.mdx')) {
      continue;
    }
    const filePath = path.join(docsRoot, entry.name);
    const content = await readFile(filePath, 'utf8');
    docs.push({
      title: extractDocTitle(content, path.basename(entry.name, '.mdx')),
      filePath,
      content,
      cleanedContent: cleanMdxContent(content),
      kind: 'foundation',
    });
  }

  return docs;
}

async function getComponentDocs(): Promise<DocEntry[]> {
  const components = await getComponents();
  const docs: DocEntry[] = [];

  for (const component of components) {
    if (!component.mdxPath) {
      continue;
    }
    const content = await readFile(component.mdxPath, 'utf8');
    const storyContent = await readMaybe(component.storyPath);
    const storyTitle = storyContent.match(/title:\s*'([^']+)'/)?.[1];
    docs.push({
      title: storyTitle ?? `Components/${component.name}`,
      filePath: component.mdxPath,
      content,
      cleanedContent: cleanMdxContent(content),
      kind: 'component',
    });
  }

  return docs;
}

async function getDocs(): Promise<DocEntry[]> {
  const [foundation, component] = await Promise.all([getFoundationDocs(), getComponentDocs()]);
  return [...foundation, ...component].sort((a, b) => a.title.localeCompare(b.title));
}

async function getComponents(): Promise<ComponentEntry[]> {
  const directories = await readdir(componentsRoot, { withFileTypes: true });
  const components: ComponentEntry[] = [];

  for (const dirEntry of directories) {
    if (!dirEntry.isDirectory() || !isPublicComponentName(dirEntry.name)) {
      continue;
    }

    const dirPath = path.join(componentsRoot, dirEntry.name);
    const children = await readdir(dirPath);
    const storyPath = children.find((name) => name.endsWith('.stories.tsx'));
    const mdxPath = children.find((name) => name.endsWith('.mdx'));
    const componentPath = children.find((name) => name.endsWith('.tsx') && !name.endsWith('.stories.tsx'));

    components.push({
      name: dirEntry.name,
      dirPath,
      storyPath: storyPath ? path.join(dirPath, storyPath) : undefined,
      mdxPath: mdxPath ? path.join(dirPath, mdxPath) : undefined,
      componentPath: componentPath ? path.join(dirPath, componentPath) : undefined,
    });
  }

  return components.sort((a, b) => a.name.localeCompare(b.name));
}

async function findComponent(componentName: string): Promise<ComponentEntry> {
  const components = await getComponents();
  const component = components.find((entry) => entry.name.toLowerCase() === componentName.toLowerCase());
  if (component) {
    return component;
  }

  const suggestions = suggestMatches(componentName, components.map((entry) => entry.name));
  throw new Error(
    suggestions.length > 0
      ? `Component not found: ${componentName}. Did you mean: ${suggestions.join(', ')}?`
      : `Component not found: ${componentName}. Use list-mondave-components to browse available components.`,
  );
}

async function findDoc(title: string): Promise<DocEntry> {
  const docs = await getDocs();
  const normalized = title.toLowerCase();
  const exact = docs.find((doc) => doc.title.toLowerCase() === normalized);
  if (exact) {
    return exact;
  }

  const shortName = normalized.replace(/^components\//, '');
  const byComponent = docs.find(
    (doc) =>
      doc.title.toLowerCase() === `components/${shortName}` ||
      doc.title.toLowerCase().endsWith(`/${shortName}`),
  );
  if (byComponent) {
    return byComponent;
  }

  const suggestions = suggestMatches(title, docs.map((doc) => doc.title));
  throw new Error(
    suggestions.length > 0
      ? `Doc not found: ${title}. Did you mean: ${suggestions.join(', ')}?`
      : `Doc not found: ${title}. Use search-mondave-docs to find matching documentation.`,
  );
}

async function getIconNames(): Promise<string[]> {
  const content = await readFile(iconGalleryPath, 'utf8');
  const matches = content.matchAll(/name:\s*'([^']+)'/g);
  const names = Array.from(matches, (match: RegExpMatchArray) => match[1]);
  return names.sort((a, b) => a.localeCompare(b));
}

function parseTokenCss(content: string, source: 'tokens' | 'typography'): TokenEntry[] {
  const matches = content.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi);
  return Array.from(matches, (match) => ({
    name: match[1],
    value: match[2].trim(),
    source,
  }));
}

async function getTokens(): Promise<TokenEntry[]> {
  const [tokensCss, typographyCss] = await Promise.all([readFile(tokenCssPath, 'utf8'), readFile(typographyCssPath, 'utf8')]);
  return [...parseTokenCss(tokensCss, 'tokens'), ...parseTokenCss(typographyCss, 'typography')].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

async function analyzeMigration(projectPath?: string) {
  const targetPath = projectPath ? path.resolve(projectPath) : process.cwd();
  const exists = await stat(targetPath).then(() => true).catch(() => false);
  if (!exists) {
    throw new Error(`projectPath does not exist: ${targetPath}`);
  }

  const pkgPath = path.join(targetPath, 'package.json');
  const packageJson = await readFile(pkgPath, 'utf8').then(JSON.parse).catch(() => ({}));
  const dependencies = {
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  } as Record<string, string>;

  const isMondavePackageRoot = packageJson.name === '@mondave/core';
  const sourceFiles = await getProjectSourceFiles(targetPath, readdir);
  const findings = {
    hasMondaveCore: Boolean(dependencies['@mondave/core']) || isMondavePackageRoot,
    usesMondaveImports: isMondavePackageRoot,
    usesLegacyVibeImports: false,
    scannedFiles: sourceFiles.length,
  };

  for (const sourceFile of sourceFiles) {
    const content = await readFile(sourceFile, 'utf8').catch(() => '');
    if (content.includes('@mondave/core')) {
      findings.usesMondaveImports = true;
    }
    if (content.includes('@vibe/core') || content.includes('@vibe/icons')) {
      findings.usesLegacyVibeImports = true;
    }
  }

  const recommendedSteps: string[] = [];
  const commands: string[] = [];

  if (!findings.hasMondaveCore) {
    recommendedSteps.push('Install `@mondave/core` and import tokens/typography once at app root.');
    commands.push('npm install @mondave/core');
  }
  if (!findings.usesMondaveImports) {
    recommendedSteps.push('Replace legacy component imports with `@mondave/core` imports.');
  }
  if (findings.usesLegacyVibeImports) {
    recommendedSteps.push('Replace `@vibe/*` imports with Mondave equivalents and retest UI states.');
  }
  if (recommendedSteps.length === 0) {
    recommendedSteps.push('No major migration blockers detected in static scan. Validate with visual and accessibility checks.');
  }

  return {
    projectPath: targetPath,
    findings,
    recommendedSteps,
    commands,
    note: 'Static scan only (node_modules/dist excluded). Run app-specific tests after migration changes.',
  };
}

const server = new Server(
  {
    name: '@mondave/mcp',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: toolCatalog.map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  })),
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const name = request.params.name;
  const rawArgs = request.params.arguments ?? {};

  if (name === TOOL_NAMES.listComponents) {
    const args = listComponentInputSchema.parse(rawArgs);
    const allComponents = await getComponents();
    const filtered = args.query
      ? allComponents.filter((component) => component.name.toLowerCase().includes(args.query!.toLowerCase()))
      : allComponents;

    return asJsonResult({
      total: filtered.length,
      items: page(filtered, args.offset, args.limit).map((component) => ({
        name: component.name,
        storyPath: component.storyPath,
        mdxPath: component.mdxPath,
        componentPath: component.componentPath,
      })),
    });
  }

  if (name === TOOL_NAMES.getComponentMetadata) {
    const args = componentByNameSchema.parse(rawArgs);
    const component = await findComponent(args.componentName);
    const [storyContent, mdxContent, componentSource] = await Promise.all([
      readMaybe(component.storyPath),
      readMaybe(component.mdxPath),
      readMaybe(component.componentPath),
    ]);
    const storyExports = extractStoryNames(storyContent);
    const props = parseComponentProps(componentSource);
    const storyTitle = storyContent.match(/title:\s*'([^']+)'/)?.[1] ?? `Components/${component.name}`;

    return asJsonResult({
      name: component.name,
      docTitle: storyTitle,
      filePaths: {
        component: component.componentPath,
        story: component.storyPath,
        docs: component.mdxPath,
      },
      props,
      stories: storyExports,
      summary: extractSummary(mdxContent),
    });
  }

  if (name === TOOL_NAMES.getComponentExamples) {
    const args = componentByNameSchema.parse(rawArgs);
    const component = await findComponent(args.componentName);
    const [storyContent, mdxContent] = await Promise.all([readMaybe(component.storyPath), readMaybe(component.mdxPath)]);
    const codeBlock = extractFirstCodeBlock(mdxContent);
    const storyExports = extractStoryNames(storyContent);
    const storyExamples = extractStoryExamples(storyContent, component.name);
    const featured = storyExamples.find((example) => example.storyName === 'Primary') ?? storyExamples[0];
    const boilerplate = featured
      ? `import { ${component.name} } from '@mondave/core';\n\nexport function Example() {\n  return ${featured.snippet};\n}`
      : `import { ${component.name} } from '@mondave/core';\n\nexport function Example() {\n  return <${component.name} />;\n}`;

    return asJsonResult({
      componentName: component.name,
      storyExports,
      storyExamples,
      exampleFromDocs: codeBlock,
      boilerplate,
      sourceFiles: {
        story: component.storyPath,
        docs: component.mdxPath,
      },
    });
  }

  if (name === TOOL_NAMES.getComponentAccessibility) {
    const args = componentByNameSchema.parse(rawArgs);
    const component = await findComponent(args.componentName);
    const docs = await getDocs();
    const [componentDocContent, systemA11yDoc] = await Promise.all([
      readMaybe(component.mdxPath),
      docs.find((doc) => doc.title.toLowerCase().includes('accessibility'))?.content ?? '',
    ]);
    const systemSection = extractAccessibilitySection(systemA11yDoc);

    return asJsonResult({
      componentName: component.name,
      componentSpecificAccessibility: extractAccessibilitySection(componentDocContent),
      systemAccessibilityGuidance: (systemSection ?? cleanMdxContent(systemA11yDoc)) || null,
      docsPath: component.mdxPath,
    });
  }

  if (name === TOOL_NAMES.searchDocs) {
    const args = searchDocsSchema.parse(rawArgs);
    const docs = await getDocs();
    const ranked = docs
      .map((doc) => ({
        title: doc.title,
        kind: doc.kind,
        filePath: doc.filePath,
        score: scoreDocSearch(doc.title, doc.cleanedContent, args.query),
      }))
      .filter((doc) => doc.score > 0)
      .sort((a, b) => b.score - a.score);

    return asJsonResult({
      query: args.query,
      total: ranked.length,
      items: page(ranked, args.offset, args.limit),
    });
  }

  if (name === TOOL_NAMES.getDoc) {
    const args = getDocSchema.parse(rawArgs);
    const doc = await findDoc(args.title);
    return asJsonResult({
      title: doc.title,
      kind: doc.kind,
      filePath: doc.filePath,
      content: doc.cleanedContent,
    });
  }

  if (name === TOOL_NAMES.listIcons) {
    const args = listIconsSchema.parse(rawArgs);
    const icons = await getIconNames();
    const filtered = args.query ? resolveIconQuery(args.query, icons) : icons;

    return asJsonResult({
      total: filtered.length,
      items: page(filtered, args.offset, args.limit).map((nameItem) => ({
        iconName: nameItem,
        usage: `<Icon icon={${nameItem}} label="${nameItem}" />`,
      })),
      sourcePath: iconGalleryPath,
    });
  }

  if (name === TOOL_NAMES.getIcon) {
    const args = getIconSchema.parse(rawArgs);
    const icons = await getIconNames();
    const iconName = resolveIconName(args.iconName, icons);
    if (!iconName) {
      const suggestions = suggestMatches(args.iconName, icons);
      throw new Error(
        suggestions.length > 0
          ? `Icon not found: ${args.iconName}. Did you mean: ${suggestions.join(', ')}?`
          : `Icon not found: ${args.iconName}. Use list-mondave-icons to browse available icons.`,
      );
    }
    return asJsonResult({
      iconName,
      reactImport: `import { ${iconName} } from 'lucide-react';`,
      mondaveUsage: `<Icon icon={${iconName}} label="${iconName}" />`,
      sourcePath: iconGalleryPath,
    });
  }

  if (name === TOOL_NAMES.listTokens) {
    const args = listTokensSchema.parse(rawArgs);
    const allTokens = await getTokens();
    const filteredBySource =
      args.source === 'all' ? allTokens : allTokens.filter((tokenEntry) => tokenEntry.source === args.source);
    const filteredByQuery = args.query
      ? filteredBySource.filter((tokenEntry) => tokenEntry.name.toLowerCase().includes(args.query!.toLowerCase()))
      : filteredBySource;

    return asJsonResult({
      total: filteredByQuery.length,
      items: page(filteredByQuery, args.offset, args.limit),
    });
  }

  if (name === TOOL_NAMES.getToken) {
    const args = getTokenSchema.parse(rawArgs);
    const tokens = await getTokens();
    const token = tokens.find((entry) => entry.name.toLowerCase() === args.tokenName.toLowerCase());
    if (!token) {
      const suggestions = suggestMatches(
        args.tokenName,
        tokens.map((entry) => entry.name),
      );
      throw new Error(
        suggestions.length > 0
          ? `Token not found: ${args.tokenName}. Did you mean: ${suggestions.join(', ')}?`
          : `Token not found: ${args.tokenName}. Use list-mondave-tokens to browse available tokens.`,
      );
    }
    return asJsonResult({
      ...token,
      cssUsage: `color: var(${token.name});`,
    });
  }

  if (name === TOOL_NAMES.migration) {
    const args = migrationSchema.parse(rawArgs);
    const result = await analyzeMigration(args.projectPath);
    return asJsonResult(result);
  }

  throw new Error(`Unknown tool name: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  process.stderr.write(`[mondave-mcp] Fatal error: ${String(error)}\n`);
  process.exit(1);
});
