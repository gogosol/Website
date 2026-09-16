<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## UI Component Registries (shadcn)

The project configures custom shadcn registries in `components.json`, including **Canvas UI**:

### Canvas UI (`@canvas-ui`)
- **Homepage & Docs**: [https://canvasui.dev/](https://canvasui.dev/)
- **Registry Endpoint**: `https://canvasui.dev/r/{name}.json`
- **Component Installation**:
  ```bash
  npx shadcn@latest add @canvas-ui/<component-name>
  ```
  Example React WebGL: `npx shadcn@latest add @canvas-ui/liquid-react`
  Example React WebGPU: `npx shadcn@latest add @canvas-ui/liquid-react-webgpu`
- **MCP Integration**: Claude Code, Codex, and Gemini/Antigravity can query, search, and view components using the `shadcn` MCP server with registry `@canvas-ui`.
- **Framework Flavors**: React (`-react`), Vue (`-vue`), Svelte (`-svelte`), Solid (`-solid`), Preact (`-preact`), Vanilla (`-vanilla`).
