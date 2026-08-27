# QCertify.io · Official Informational Website

> **Govern the transition to hybrid Post-Quantum Cryptography (PQC).**  
> Official web presence and architectural overview for **QCertify** and the **QuantumHalon** cryptographic platform.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Security](https://img.shields.io/badge/Security-A%2B%20Hardened-green?style=flat-square)](https://qcertify.io/.well-known/security.txt)

---

## 🌐 Overview

**[QCertify.io](https://qcertify.io)** is the primary informational portal and technical reference for **QCertify**. The site presents the technical architecture, cryptographic primitives, compliance mandates, and operational governance models for enterprise Post-Quantum Cryptography (PQC) migration.

### Key Focus Areas:
- **The HNDL Problem (Harvest Now, Decrypt Later)**: Visualizing the urgent threat of passive adversary ciphertext collection and the Mosca Inequality rule ($X + Y > Z$).
- **QuantumHalon Architecture**: Demonstrating inline, customer-controlled hybrid PQC gateways operating at wire speed without application code rewrites.
- **Dual-Cert Catalyst**: Technical documentation on combining classical authentication (`ECDSA` / `RSA`) with post-quantum key encapsulation and signatures (`ML-KEM-768`, `ML-DSA-65`, `FIPS 203/204`).
- **Global Regulatory Roadmap**: Tracking federal and international enforcement deadlines from NIST, NSA (CNSA 2.0), BSI, ANSSI, ENISA, and MAS.

---

## ✨ Features & Interactive Systems

1. **Interactive 3D Verification Core (`VerificationCore.tsx`)**:
   - Hardware-accelerated Three.js WebGL canvas rendering a stateful cryptographic lock and dynamic lattice field.
   - Smooth pointer-damped rotation, responsive canvas resizing, and accessibility controls with `prefers-reduced-motion` compliance.

2. **HNDL Threat Sequence Simulator (`HndlDiagram.tsx`)**:
   - High-clarity single-panel visualization showing the 3 phases of cryptographic exposure:
     - `01 / Capture`: Silent in-transit ciphertext siphon.
     - `02 / Retain`: Multi-decade adversary data vault retention.
     - `03 / Decrypt`: Retroactive quantum decryption via Shor's Algorithm (CRQC).
   - Fully responsive design: horizontal timeline on desktop/tablet, adaptive vertical timeline on mobile viewports.

3. **Multi-Mode Policy Dial (`ProtectionDial.tsx`)**:
   - Interactive policy engine simulator with dual desktop/mobile vector diagrams demonstrating four bounded gateway outcomes:
     - **Mode 2 (Opaque Wrap)**: Encapsulated hybrid PQC tunnel between egress and ingress chokepoints.
     - **Mode 1 (TLS Mediation)**: Dual-leg policy termination with upstream PQC upgrade.
     - **Mode 0 (Explicit Passthrough)**: Transparent exception path with complete cryptographic telemetry logging.
     - **Block (Enforcement Denial)**: Fail-closed perimeter severance for non-compliant cipher suites.

4. **Global Compliance Timeline (`RegulationTimeline.tsx`)**:
   - Chronological breakdown of global mandates spanning 2024 through 2035 (NIST FIPS, CNSA 2.0, BSI TR-02102, ANSSI, MAS).

5. **Hardened Contact & Demo Dispatcher (`ContactForm.tsx` & `/api/contact`)**:
   - Type-safe schema validation via **Zod**.
   - In-memory sliding-window rate limiting & anti-spam honeypot protection.
   - Reliable transactional dispatch powered by **Resend**.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Runtime & UI** | [React 19](https://react.dev/) · [TypeScript 5](https://www.typescriptlang.org/) |
| **3D & Canvas** | [Three.js](https://threejs.org/) (WebGL) |
| **Motion & FX** | [Framer Motion](https://www.framer.com/motion/) · CSS3 GPU Transforms |
| **Styling** | Modular CSS (`*.module.css`) · [Tailwind CSS v4](https://tailwindcss.com/) tokens |
| **Validation** | [Zod](https://zod.dev/) |
| **Email Service** | [Resend](https://resend.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 🔒 Enterprise Security & Optimization

- **HTTP Security Headers**: Strict HSTS (2-year preload), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy` configured in `next.config.ts`.
- **RFC 9116 Vulnerability Disclosure**: Available at `/.well-known/security.txt`.
- **Zero Asset Bloat**: Optimized public asset directory with modern `AVIF` and `WebP` compression.
- **Dynamic SEO & Social Preview**: Next.js Edge OpenGraph and Twitter card image generation (`opengraph-image.tsx`, `twitter-image.tsx`).

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (or `pnpm` / `yarn`)

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/qcertify/website.git
cd website
npm install
```

### Local Development
Run the development server with Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Linting & Type Checking
Verify code quality and type safety:
```bash
npm run lint
```

### Production Build
Create an optimized production build:
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
Website/
├── public/
│   ├── .well-known/
│   │   └── security.txt          # RFC 9116 vulnerability disclosure
│   ├── images/
│   │   ├── Logo SF White.png     # Official brand mark
│   │   ├── goncalo.png           # Founder portrait
│   │   └── gabriel.png           # Co-founder portrait
│   └── icon.png                  # Favicon and app icon
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts      # Rate-limited contact & demo API
│   │   ├── globals.css           # Global reset & CSS design tokens
│   │   ├── home.module.css       # Layout & section styling
│   │   ├── layout.tsx            # Metadata, viewport & root layout
│   │   ├── page.tsx              # Main informational landing page
│   │   ├── not-found.tsx         # Custom 404 error page
│   │   ├── global-error.tsx      # Global error boundary
│   │   ├── opengraph-image.tsx   # Dynamic OpenGraph card generator
│   │   ├── twitter-image.tsx     # Dynamic Twitter card generator
│   │   ├── robots.ts             # Search engine crawling rules
│   │   └── sitemap.ts            # XML Sitemap generator
│   ├── components/
│   │   └── qcertify/
│   │       ├── VerificationCore.tsx   # 3D WebGL verification lock
│   │       ├── HndlDiagram.tsx        # Responsive HNDL threat simulator
│   │       ├── ProtectionDial.tsx     # 4-mode policy engine visualization
│   │       ├── RegulationTimeline.tsx # Global compliance roadmap
│   │       ├── ContactForm.tsx        # Architecture review request form
│   │       ├── Navigation.tsx         # Sticky responsive navigation bar
│   │       ├── Footer.tsx             # Enterprise footer & links
│   │       ├── Preloader.tsx          # Initial boot sequence loader
│   │       ├── Reveal.tsx             # Scroll-triggered reveal animations
│   │       └── Team.tsx               # Leadership & founders profile
│   └── lib/
│       └── contact.ts            # Zod validation schema & path labels
├── next.config.ts                # Production security headers & config
├── package.json                  # Dependencies & project scripts
└── tsconfig.json                 # TypeScript strict configuration
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory for contact form delivery:

```env
# Resend API Key for transactional email delivery
RESEND_API_KEY=re_your_api_key_here

# Notification recipient and sender
CONTACT_TO_EMAIL=contact@qcertify.io
CONTACT_FROM_EMAIL=QCertify website <noreply@qcertify.io>

# Optional: Extra allowed CORS origins (comma-separated)
CONTACT_ALLOWED_ORIGINS=https://qcertify.io,https://www.qcertify.io
```

---

## 📄 License & Intellectual Property

© 2026 QCertify. All rights reserved.  
*QuantumHalon, Dual-Cert Catalyst, and QCertify are trademarks of QCertify.*

