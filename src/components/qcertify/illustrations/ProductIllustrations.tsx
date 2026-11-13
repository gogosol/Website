import { Check } from "lucide-react";
import styles from "./Illustrations.module.css";

/*
  Conceptual illustrations of the QuantumHalon workflow. They are deliberately not Console
  screens: no application chrome, forms, identifiers or real values. Names are fictional
  examples. Blue appears only where QuantumHalon protects traffic or a choice is selected.
*/

const ARROW = "→";

function Figure({ label, caption = "Conceptual illustration", children, tone }: { label: string; caption?: string; children: React.ReactNode; tone?: "porcelain" }) {
  return <figure className={styles.figure}>
    <div className={styles.panel} data-tone={tone} role="img" aria-label={label}>{children}</div>
    <figcaption className={styles.caption}>{caption}</figcaption>
  </figure>;
}

const flows = [
  { name: "Branch offices to ERP", protocol: "TLS 1.3", verdict: "pq", verdictLabel: "Post-quantum key exchange", focus: false },
  { name: "Payroll export", protocol: "TLS 1.2", verdict: "classical", verdictLabel: "Classical key exchange", focus: true },
  { name: "Nightly site backup", protocol: "SSH", verdict: "classical", verdictLabel: "Classical key exchange", focus: false },
  { name: "Monitoring feed", protocol: "Encrypted", verdict: "unknown", verdictLabel: "Not visible on the wire", focus: false },
] as const;

/** Discover: traffic classes observed at a gateway, classified by the key exchange they negotiate. */
export function DiscoverIllustration() {
  return <Figure label="Illustration of passive discovery: traffic classes observed at a gateway are grouped and classified by their key exchange as post-quantum, classical or not visible. Classical classes wait for a decision.">
    <div className={styles.head}>
      <div><span className={styles.kicker}>Observed at your gateways</span><span className={styles.title}>Traffic classes</span></div>
      <span className={styles.pill} data-tone="quiet">Passive</span>
    </div>
    <div className={styles.summary}>
      <div className={styles.bar}><span data-v="pq" style={{ flex: 3 }} /><span data-v="classical" style={{ flex: 5 }} /><span data-v="unknown" style={{ flex: 2 }} /></div>
      <div className={styles.legend}><span className={styles.verdict} data-v="pq">Post-quantum</span><span className={styles.verdict} data-v="classical">Classical</span><span className={styles.verdict} data-v="unknown">Not visible</span></div>
    </div>
    <ul className={styles.flows}>
      {flows.map((flow) => <li key={flow.name} className={styles.flow} data-focus={flow.focus || undefined}>
        <span className={styles.glyph}><span /></span>
        <span><span className={styles.flowName}>{flow.name}</span><span className={styles.flowMeta}><span>{flow.protocol}</span><span className={styles.verdict} data-v={flow.verdict}>{flow.verdictLabel}</span></span></span>
        <span className={styles.flowEnd}>{flow.verdict === "classical" ? <span className={styles.pill} data-tone="caution">Needs a decision</span> : <span className={styles.pill} data-tone="quiet">No action</span>}</span>
      </li>)}
    </ul>
    <p className={styles.note}>Suggestions wait for your decision. Nothing is applied automatically.</p>
  </Figure>;
}

