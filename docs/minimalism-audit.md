# QCertify Minimalism Audit

## Design Target

The site should return to the Coworking Search Service reference direction: oversized typography, large white fields, small metadata, thin structural rules, sparse color dots, and very few visuals. The experience should feel like a premium technical case study, not a cybersecurity dashboard or a diagram library.

New hierarchy:

1. Typography and whitespace create the identity.
2. Metadata strips provide precision.
3. One architecture diagram explains the product model.
4. Images are rare editorial atmosphere only.
5. Cards and frames are used sparingly.

## Global Findings

### What Feels Wrong

- Too many sections rely on an image plate or diagram to fill the right column.
- The same ideas repeat across image plates, architecture diagrams, mode cards, use-case diagrams, and roadmap cards.
- Several pages use a heavy hero plus a visual, then immediately add another grid or diagram. The rhythm becomes dense instead of editorial.
- Animation wrappers are applied broadly, which makes the site feel busier than the reference.
- Section headings are often close to hero scale, so the hierarchy becomes flat.
- Bordered card grids appear in nearly every section. This weakens the Swiss minimalism and creates a dashboard feeling.
- The shared hero defaults to a product schematic when no visual is supplied, which encourages visual overuse.

### What Should Remain

- QCertify logo/header treatment.
- Massive hero typography and left metadata rail.
- Thin black rules and restrained accent color.
- One main architecture diagram.
- Mode text cards as concise explanation.
- Roadmap/sequence as compact text.
- Direct CTA sections.

### What Should Be Removed

- Repeated image plates after the hero.
- Gateway-to-gateway diagram as a separate large visual section.
- Use-case schematic map.
- Decorative product/screen plates.
- Repeated quantum computer visuals on secondary sections.
- Broad fade-up animation on every card.
- Any default visual fallback in shared components.

### What Should Be Simplified

- Homepage should become: hero, problem strip, architecture, mode text, adoption sequence, CTA.
- Product should become: hero, mode text, product logic, privacy boundary, CTA.
- Architecture/how-it-works should keep the clearest architecture diagram and remove duplicate visuals.
- Use cases should be text-led, with use-case rows rather than diagrams.
- Compliance/readiness should use roadmap text and public milestones, not visual plates.
- About/contact/resources should be mostly typographic.

### What Should Be Resized

- Section headlines should be large but clearly below hero scale.
- Image plates should be rare and smaller; most pages should have none.
- Diagrams should have more whitespace, fewer labels, and less visual density.
- Card grids should have less padding and fewer nested borders.

## Page Audit

### Home

- Hero: KEEP, but keep only one subtle visual.
- Problem strip: KEEP, strong and reference-aligned.
- Why Now: SIMPLIFY. Remove repeated quantum image and let type carry it.
- Architecture: KEEP. Use one diagram only.
- Operating Modes: SIMPLIFY. Keep text cards, remove image plate.
- Capabilities: MERGE into product/architecture logic or reduce to a small strip.
- Secure Wrapping: MERGE into Architecture or remove the separate diagram.
- Adoption: KEEP as text sequence, remove image.
- Audience: REMOVE from homepage; it repeats secondary-page content.
- Link cards: SIMPLIFY or remove if CTA is strong.
- CTA: KEEP as large typography, no visual.

### Product

- Hero: KEEP but make visual optional and smaller.
- Stat strip: KEEP.
- Mode System: KEEP text-only.
- Product Logic: SIMPLIFY; remove extra image and keep one compact feature grid.
- Secure Wrap: MERGE into architecture/product logic; remove separate diagram.
- Privacy Boundary: KEEP text-only.
- CTA: KEEP, typography-led.

### Architecture / How It Works

- Hero: KEEP text and metadata.
- Packet Path: KEEP only one architecture diagram.
- Flow: KEEP as compact text sequence.
- Protection Flow: MERGE into flow copy or remove separate diagram.
- CTA: KEEP.

### Use Cases

- Hero: KEEP, no visual needed.
- Traffic Patterns: SIMPLIFY; remove use-case schematic.
- Use case cards: KEEP, but make them calmer.
- Adoption Fit: MERGE into use-case cards or reduce.
- CTA: KEEP.

### Compliance / Readiness

- Hero: KEEP, no visual needed.
- Program Logic: KEEP as concise grid.
- Calendar Pressure: KEEP roadmap text.
- Evidence: SIMPLIFY, remove image.
- CTA: KEEP.

### Industries

- Hero: KEEP, optional quantum image only if it does not dominate.
- Market Fit: KEEP.
- Executive Story: SIMPLIFY; remove visual.
- CTA: KEEP.

### Resources

- Hero: KEEP, no visual needed.
- Library: KEEP but reduce card weight.
- Featured Brief: KEEP text/mode cards only.
- CTA: KEEP.

### About

- Hero: KEEP, no visual needed.
- Why We Exist: KEEP.
- First Product: SIMPLIFY, remove visual.
- CTA: KEEP.

### Contact

- Hero: KEEP, no visual needed.
- Form: KEEP.
- First-call topics: KEEP, minimal.

## Implementation Direction

- Remove default schematic fallback from `PageHero`.
- Use only one homepage hero image and one architecture diagram.
- Remove most `EditorialImagePlate` usage outside the homepage.
- Remove duplicate `GatewayWrapDiagram` placements.
- Remove `UseCasePaths` visual usage.
- Turn secondary pages into text-led editorial pages.
- Reduce `FadeIn` to a plain wrapper.
- Keep accent colors as tiny squares/dots only.
- Rebalance type with `clamp()` so mobile and desktop wrapping are calmer.
