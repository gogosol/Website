import styles from "./ExposureTimeline.module.css";

const stages = [
  { when: "Today", title: "Recorded", text: "Encrypted traffic is copied as it crosses networks you do not control." },
  { when: "For years", title: "Stored", text: "It cannot be read yet, but much of it keeps its value for a decade or more." },
  { when: "Arrival uncertain", title: "Decrypted", text: "A capable quantum computer could break the classical key exchange that protected it." },
];

/**
 * Harvest now, decrypt later, as a single line: recorded today, stored for years, readable
 * once a cryptographically relevant quantum computer exists. The arrival is drawn as an
 * uncertainty band, never as a date.
 */
export function ExposureTimeline() {
  return <figure className={styles.timeline}>
    <div className={styles.track} aria-hidden="true">
      <span className={styles.capture} />
      <span className={styles.recorded} />
      <span className={styles.stored} />
      <span className={styles.band} />
      <span className={styles.open} />
    </div>
    <ol className={styles.stages}>
      {stages.map((stage) => <li key={stage.title}>
        <span className={styles.when}>{stage.when}</span>
        <strong className={styles.title}>{stage.title}</strong>
        <p>{stage.text}</p>
      </li>)}
    </ol>
    <figcaption className="sr-only">Harvest now, decrypt later: traffic recorded today is stored for years and could be decrypted once a capable quantum computer exists. No one can date that moment with confidence.</figcaption>
  </figure>;
}
