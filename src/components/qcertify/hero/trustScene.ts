/**
 * "The Architecture of Trust": the QCertify hero scene.
 * A procedural, real-time composition that mirrors the actual QuantumHalon boundary:
 * existing traffic (neutral line) enters an inline gateway, travels between two gateways
 * as protected traffic (blue core in frosted glass) and leaves the second gateway.
 * The control plane floats above the path and reaches the gateways only through
 * dashed management filaments; it never touches the traffic.
 */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { HorizontalBlurShader } from "three/addons/shaders/HorizontalBlurShader.js";
import { VerticalBlurShader } from "three/addons/shaders/VerticalBlurShader.js";

export type Framing = "wide" | "tall";
export interface TrustSceneOptions {
  framing?: Framing;
  still?: boolean;
  pixelRatio?: number;
  quality?: "high" | "standard";
  onFirstFrame?: () => void;
  onContextLost?: () => void;
}
export interface TrustSceneController {
  setPointer(x: number, y: number): void;
  setScroll(progress: number): void;
  setPaused(paused: boolean): void;
  setFraming(framing: Framing): void;
  resize(): void;
  renderStill(): string;
  dispose(): void;
}

/** Backdrop stops are shared with the hero CSS so poster, canvas and page meet without a seam. */
export const BACKDROP = { top: "#f7f6f3", middle: "#f1f0ec", bottom: "#eeede8" };
const PALETTE = { floor: BACKDROP.bottom, ceramic: "#f4f4f2", metal: "#e4e6e9", blue: "#1f5cff", neutral: "#b3b5ba", filament: "#9a9da3" };
const SLAB = { width: 2.5, height: 3.1, depth: 0.5, apertureY: 1.32, apertureW: 1.62, apertureH: 0.82, gap: 4.1 };
const PLATE_Y = 4.3;
/** Phase used for the poster so the live scene continues seamlessly from it. */
export const POSTER_TIME = 2.6;

/**
 * Each framing is composed on a reference frame (the poster size). The live camera crops that
 * frame exactly like CSS object-fit: cover, so the poster and the canvas always align.
 * shiftX/shiftY move the subject as a fraction of the frame (positive: right / down).
 */
export const FRAMINGS: Record<Framing, { frame: [number, number]; fov: number; target: THREE.Vector3; azimuth: number; elevation: number; distance: number; shiftX: number; shiftY: number }> = {
  // The subject sits between ~51% and ~83% of the frame, so the cover crop at 1024-1280px viewports keeps the
  // whole structure visible, clear of the copy, with breathing room on the right.
  wide: { frame: [1600, 900], fov: 22, target: new THREE.Vector3(0.2, 1.75, 0), azimuth: 0.93, elevation: 0.2, distance: 24, shiftX: 0.2, shiftY: 0.05 },
  tall: { frame: [900, 1125], fov: 27, target: new THREE.Vector3(0.05, 2.1, 0), azimuth: 0.9, elevation: 0.235, distance: 20, shiftX: 0.04, shiftY: -0.035 },
};

function stadium(path: THREE.Path, w: number, h: number, cx: number, cy: number) {
  const r = h / 2;
  const left = cx - w / 2 + r;
  const right = cx + w / 2 - r;
  path.moveTo(left, cy - r);
  path.lineTo(right, cy - r);
  path.absarc(right, cy, r, -Math.PI / 2, Math.PI / 2, false);
  path.lineTo(left, cy + r);
  path.absarc(left, cy, r, Math.PI / 2, Math.PI * 1.5, false);
  return path;
}

function roundedRect(path: THREE.Path, w: number, h: number, r: number, cx: number, cy: number) {
  const x = cx - w / 2;
  const y = cy - h / 2;
  path.moveTo(x + r, y);
  path.lineTo(x + w - r, y); path.quadraticCurveTo(x + w, y, x + w, y + r);
  path.lineTo(x + w, y + h - r); path.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  path.lineTo(x + r, y + h); path.quadraticCurveTo(x, y + h, x, y + h - r);
  path.lineTo(x, y + r); path.quadraticCurveTo(x, y, x + r, y);
  return path;
}

