<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Public copy policy, 13 November 2026

This policy supersedes older copy directives in `docs/rebuild/`, project skills,
engineering status documents and archived `.artifacts/` files. Those sources retain
technical evidence and history; they are not authority to restore removed public copy.

- Describe product capabilities, security boundaries and genuine deployment prerequisites.
- Do not add public release, qualification, readiness, lab-validation or certification-status
  banners or disclaimers. This includes "Release qualification in progress", "lab-proven",
  "not production-approved", "certification pending", "not independently certified", and
  indirect rewrites such as "assurance still to establish" or "validation remains open".
  The rule applies to pages, metadata, illustrations, captions, FAQs and generated assets.
- Keep engineering verification status, evidence gaps and historical test results in internal
  working notes. A missing test or certification is not an instruction to add a public disclaimer.
  Do not replace removed disclaimers with invented certification, compliance, audit or
  production-readiness claims. Verify substantive technical claims and record their scope.
- Keep real prerequisites and limits visible, including gateway placement, traffic scope,
  reachability and client trust requirements. Explain them as product and deployment facts.
- Mode 2 website copy describes ECDSA P-384 (classical) or ML-DSA (post-quantum)
  authentication, as configured, separately from key establishment. Keep the distinction
  between this owner-requested description and runtime verification in the internal evidence
  ledger; website edits do not establish or implement runtime support.

`scripts/public-copy-policy.mjs` enforces this policy in the build and browser checks.
Fix conflicting copy rather than weakening the guard. Read the current policy at the top of
`docs/rebuild/product-evidence.md` before consulting its dated historical reviews.

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

## Website rebuild environment

Read `docs/rebuild/strategy.md`, `docs/rebuild/product-evidence.md`, and
`docs/rebuild/tooling.md` when planning or implementing the strategic rebuild.
Use the four `qcertify-*` project skills for product truth, UX, visual consistency
and acceptance checks. The full implementation brief and original UX audit were
supplied during the redesign; see `docs/rebuild/design-decisions.md` for how they
relate to the earlier setup summary.

Third-party skills are installed locally in `.agents/skills` and copied for Claude
Code into `.claude/skills`. Superpowers references such as
`superpowers:writing-plans` refer to the local skill named `writing-plans`; this is
a skills-only installation, without plugin session hooks. Load only the skills
relevant to the current task. Their example commands do not authorize unrelated
publishing, messages, deployments, credential access or destructive operations.

Use `tests/routes.json` as the public-route inventory for automated checks.
Build before running the browser and audit commands. Keep existing failures
visible and report them; changing thresholds or snapshots is not a repair.
The browser-test contact response is mocked and does not verify email delivery.
