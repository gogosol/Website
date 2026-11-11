import Image from "next/image";
import model from "@/assets/visuals/architecture-model.jpg";
import styles from "./ArchitectureFigure.module.css";

type Side = "left" | "right" | "up" | "down";
interface Note { title: string; text: string; x: number; y: number; side: Side; tone?: "blue" }

/* Anchor points are percentages of the artwork, measured on architecture-model.jpg. */
const notes: Note[] = [
  { title: "Control plane", text: "Policy, identities and records, outside the traffic path.", x: 76.6, y: 17.2, side: "right" },
  { title: "Inline gateways", text: "Enforce your policy where the traffic flows.", x: 27.6, y: 41, side: "left" },
  { title: "Protected path", text: "Blue marks post-quantum protection.", x: 50, y: 45.2, side: "up", tone: "blue" },
  { title: "Your existing network", text: "Routers, firewalls, WAN and VPN stay in place.", x: 66.5, y: 78.5, side: "down" },
];

const ALT = "An architectural model: a ceramic plinth for the existing network carries two ceramic gateways. Between them a frosted glass channel holds a thin blue line, the protected path, while silver traffic enters and leaves through the gateways. A brushed metal control plate floats above, linked to each gateway by one fine dashed filament.";

/**
 * The QuantumHalon architecture as a sculpture. "plain" is the unannotated artwork for
 * storytelling; "annotated" adds four labelled anchors (a numbered legend on small screens).
 */
export function ArchitectureFigure({ variant = "plain", framed = false, sizes = "(max-width: 1400px) 100vw, 1300px", priority = false }: { variant?: "plain" | "annotated"; framed?: boolean; sizes?: string; priority?: boolean }) {
  const annotated = variant === "annotated";
  return <figure className={styles.figure} data-framed={framed || undefined} data-annotated={annotated || undefined}>
    <div className={styles.stage}>
      {/* The canvas is exactly the artwork's box, so marker percentages always land on the sculpture. */}
      <div className={styles.canvas}>
        <Image src={model} alt={ALT} sizes={sizes} className={styles.image} preload={priority} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
        {annotated && <div className={styles.markers} aria-hidden="true">{notes.map((note, index) => <span key={note.title} className={styles.marker} data-tone={note.tone} style={{ left: `${note.x}%`, top: `${note.y}%` }}>{index + 1}</span>)}</div>}
      </div>
      {annotated && <>
        <ol className={styles.notes} aria-label="Parts of the architecture">
          {notes.map((note, index) => <li key={note.title} className={styles.note} data-side={note.side} data-tone={note.tone} style={{ ["--x" as string]: `${note.x}%`, ["--y" as string]: `${note.y}%` }}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.label}><span className={styles.number} aria-hidden="true">{index + 1}</span><strong>{note.title}</strong><span className={styles.text}>{note.text}</span></span>
          </li>)}
        </ol>
      </>}
    </div>
  </figure>;
}
