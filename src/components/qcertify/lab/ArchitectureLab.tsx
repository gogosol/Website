"use client";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { componentNotes, modeOrder, outcomes, scenarios, type ComponentId, type ModeId, type ScenarioId } from "./architectureData";
import { LabDiagram } from "./LabDiagram";
import styles from "./ArchitectureLab.module.css";

function summaryFor(scenarioId: ScenarioId, mode: ModeId) {
  const scenario = scenarios.find((item) => item.id === scenarioId)!;
  const pair = scenario.gateways === 2;
  if (mode === "mode2") return `${scenario.label}, Mode 2 IPsec: protection begins at gateway A and ends at gateway B. ${scenario.transport} carries the protected packets.`;
  if (mode === "mode1") return `${scenario.label}, Mode 1 TLS mediation: two TLS legs meet at the inline gateway, which decrypts authorised sessions internally.`;
  if (mode === "pass") return `${scenario.label}, passthrough: traffic continues unchanged${pair ? " through both gateways" : " through the gateway"}, with no added protection.`;
  return `${scenario.label}, block: the flow is denied at the first gateway and does not reach ${scenario.destination.name.toLowerCase()}.`;
}

/**
 * The architecture explorer: a scenario, a policy outcome, and a diagram that redraws where
 * protection begins and ends. Parts of the diagram are buttons that explain their role.
 */
export function ArchitectureLab({ headingLevel = 3 }: { headingLevel?: 3 | 4 }) {
  const id = useId();
  const [scenarioId, setScenarioId] = useState<ScenarioId>("sites");
  const [mode, setMode] = useState<ModeId>("mode2");
  const [selected, setSelected] = useState<ComponentId | null>(null);
  const [animate, setAnimate] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const scenario = scenarios.find((item) => item.id === scenarioId)!;
  const outcome = outcomes[mode];
  const Heading = headingLevel === 3 ? "h3" : "h4";

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Packet motion runs only while the diagram is on screen.
  useEffect(() => {
    const element = stage.current;
    if (!element || !animate) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.querySelectorAll("svg").forEach((svg) => (entry.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [animate, scenarioId, mode]);

  function chooseScenario(next: ScenarioId) {
    const target = scenarios.find((item) => item.id === next)!;
    setScenarioId(next);
    if (!target.modes.includes(mode)) setMode(target.modes[0]);
    if (target.gateways === 1 && selected === "gatewayB") setSelected(null);
  }

  function select(component: ComponentId) { setSelected((current) => (current === component ? null : component)); }

  function onScenarioKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % scenarios.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + scenarios.length) % scenarios.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = scenarios.length - 1;
    else return;
    event.preventDefault();
    chooseScenario(scenarios[next].id);
    document.getElementById(`${id}-scenario-${next}`)?.focus();
  }

  function onModeKey(event: KeyboardEvent<HTMLButtonElement>) {
    const available = modeOrder.filter((item) => scenario.modes.includes(item));
    const position = available.indexOf(mode);
    let next = position;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (position + 1) % available.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (position - 1 + available.length) % available.length;
    else return;
    event.preventDefault();
    setMode(available[next]);
    document.getElementById(`${id}-mode-${available[next]}`)?.focus();
  }

  const unavailable = modeOrder.filter((item) => !scenario.modes.includes(item));
  const summary = summaryFor(scenarioId, mode);
  const requirements = [...outcome.requirements, ...scenario.requirements];
  const note = selected ? componentNotes[selected] : null;

  return <div className={styles.lab}>
    <div className={styles.scenarioTabs} role="tablist" aria-label="Network scenarios">
      {scenarios.map((item, index) => <button key={item.id} id={`${id}-scenario-${index}`} type="button" role="tab" aria-selected={item.id === scenarioId} aria-controls={`${id}-panel`} tabIndex={item.id === scenarioId ? 0 : -1} onClick={() => chooseScenario(item.id)} onKeyDown={(event) => onScenarioKey(event, index)}>{item.label}</button>)}
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-scenario-${scenarios.findIndex((item) => item.id === scenarioId)}`} className={styles.panel}>
      <div className={styles.stage} ref={stage}>
        <div className={styles.stageBar}>
          <p className={styles.caption}>Conceptual view &middot; {scenario.title}</p>
          <p className={styles.hintTop}>Select any part of the diagram to see its role.</p>
        </div>
        <div className={styles.canvas}>
          <div className={styles.horizontal}><LabDiagram scenario={scenario} mode={mode} selected={selected} onSelect={select} vertical={false} animate={animate} titleId={`${id}-h-title`} descId={`${id}-h-desc`} description={summary} /></div>
          <div className={styles.vertical}><LabDiagram scenario={scenario} mode={mode} selected={selected} onSelect={select} vertical animate={animate} titleId={`${id}-v-title`} descId={`${id}-v-desc`} description={summary} /></div>
        </div>
        <div className={styles.note} aria-live="polite" data-open={note ? "" : undefined}>
          {note && <><p><strong>{note.title}.</strong> {note.text}</p><button type="button" className={styles.noteClose} onClick={() => setSelected(null)}><X size={15} aria-hidden="true" /><span className="sr-only">Close the explanation</span></button></>}
        </div>
        <div className={styles.modeBar}>
          <span className={styles.modeLabel} id={`${id}-mode-label`}>Policy outcome</span>
          <div className={styles.modes} role="radiogroup" aria-labelledby={`${id}-mode-label`} aria-describedby={unavailable.length ? `${id}-unavailable` : undefined}>
            {modeOrder.map((item) => {
              const enabled = scenario.modes.includes(item);
              return <button key={item} id={`${id}-mode-${item}`} type="button" role="radio" aria-checked={item === mode} aria-disabled={!enabled || undefined} tabIndex={item === mode ? 0 : -1} data-mode={item} className={styles.mode} onClick={() => enabled && setMode(item)} onKeyDown={onModeKey}>
                <span className={styles.modeSwatch} aria-hidden="true" />{outcomes[item].label}
              </button>;
            })}
          </div>
          {unavailable.length > 0 && <p id={`${id}-unavailable`} className={styles.unavailable}>{unavailable.map((item) => <span key={item}><strong>{outcomes[item].label}:</strong> {scenario.unavailable[item]}</span>)}</p>}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{summary}</p>
      <div className={styles.inspector}>
        <div className={styles.inspectorIntro}>
          <p className={styles.kicker}>{outcome.short}</p>
          <Heading className={styles.inspectorTitle}>{scenario.title}</Heading>
          <p className={styles.summary}>{scenario.summary}</p>
          {scenario.federated && <p className={styles.federation}><strong>Two control planes.</strong> Each organisation&rsquo;s control plane manages only its own gateway. Either side can end the agreement.</p>}
          <div className={styles.boundaryCallout} data-mode={mode}><span>Where protection begins and ends</span><p>{outcome.begins}</p></div>
        </div>
        <div className={styles.inspectorFacts}>
          <dl className={styles.facts}>
            <div><dt>What is protected</dt><dd>{outcome.protects}</dd></div>
            <div><dt>Key establishment</dt><dd>{outcome.keyExchange}</dd></div>
            <div><dt>Authentication</dt><dd>{outcome.authentication}</dd></div>
            <div><dt>If protection fails</dt><dd>{outcome.failure}</dd></div>
          </dl>
          <div className={styles.requirementsBlock}>
            <Heading className={styles.sideTitle}>Before you deploy</Heading>
            <ul className={styles.requirements}>{requirements.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link prefetch={false} href="/demo?intent=deployment" className="text-link">Discuss your topology <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
