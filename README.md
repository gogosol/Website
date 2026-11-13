# QCertify website

The public website of QCertify and its product, QuantumHalon: post-quantum protection for
selected network traffic, through inline gateways and a customer-controlled control plane.

## Stack

Next.js 16.4 App Router, React 19.2, TypeScript and CSS modules, exported as a static site
(`output: "export"`) for Cloudflare Pages. Client components are limited to navigation, the
interactive explanations (architecture lab, exposure model, audit-report anatomy), the hero
scene, two small URL helpers (legacy anchors, deep-linked disclosures) and the contact form. The contact form
posts to a Cloudflare Pages Function (`functions/api/contact.ts`).

```sh
npm ci
npm run dev            # development server
npm run build          # static export to out/ + WebP variants + export verification
npm run preview        # serve out/ locally with Cloudflare Pages semantics on :3000
npm run cf:preview     # optional: Wrangler's local Pages emulator, including the Function
```

Deployment settings, environment variables and free-plan limits: `docs/rebuild/deployment-cloudflare.md`.

Production is the `qcertify-website` Cloudflare Worker, deployed by Workers Builds (`npx wrangler deploy`)
on every push to `main`. `wrangler.jsonc` runs `npm run build` and serves `out/` as static assets with
the same `_headers` and `_redirects`; only `/api/*` invokes the Worker (`worker/index.ts`), which runs the
contact handler from `functions/api/contact.ts`. Workers Builds uses Node 22 with npm 10, so update
`package-lock.json` with npm 10 (for example `volta run --node 22 --npm 10.9.2 npm install`): npm 11
drops lockfile entries that npm 10's `npm ci` requires.

## Public routes

| Route | Purpose |
| --- | --- |
| `/` | Six parts: the proposition, harvest now / decrypt later, what QuantumHalon enables, how it works, use cases and trust, start with one critical path |
| `/platform` | Discover, define policy, enforce, verify, each with a conceptual illustration |
| `/architecture` | The architecture explorer, Mode 1 and Mode 2 boundaries, control-plane deployment, planning |
| `/use-cases` | Three primary situations and three more, each with its boundary and prerequisites |
| `/trust` | Seven buyer questions: control, traffic flow, scope, security properties, verification, retention, security review |
| `/company` | QCertify and QuantumHalon, the founders, how we work, contact routes |
| `/resources` | Migration challenge, exposure model (Mosca), technical FAQs, evaluation questions, primary sources |
| `/demo` | Request a technical demo or a pilot and deployment conversation |

Add new routes to `src/lib/metadata.ts` (`publicRoutes`) and `tests/routes.json`. Every page
uses `pageMetadata` for its title, description, canonical URL and social card
(`/social-image.png`, rendered at build time by `src/app/social-image.png/route.tsx`).

## Content rules

- Follow the current public-copy policy in `AGENTS.md`. Do not restore release, qualification,
  readiness, lab-validation or certification-status banners/disclaimers, including paraphrases.
  Internal engineering status and archived `.artifacts/` copy do not override that policy.
  Keep verification gaps internal and explain genuine capabilities, boundaries and prerequisites.
  Removing a disclaimer does not authorize invented certification or production-readiness claims.
- The build and browser checks enforce the shared policy in `scripts/public-copy-policy.mjs`.
- Internal working notes, including the product evidence ledger, live in `docs/rebuild/`. That
  folder is git-ignored and never published. Read its current policy first, then the relevant
  dated evidence in `docs/rebuild/product-evidence.md`, before changing technical claims.
- No genuine Console screens in public pages. Product capabilities are shown with conceptual
  illustrations labelled as such. Use "Request a demo"; there is no scheduling integration.
- Keep key establishment (ML-KEM) and authentication separate. Mode 2 website copy describes
  ECDSA P-384 or ML-DSA authentication, as configured; runtime verification is recorded internally.
  Never call a combination "quantum-safe". Blue means QuantumHalon-protected traffic, a selected state or
  focus, never decoration.
- No mascot, invented customers, certifications, audits, benchmarks or statistics.

## Design system

Tokens in `src/app/globals.css` (porcelain, graphite, functional blue, Geist and Geist Mono).
Rationale: `docs/rebuild/design-decisions.md`. Asset provenance: `docs/rebuild/visual-assets.md`.

- `components/qcertify/illustrations/`: conceptual Discover / Define policy / Enforce / Verify
  views for the Platform page (no Console chrome, fictional examples, labelled).
- `ArchitectureFigure`: the sculpture, plain or annotated; `TrafficFlowDiagram`, `RouteStrip`,
  `IndexedHero` (reference-page openings), `PostureMatrix`, `ModeComparison`, `EvidencePreview`.
- `components/qcertify/lab/`: the architecture lab. `labGeometry.ts` derives every label position
  from node geometry (a 1000-unit horizontal stage and a 340-unit vertical stage below 861px).
- `components/qcertify/home/ConfidentialityHorizon.tsx`: Mosca's inequality with x, y and an
  explicit z assumption (on Resources); `ExposureTimeline.tsx`: the homepage's three-stage line.
- `ContactForm`, `HeroBand`, `CallToAction`.
- `hero/`: the procedural three.js scene, loaded only after interaction on capable devices,
  never with reduced motion or Save-Data. Posters: `node scripts/render-hero-poster.mjs`.

## Contact delivery

`functions/api/contact.ts` validates with the shared schema in `src/lib/contact.ts`, checks the
origin, applies a best-effort per-isolate rate limit and a honeypot, and sends through Resend's
REST API. It returns success only when Resend accepts the message and returns an id. Without
`RESEND_API_KEY` it answers 503 with the contact address, and the form shows that error. Real
delivery has not been exercised: it needs the production secrets and an authorised live test.

## Verification

Build first; the browser checks serve `out/` with `scripts/serve-quality.mjs`.

```sh
npm run lint
npm run typecheck
npm run build
node node_modules/@playwright/test/cli.js test --grep-invert @visual   # smoke + axe, 3 viewports
npm run test:pa11y
npm run test:lighthouse
npm run test:visual
node scripts/qa-screens.mjs http://127.0.0.1:3000          # layout checks, 10 widths (needs npm run preview)
node scripts/qa-lab.mjs http://127.0.0.1:3000               # every diagram state at 5 widths
```

On Windows, run Playwright through `node node_modules/@playwright/test/cli.js` when a `--grep`
pattern contains `|`; the npx shim would treat it as a pipe. Results: `docs/rebuild/validation-results.md`.

## Local-only delivery

No commits, pushes, pull requests or deployments are authorised. Publishing requires the
owner's explicit approval.

&copy; 2026 QCertify. All rights reserved.
