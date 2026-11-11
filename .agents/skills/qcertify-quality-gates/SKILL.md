---
name: qcertify-quality-gates
description: Validate QCertify website changes with browser, accessibility, visual, performance and product-evidence checks before reporting rebuild readiness.
---

Read `docs/rebuild/tooling.md` for the installed commands and their limits. Update
`tests/routes.json` as public pages are added. Run checks appropriate to the change;
for release readiness run the full quality sequence against a production build.

Targets: mobile Lighthouse performance >=90, accessibility and SEO >=95, LCP <=2.5s,
CLS <=0.1, no unresolved automated accessibility violations or broken local links,
working primary interactions and responsive layouts. INP <=200ms is a real-user
75th-percentile target; Lighthouse does not establish it. Automated accessibility
does not establish full WCAG compliance. Include keyboard and human visual review.

Visual baselines need inspection before acceptance. Canvas masks stabilize layout
snapshots but require a separate review of the actual scene. Report commands run,
results and unresolved failures accurately. Compare product claims to the evidence
ledger. A setup check or mocked contact response does not verify production delivery.
