"use client";
import { useId, useState } from "react";
import styles from "./ConfidentialityHorizon.module.css";

const SPAN = 40;
const TICKS = [0, 5, 10, 15, 20, 25, 30, 35, 40];
const pct = (years: number) => (Math.max(0, Math.min(years, SPAN)) / SPAN) * 100;
const anchor = (position: number) => (position < 10 ? "start" : position > 90 ? "end" : "middle");
const yrs = (value: number) => `${value} ${value === 1 ? "year" : "years"}`;

/**
 * Mosca's inequality, x + y > z, as an interactive model.
 * x: how long the information must stay confidential. y: how long migrating the path takes.
 * z: time until a cryptographically relevant quantum computer exists. z cannot be known, so it
 * is an explicit assumption the visitor sets, never a forecast.
 */
export function ConfidentialityHorizon() {
  const id = useId();
  const [lifetime, setLifetime] = useState(10);
  const [migration, setMigration] = useState(5);
  const [arrival, setArrival] = useState(12);
  const horizon = lifetime + migration;
  const exposed = horizon > arrival;
  const gap = Math.abs(horizon - arrival);
  const verdict = exposed
    ? `x + y = ${horizon} is greater than z = ${arrival}. Under this assumption, information sent before the migration completes stays exposed for up to ${yrs(gap)}.`
    : horizon === arrival
      ? `x + y = ${horizon} equals z = ${arrival}. Under this assumption there is no margin left.`
      : `x + y = ${horizon} is less than z = ${arrival}. Under this assumption, a margin of ${yrs(gap)} remains.`;

  const controls = [
    { key: "x", value: lifetime, set: setLifetime, min: 1, max: 30, label: "Confidentiality lifetime", help: "How long must this information stay confidential?" },
    { key: "y", value: migration, set: setMigration, min: 1, max: 10, label: "Migration time", help: "How long will moving this path to post-quantum protection take?" },
    { key: "z", value: arrival, set: setArrival, min: 3, max: 35, label: "Assumed arrival", help: "Years until a cryptographically relevant quantum computer exists. An assumption to test, not a forecast." },
  ] as const;

  const zPos = pct(arrival);
  const endPos = pct(horizon);
  return <div className={styles.horizon}>
    <div className={styles.controls}>
      {controls.map((control) => <div key={control.key} className={styles.control} data-key={control.key}>
        <label htmlFor={`${id}-${control.key}`} className={styles.label}><span className={styles.symbol}>{control.key}</span>{control.label}</label>
        <p className={styles.help} id={`${id}-${control.key}-help`}>{control.help}</p>
        <div className={styles.rangeRow}>
          <input id={`${id}-${control.key}`} type="range" min={control.min} max={control.max} step={1} value={control.value} aria-describedby={`${id}-${control.key}-help`} aria-valuetext={yrs(control.value)} onChange={(event) => control.set(Number(event.target.value))} />
          <output htmlFor={`${id}-${control.key}`}>{control.value}<span> yrs</span></output>
        </div>
      </div>)}
    </div>

    <div className={styles.readout} data-exposed={exposed || undefined}>
      <p className={styles.equation} aria-hidden="true">
        <span className={styles.term}><span className={styles.termLabel}>x + y</span><span className={styles.termValue}>{horizon}</span></span>
        <span className={styles.operator}>{exposed ? ">" : horizon === arrival ? "=" : "<"}</span>
        <span className={styles.term}><span className={styles.termLabel}>z</span><span className={styles.termValue}>{arrival}</span></span>
      </p>
      <p className={styles.verdict} role="status" aria-live="polite">{verdict}</p>
    </div>

    <figure className={styles.track} aria-label={`Timeline from today. Migration takes ${yrs(migration)}; information sent until then must stay confidential for ${yrs(lifetime)} more, a horizon of ${yrs(horizon)}. The assumed arrival z is ${yrs(arrival)}. ${verdict}`}>
      <div className={styles.lane} aria-hidden="true">
        <span className={styles.zLabel} data-anchor={anchor(zPos)} style={{ left: `${zPos}%` }}>z = {arrival}</span>
        <div className={styles.bars}>
          <span className={styles.migration} style={{ width: `${pct(migration)}%` }} />
          <span className={styles.lifetime} style={{ left: `${pct(migration)}%`, width: `${pct(lifetime)}%` }} />
          {exposed && <span className={styles.exposure} style={{ left: `${zPos}%`, width: `${endPos - zPos}%` }} />}
          {!exposed && gap > 0 && <span className={styles.margin} style={{ left: `${endPos}%`, width: `${zPos - endPos}%` }} />}
          <span className={styles.zLine} style={{ left: `${zPos}%` }} />
        </div>
        <span className={styles.endLabel} data-anchor={anchor(endPos)} style={{ left: `${endPos}%` }}>x + y = {horizon}</span>
      </div>
      <div className={styles.ticks} aria-hidden="true">{TICKS.map((year) => <span key={year} data-major={year % 10 === 0 || undefined} style={{ left: `${pct(year)}%` }}>{year === 0 ? "Today" : `+${year}`}</span>)}</div>
      <figcaption className={styles.legend}>
        <span><i className={styles.legendMigration} />Migration, y</span>
        <span><i className={styles.legendLifetime} />Confidentiality lifetime, x</span>
        <span><i className={styles.legendExposure} />Exposure, when x + y &gt; z</span>
      </figcaption>
    </figure>
    <p className={styles.reading}>This is Mosca&rsquo;s inequality. Information sent until your migration completes must remain confidential for its full lifetime, so the exposure horizon is <span className={styles.formula}>x + y</span>. If that horizon extends beyond <span className={styles.formula}>z</span>, traffic recorded today could be decrypted while it still matters. No one can date <span className={styles.formula}>z</span> with confidence; test the assumptions your organisation is prepared to defend.</p>
  </div>;
}
