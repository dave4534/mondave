# @mondave/mcp

Model Context Protocol (MCP) server for the Mondave Design System.

## What it provides

- Component discovery and metadata
- Component examples and boilerplate snippets
- Component accessibility guidance
- Mondave docs search and retrieval
- Icon list/search/detail
- Token list/search/detail
- Migration-analysis helper flow for adopting Mondave

## Local development

```bash
cd app/mcp
npm install
npm run dev
```

## Build

```bash
cd app/mcp
npm run build
```

## Cursor setup (local)

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "mondave": {
      "command": "node",
      "args": ["/absolute/path/to/design-system/app/mcp/dist/server.js"]
    }
  }
}
```

## VS Code setup (local)

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "mondave": {
      "command": "node",
      "args": ["/absolute/path/to/design-system/app/mcp/dist/server.js"]
    }
  }
}
```

## Tool list

- `list-mondave-components`
- `get-mondave-component-metadata`
- `get-mondave-component-examples`
- `get-mondave-component-accessibility`
- `search-mondave-docs`
- `get-mondave-doc`
- `list-mondave-icons`
- `get-mondave-icon`
- `list-mondave-tokens`
- `get-mondave-token`
- `mondave-migration-analysis`
