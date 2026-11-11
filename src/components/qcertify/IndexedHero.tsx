import { ArrowDown } from "lucide-react";
import styles from "./IndexedHero.module.css";

/**
 * The opening of a reference page: title and lead on the left, and the page's own sections
 * as a numbered index on the right, so a technical reader can go straight to their question.
 */
export function IndexedHero({ eyebrow, title, lead, label, items }: { eyebrow: string; title: React.ReactNode; lead: React.ReactNode; label: string; items: readonly (readonly [string, string])[] }) {
  return <section className={styles.hero} aria-labelledby="page-title">
    <div className={`container ${styles.grid}`}>
      <div className={styles.copy}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title" className="page-title">{title}</h1>
        <p className="lead">{lead}</p>
      </div>
      <nav className={styles.index} aria-label={label}>
        <ol>{items.map(([id, text], index) => <li key={id}><a href={`#${id}`}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><span>{text}</span><ArrowDown aria-hidden="true" /></a></li>)}</ol>
      </nav>
    </div>
  </section>;
}
