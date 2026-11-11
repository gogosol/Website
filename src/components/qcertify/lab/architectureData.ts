/**
 * Content for the interactive architecture. Statements and wording rules follow
 * docs/rebuild/product-evidence.md (internal, not in this repository).
 * The diagram is a conceptual model of the deployment, not a live console.
 */
export type ModeId = "mode2" | "mode1" | "pass" | "block";
export type ScenarioId = "sites" | "application" | "partner" | "cloud";
export type ComponentId = "source" | "gatewayA" | "transport" | "gatewayB" | "destination" | "control";

export interface Scenario {
  id: ScenarioId;
  label: string;
  title: string;
  summary: string;
  source: { name: string; detail: string };
  destination: { name: string; detail: string };
  zones: [string, string];
  transport: string;
  gateways: 1 | 2;
  federated: boolean;
  modes: ModeId[];
  unavailable: Partial<Record<ModeId, string>>;
  requirements: string[];
}

export interface Outcome {
  id: ModeId;
  label: string;
  short: string;
  protects: string;
  begins: string;
  keyExchange: string;
  authentication: string;
  failure: string;
  requirements: string[];
}

const SINGLE_TLS = "Mode 1 mediates TLS at a single inline gateway. Select Critical application to see it.";

export const scenarios: Scenario[] = [
  {
    id: "sites", label: "Site to site", title: "Two sites over your existing network",
    summary: "A gateway at each site boundary. Your existing WAN or VPN keeps carrying the traffic; between the gateways it travels inside a post-quantum IPsec tunnel.",
    source: { name: "Site A", detail: "Branch systems" }, destination: { name: "Site B", detail: "Data centre" },
    zones: ["Site A", "Site B"], transport: "Existing WAN or VPN", gateways: 2, federated: false,
    modes: ["mode2", "pass", "block"],
    unavailable: { mode1: SINGLE_TLS },
    requirements: ["Both directions of the selected traffic cross both gateways.", "Reachability across your WAN or VPN is confirmed during deployment planning."],
  },
  {
    id: "application", label: "Critical application", title: "One TLS path to a critical service",
    summary: "A single inline gateway between clients and an application that cannot be rewritten on your schedule. The application is unchanged; clients trust your inspection root.",
    source: { name: "Clients", detail: "Users and services" }, destination: { name: "Application", detail: "Business service" },
    zones: ["Client network", "Application zone"], transport: "Enterprise network", gateways: 1, federated: false,
    modes: ["mode1", "pass", "block"],
    unavailable: { mode2: "Mode 2 needs a QuantumHalon gateway at each end of the path." },
    requirements: ["The selected TLS traffic crosses the inline gateway.", "Client and server compatibility is checked for the specific systems in scope."],
  },
  {
    id: "partner", label: "Partner federation", title: "Scoped connectivity between two organisations",
    summary: "Each organisation keeps its own control plane. Both approve the gateway identities, the traffic scope and the validity of one agreement.",
    source: { name: "Your service", detail: "Your organisation" }, destination: { name: "Partner", detail: "Partner organisation" },
    zones: ["Your organisation", "Partner organisation"], transport: "Agreed network path", gateways: 2, federated: true,
    modes: ["mode2", "block"],
    unavailable: { mode1: "Federation agreements govern gateway-to-gateway protection (Mode 2).", pass: "A federation exists to protect an agreed scope. Other traffic stays under each organisation's own policy." },
    requirements: ["Each organisation verifies the other's identity and approves the gateways, scope and validity.", "Either organisation can suspend or revoke the agreement."],
  },
  {
    id: "cloud", label: "Private cloud", title: "From your data centre to a private cloud",
    summary: "Gateways at suitable boundaries on both sides. The control plane can run on premises or in your own private cloud or VPC.",
    source: { name: "Data centre", detail: "Enterprise systems" }, destination: { name: "Private cloud", detail: "VPC workloads" },
    zones: ["Data centre", "Private cloud / VPC"], transport: "Interconnect or VPN", gateways: 2, federated: false,
    modes: ["mode2", "pass", "block"],
    unavailable: { mode1: SINGLE_TLS },
    requirements: ["The cloud network places a gateway inline for the selected traffic.", "Compatibility with the specific cloud network is confirmed during deployment planning."],
  },
];