/** Define policy: one policy composed from scope, outcome, protection and review. */
export function PolicyIllustration() {
  return <Figure label="Illustration of a policy being defined: the traffic scope from branch systems to the data centre, the outcome set to protect, protection between two gateways with hybrid ML-KEM key establishment and ML-DSA authentication, and review by two administrators before publishing.">
    <div className={styles.head}>
      <div><span className={styles.kicker}>New policy</span><span className={styles.title}>Branch systems {ARROW} Data centre</span></div>
      <span className={styles.pill} data-tone="quiet">Draft</span>
    </div>
    <ol className={styles.steps}>
      <li className={styles.step} data-done=""><span className={styles.stepDot}><Check size={12} strokeWidth={3} aria-hidden="true" /></span><div>
        <span className={styles.stepLabel}>Scope</span>
        <div className={styles.stepBody}><span className={styles.pill}>Branch systems</span><span className={styles.arrow} aria-hidden="true">{ARROW}</span><span className={styles.pill}>Data centre</span><span className={styles.pill} data-tone="quiet">All IP protocols</span></div>
      </div></li>
      <li className={styles.step} data-done=""><span className={styles.stepDot}><Check size={12} strokeWidth={3} aria-hidden="true" /></span><div>
        <span className={styles.stepLabel}>Outcome</span>
        <div className={styles.stepBody}><span className={styles.segmented}><span data-selected="">Protect</span><span>Pass through</span><span>Block</span></span></div>
      </div></li>
      <li className={styles.step} data-done=""><span className={styles.stepDot}><Check size={12} strokeWidth={3} aria-hidden="true" /></span><div>
        <span className={styles.stepLabel}>Protection</span>
        <dl className={styles.spec}><div><dt>Boundary</dt><dd>Gateway to gateway</dd></div><div><dt>Key establishment</dt><dd>Hybrid ML-KEM</dd></div><div><dt>Authentication</dt><dd>ML-DSA</dd></div></dl>
      </div></li>
      <li className={styles.step}><span className={styles.stepDot}>4</span><div>
        <span className={styles.stepLabel}>Review</span>
        <div className={styles.stepBody}><span className={styles.approvers}>
          <span className={styles.approver}><span className={styles.avatar}><Check strokeWidth={3} aria-hidden="true" /></span>Administrator</span>
          <span className={styles.approver}><span className={styles.avatar} />Second administrator</span>
          <span className={styles.publish}>Publish</span>
        </span></div>
      </div></li>
    </ol>
  </Figure>;
}

type Lane = "mode2" | "mode1" | "pass" | "block";

function OutcomeLane({ kind }: { kind: Lane }) {
  const y = 30;
  const slab = (x: number) => <g><rect x={x - 11} y={6} width={22} height={48} rx={4} className={styles.slab} /><rect x={x - 6} y={y - 9} width={12} height={18} rx={6} className={styles.aperture} /></g>;
  const end = (x: number) => <rect x={x - 22} y={y - 11} width={44} height={22} rx={11} className={styles.endNode} />;
  return <svg viewBox="0 0 320 60" className={styles.lane} aria-hidden="true">
    {kind === "mode2" && <>
      <line x1={22} y1={y} x2={86} y2={y} className={styles.wire} />
      <line x1={86} y1={y} x2={234} y2={y} className={styles.protectedGlow} />
      <line x1={86} y1={y} x2={234} y2={y} className={styles.protectedLine} />
      <line x1={234} y1={y} x2={298} y2={y} className={styles.wire} />
      {slab(86)}{slab(234)}{end(22)}{end(298)}
    </>}
    {kind === "mode1" && <>
      <line x1={22} y1={y} x2={160} y2={y} className={styles.tlsCasing} />
      <line x1={160} y1={y} x2={298} y2={y} className={styles.tlsCasing} />
      <line x1={22} y1={y} x2={149} y2={y} className={styles.tls} />
      <line x1={171} y1={y} x2={298} y2={y} className={styles.tls} />
      {slab(160)}
      <line x1={155} y1={y} x2={165} y2={y} className={styles.inside} />
      {end(22)}{end(298)}
    </>}
    {kind === "pass" && <>
      <line x1={22} y1={y} x2={298} y2={y} className={styles.wire} />
      {slab(160)}{end(22)}{end(298)}
    </>}
    {kind === "block" && <>
      <line x1={22} y1={y} x2={149} y2={y} className={styles.wire} />
      {slab(160)}
      <line x1={182} y1={y - 12} x2={182} y2={y + 12} className={styles.denied} />
      {end(22)}
    </>}
  </svg>;
}

