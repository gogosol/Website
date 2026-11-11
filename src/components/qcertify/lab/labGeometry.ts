import type { Scenario } from "./architectureData";

export interface Box { x: number; y: number; w: number; h: number }
export interface NodeSpot { x: number; y: number }
export interface LabLayout {
  vertical: boolean;
  width: number;
  height: number;
  source: NodeSpot;
  destination: NodeSpot;
  gateways: NodeSpot[];
  endpoint: { w: number; h: number };
  slab: { w: number; h: number; apertureW: number; apertureH: number };
  zones: (Box & { label: string; labelAt?: "top" | "bottom" })[];
  controls: (Box & { label: string; detail: string; owner: "a" | "b" | "shared" })[];
  links: { d: string; owner: "a" | "b" | "shared" }[];
  linkLabel?: NodeSpot & { text: string; anchor: "start" | "middle" | "end" };
  agreement?: { d: string; label: NodeSpot };
  transport: NodeSpot & { text: string };
}

/**
 * Diagram coordinates for one scenario. Horizontal: a 1000-unit-wide stage for wide screens.
 * Vertical: a 340-unit-wide stage drawn close to 1:1 on phones, so labels stay legible.
 * Every label position is derived from node geometry, never from free-floating constants.
 */
export function layoutFor(scenario: Scenario, vertical: boolean): LabLayout {
  const pair = scenario.gateways === 2;
  const federated = scenario.federated;
  if (!vertical) {
    const y = 372;
    const gateways = pair ? [{ x: 292, y }, { x: 708, y }] : [{ x: 500, y }];
    const slab = { w: 66, h: 176, apertureW: 42, apertureH: 24 };
    const top = y - slab.h / 2;
    // Trust zones stop just past the gateways and above the gateway captions, so no border
    // ever crosses a label.
    const zoneHeight = y + slab.h / 2 + 8 - 210;
    const zones = pair
      ? [{ x: 18, y: 210, w: gateways[0].x + slab.w / 2 + 4 - 18, h: zoneHeight, label: scenario.zones[0] }, { x: gateways[1].x - slab.w / 2 - 4, y: 210, w: 982 - (gateways[1].x - slab.w / 2 - 4), h: zoneHeight, label: scenario.zones[1] }]
      : [{ x: 18, y: 210, w: gateways[0].x - slab.w / 2 - 18, h: zoneHeight, label: scenario.zones[0] }, { x: gateways[0].x + slab.w / 2, y: 210, w: 982 - (gateways[0].x + slab.w / 2), h: zoneHeight, label: scenario.zones[1] }];
    const controls: LabLayout["controls"] = federated
      ? [{ x: gateways[0].x - 125, y: 40, w: 250, h: 76, label: "Your control plane", detail: "Your policy and approvals", owner: "a" }, { x: gateways[1].x - 125, y: 40, w: 250, h: 76, label: "Partner control plane", detail: "Their policy and approvals", owner: "b" }]
      : [{ x: 340, y: 40, w: 320, h: 76, label: "Your control plane", detail: "Policy · identity · evidence", owner: "shared" }];
    const links: LabLayout["links"] = federated
      ? gateways.map((gateway, index) => ({ d: `M ${gateway.x} 116 V ${top}`, owner: index === 0 ? "a" as const : "b" as const }))
      : gateways.map((gateway) => ({ d: `M 500 116 V 168 H ${gateway.x} V ${top}`, owner: "shared" as const }));
    const linkLabel = federated
      ? { x: gateways[0].x + 12, y: 186, text: "signed commands · telemetry", anchor: "start" as const }
      : { x: 512, y: 150, text: "signed commands · telemetry", anchor: "start" as const };
    const agreement = federated ? { d: `M ${gateways[0].x + 125} 78 H ${gateways[1].x - 125}`, label: { x: 500, y: 66 } } : undefined;
    return {
      vertical, width: 1000, height: 560, source: { x: 104, y }, destination: { x: 896, y }, gateways,
      endpoint: { w: 168, h: 88 }, slab, zones, controls, links, linkLabel, agreement,
      transport: pair ? { x: 500, y: y + 62, text: scenario.transport } : { x: 300, y: y + 50, text: scenario.transport },
    };
  }
  const x = 128;
  const width = 340;
  const ys = pair ? [214, 392, 648, 826] : [214, 520, 826];
  const gateways = pair ? [{ x, y: ys[1] }, { x, y: ys[2] }] : [{ x, y: ys[1] }];
  const slab = { w: 128, h: 60, apertureW: 22, apertureH: 38 };
  const half = slab.h / 2;
  const zones = pair
    ? [{ x: 8, y: 146, w: 324, h: gateways[0].y + half + 30 - 146, label: scenario.zones[0] }, { x: 8, y: gateways[1].y - half - 4, w: 324, h: 892 - (gateways[1].y - half - 4), label: scenario.zones[1], labelAt: "bottom" as const }]
    : [{ x: 8, y: 146, w: 324, h: 330, label: scenario.zones[0] }, { x: 8, y: 584, w: 324, h: 308, label: scenario.zones[1], labelAt: "bottom" as const }];
  const controls: LabLayout["controls"] = federated
    ? [{ x: 8, y: 16, w: 158, h: 64, label: "Control plane", detail: "Yours", owner: "a" }, { x: 174, y: 16, w: 158, h: 64, label: "Control plane", detail: "Partner's", owner: "b" }]
    : [{ x: 40, y: 16, w: 260, h: 64, label: "Your control plane", detail: "Policy · identity · evidence", owner: "shared" }];
  const left = x - slab.w / 2;
  const right = x + slab.w / 2;
  // Management runs down the outer edge of the stage, clear of every label.
  const last = gateways[gateways.length - 1];
  const links: LabLayout["links"] = federated
    ? [{ d: `M 16 80 V ${gateways[0].y} H ${left}`, owner: "a" }, { d: `M 324 80 V ${gateways[1].y + 22} H ${right}`, owner: "b" }]
    : [{ d: `M 40 48 H 16 V ${last.y} H ${left}`, owner: "shared" }, ...(pair ? [{ d: `M 16 ${gateways[0].y} H ${left}`, owner: "shared" as const }] : [])];
  const linkLabel = federated ? undefined : { x: 28, y: 106, text: "management only, never payloads", anchor: "start" as const };
  const agreement = federated ? { d: "M 166 48 H 174", label: { x: 170, y: 104 } } : undefined;
  return {
    vertical, width, height: 900, source: { x, y: ys[0] }, destination: { x, y: ys[ys.length - 1] }, gateways,
    endpoint: { w: 200, h: 64 }, slab, zones, controls, links, linkLabel, agreement,
    transport: pair ? { x: x + 18, y: (ys[1] + ys[2]) / 2 + 30, text: scenario.transport } : { x: x + 18, y: (ys[0] + ys[1]) / 2 + 34, text: scenario.transport },
  };
}

/** Points where the path enters and leaves each node, in travel order. */
export function routeStops(layout: LabLayout) {
  const along = (spot: NodeSpot, half: number, sign: number) => layout.vertical ? { x: spot.x, y: spot.y + sign * half } : { x: spot.x + sign * half, y: spot.y };
  const endHalf = layout.vertical ? layout.endpoint.h / 2 : layout.endpoint.w / 2;
  const slabHalf = layout.vertical ? layout.slab.h / 2 : layout.slab.w / 2;
  const stops = [along(layout.source, endHalf, 1)];
  layout.gateways.forEach((gateway) => { stops.push(along(gateway, slabHalf, -1), along(gateway, slabHalf, 1)); });
  stops.push(along(layout.destination, endHalf, -1));
  return stops;
}
