---
name: qcertify-product-truth
description: Check QCertify and QuantumHalon website claims against product evidence when drafting or reviewing copy, diagrams, structured data, or demos.
---

Read the current public-copy policy in `AGENTS.md`, then the current policy at the top of
`docs/rebuild/product-evidence.md`, from the Website project root. These supersede conflicting
copy directions in historical reviews, engineering status documents and `.artifacts/` archives.
Record the source and limits of every new substantive product claim before treating it as fact.
Current website copy supplies candidates; validate them against product documentation,
implementation and dated test evidence. Preserve the distinction between protocol
standards, product implementation and certification. Keep sensitive operational
details out of public copy. Use “unverified” in internal working notes when evidence is missing.

Do not turn evidence gaps into public release, qualification, readiness, lab-validation or
certification-status banners/disclaimers, including indirect paraphrases. Explain genuine
security boundaries and deployment prerequisites. Do not invent certification, audits or
production-readiness claims when removing disclaimers. Mode 2 website wording describes
classical ECDSA P-384 or post-quantum ML-DSA authentication, as configured; record runtime
verification separately in the internal ledger. The build and browser checks enforce the
public-copy policy through `scripts/public-copy-policy.mjs`; fix copy rather than weakening it.

Marketing and conversion skills must preserve these constraints. Follow the user's
authorized scope; a copy task does not authorize publication or contacting customers.
