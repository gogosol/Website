import { Fragment, type KeyboardEvent } from "react";
import type { ComponentId, ModeId, Scenario } from "./architectureData";
import { layoutFor, routeStops, type LabLayout, type NodeSpot } from "./labGeometry";
import styles from "./ArchitectureLab.module.css";

type SegmentKind = "neutral" | "protected" | "tls" | "decrypt" | "blocked" | "stop";
interface Segment { from: NodeSpot; to: NodeSpot; kind: SegmentKind; role: "access" | "inside" | "transit" }

function segmentsFor(layout: LabLayout, mode: ModeId): Segment[] {
  const stops = routeStops(layout);
  const pair = layout.gateways.length === 2;
  const roles: Segment["role"][] = pair ? ["access", "inside", "transit", "inside", "access"] : ["access", "inside", "access"];
  return roles.map((role, index) => {
    const from = stops[index];
    const to = stops[index + 1];
    let kind: SegmentKind = "neutral";
    if (mode === "mode2") kind = role === "access" ? "neutral" : "protected";
    if (mode === "mode1") kind = role === "inside" ? "decrypt" : "tls";
    if (mode === "block") kind = index === 0 ? "neutral" : index === 1 ? "stop" : "blocked";
    return { from, to, kind, role };
  });
}

const mid = (a: NodeSpot, b: NodeSpot) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/** Diagram parts are buttons: pointer and keyboard both select a component to explain it. */
function pressable(label: string, selected: boolean, onSelect: () => void) {
  return {
    role: "button", tabIndex: 0, "aria-label": label, "aria-pressed": selected, onClick: onSelect,
    onKeyDown: (event: KeyboardEvent) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(); } },
  } as const;
}
const length = (a: NodeSpot, b: NodeSpot) => Math.hypot(b.x - a.x, b.y - a.y);