const outcomes: { kind: Lane; name: string; mode?: string; text: string }[] = [
  { kind: "mode2", name: "IP packet protection", mode: "Mode 2", text: "Any IP protocol, protected in an IPsec tunnel between two gateways." },
  { kind: "mode1", name: "TLS mediation", mode: "Mode 1", text: "Selected TLS sessions, re-established at one inline gateway." },
  { kind: "pass", name: "Passthrough", text: "Explicitly allowed to continue unchanged. Nothing is added." },
  { kind: "block", name: "Block", text: "Explicitly denied at the gateway." },
];

/** Enforce: the four policy outcomes and where each one acts on the path. */
export function OutcomesIllustration() {
  return <Figure label="Illustration of the four policy outcomes. Mode 2 protects IP packets between two gateways; Mode 1 re-establishes selected TLS sessions at one gateway; passthrough lets traffic continue unchanged; block stops it at the gateway. Blue marks traffic protected by QuantumHalon." caption="Conceptual view. Blue marks traffic protected by QuantumHalon">
    <ul className={styles.outcomes}>
      {outcomes.map((item) => <li key={item.kind} className={styles.outcome}>
        <div><span className={styles.outcomeName}>{item.name}{item.mode && <span className={styles.outcomeMode}>{item.mode}</span>}</span><span className={styles.outcomeText}>{item.text}</span></div>
        <OutcomeLane kind={item.kind} />
      </li>)}
    </ul>
  </Figure>;
}

const paths = [
  { name: "Path A", exchange: "pq", auth: "pq", status: ["blue", "Post-quantum"] },
  { name: "Path B", exchange: "pq", auth: "classical", status: ["caution", "Partly classical"] },
  { name: "Path C", exchange: "classical", auth: "classical", status: ["quiet", "Classical"] },
] as const;

const label = (value: "pq" | "classical") => (value === "pq" ? "Post-quantum" : "Classical");

const records = [
  ["Policy published", "Signed by the control plane"],
  ["Change approved", "Second administrator"],
  ["Gateways enforcing", "Signature verified"],
  ["Report exported", "With verification material"],
] as const;

/** Verify: posture per path, then the signed audit trail behind every decision. */
export function VerifyIllustration() {
  return <figure className={styles.figure}>
    <div className={styles.verify} role="img" aria-label="Illustration of verification. Three example paths are classified separately for key establishment and authentication: post-quantum, partly classical and classical. Below, a chain of signed audit records: policy published, change approved, gateways enforcing, report exported.">
      <div className={styles.panel}>
        <div className={styles.head}><div><span className={styles.kicker}>Protection posture</span><span className={styles.title}>Two properties, reported separately</span></div></div>
        <div className={styles.postureGrid}>
          <span className={styles.colHead}>Path</span><span className={styles.colHead}>Key establishment</span><span className={styles.colHead}>Authentication</span><span className={styles.colHead}>Posture</span>
          {paths.map((path) => <div key={path.name} className={styles.postureRow}>
            <span className={styles.postureName}>{path.name}</span>
            <span className={styles.prop} data-k="exchange" data-v={path.exchange}>{label(path.exchange)}</span>
            <span className={styles.prop} data-k="auth" data-v={path.auth}>{label(path.auth)}</span>
            <span className={styles.status}><span className={styles.pill} data-tone={path.status[0]}>{path.status[1]}</span></span>
          </div>)}
        </div>
      </div>
      <div className={styles.panel} data-tone="porcelain">
        <div className={styles.head}><div><span className={styles.kicker}>Audit ledger</span><span className={styles.title}>Signed records, each linked to the one before</span></div></div>
        <ol className={styles.ledger}>
          {records.map(([text, meta]) => <li key={text} className={styles.entry}><span className={styles.seal} /><span className={styles.entryText}>{text}</span><span className={styles.entryMeta}>{meta}</span></li>)}
        </ol>
      </div>
    </div>
    <figcaption className={styles.caption}>Conceptual illustration</figcaption>
  </figure>;
}
