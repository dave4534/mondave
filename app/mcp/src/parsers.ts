export type PropInfo = {
  name: string;
  type: string;
  description: string | null;
  optional: boolean;
};

export type StoryExample = {
  storyName: string;
  snippet: string;
};

const SKIP_DIRS = new Set(['node_modules', 'dist', 'storybook-static', '.git', 'coverage', 'mcp']);

export function isPublicComponentName(name: string): boolean {
  return !name.startsWith('_') && !name.startsWith('.');
}

export function cleanMdxContent(content: string): string {
  return content
    .replace(/^import\s+.*$/gm, '')
    .replace(/<Meta[^>]*\/?>/g, '')
    .replace(/<Canvas[^>]*>[\s\S]*?<\/Canvas>/g, '')
    .replace(/<Stories[^>]*\/?>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function extractDocTitle(content: string, fallback: string): string {
  const metaTitle = content.match(/<Meta title="([^"]+)"/)?.[1];
  if (metaTitle) {
    return metaTitle;
  }
  const metaOf = content.match(/title:\s*'([^']+)'/);
  if (metaOf) {
    return metaOf[1];
  }
  const heading = content.match(/^#\s+(.+)$/m)?.[1];
  return heading ?? fallback;
}

export function parseComponentProps(componentContent: string): PropInfo[] {
  const interfaceMatch = componentContent.match(/export interface \w+Props[^{]*\{([\s\S]*?)\n\}/);
  if (!interfaceMatch) {
    return [];
  }

  const body = interfaceMatch[1];
  const lines = body.split('\n');
  const props: PropInfo[] = [];
  let pendingDescription: string | null = null;

  for (const line of lines) {
    const docMatch = line.match(/\/\*\*\s*(.+?)\s*\*\//);
    if (docMatch) {
      pendingDescription = docMatch[1];
      continue;
    }

    const propMatch = line.match(/^\s*(\w+)(\?)?:\s*([^;]+);/);
    if (!propMatch) {
      continue;
    }

    props.push({
      name: propMatch[1],
      optional: Boolean(propMatch[2]),
      type: propMatch[3].trim(),
      description: pendingDescription,
    });
    pendingDescription = null;
  }

  return props;
}

export function extractStoryNames(storyFileContent: string): string[] {
  const matches = storyFileContent.matchAll(/export const ([A-Za-z0-9_]+)(?::\s*Story)?\s*=/g);
  return Array.from(matches, (match) => match[1]).filter((name) => name !== 'default');
}

function shouldSkipArgValue(value: string): boolean {
  const trimmed = value.trim();
  return trimmed === 'undefined' || trimmed === 'null';
}

function formatJsxProps(args: Record<string, string>, componentName: string): string {
  const propParts: string[] = [];
  let children: string | null = null;

  for (const [key, value] of Object.entries(args)) {
    if (shouldSkipArgValue(value)) {
      continue;
    }
    if (key === 'children') {
      children = value.replace(/^['"]|['"]$/g, '');
      continue;
    }
    if (value === 'true' || value === 'false') {
      if (value === 'true') {
        propParts.push(key);
      }
      continue;
    }
    const unquoted = value.replace(/^['"]|['"]$/g, '');
    propParts.push(`${key}="${unquoted}"`);
  }

  const open = `<${componentName}${propParts.length ? ` ${propParts.join(' ')}` : ''}`;
  if (children !== null) {
    return `${open}>${children}</${componentName}>`;
  }
  return `${open} />`;
}

export function extractStoryExamples(storyContent: string, componentName: string): StoryExample[] {
  const examples: StoryExample[] = [];
  const storyBlocks = storyContent.matchAll(
    /export const (\w+):\s*Story\s*=\s*(\{[\s\S]*?\n\});/g,
  );

  for (const match of storyBlocks) {
    const storyName = match[1];
    const block = match[2];

    const argsMatch = block.match(/args:\s*\{([\s\S]*?)\}/);
    if (argsMatch) {
      const args: Record<string, string> = {};
      const argLines = argsMatch[1].matchAll(/(\w+):\s*([^,\n]+)/g);
      for (const arg of argLines) {
        const rawValue = arg[2].trim();
        if (shouldSkipArgValue(rawValue)) {
          continue;
        }
        args[arg[1]] = rawValue;
      }
      if (Object.keys(args).length > 0) {
        examples.push({
          storyName,
          snippet: formatJsxProps(args, componentName),
        });
        continue;
      }
    }

    const renderMatch = block.match(/render:\s*\(\)\s*=>\s*\(([\s\S]*?)\)\s*,?\s*\}/);
    if (renderMatch) {
      const jsx = renderMatch[1]
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join('\n');
      examples.push({ storyName, snippet: jsx });
    }
  }

  return examples;
}

export function extractFirstCodeBlock(content: string): string | null {
  const match = content.match(/```(?:tsx|ts|jsx|js)?\n([\s\S]*?)```/);
  return match?.[1]?.trim() ?? null;
}

export function extractAccessibilitySection(mdxContent: string): string | null {
  const sectionMatch = mdxContent.match(/##\s+Accessibility[\s\S]*?(?=\n##\s+|\n#\s+|$)/i);
  return sectionMatch?.[0]?.trim() ?? null;
}

export function extractSummary(mdxContent: string): string | null {
  const cleaned = cleanMdxContent(mdxContent);
  const paragraph = cleaned
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.startsWith('#') && !line.startsWith('|') && !line.startsWith('-'));
  return paragraph ?? null;
}

export function scoreMatch(haystack: string, query: string): number {
  const normalizedHaystack = haystack.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  if (normalizedHaystack === normalizedQuery) {
    return 100;
  }
  if (normalizedHaystack.startsWith(normalizedQuery)) {
    return 75;
  }
  if (normalizedHaystack.includes(normalizedQuery)) {
    return 50;
  }
  return 0;
}

/** Rank docs search: exact title / component name matches beat body-only mentions. */
export function scoreDocSearch(title: string, content: string, query: string): number {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedTitle = title.toLowerCase();
  const titleSegment = normalizedTitle.split('/').pop() ?? normalizedTitle;

  if (normalizedTitle === normalizedQuery) {
    return 100;
  }
  if (titleSegment === normalizedQuery) {
    return 95;
  }
  if (new RegExp(`\\b${escapeRegex(normalizedQuery)}\\b`).test(titleSegment)) {
    return 85;
  }
  if (normalizedTitle.includes(normalizedQuery)) {
    return 75;
  }

  const contentScore = scoreMatch(content, query);
  if (contentScore > 0) {
    return Math.min(contentScore, 50);
  }

  return 0;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function suggestMatches(query: string, candidates: string[], limit = 5): string[] {
  return candidates
    .map((candidate) => ({ candidate, score: scoreMatch(candidate, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export async function getProjectSourceFiles(
  dirPath: string,
  readdirFn: typeof import('node:fs/promises').readdir,
): Promise<string[]> {
  const entries = await readdirFn(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) {
      continue;
    }
    const fullPath = `${dirPath}/${entry.name}`;
    if (entry.isDirectory()) {
      files.push(...(await getProjectSourceFiles(fullPath, readdirFn)));
      continue;
    }
    if (/\.(tsx|ts|jsx|js|css|scss)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}