function slabGeometry(curveSegments: number) {
  const shape = roundedRect(new THREE.Shape(), SLAB.width, SLAB.height, 0.035, 0, SLAB.height / 2) as THREE.Shape;
  shape.holes.push(stadium(new THREE.Path(), SLAB.apertureW, SLAB.apertureH, 0, SLAB.apertureY));
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: SLAB.depth, bevelEnabled: true, bevelThickness: 0.016, bevelSize: 0.016, bevelSegments: 4, curveSegments });
  geometry.translate(0, 0, -SLAB.depth / 2);
  return geometry;
}

function collarGeometry(curveSegments: number) {
  const outer = stadium(new THREE.Shape(), SLAB.apertureW - 0.032, SLAB.apertureH - 0.032, 0, SLAB.apertureY) as THREE.Shape;
  outer.holes.push(stadium(new THREE.Path(), SLAB.apertureW - 0.118, SLAB.apertureH - 0.118, 0, SLAB.apertureY));
  const depth = SLAB.depth + 0.036;
  const geometry = new THREE.ExtrudeGeometry(outer, { depth, bevelEnabled: true, bevelThickness: 0.007, bevelSize: 0.006, bevelSegments: 2, curveSegments });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

function conduitGeometry(length: number) {
  const shape = stadium(new THREE.Shape(), 0.46, 0.25, 0, 0) as THREE.Shape;
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.022, bevelSegments: 5, curveSegments: 32 });
  geometry.translate(0, 0, -length / 2);
  geometry.rotateY(Math.PI / 2);
  return geometry;
}

/** A bright photographic studio used only to light reflections (PMREM). */
function studioEnvironment() {
  const studio = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.BoxGeometry(34, 18, 34), new THREE.MeshBasicMaterial({ color: new THREE.Color("#e4e2dc"), side: THREE.BackSide }));
  room.position.y = 7;
  studio.add(room);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(34, 34), new THREE.MeshBasicMaterial({ color: new THREE.Color("#e9e8e3") }));
  floor.rotation.x = -Math.PI / 2;
  studio.add(floor);
  const panels: [number, number, THREE.Vector3, number][] = [
    [22, 10, new THREE.Vector3(0, 15.5, 0), 3.2], [18, 9, new THREE.Vector3(2, 8, -16.5), 1.7],
    [6, 10, new THREE.Vector3(-16.5, 7, 5), 2.6],
    [7, 7, new THREE.Vector3(9, 6, 16.5), 1.5],
    [5, 8, new THREE.Vector3(16.5, 6, -6), 0.9],
  ];
  for (const [w, h, position, intensity] of panels) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1).multiplyScalar(intensity), side: THREE.DoubleSide }));
    panel.position.copy(position);
    panel.lookAt(0, 2, 0);
    studio.add(panel);
  }
  return studio;
}

/** Vertical backdrop gradient; sRGB textures are not tone mapped, so it matches the page CSS. */
function backdropTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 4; canvas.height = 512;
  const context = canvas.getContext("2d")!;
  const gradient = context.createLinearGradient(0, 0, 0, 512);
  gradient.addColorStop(0, BACKDROP.top);
  gradient.addColorStop(0.5, BACKDROP.middle);
  gradient.addColorStop(1, BACKDROP.bottom);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 4, 512);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Radial alpha so the floor dissolves into the backdrop: an infinite cyclorama. */
function floorFadeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const context = canvas.getContext("2d")!;
  const gradient = context.createRadialGradient(128, 128, 18, 128, 128, 128);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.55, "#ffffff");
  gradient.addColorStop(1, "#000000");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
}

