import styles from "./PostureMatrix.module.css";

type Tone = "classical" | "partial" | "pq";
const columns = [
  { title: "Classical signatures", detail: "ECDSA, RSA" },
  { title: "Post-quantum signatures", detail: "ML-DSA (FIPS 204)" },
];
const rows: { title: string; detail: string; cells: { tone: Tone; label: string; text: string }[] }[] = [
  { title: "Classical key establishment", detail: "ECDHE, X25519, RSA", cells: [
    { tone: "classical", label: "Classical", text: "Traffic recorded today could be decrypted by a future quantum computer." },
    { tone: "classical", label: "Classical key establishment", text: "Identity is post-quantum, but recorded traffic remains exposed." },
  ] },
  { title: "Hybrid key establishment", detail: "ML-KEM-768 with X25519 or ECDH P-384", cells: [
    { tone: "partial", label: "Partly classical", text: "Confidentiality is protected by ML-KEM; identity still rests on a classical signature." },
    { tone: "pq", label: "Post-quantum", text: "ML-KEM protects confidentiality and ML-DSA proves identity. A classical exchange is combined in, not relied on alone." },
  ] },
  { title: "Post-quantum key establishment", detail: "ML-KEM alone (FIPS 203)", cells: [
    { tone: "partial", label: "Partly classical", text: "Confidentiality is post-quantum; identity rests on a classical signature." },
    { tone: "pq", label: "Post-quantum", text: "Post-quantum confidentiality and authentication, with no classical component." },
  ] },
];

/** How a connection is classified: key establishment and authentication, never conflated. */
export function PostureMatrix() {
  return <div className={styles.wrap}>
    <table className={styles.matrix}>
      <caption className="sr-only">Connection posture by key establishment (rows) and authentication (columns)</caption>
      <thead><tr><td className={styles.corner}><span>Key establishment</span><span aria-hidden="true">{"↓"}</span><span className={styles.cornerAxis}>Authentication {"→"}</span></td>{columns.map((column) => <th key={column.title} scope="col">{column.title}<small>{column.detail}</small></th>)}</tr></thead>
      <tbody>{rows.map((row) => <tr key={row.title}><th scope="row">{row.title}<small>{row.detail}</small></th>{row.cells.map((cell, index) => <td key={index} data-tone={cell.tone}><span className={styles.label}>{cell.label}</span><span className={styles.axis}>{columns[index].title}</span><p>{cell.text}</p></td>)}</tr>)}</tbody>
    </table>
    <ul className={styles.where}>
      <li><strong>Mode 2</strong>Hybrid or ML-KEM-only key establishment between the gateways, with classical ECDSA P-384 or post-quantum ML-DSA authentication. Posture reflects the configured combination.</li>
      <li><strong>Mode 1</strong>Hybrid key establishment; ML-DSA for clients that support it. Clients that need ECDSA are recorded as partly classical.</li>
      <li><strong>Passthrough</strong>Reported as observed. QuantumHalon adds nothing and claims nothing.</li>
    </ul>
  </div>;
}
