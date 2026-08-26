"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";

export function VerificationCore() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let disposeScene: (() => void) | undefined;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || disposeScene) return;
        void import("three").then((THREE) => {
          if (cancelled) return;

          let renderer: import("three").WebGLRenderer;
          try {
            renderer = new THREE.WebGLRenderer({
              canvas,
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
            });
          } catch {
            return;
          }

          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.35;

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
          camera.position.set(0, 0.05, 8.4);

          // ─── PROCEDURAL TEXTURE GENERATORS ───

          // 1. Brushed Dark Titanium Texture (Micro-scratch normal/bump map)
          const createBrushedMetalTexture = () => {
            const size = 512;
            const texCanvas = document.createElement("canvas");
            texCanvas.width = size;
            texCanvas.height = size;
            const ctx = texCanvas.getContext("2d");
            if (!ctx) return null;

            ctx.fillStyle = "#0e1828";
            ctx.fillRect(0, 0, size, size);

            for (let i = 0; i < 4000; i++) {
              const y = Math.random() * size;
              const len = 30 + Math.random() * 120;
              const x = Math.random() * size;
              const alpha = 0.04 + Math.random() * 0.09;
              ctx.fillStyle = `rgba(160, 210, 255, ${alpha})`;
              ctx.fillRect(x, y, len, 0.8);
            }

            for (let i = 0; i < 1500; i++) {
              const y = Math.random() * size;
              const len = 20 + Math.random() * 80;
              const x = Math.random() * size;
              ctx.fillStyle = "rgba(2, 6, 12, 0.12)";
              ctx.fillRect(x, y, len, 1);
            }

            const texture = new THREE.CanvasTexture(texCanvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            return texture;
          };

          // 2. Laser-Engraved Technical Faceplate Texture (Confined strictly to top section)
          const createFaceplateTexture = () => {
            const w = 512;
            const h = 512;
            const texCanvas = document.createElement("canvas");
            texCanvas.width = w;
            texCanvas.height = h;
            const ctx = texCanvas.getContext("2d");
            if (!ctx) return null;

            ctx.clearRect(0, 0, w, h);

            // Technical micro-grid lines (Only in upper section y <= 210)
            ctx.strokeStyle = "rgba(45, 140, 240, 0.18)";
            ctx.lineWidth = 1;
            for (let x = 32; x < w; x += 32) {
              ctx.beginPath();
              ctx.moveTo(x, 24);
              ctx.lineTo(x, 210);
              ctx.stroke();
            }
            for (let y = 32; y <= 210; y += 32) {
              ctx.beginPath();
              ctx.moveTo(24, y);
              ctx.lineTo(w - 24, y);
              ctx.stroke();
            }

            // Laser circuit paths (strictly in top quadrant)
            ctx.strokeStyle = "rgba(0, 225, 255, 0.9)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(36, 120);
            ctx.lineTo(190, 120);
            ctx.lineTo(230, 150);
            ctx.lineTo(476, 150);
            ctx.stroke();

            ctx.strokeStyle = "rgba(45, 160, 255, 0.8)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(36, 138);
            ctx.lineTo(140, 138);
            ctx.lineTo(170, 165);
            ctx.lineTo(390, 165);
            ctx.stroke();

            // Circuit nodes
            ctx.fillStyle = "#00f0ff";
            [[190, 120], [230, 150], [476, 150], [140, 138], [170, 165]].forEach(([cx, cy]) => {
              ctx.beginPath();
              ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
              ctx.fill();
            });

            // Engraved Typography
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 14px 'Courier New', monospace";
            ctx.fillText("QCERTIFY // QUANTUMHALON", 36, 62);

            ctx.fillStyle = "#00e5ff";
            ctx.font = "bold 11px 'Courier New', monospace";
            ctx.fillText("HYBRID PQC · ML-KEM-768", 36, 84);

            ctx.fillStyle = "rgba(190, 225, 255, 0.9)";
            ctx.font = "10px 'Courier New', monospace";
            ctx.fillText("STATUS: FAIL-CLOSED [ACTIVE]", 36, 192);

            // Technical Data Bar
            ctx.fillStyle = "rgba(0, 212, 255, 0.3)";
            ctx.fillRect(36, 204, 220, 4);
            ctx.fillStyle = "#00f0ff";
            ctx.fillRect(36, 204, 165, 4);

            const texture = new THREE.CanvasTexture(texCanvas);
            return texture;
          };

          // 3. Studio Reflection Environment Map
          const createStudioEnvironment = () => {
            const pmrem = new THREE.PMREMGenerator(renderer);
            const w = 512;
            const h = 256;
            const texCanvas = document.createElement("canvas");
            texCanvas.width = w;
            texCanvas.height = h;
            const ctx = texCanvas.getContext("2d");
            if (!ctx) return null;

            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, "#162842");
            grad.addColorStop(0.35, "#0a1322");
            grad.addColorStop(0.65, "#040810");
            grad.addColorStop(1, "#102038");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            const softGrad = ctx.createRadialGradient(w * 0.5, h * 0.18, 0, w * 0.5, h * 0.18, 80);
            softGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
            softGrad.addColorStop(0.4, "rgba(220, 240, 255, 0.85)");
            softGrad.addColorStop(1, "rgba(20, 50, 90, 0)");
            ctx.fillStyle = softGrad;
            ctx.fillRect(0, 0, w, h * 0.5);

            const cyanGrad = ctx.createLinearGradient(w * 0.08, 0, w * 0.24, 0);
            cyanGrad.addColorStop(0, "rgba(0, 212, 255, 0)");
            cyanGrad.addColorStop(0.5, "rgba(0, 212, 255, 0.95)");
            cyanGrad.addColorStop(1, "rgba(0, 212, 255, 0)");
            ctx.fillStyle = cyanGrad;
            ctx.fillRect(w * 0.08, h * 0.1, w * 0.16, h * 0.8);

            const blueGrad = ctx.createLinearGradient(w * 0.76, 0, w * 0.94, 0);
            blueGrad.addColorStop(0, "rgba(26, 117, 255, 0)");
            blueGrad.addColorStop(0.5, "rgba(26, 117, 255, 0.85)");
            blueGrad.addColorStop(1, "rgba(26, 117, 255, 0)");
            ctx.fillStyle = blueGrad;
            ctx.fillRect(w * 0.76, h * 0.1, w * 0.18, h * 0.8);

            const canvasTex = new THREE.CanvasTexture(texCanvas);
            canvasTex.mapping = THREE.EquirectangularReflectionMapping;
            const envTexture = pmrem.fromEquirectangular(canvasTex).texture;
            canvasTex.dispose();
            pmrem.dispose();
            return envTexture;
          };

          const envMap = createStudioEnvironment();
          if (envMap) scene.environment = envMap;

          const brushedMap = createBrushedMetalTexture();
          const faceplateMap = createFaceplateTexture();

          // ─── MASTER 3D LOCK ASSEMBLY ───
          const root = new THREE.Group();
          root.position.set(0.45, 0.28, 0);
          root.rotation.set(-0.14, 0.32, 0.02);
          scene.add(root);

          const lockGroup = new THREE.Group();
          lockGroup.scale.setScalar(0.92);
          root.add(lockGroup);

          // ── 1. Chamfered Padlock Solid Body ──
          const bw = 1.9;
          const bh = 2.05;
          const rad = 0.28;
          const shape = new THREE.Shape();
          shape.moveTo(-bw / 2 + rad, -bh / 2);
          shape.lineTo(bw / 2 - rad, -bh / 2);
          shape.absarc(bw / 2 - rad, -bh / 2 + rad, rad, -Math.PI / 2, 0, false);
          shape.lineTo(bw / 2, bh / 2 - rad);
          shape.absarc(bw / 2 - rad, bh / 2 - rad, rad, 0, Math.PI / 2, false);
          shape.lineTo(-bw / 2 + rad, bh / 2);
          shape.absarc(-bw / 2 + rad, bh / 2 - rad, rad, Math.PI / 2, Math.PI, false);
          shape.lineTo(-bw / 2, -bh / 2 + rad);
          shape.absarc(-bw / 2 + rad, -bh / 2 + rad, rad, Math.PI, (Math.PI * 3) / 2, false);

          const extrudeSettings = {
            depth: 0.58,
            bevelEnabled: true,
            bevelSegments: 16,
            steps: 1,
            bevelSize: 0.1,
            bevelThickness: 0.1,
            curveSegments: 32,
          };

          const bodyGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          bodyGeom.center();

          const bodyMat = new THREE.MeshPhysicalMaterial({
            color: 0x0c1a2e,
            metalness: 0.94,
            roughness: 0.2,
            bumpMap: brushedMap ?? undefined,
            bumpScale: 0.015,
            clearcoat: 0.5,
            clearcoatRoughness: 0.12,
            envMapIntensity: 2.0,
          });

          const lockBody = new THREE.Mesh(bodyGeom, bodyMat);
          lockBody.position.set(0, -0.32, 0);
          lockGroup.add(lockBody);

          // ── 2. Laser-Engraved Front Inset Plate ──
          const pw = 1.62;
          const ph = 1.76;
          const prad = 0.18;
          const plateShape = new THREE.Shape();
          plateShape.moveTo(-pw / 2 + prad, -ph / 2);
          plateShape.lineTo(pw / 2 - prad, -ph / 2);
          plateShape.absarc(pw / 2 - prad, -ph / 2 + prad, prad, -Math.PI / 2, 0, false);
          plateShape.lineTo(pw / 2, ph / 2 - prad);
          plateShape.absarc(pw / 2 - prad, ph / 2 - prad, prad, 0, Math.PI / 2, false);
          plateShape.lineTo(-pw / 2 + prad, ph / 2);
          plateShape.absarc(-pw / 2 + prad, ph / 2 - prad, prad, Math.PI / 2, Math.PI, false);
          plateShape.lineTo(-pw / 2, -ph / 2 + prad);
          plateShape.absarc(-pw / 2 + prad, -ph / 2 + prad, prad, Math.PI, (Math.PI * 3) / 2, false);

          const plateGeom = new THREE.ExtrudeGeometry(plateShape, {
            depth: 0.04,
            bevelEnabled: true,
            bevelSegments: 8,
            bevelSize: 0.03,
            bevelThickness: 0.03,
            curveSegments: 24,
          });
          plateGeom.center();

          const plateMat = new THREE.MeshPhysicalMaterial({
            color: 0x0c1e34,
            roughness: 0.14,
            metalness: 0.9,
            clearcoat: 0.65,
            clearcoatRoughness: 0.08,
            envMapIntensity: 1.8,
          });

          const frontPlate = new THREE.Mesh(plateGeom, plateMat);
          frontPlate.position.set(0, -0.32, 0.41);
          lockGroup.add(frontPlate);

          // Precision Laser Graphic Overlay
          const graphicGeom = new THREE.PlaneGeometry(1.48, 1.6);
          const graphicMat = new THREE.MeshBasicMaterial({
            map: faceplateMap ?? undefined,
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
          });
          const graphicMesh = new THREE.Mesh(graphicGeom, graphicMat);
          graphicMesh.position.set(0, -0.32, 0.465);
          lockGroup.add(graphicMesh);

          // ── 3. Shackle Collar Wells ──
          const collarMat = new THREE.MeshStandardMaterial({
            color: 0x050e1c,
            metalness: 0.95,
            roughness: 0.25,
          });
          const collarRingMat = new THREE.MeshStandardMaterial({
            color: 0x00d4ff,
            emissive: 0x0088cc,
            emissiveIntensity: 0.8,
            metalness: 0.95,
            roughness: 0.1,
          });

          [-0.56, 0.56].forEach((xPos) => {
            const well = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.12, 32), collarMat);
            well.position.set(xPos, 0.74, 0);
            lockGroup.add(well);

            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.02, 16, 32), collarRingMat);
            ring.rotation.x = Math.PI / 2;
            ring.position.set(xPos, 0.79, 0);
            lockGroup.add(ring);
          });

          // ── 4. Heavy-Duty Hardened Chrome Shackle ──
          const shackleMat = new THREE.MeshPhysicalMaterial({
            color: 0xf6faff,
            metalness: 0.99,
            roughness: 0.03,
            clearcoat: 0.98,
            clearcoatRoughness: 0.02,
            envMapIntensity: 3.2,
          });

          const shackleArchGeom = new THREE.TorusGeometry(0.56, 0.17, 32, 64, Math.PI);
          const shackleArch = new THREE.Mesh(shackleArchGeom, shackleMat);
          shackleArch.position.set(0, 0.74, 0);
          lockGroup.add(shackleArch);

          const legGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.68, 32);
          const leftLeg = new THREE.Mesh(legGeom, shackleMat);
          leftLeg.position.set(-0.56, 0.74 - 0.34, 0);
          lockGroup.add(leftLeg);

          const rightLeg = new THREE.Mesh(legGeom, shackleMat);
          rightLeg.position.set(0.56, 0.74 - 0.34, 0);
          lockGroup.add(rightLeg);

          const notchGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.12, 32);
          const notchMat = new THREE.MeshStandardMaterial({
            color: 0x050c18,
            metalness: 0.9,
            roughness: 0.4,
          });
          const notch = new THREE.Mesh(notchGeom, notchMat);
          notch.position.set(0.56, 0.52, 0);
          lockGroup.add(notch);

          // ── 5. Mechanical Padlock Core & Precision Keyway (Clean, Solid, Stationary) ──
          // Beveled Cylinder Plug Housing
          const coreHousingGeom = new THREE.CylinderGeometry(0.34, 0.36, 0.05, 48);
          const coreHousingMat = new THREE.MeshPhysicalMaterial({
            color: 0x081528,
            metalness: 0.96,
            roughness: 0.15,
            clearcoat: 0.6,
            envMapIntensity: 2.0,
          });
          const coreHousing = new THREE.Mesh(coreHousingGeom, coreHousingMat);
          coreHousing.rotation.x = Math.PI / 2;
          coreHousing.position.set(0, -0.62, 0.44);
          lockGroup.add(coreHousing);

          // Subtle Outer Collar Ring
          const collarBevel = new THREE.Mesh(
            new THREE.TorusGeometry(0.34, 0.01, 16, 48),
            new THREE.MeshStandardMaterial({
              color: 0x2288ff,
              metalness: 0.95,
              roughness: 0.1,
              emissive: 0x0044aa,
              emissiveIntensity: 0.5,
            }),
          );
          collarBevel.position.set(0, -0.62, 0.47);
          lockGroup.add(collarBevel);

          // Inner Keyway Core Face
          const coreFaceGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.02, 36);
          const coreFaceMat = new THREE.MeshPhysicalMaterial({
            color: 0x0d2038,
            metalness: 0.92,
            roughness: 0.2,
            clearcoat: 0.4,
          });
          const coreFace = new THREE.Mesh(coreFaceGeom, coreFaceMat);
          coreFace.rotation.x = Math.PI / 2;
          coreFace.position.set(0, -0.62, 0.47);
          lockGroup.add(coreFace);

          // Deep Precision Key Slot
          const keyUpper = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 0.03, 24),
            new THREE.MeshBasicMaterial({ color: 0x010308 }),
          );
          keyUpper.rotation.x = Math.PI / 2;
          keyUpper.position.set(0, -0.57, 0.485);
          lockGroup.add(keyUpper);

          const keySlot = new THREE.Mesh(
            new THREE.BoxGeometry(0.032, 0.14, 0.03),
            new THREE.MeshBasicMaterial({ color: 0x010308 }),
          );
          keySlot.position.set(0, -0.64, 0.485);
          lockGroup.add(keySlot);

          // Subtle Cyan Internal Security Laser Glow
          const keyGlow = new THREE.Mesh(
            new THREE.BoxGeometry(0.012, 0.08, 0.01),
            new THREE.MeshBasicMaterial({ color: 0x00e5ff }),
          );
          keyGlow.position.set(0, -0.64, 0.49);
          lockGroup.add(keyGlow);

          // ── 6. Sapphire Optical Status Indicator ──
          const jewelGeom = new THREE.SphereGeometry(0.045, 24, 24);
          const jewelMat = new THREE.MeshPhysicalMaterial({
            color: 0x00f0ff,
            emissive: 0x0088cc,
            emissiveIntensity: 0.9,
            roughness: 0.05,
            metalness: 0.1,
            transmission: 0.8,
            thickness: 0.3,
            ior: 1.77,
          });
          const statusJewel = new THREE.Mesh(jewelGeom, jewelMat);
          statusJewel.position.set(0.64, 0.38, 0.44);
          lockGroup.add(statusJewel);

          // ── 7. Soft Ground Contact Shadow & Blue Glow (Smooth natural fade, no clipping) ──
          const shadowCanvas = document.createElement("canvas");
          shadowCanvas.width = 512;
          shadowCanvas.height = 512;
          const sCtx = shadowCanvas.getContext("2d");
          if (sCtx) {
            const radGrad = sCtx.createRadialGradient(256, 256, 8, 256, 256, 175);
            radGrad.addColorStop(0, "rgba(0, 210, 255, 0.35)");
            radGrad.addColorStop(0.22, "rgba(45, 140, 240, 0.20)");
            radGrad.addColorStop(0.50, "rgba(20, 60, 160, 0.08)");
            radGrad.addColorStop(0.78, "rgba(5, 15, 45, 0.015)");
            radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
            sCtx.fillStyle = radGrad;
            sCtx.fillRect(0, 0, 512, 512);
          }
          const shadowTex = new THREE.CanvasTexture(shadowCanvas);
          const shadowPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(2.7, 2.7),
            new THREE.MeshBasicMaterial({
              map: shadowTex,
              transparent: true,
              opacity: 0.75,
              depthWrite: false,
            }),
          );
          shadowPlane.rotation.x = -Math.PI / 2;
          scene.add(shadowPlane);

          // ── 8. Floating Atmospheric Dust Motes ──
          const particleCount = 38;
          const partPositions = new Float32Array(particleCount * 3);
          for (let i = 0; i < particleCount; i++) {
            partPositions[i * 3] = (Math.random() - 0.5) * 3.4;
            partPositions[i * 3 + 1] = (Math.random() - 0.5) * 3.8;
            partPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
          }
          const partGeom = new THREE.BufferGeometry();
          partGeom.setAttribute("position", new THREE.BufferAttribute(partPositions, 3));
          const particles = new THREE.Points(
            partGeom,
            new THREE.PointsMaterial({
              color: 0x70c0ff,
              size: 0.035,
              transparent: true,
              opacity: 0.45,
              sizeAttenuation: true,
            }),
          );
          scene.add(particles);

          // ─── REFINED BALANCED STUDIO LIGHTS ───
          scene.add(new THREE.AmbientLight(0x182a44, 1.7));

          // Direct Crisp Front Key Light (Angled from upper right)
          const frontKey = new THREE.DirectionalLight(0xffffff, 4.0);
          frontKey.position.set(2.4, 2.2, 6.5);
          scene.add(frontKey);

          // Front-Left Soft Fill Light (Gentle side fill)
          const frontFill = new THREE.DirectionalLight(0xaad4ff, 2.5);
          frontFill.position.set(-2.8, 0.4, 5.5);
          scene.add(frontFill);

          // Top Specular Rim for Chrome Shackle
          const topRim = new THREE.DirectionalLight(0xffffff, 2.4);
          topRim.position.set(0.5, 5.5, 2.0);
          scene.add(topRim);

          // Electric Cyan Left Edge Rim (Side placement, reduced intensity)
          const cyanRim = new THREE.PointLight(0x00d4ff, 5.5, 16);
          cyanRim.position.set(-5.2, 0.9, 2.4);
          scene.add(cyanRim);

          // Royal Blue Rear/Right Rim (Side placement, reduced intensity)
          const blueRim = new THREE.PointLight(0x2288ff, 4.0, 14);
          blueRim.position.set(4.6, -1.0, -2.2);
          scene.add(blueRim);

          // Soft Under-Side Accent Light (Less intense, offset to side)
          const underFill = new THREE.PointLight(0x00d4ff, 2.2, 9);
          underFill.position.set(0, -1.95, 2.0);
          scene.add(underFill);

          // ─── RESIZE & INTERACTION ───
          let width = 0;
          let height = 0;

          const updateLayout = () => {
            const isMobile = window.innerWidth <= 960;
            const targetX = isMobile ? 0 : -0.16;
            const targetY = isMobile ? 0.24 : 0.22;
            root.position.set(targetX, targetY, 0);
            shadowPlane.position.set(targetX, isMobile ? -1.36 : -1.38, 0);
            underFill.position.set(targetX, isMobile ? -1.93 : -1.95, 2.0);
            lockGroup.scale.setScalar(isMobile ? 0.94 : 0.92);
            camera.fov = isMobile ? 30 : 28;
            camera.updateProjectionMatrix();
          };

          const resize = () => {
            const box = host.getBoundingClientRect();
            width = Math.max(1, box.width);
            height = Math.max(1, box.height);
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            updateLayout();
          };
          resize();
          const resizeObserver = new ResizeObserver(resize);
          resizeObserver.observe(host);

          let pointerX = 0;
          let pointerY = 0;
          const onPointerMove = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            const box = host.getBoundingClientRect();
            pointerX = ((event.clientX - box.left) / box.width - 0.5) * 0.42;
            pointerY = ((event.clientY - box.top) / box.height - 0.5) * 0.28;
          };
          const onPointerLeave = () => {
            pointerX = 0;
            pointerY = 0;
          };
          host.addEventListener("pointermove", onPointerMove, { passive: true });
          host.addEventListener("pointerleave", onPointerLeave);

          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          let frame = 0;
          let last = performance.now();

          const draw = (now: number) => {
            const delta = Math.min((now - last) / 1000, 0.05);
            last = now;


            lockGroup.position.y = Math.sin(now * 0.0014) * 0.06;
            particles.rotation.y = now * 0.00003;

            renderer.render(scene, camera);
            if (!reduceMotion && !document.hidden) frame = requestAnimationFrame(draw);
          };

          frame = requestAnimationFrame(draw);
          setReady(true);

          const onVisibility = () => {
            cancelAnimationFrame(frame);
            if (!document.hidden && !reduceMotion) {
              last = performance.now();
              frame = requestAnimationFrame(draw);
            }
          };
          document.addEventListener("visibilitychange", onVisibility);

          disposeScene = () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            host.removeEventListener("pointermove", onPointerMove);
            host.removeEventListener("pointerleave", onPointerLeave);
            document.removeEventListener("visibilitychange", onVisibility);
            brushedMap?.dispose();
            faceplateMap?.dispose();
            envMap?.dispose();
            shadowTex.dispose();
            root.traverse((object) => {
              if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
                object.geometry.dispose();
                const material = object.material;
                if (Array.isArray(material)) material.forEach((item) => item.dispose());
                else material.dispose();
              }
            });
            renderer.dispose();
          };
        });
      },
      { rootMargin: "180px" },
    );

    observer.observe(host);
    return () => {
      cancelled = true;
      observer.disconnect();
      disposeScene?.();
    };
  }, []);

  return (
    <div ref={hostRef} className={styles.coreScene} data-ready={ready} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.coreCanvas} />
    </div>
  );
}