/** Fine ceramic grain used as a bump and roughness map. */
function grainTexture(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d")!;
  const image = context.createImageData(size, size);
  const random = seeded(7);
  for (let i = 0; i < size * size; i++) {
    const v = 150 + Math.floor((random() + random() + random()) / 3 * 70);
    image.data[i * 4] = image.data[i * 4 + 1] = image.data[i * 4 + 2] = v;
    image.data[i * 4 + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 5);
  return texture;
}

/** Brushed aluminium with a precisely engraved hairline grid. */
function brushedTexture(width: number, height: number, grid: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "#c9ccd1";
  context.fillRect(0, 0, width, height);
  const random = seeded(19);
  for (let i = 0; i < width * 1.4; i++) {
    const y = random() * height;
    const shade = random() > 0.5 ? 255 : 0;
    context.strokeStyle = `rgba(${shade},${shade},${shade},${0.025 + random() * 0.05})`;
    context.lineWidth = 0.6 + random() * 1.2;
    const x = random() * width * 0.6;
    context.beginPath(); context.moveTo(x, y); context.lineTo(x + width * (0.3 + random() * 0.7), y + (random() - 0.5) * 0.6); context.stroke();
  }
  if (grid) {
    context.strokeStyle = "rgba(40,44,52,.32)";
    context.lineWidth = 1.2;
    const columns = 22; const rows = 7;
    for (let c = 1; c < columns; c++) { const x = (c / columns) * width; context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
    for (let r = 1; r < rows; r++) { const y = (r / rows) * height; context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** A light core whose brightness travels along the protected path. */
function coreMaterial(color: string) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: [
      "uniform float uTime; uniform vec3 uColor; varying vec2 vUv;",
      "float pulse(float x, float t, float o){ float p = fract(t * 0.16 + o); float d = x - p; return exp(-d * d * 900.0); }",
      "void main(){",
      "  float x = vUv.y;",
      "  float glow = pulse(x, uTime, 0.0) + pulse(x, uTime, 0.5);",
      "  vec3 color = mix(uColor * 1.08, vec3(0.86, 0.92, 1.0), clamp(glow, 0.0, 1.0) * 0.75);",
      "  gl_FragColor = vec4(color, 1.0);",
      "}",
    ].join("\n"),
    toneMapped: false,
  });
}

/** Soft additive halo that keeps the protected path luminous without post-processing. */
function haloMaterial(color: string) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, uStrength: { value: 0.5 } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: [
      "uniform float uTime; uniform vec3 uColor; uniform float uStrength; varying vec2 vUv;",
      "float pulse(float x, float t, float o){ float p = fract(t * 0.16 + o); float d = x - p; return exp(-d * d * 260.0); }",
      "void main(){",
      "  float across = abs(vUv.y - 0.5) * 2.0;",
      "  float falloff = exp(-across * across * 14.0) * 0.55 + exp(-across * across * 90.0) * 0.45;",
      "  float ends = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);",
      "  float glow = 0.55 + 0.9 * (pulse(vUv.x, uTime, 0.0) + pulse(vUv.x, uTime, 0.5));",
      "  gl_FragColor = vec4(uColor, clamp(falloff * ends * glow * uStrength, 0.0, 1.0));",
      "}",
    ].join("\n"),
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    toneMapped: false,
  });
}

/** Thin neutral line that fades into the distance at its outer end. */
function neutralMaterial(color: string, fadeTowardsNegativeX: boolean) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: `uniform vec3 uColor; varying vec2 vUv; void main(){ float x = ${fadeTowardsNegativeX ? "1.0 - vUv.y" : "vUv.y"}; float a = smoothstep(0.0, 0.55, 1.0 - x); gl_FragColor = vec4(uColor, a * 0.95); }`,
    transparent: true,
    depthWrite: false,
  });
}

/**
 * Soft contact shadows rendered once from below the floor, blurred twice and laid on
 * the floor. The architecture is static, so this costs nothing per frame.
 */
