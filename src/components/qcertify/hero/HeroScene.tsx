"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import type { Framing, TrustSceneController } from "./trustScene";
import styles from "./HeroScene.module.css";

type StageState = "poster" | "loading" | "live";

/** Cheap checks, run at mount: motion preference, data saving and device class. */
function allowsLiveScene() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (nav.connection?.saveData) return false;
  return (nav.deviceMemory ?? 8) >= 4 && (navigator.hardwareConcurrency ?? 8) >= 4;
}

/** Creating a WebGL context is costly, so support is probed only when the scene is about to start. */
function supportsWebGL2() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch { return false; }
}

/**
 * The poster is rendered on the server. The real-time scene loads only after the first
 * interaction on capable devices, is built only while the hero is visible and the main thread
 * is idle, cross-fades over the identical poster, and can be paused at any time.
 */
export function HeroScene({ children, label }: { children: ReactNode; label: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<TrustSceneController | null>(null);
  const visibleRef = useRef(true);
  const userPausedRef = useRef(false);
  const [state, setState] = useState<StageState>("poster");
  const [paused, setPaused] = useState(false);

  const sync = () => controllerRef.current?.setPaused(userPausedRef.current || !visibleRef.current || document.hidden);

  useEffect(() => {
    const stageElement = stage.current;
    const hostElement = host.current;
    if (!stageElement || !hostElement || !allowsLiveScene()) return;
    let disposed = false;
    let started = false;
    let pending = false;
    let scene: typeof import("./trustScene") | null = null;
    const triggers = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const framingFor = (): Framing => (hostElement.clientWidth / Math.max(1, hostElement.clientHeight) < 1 ? "tall" : "wide");
    const idle = (task: () => void) => (typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(task, { timeout: 700 }) : globalThis.setTimeout(task, 60));
    const onPointer = (event: PointerEvent) => controllerRef.current?.setPointer((event.clientX / window.innerWidth) * 2 - 1, -((event.clientY / window.innerHeight) * 2 - 1));
    const onScroll = () => {
      const box = stageElement.getBoundingClientRect();
      controllerRef.current?.setScroll(Math.max(0, Math.min(1, -box.top / Math.max(1, box.height))));
    };
    const teardown = (next: StageState) => {
      controllerRef.current?.dispose();
      controllerRef.current = null;
      if (!disposed) setState(next);
    };
    const build = () => {
      if (disposed || !scene || controllerRef.current || !visibleRef.current) { pending = !controllerRef.current; return; }
      pending = false;
      controllerRef.current = scene.createTrustScene(hostElement, {
        framing: framingFor(),
        pixelRatio: Math.min(window.devicePixelRatio || 1, window.matchMedia("(pointer: coarse)").matches ? 1.5 : 1.75),
        onFirstFrame: () => { if (!disposed) setState("live"); },
        onContextLost: () => teardown("poster"),
      });
      onScroll();
      sync();
    };
    const resizeObserver = new ResizeObserver(() => { controllerRef.current?.setFraming(framingFor()); controllerRef.current?.resize(); });
    const viewObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting && pending) idle(build);
      sync();
    });
    const onMotionChange = () => { if (motion.matches) teardown("poster"); };
    const removeTriggers = () => triggers.forEach((name) => window.removeEventListener(name, start));
    const start = async () => {
      if (started) return;
      started = true;
      removeTriggers();
      if (!supportsWebGL2()) return;
      setState("loading");
      try {
        scene = await import("./trustScene");
        if (disposed) return;
        pending = true;
        if (visibleRef.current) idle(build);
      } catch {
        if (!disposed) setState("poster");
      }
    };

    viewObserver.observe(stageElement);
    resizeObserver.observe(hostElement);
    motion.addEventListener("change", onMotionChange);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", sync);
    triggers.forEach((name) => window.addEventListener(name, start, { passive: true }));
    return () => {
      disposed = true;
      removeTriggers();
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, []);

  function toggle() {
    userPausedRef.current = !userPausedRef.current;
    setPaused(userPausedRef.current);
    sync();
  }

  return <div className={styles.root}>
    <div ref={stage} className={styles.stage} data-state={state} role="img" aria-label={label}>
      <div className={styles.poster}>{children}</div>
      <div ref={host} className={styles.canvas} aria-hidden="true" />
      <div className={styles.veil} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </div>
    {state === "live" && <button type="button" className={styles.motionToggle} aria-pressed={paused} onClick={toggle}>
      {paused ? <Play aria-hidden="true" size={14} /> : <Pause aria-hidden="true" size={14} />}<span>{paused ? "Play animation" : "Pause animation"}</span>
    </button>}
  </div>;
}