function Packets({ segments }: { segments: Segment[] }) {
  return <g className={styles.packets}>
    {segments.flatMap((segment, index) => {
      if (segment.role === "inside" || segment.kind === "blocked" || segment.kind === "stop") return [];
      const duration = Math.max(1.2, length(segment.from, segment.to) / 170);
      const path = `M ${segment.from.x} ${segment.from.y} L ${segment.to.x} ${segment.to.y}`;
      const fades = segment.kind === "neutral" && segments[index + 1]?.kind === "stop";
      return [0, 0.5].map((phase) => <circle key={`${index}-${phase}`} r={segment.kind === "protected" ? 4.2 : 3.4} className={styles.packet} data-kind={segment.kind}>
        <animateMotion dur={`${duration}s`} begin={`${-phase * duration}s`} repeatCount="indefinite" path={path} />
        {fades && <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.82;1" dur={`${duration}s`} begin={`${-phase * duration}s`} repeatCount="indefinite" />}
      </circle>);
    })}
  </g>;
}

function Endpoint({ spot, layout, name, detail, selected, muted, onSelect }: { spot: NodeSpot; layout: LabLayout; name: string; detail: string; selected: boolean; muted?: boolean; onSelect: () => void }) {
  const { w, h } = layout.endpoint;
  return <g className={styles.node} data-selected={selected || undefined} data-muted={muted || undefined} {...pressable(`${name}, ${muted ? "not reached" : detail}`, selected, onSelect)}>
    <rect x={spot.x - w / 2} y={spot.y - h / 2} width={w} height={h} rx={14} className={styles.endpoint} />
    <g className={styles.glyph}>{[0, 1, 2].map((row) => <rect key={row} x={spot.x - w / 2 + 16} y={layout.vertical ? spot.y - 11 + row * 9 : spot.y - h / 2 + 18 + row * 9} width={22} height={4} rx={2} />)}</g>
    <text x={spot.x - w / 2 + (layout.vertical ? 50 : 16)} y={spot.y + (layout.vertical ? -2 : 18)} className={styles.nodeTitle}>{name}</text>{" "}
    <text x={spot.x - w / 2 + (layout.vertical ? 50 : 16)} y={spot.y + (layout.vertical ? 17 : 36)} className={styles.nodeDetail}>{muted ? "Not reached" : detail}</text>
  </g>;
}

function Gateway({ spot, layout, name, note, selected, onSelect }: { spot: NodeSpot; layout: LabLayout; name: string; note?: string; selected: boolean; onSelect: () => void }) {
  const { w, h, apertureW, apertureH } = layout.slab;
  const r = Math.min(apertureW, apertureH) / 2;
  const labelX = layout.vertical ? spot.x + w / 2 + 12 : spot.x;
  const labelY = layout.vertical ? spot.y - 8 : spot.y + h / 2 + 30;
  const anchor = layout.vertical ? "start" : "middle";
  const noteLines = note ? (layout.vertical ? note.split(" | ") : [note.replace(" | ", " ")]) : [];
  const label = [name, "QuantumHalon", ...noteLines].join(", ");
  return <g className={styles.node} data-selected={selected || undefined} {...pressable(label, selected, onSelect)}>
    <rect x={spot.x - w / 2 + 5} y={spot.y - h / 2 + 7} width={w} height={h} rx={8} className={styles.slabShade} />
    <rect x={spot.x - w / 2} y={spot.y - h / 2} width={w} height={h} rx={8} className={styles.slab} />
    <rect x={spot.x - apertureW / 2} y={spot.y - apertureH / 2} width={apertureW} height={apertureH} rx={r} className={styles.aperture} />
    <rect x={spot.x - apertureW / 2 + 3} y={spot.y - apertureH / 2 + 3} width={apertureW - 6} height={apertureH - 6} rx={r - 3} className={styles.apertureInner} />
    <text x={labelX} y={labelY} textAnchor={anchor} className={styles.nodeTitle}>{name}</text>{" "}
    <text x={labelX} y={labelY + 18} textAnchor={anchor} className={styles.nodeDetail}>QuantumHalon</text>
    {noteLines.map((line, index) => <Fragment key={line}>{" "}<text x={labelX} y={labelY + 37 + index * 17} textAnchor={anchor} className={styles.noteText}>{line}</text></Fragment>)}
  </g>;
}

export function LabDiagram({ scenario, mode, selected, onSelect, vertical, animate, titleId, descId, description }: {
  scenario: Scenario; mode: ModeId; selected: ComponentId | null; onSelect: (id: ComponentId) => void;
  vertical: boolean; animate: boolean; titleId: string; descId: string; description: string;
}) {
  const layout = layoutFor(scenario, vertical);
  const segments = segmentsFor(layout, mode);
  const pair = layout.gateways.length === 2;
  const transit = pair ? segments[2] : segments[0];
  const blocked = mode === "block";
  const markerOffset = vertical ? { x: 16, y: 4 } : { x: 0, y: -16 };
  // In the narrow vertical stage, long path labels wrap at their separator onto two lines.
  const pathLabel = (spot: NodeSpot, text: string, tone: string, anchor: "middle" | "start" | "end" = "middle") => vertical
    ? <text x={spot.x + 18} y={spot.y - 14} className={styles.pathLabel} data-tone={tone} textAnchor="start">{text.split(" · ").map((part, index) => <tspan key={part} x={spot.x + 18} dy={index === 0 ? 0 : 17}>{part}</tspan>)}</text>
    : <text x={spot.x} y={spot.y - 16} className={styles.pathLabel} data-tone={tone} textAnchor={anchor}>{text}</text>;

  return <svg viewBox={`0 0 ${layout.width} ${layout.height}`} className={styles.svg} data-vertical={vertical || undefined} role="group" aria-labelledby={`${titleId} ${descId}`}>
    <title id={titleId}>{`${scenario.label}: ${mode === "mode2" ? "Mode 2 IPsec" : mode === "mode1" ? "Mode 1 TLS mediation" : mode === "pass" ? "Passthrough" : "Block"}`}</title>
    <desc id={descId}>{description}</desc>
    <defs>
      <filter id={`${titleId}-glow`} x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="5" /></filter>
    </defs>
    {layout.zones.map((zone) => <g key={zone.label} className={styles.zone}>
      <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx={18} />
      {(() => { const right = !vertical && zone.x > layout.width / 2; return <text x={right ? zone.x + zone.w - 16 : zone.x + (vertical ? 20 : 16)} y={zone.labelAt === "bottom" ? zone.y + zone.h - 14 : zone.y + 24} textAnchor={right ? "end" : "start"}>{zone.label.toUpperCase()}</text>; })()}
    </g>)}
    {<g>
      {layout.links.map((link, index) => <path key={index} d={link.d} className={styles.managementLink} />)}
      {layout.linkLabel && <text x={layout.linkLabel.x} y={layout.linkLabel.y} textAnchor={layout.linkLabel.anchor} className={styles.linkLabel}>{layout.linkLabel.text}</text>}
      {layout.agreement && <g className={styles.agreement}><path d={layout.agreement.d} /><text x={layout.agreement.label.x} y={layout.agreement.label.y} textAnchor="middle">bilateral agreement</text></g>}
      {layout.controls.map((control, index) => <g key={`${control.owner}-${index}`} className={styles.node} data-selected={selected === "control" || undefined} {...pressable(control.label + (control.detail ? `, ${control.detail}` : ""), selected === "control", () => onSelect("control"))}>
        <rect x={control.x} y={control.y} width={control.w} height={control.h} rx={14} className={styles.control} />
        <rect x={control.x + 14} y={control.y + 14} width={6} height={control.h - 28} rx={3} className={styles.controlMark} />
        <text x={control.x + 34} y={control.y + control.h / 2 - 3} className={styles.nodeTitle}>{control.label}</text>{" "}
        <text x={control.x + 34} y={control.y + control.h / 2 + 16} className={styles.nodeDetail}>{control.detail}</text>
      </g>)}
    </g>}
    <g>
      {segments.map((segment, index) => <g key={index} className={styles.segment} data-kind={segment.kind}>
        {segment.kind === "protected" && <line x1={segment.from.x} y1={segment.from.y} x2={segment.to.x} y2={segment.to.y} className={styles.glow} filter={`url(#${titleId}-glow)`} />}
        {segment.kind === "tls" && <line x1={segment.from.x} y1={segment.from.y} x2={segment.to.x} y2={segment.to.y} className={styles.casing} />}
        {segment.kind !== "stop" && <line x1={segment.from.x} y1={segment.from.y} x2={segment.to.x} y2={segment.to.y} />}
      </g>)}
      {selected === "transport" && <line x1={transit.from.x} y1={transit.from.y} x2={transit.to.x} y2={transit.to.y} className={styles.transportHighlight} />}
      <text x={layout.transport.x} y={layout.transport.y} textAnchor={vertical ? "start" : "middle"} className={styles.transportLabel} {...pressable(layout.transport.text, selected === "transport", () => onSelect("transport"))}>{layout.transport.text}</text>
    </g>
    <Endpoint spot={layout.source} layout={layout} name={scenario.source.name} detail={scenario.source.detail} selected={selected === "source"} onSelect={() => onSelect("source")} />
    <Endpoint spot={layout.destination} layout={layout} name={scenario.destination.name} detail={scenario.destination.detail} selected={selected === "destination"} muted={blocked} onSelect={() => onSelect("destination")} />
    {layout.gateways.map((gateway, index) => <Gateway key={index} spot={gateway} layout={layout} name={pair ? (index === 0 ? "Gateway A" : "Gateway B") : "Gateway"}
      note={mode === "mode1" ? "decrypts | authorised TLS" : blocked && index === 0 ? "denies | the flow" : undefined}
      selected={selected === (index === 0 ? "gatewayA" : "gatewayB")} onSelect={() => onSelect(index === 0 ? "gatewayA" : "gatewayB")} />)}
    {mode === "mode2" && pair && <g className={styles.markers}>
      <g className={styles.marker}><circle cx={segments[2].from.x} cy={segments[2].from.y} r={5} />{vertical
        ? <text x={segments[2].from.x + markerOffset.x} y={segments[2].from.y + 22}>Protection begins</text>
        : <text x={segments[2].from.x + 8} y={segments[2].from.y + 30}>Protection begins</text>}</g>
      <g className={styles.marker}><circle cx={segments[2].to.x} cy={segments[2].to.y} r={5} />{vertical
        ? <text x={segments[2].to.x + markerOffset.x} y={segments[2].to.y - 12}>Protection ends</text>
        : <text x={segments[2].to.x - 8} y={segments[2].to.y + 30} textAnchor="end">Protection ends</text>}</g>
      {pathLabel(mid(segments[2].from, segments[2].to), "IPsec · ML-KEM", "blue")}
    </g>}
    {mode === "mode1" && <g>{pathLabel(mid(segments[0].from, segments[0].to), "TLS leg 1 · negotiated per client", "blue")}{pathLabel(mid(segments[2].from, segments[2].to), "TLS leg 2 · negotiated per server", "blue")}</g>}
    {mode === "pass" && pathLabel(mid(transit.from, transit.to), "Passthrough · no added protection", "muted")}
    {blocked && <g className={styles.stop}><line x1={segments[1].from.x + (vertical ? -16 : 0)} y1={segments[1].from.y + (vertical ? 0 : -16)} x2={segments[1].from.x + (vertical ? 16 : 0)} y2={segments[1].from.y + (vertical ? 0 : 16)} /></g>}
    {animate && <Packets segments={segments} />}
  </svg>;
}