function createContactShadows(renderer: THREE.WebGLRenderer, size: number, resolution: number, far: number, opacity: number) {
  const target = new THREE.WebGLRenderTarget(resolution, resolution);
  const blurTarget = new THREE.WebGLRenderTarget(resolution, resolution);
  target.texture.generateMipmaps = blurTarget.texture.generateMipmaps = false;
  const geometry = new THREE.PlaneGeometry(size, size);
  const material = new THREE.MeshBasicMaterial({ map: target.texture, transparent: true, opacity, depthWrite: false, toneMapped: false });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  plane.scale.y = -1;
  plane.position.y = 0.002;
  plane.renderOrder = 1;
  // The blur quad must face the upward-looking shadow camera and sit inside its depth range.
  const blurGeometry = new THREE.PlaneGeometry(size, size).rotateX(Math.PI / 2);
  const blurPlane = new THREE.Mesh(blurGeometry);
  blurPlane.position.y = far / 2;
  blurPlane.visible = false;
  const camera = new THREE.OrthographicCamera(-size / 2, size / 2, size / 2, -size / 2, 0, far);
  camera.rotation.x = Math.PI / 2;
  const depth = new THREE.MeshDepthMaterial();
  depth.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );", "vec4( vec3( 0.07, 0.07, 0.08 ), ( 1.0 - fragCoordZ ) * 1.15 );");
  };
  depth.depthTest = depth.depthWrite = false;
  const horizontal = new THREE.ShaderMaterial(HorizontalBlurShader);
  const vertical = new THREE.ShaderMaterial(VerticalBlurShader);
  horizontal.depthTest = vertical.depthTest = false;

  function blur(amount: number) {
    blurPlane.visible = true;
    blurPlane.material = horizontal;
    horizontal.uniforms.tDiffuse.value = target.texture;
    horizontal.uniforms.h.value = amount / 256;
    renderer.setRenderTarget(blurTarget);
    renderer.render(blurPlane, camera);
    blurPlane.material = vertical;
    vertical.uniforms.tDiffuse.value = blurTarget.texture;
    vertical.uniforms.v.value = amount / 256;
    renderer.setRenderTarget(target);
    renderer.render(blurPlane, camera);
    blurPlane.visible = false;
  }

  function update(scene: THREE.Scene, casters: THREE.Object3D[], blurAmount: number) {
    const hidden: THREE.Object3D[] = [];
    scene.traverse((object) => { if ((object as THREE.Mesh).isMesh && object.visible && !casters.some((caster) => caster === object || caster.getObjectById(object.id))) { object.visible = false; hidden.push(object); } });
    const background = scene.background;
    scene.background = null;
    scene.overrideMaterial = depth;
    const clear = renderer.getClearAlpha();
    renderer.setClearAlpha(0);
    renderer.setRenderTarget(target);
    renderer.clear();
    renderer.render(scene, camera);
    scene.overrideMaterial = null;
    blur(blurAmount);
    blur(blurAmount * 0.4);
    renderer.setRenderTarget(null);
    renderer.setClearAlpha(clear);
    scene.background = background;
    hidden.forEach((object) => { object.visible = true; });
  }

  return {
    plane,
    camera,
    update,
    dispose() { target.dispose(); blurTarget.dispose(); geometry.dispose(); blurGeometry.dispose(); material.dispose(); depth.dispose(); horizontal.dispose(); vertical.dispose(); },
  };
}

