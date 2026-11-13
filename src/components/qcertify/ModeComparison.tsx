import styles from "./ModeComparison.module.css";

const rows: [string, string, string][] = [
  ["Protects", "Selected TLS sessions", "Selected IP packets, of any IP protocol"],
  ["Gateways", "One inline gateway on the path", "Two gateways, one at each end of the path"],
  ["Protection boundary", "Each TLS leg, terminated and re-established at the gateway", "Between the two gateways, inside an IPsec (ESP) tunnel"],
  ["Key establishment", "X25519MLKEM768 offered first; weaker exchanges only down to your floor, and recorded", "ML-KEM-768 with ECDH P-384 or X25519 (hybrid), or ML-KEM alone"],
  ["Authentication", "ML-DSA-65 certificate for clients that support it; ECDSA otherwise, recorded as a classical fallback", "Classical ECDSA P-384 or post-quantum ML-DSA, as configured, with peer identities issued by your control plane"],
  ["Inside the gateway", "Authorised sessions are decrypted and re-encrypted", "Packets are encapsulated without inspecting their content"],
  ["Requires", "Clients trust the inspection root you distribute", "IKEv2 and ESP reachability between the gateways"],
];

/** Mode 1 versus Mode 2: what each protects, where, and with which cryptography. */
export function ModeComparison() {
  return <div className={styles.wrap}>
    <table className={styles.table}>
      <caption className="sr-only">Comparison of Mode 1 TLS mediation and Mode 2 IPsec</caption>
      <thead><tr><td /><th scope="col"><span className={styles.mode}>Mode 1</span>TLS mediation</th><th scope="col"><span className={styles.mode}>Mode 2</span>IPsec</th></tr></thead>
      <tbody>{rows.map(([label, mode1, mode2]) => <tr key={label}><th scope="row">{label}</th><td data-label="Mode 1">{mode1}</td><td data-label="Mode 2">{mode2}</td></tr>)}</tbody>
    </table>
  </div>;
}