export const outcomes: Record<ModeId, Outcome> = {
  mode2: {
    id: "mode2", label: "Mode 2 · IPsec", short: "IP packet protection",
    protects: "Selected IP packets of any IP protocol, carried in an IPsec (ESP) tunnel between the two QuantumHalon gateways.",
    begins: "Protection begins when the first gateway encapsulates the packet and ends when the peer gateway decapsulates it. Beyond the gateways, traffic continues exactly as it did before.",
    keyExchange: "ML-KEM-768 combined with ECDH P-384 or X25519 (hybrid), or ML-KEM alone. Each configuration names its algorithms, and both gateways enforce them.",
    authentication: "Each gateway authenticates to its configured peer with an identity issued by your control plane. No other peer is authorised.",
    failure: "Packets use an authorised tunnel or are dropped. A missing tunnel, a restart or a revocation never falls back to cleartext or weaker algorithms.",
    requirements: ["IKEv2 and ESP reachability between the two gateways, without address translation between them."],
  },
  mode1: {
    id: "mode1", label: "Mode 1 · TLS mediation", short: "TLS mediation",
    protects: "Selected TLS sessions that your policy authorises, terminated at the inline gateway and re-established toward the destination.",
    begins: "There are two TLS legs. The gateway decrypts authorised sessions inside the gateway and re-encrypts them; each leg is protected by what its peer can negotiate.",
    keyExchange: "Hybrid X25519MLKEM768 is offered first on both legs. Weaker exchanges are accepted only down to the floor your policy sets, and each one is recorded.",
    authentication: "The gateway presents ML-DSA-65 certificates from your own issuer to clients that support ML-DSA, and ECDSA to those that do not, recorded as a classical fallback.",
    failure: "A connection below your policy's floor is refused, never silently downgraded.",
    requirements: ["Clients trust the inspection root you distribute through your own device management.", "Permitted domains, and certificate and revocation reachability."],
  },
  pass: {
    id: "pass", label: "Passthrough", short: "Explicit allow",
    protects: "Nothing is added. Traffic your policy permits continues on its existing path with whatever encryption it already uses.",
    begins: "No QuantumHalon protection begins or ends. The decision itself is explicit and recorded.",
    keyExchange: "Unchanged: whatever the applications already negotiate.",
    authentication: "Unchanged.",
    failure: "Not applicable. Passthrough is an access decision, not a protection mode.",
    requirements: ["A reviewed policy decision for traffic that may proceed unchanged."],
  },
  block: {
    id: "block", label: "Block", short: "Explicit deny",
    protects: "The selected flow is denied at the first gateway and never reaches the destination.",
    begins: "The flow stops at the gateway. Scope is defined by source, destination, IP protocol, ports and direction.",
    keyExchange: "Not applicable.",
    authentication: "Not applicable.",
    failure: "Blocking is enforced by the inline gateway; traffic that does not cross it is not covered.",
    requirements: ["A defined traffic scope and a reviewed enforcement policy."],
  },
};

export const modeOrder: ModeId[] = ["mode2", "mode1", "pass", "block"];

export const controlDuties = [
  "Publishes policy and signs every command with ML-DSA. Gateways verify the signature before acting.",
  "Enrols gateways and issues their identities from your own certificate authority.",
  "Keeps the audit ledger and produces signed reports on demand.",
  "Never carries application traffic: management stays off the data path.",
];

export const componentNotes: Record<ComponentId, { title: string; text: string }> = {
  source: { title: "Existing systems", text: "Applications keep their protocols and need no rewrite, and hosts need no agent. QuantumHalon acts on traffic that crosses an inline gateway. For Mode 1, clients trust your inspection root." },
  gatewayA: { title: "Inline gateway", text: "Physically inline on the selected path, enforcing the published configuration locally: Mode 1, Mode 2, passthrough or block. Coverage follows topology." },
  transport: { title: "Your existing network", text: "Routers, firewalls, WAN and VPN paths keep carrying the traffic. No post-quantum capable routers are required." },
  gatewayB: { title: "Peer gateway", text: "The other end of the protected segment. In Mode 2 the two gateways authenticate each other and enforce the same algorithms." },
  destination: { title: "Destination systems", text: "Receive the traffic as before. Protection between gateways complements, and does not replace, endpoint and storage security." },
  control: { title: "Customer-controlled control plane", text: "Runs on premises, in your private cloud or air-gapped. It publishes policy and signs every command with ML-DSA, issues gateway identities from your own certificate authority and keeps the signed audit ledger. It never carries application traffic." },
};