export function createTrustScene(host: HTMLElement, options: TrustSceneOptions = {}): TrustSceneController {
  const still = options.still ?? false;
  const high = still || options.quality === "high";
  let framing: Framing = options.framing ?? "wide";
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: still });
  renderer.setPixelRatio(options.pixelRatio ?? Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const backdrop = backdropTexture();
  scene.background = backdrop;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const studio = studioEnvironment();
  const environmentTarget = pmrem.fromScene(studio, 0.035);
  const environment = environmentTarget.texture;
  studio.traverse((object) => { const mesh = object as THREE.Mesh; if (mesh.isMesh) { mesh.geometry.dispose(); (mesh.material as THREE.Material).dispose(); } });
  scene.environment = environment;
  scene.environmentIntensity = 0.58;

  const camera = new THREE.PerspectiveCamera(FRAMINGS[framing].fov, 1, 0.1, 120);

  // Light: high daylight from the front left; shadows fall behind and beside the gateways.
  const sun = new THREE.DirectionalLight("#fffcf6", 2.7);
  sun.position.set(-9.5, 9.5, -3.6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(high ? 4096 : 2048, high ? 4096 : 2048);
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 2, far: 36 });
  sun.shadow.radius = high ? 10 : 8;
  sun.shadow.blurSamples = high ? 30 : 18;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);
  scene.add(new THREE.HemisphereLight("#f8faff", "#ebe7de", 0.16));

  const disposables: { dispose(): void }[] = [environmentTarget, pmrem, backdrop];
  const curveSegments = high ? 72 : 44;
  const grain = grainTexture(256);
  const ceramic = new THREE.MeshPhysicalMaterial({ color: PALETTE.ceramic, roughness: 0.7, metalness: 0, clearcoat: 0.12, clearcoatRoughness: 0.65, sheen: 0.25, sheenRoughness: 0.9, sheenColor: new THREE.Color("#ffffff"), bumpMap: grain, bumpScale: 0.3, roughnessMap: grain, envMapIntensity: 0.85 });
  const aluminium = new THREE.MeshPhysicalMaterial({ color: PALETTE.metal, metalness: 1, roughness: 0.24, anisotropy: 0.35, envMapIntensity: 1.35 });
  const plateTexture = brushedTexture(2048, 640, true);
  const plateMetal = new THREE.MeshPhysicalMaterial({ color: "#f1f2f4", metalness: 1, roughness: 0.36, map: plateTexture, anisotropy: 0.7, envMapIntensity: 1.45, clearcoat: 0.2, clearcoatRoughness: 0.3 });
  const glass = new THREE.MeshPhysicalMaterial({ color: "#ffffff", metalness: 0, roughness: 0.16, transmission: 1, thickness: 0.14, ior: 1.45, attenuationColor: new THREE.Color("#e3ebff"), attenuationDistance: 1.6, clearcoat: 1, clearcoatRoughness: 0.08, specularIntensity: 1, envMapIntensity: 1.2 });
  const fade = floorFadeTexture();
  const floorMaterial = new THREE.MeshBasicMaterial({ color: PALETTE.floor, alphaMap: fade, transparent: true, depthWrite: false, toneMapped: false });
  const catcherMaterial = new THREE.ShadowMaterial({ color: new THREE.Color("#2f2d29"), opacity: 0.22 });
  disposables.push(grain, ceramic, aluminium, plateTexture, plateMetal, glass, fade, floorMaterial, catcherMaterial);

  const floorGeometry = new THREE.PlaneGeometry(44, 44);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.renderOrder = -1;
  const catcher = new THREE.Mesh(floorGeometry, catcherMaterial);
  catcher.rotation.x = -Math.PI / 2;
  catcher.position.y = 0.001;
  catcher.receiveShadow = true;
  scene.add(floor, catcher);
  disposables.push(floorGeometry);

  // Two inline gateways: matte ceramic monoliths with brushed aluminium sleeves.
  const slabShape = slabGeometry(curveSegments);
  const collarShape = collarGeometry(curveSegments);
  disposables.push(slabShape, collarShape);
  const casters: THREE.Object3D[] = [];
  for (const side of [-1, 1]) {
    const gateway = new THREE.Group();
    gateway.position.x = side * SLAB.gap / 2;
    gateway.rotation.y = Math.PI / 2;
    const slab = new THREE.Mesh(slabShape, ceramic);
    slab.castShadow = slab.receiveShadow = true;
    const collar = new THREE.Mesh(collarShape, aluminium);
    collar.castShadow = collar.receiveShadow = true;
    gateway.add(slab, collar);
    scene.add(gateway);
    casters.push(slab, collar);
  }

  // The protected segment: blue core inside a frosted glass conduit, gateway to gateway.
  const conduit = new THREE.Mesh(conduitGeometry(SLAB.gap), glass);
  conduit.position.y = SLAB.apertureY;
  scene.add(conduit);
  const coreGeometry = new THREE.CylinderGeometry(0.017, 0.017, SLAB.gap, 16, 1, true).rotateZ(-Math.PI / 2);
  const core = new THREE.Mesh(coreGeometry, coreMaterial(PALETTE.blue));
  core.position.y = SLAB.apertureY;
  scene.add(core);
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(SLAB.gap, 1.0), haloMaterial(PALETTE.blue));
  halo.position.y = SLAB.apertureY;
  halo.renderOrder = 3;
  scene.add(halo);
  disposables.push(conduit.geometry, coreGeometry, core.material as THREE.Material, halo.geometry, halo.material as THREE.Material);

  // Existing traffic outside the boundary: neutral lines that dissolve into distance.
  const outer = [{ from: -4.9, to: -SLAB.gap / 2, fadeNegative: true }, { from: SLAB.gap / 2, to: 11, fadeNegative: false }];
  for (const segment of outer) {
    const length = segment.to - segment.from;
    const geometry = new THREE.CylinderGeometry(0.0085, 0.0085, length, 10, 1, true).rotateZ(-Math.PI / 2);
    const line = new THREE.Mesh(geometry, neutralMaterial(PALETTE.neutral, segment.fadeNegative));
    line.position.set(segment.from + length / 2, SLAB.apertureY, 0);
    scene.add(line);
    disposables.push(geometry, line.material as THREE.Material);
  }

  // The control plane: a brushed plate above the path, linked by management filaments only.
  const plate = new THREE.Mesh(new RoundedBoxGeometry(SLAB.gap + 1.7, 0.07, 1.9, 4, 0.03), plateMetal);
  plate.position.set(0, PLATE_Y, -0.05);
  plate.castShadow = false;
  scene.add(plate);
  disposables.push(plate.geometry);
  const filamentMaterial = new THREE.LineDashedMaterial({ color: PALETTE.filament, dashSize: 0.055, gapSize: 0.05, transparent: true, opacity: 0.9 });
  const filaments: THREE.Line[] = [];
  for (const side of [-1, 1]) for (const z of [-0.42, 0.42]) {
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -1, 0)]);
    const filament = new THREE.Line(geometry, filamentMaterial);
    filament.position.set(side * SLAB.gap / 2, PLATE_Y - 0.035, z);
    scene.add(filament);
    filaments.push(filament);
    disposables.push(geometry);
  }
  disposables.push(filamentMaterial);

  const contact = createContactShadows(renderer, 14, high ? 1024 : 512, 1.4, 0.7);
  scene.add(contact.plane);
  disposables.push(contact);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const scroll = { value: 0, target: 0 };
  let width = 1;
  let height = 1;
  let paused = false;
  let frameId = 0;
  let time = POSTER_TIME;
  let last = 0;
  let firstFrame = false;
  let slowFrames = 0;
  let sampledFrames = 0;
  let lastPlateY = -1;
  let lost = false;
  const toCamera = new THREE.Vector3();

  function layout() {
    const box = host.getBoundingClientRect();
    width = Math.max(1, Math.round(box.width));
    height = Math.max(1, Math.round(box.height));
    renderer.setSize(width, height, false);
    const frame = FRAMINGS[framing];
    const [frameWidth, frameHeight] = frame.frame;
    const scale = Math.max(width / frameWidth, height / frameHeight);
    const fullWidth = frameWidth * scale;
    const fullHeight = frameHeight * scale;
    camera.aspect = fullWidth / fullHeight;
    camera.fov = frame.fov;
    camera.setViewOffset(fullWidth, fullHeight, (fullWidth - width) / 2 - frame.shiftX * fullWidth, (fullHeight - height) / 2 - frame.shiftY * fullHeight, width, height);
    camera.updateProjectionMatrix();
  }

  function placeCamera() {
    const frame = FRAMINGS[framing];
    const progress = scroll.value;
    const azimuth = frame.azimuth + pointer.x * 0.07 - progress * 0.05;
    const elevation = frame.elevation + pointer.y * 0.035 + progress * 0.07;
    const distance = frame.distance * (1 - progress * 0.1);
    camera.position.set(
      frame.target.x - Math.sin(azimuth) * Math.cos(elevation) * distance,
      frame.target.y + Math.sin(elevation) * distance,
      frame.target.z + Math.cos(azimuth) * Math.cos(elevation) * distance,
    );
    camera.lookAt(frame.target);
    // The control plane lifts slightly as the visitor scrolls: an exploded architectural view.
    const plateY = PLATE_Y + progress * 0.55;
    if (Math.abs(plateY - lastPlateY) > 0.0005) {
      plate.position.y = plateY;
      for (const filament of filaments) { filament.position.y = plateY - 0.035; filament.scale.y = plateY - 0.035 - SLAB.height - 0.02; filament.computeLineDistances(); }
      lastPlateY = plateY;
      renderer.shadowMap.needsUpdate = true;
    }
    toCamera.copy(camera.position).sub(halo.position);
    halo.rotation.x = Math.atan2(-toCamera.y, toCamera.z);
  }

  function draw() {
    const coreUniforms = (core.material as THREE.ShaderMaterial).uniforms;
    const haloUniforms = (halo.material as THREE.ShaderMaterial).uniforms;
    coreUniforms.uTime.value = time;
    haloUniforms.uTime.value = time;
    placeCamera();
    renderer.render(scene, camera);
  }

  function loop(now: number) {
    if (lost) return;
    frameId = requestAnimationFrame(loop);
    const delta = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
    last = now;
    time += delta;
    const ease = 1 - Math.exp(-delta * 3.2);
    pointer.x += (pointer.tx - pointer.x) * ease;
    pointer.y += (pointer.ty - pointer.y) * ease;
    scroll.value += (scroll.target - scroll.value) * (1 - Math.exp(-delta * 5));
    const start = performance.now();
    draw();
    if (!firstFrame) { firstFrame = true; options.onFirstFrame?.(); }
    // Adaptive resolution: step down once if the device cannot keep up.
    if (sampledFrames < 90) {
      sampledFrames++;
      if (performance.now() - start > 14 || delta > 0.024) slowFrames++;
      if (sampledFrames === 90 && slowFrames > 45 && renderer.getPixelRatio() > 1) { renderer.setPixelRatio(1); layout(); }
    }
  }

  function onContextLost(event: Event) { event.preventDefault(); lost = true; cancelAnimationFrame(frameId); options.onContextLost?.(); }
  canvas.addEventListener("webglcontextlost", onContextLost);

  layout();
  placeCamera();
  scene.updateMatrixWorld(true);
  contact.update(scene, casters, high ? 3.2 : 2.6);
  if (!still) frameId = requestAnimationFrame(loop);

  return {
    setPointer(x, y) { pointer.tx = Math.max(-1, Math.min(1, x)); pointer.ty = Math.max(-1, Math.min(1, y)); },
    setScroll(progress) { scroll.target = Math.max(0, Math.min(1, progress)); },
    setPaused(next) {
      if (next === paused || still || lost) return;
      paused = next;
      if (paused) cancelAnimationFrame(frameId);
      else { last = 0; frameId = requestAnimationFrame(loop); }
    },
    setFraming(next) { if (next !== framing) { framing = next; layout(); } },
    resize() { layout(); if (still || paused) draw(); },
    renderStill() {
      time = POSTER_TIME;
      renderer.shadowMap.needsUpdate = true;
      draw();
      return canvas.toDataURL("image/png");
    },
    dispose() {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      for (const item of disposables) item.dispose();
      sun.shadow.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
