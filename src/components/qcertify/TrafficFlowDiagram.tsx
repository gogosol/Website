import styles from "./TrafficFlowDiagram.module.css";

const LABEL = "Where traffic flows. Application traffic passes from your systems through gateway A, is protected between gateway A and gateway B, and continues to your systems. Your control plane sends signed policy and commands to both gateways and receives their telemetry, but carries no application traffic. In online deployments QCertify connects only to your control plane, for licensing, signed updates and federation services, and never receives application traffic.";

function Slab({ x, y, w, h, vertical = false }: { x: number; y: number; w: number; h: number; vertical?: boolean }) {
  const aw = vertical ? 30 : 14, ah = vertical ? 14 : 30;
  return <g>
    <rect x={x - w / 2 + 4} y={y - h / 2 + 5} width={w} height={h} rx={7} className={styles.shade} />
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={7} className={styles.slab} />
    <rect x={x - aw / 2} y={y - ah / 2} width={aw} height={ah} rx={7} className={styles.aperture} />
  </g>;
}

/** Data plane, control plane and QCertify, drawn so that only one of them carries traffic. */
export function TrafficFlowDiagram() {
  return <figure className={styles.figure}>
    <svg viewBox="0 0 1000 330" className={styles.wide} role="img" aria-label={LABEL}>
      <rect x={300} y={22} width={300} height={74} rx={14} className={styles.box} />
      <text x={324} y={53} className={styles.title}>Your control plane</text>
      <text x={324} y={76} className={styles.detail}>Policy · identities · audit ledger</text>
      <rect x={712} y={22} width={268} height={74} rx={14} className={styles.vendor} />
      <text x={736} y={53} className={styles.title}>QCertify</text>
      <text x={736} y={76} className={styles.detail}>Licensing · updates · federation</text>
      <line x1={600} y1={59} x2={712} y2={59} className={styles.vendorLink} />
      <text x={656} y={47} textAnchor="middle" className={styles.small}>online only</text>
      <path d="M 450 96 V 150 H 320 V 196 M 450 150 H 680 V 196" className={styles.mgmt} />
      <text x={462} y={136} className={styles.small}>signed commands · telemetry</text>
      <line x1={190} y1={250} x2={298} y2={250} className={styles.wire} />
      <line x1={342} y1={250} x2={658} y2={250} className={styles.glow} />
      <line x1={342} y1={250} x2={658} y2={250} className={styles.protected} />
      <line x1={702} y1={250} x2={810} y2={250} className={styles.wire} />
      <text x={500} y={238} textAnchor="middle" className={styles.blueLabel}>protected between gateways</text>
      <rect x={20} y={222} width={170} height={56} rx={14} className={styles.box} />
      <text x={40} y={256} className={styles.title}>Your systems</text>
      <rect x={810} y={222} width={170} height={56} rx={14} className={styles.box} />
      <text x={830} y={256} className={styles.title}>Your systems</text>
      <Slab x={320} y={250} w={44} h={104} />
      <Slab x={680} y={250} w={44} h={104} />
      <text x={320} y={324} textAnchor="middle" className={styles.detail}>Gateway A</text>
      <text x={680} y={324} textAnchor="middle" className={styles.detail}>Gateway B</text>
    </svg>
    <svg viewBox="0 0 340 600" className={styles.narrow} role="img" aria-label={LABEL}>
      <rect x={14} y={14} width={312} height={62} rx={14} className={styles.vendor} />
      <text x={34} y={41} className={styles.title}>QCertify</text>
      <text x={34} y={62} className={styles.detail}>Licensing · updates · federation</text>
      <path d="M 238 76 V 104" className={styles.vendorLink} />
      <text x={248} y={96} className={styles.small}>online only</text>
      <rect x={14} y={104} width={312} height={64} rx={14} className={styles.box} />
      <text x={34} y={132} className={styles.title}>Your control plane</text>
      <text x={34} y={153} className={styles.detail}>Policy · identities · ledger</text>
      <path d="M 26 168 V 452 H 112 M 26 288 H 112" className={styles.mgmt} />
      <text x={36} y={204} className={styles.small}>commands</text>
      <text x={36} y={220} className={styles.small}>telemetry</text>
      <rect x={130} y={206} width={180} height={50} rx={14} className={styles.box} />
      <text x={150} y={237} className={styles.title}>Your systems</text>
      <line x1={220} y1={256} x2={220} y2={266} className={styles.wire} />
      <line x1={220} y1={310} x2={220} y2={430} className={styles.glow} />
      <line x1={220} y1={310} x2={220} y2={430} className={styles.protected} />
      <text x={234} y={374} className={styles.blueLabel}>protected</text>
      <line x1={220} y1={474} x2={220} y2={500} className={styles.wire} />
      <rect x={130} y={500} width={180} height={50} rx={14} className={styles.box} />
      <text x={150} y={531} className={styles.title}>Your systems</text>
      <Slab x={220} y={288} w={104} h={44} vertical />
      <Slab x={220} y={452} w={104} h={44} vertical />
      <text x={120} y={293} textAnchor="end" className={styles.detail}>A</text>
      <text x={120} y={457} textAnchor="end" className={styles.detail}>B</text>
    </svg>
    <figcaption className={styles.caption}>Conceptual view. Application traffic flows only through your network and your gateways.</figcaption>
  </figure>;
}
