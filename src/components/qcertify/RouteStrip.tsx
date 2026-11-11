import styles from "./RouteStrip.module.css";

const ARROW = "→";

/**
 * A network path as a strip of stops. Connectors leading into stops protectedFrom..protectedTo
 * are blue: protected by QuantumHalon. Without a protected range the strip reads as steps.
 */
export function RouteStrip({ stops, protectedFrom = -1, protectedTo = -1, compact = false, large = false }: { stops: string[]; protectedFrom?: number; protectedTo?: number; compact?: boolean; large?: boolean }) {
  const steps = protectedFrom < 0;
  const label = steps ? `Steps: ${stops.join(` ${ARROW} `)}` : `Path: ${stops.join(` ${ARROW} `)}. Blue segments are protected by QuantumHalon.`;
  return <ol className={styles.route} data-steps={steps || undefined} data-compact={compact || undefined} data-large={large || undefined} aria-label={label}>
    {stops.map((stop, index) => <li key={`${stop}-${index}`}
      data-gateway={stop === "Gateway" || undefined}
      data-transit={(!steps && stops.length > 3 && index === 2) || undefined}
      data-protected={(!steps && index >= protectedFrom && index <= protectedTo) || undefined}><span>{stop}</span></li>)}
  </ol>;
}
