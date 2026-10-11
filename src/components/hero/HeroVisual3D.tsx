import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface HeroVisual3DProps {
  className?: string;
}

const PAL = {
  dark: {
    cyan: 0x00f0ff,
    violet: 0xa855f7,
    indigo: 0x6366f1,
    fog: 0x010206,
    core: 0x080e1c,
    edgeBase: 0x1e294b,
    grid: 0x1e293b,
    sym: ['#38bdf8', '#c084fc', '#818cf8'],
  },
  light: {
    cyan: 0x0284c7,
    violet: 0x7c3aed,
    indigo: 0x4f46e5,
    fog: 0xf4f6fc,
    core: 0xdbeafe,
    edgeBase: 0x94a3b8,
    grid: 0xcfd6e6,
    sym: ['#0284c7', '#7c3aed', '#4f46e5'],
  },
};

/** Radial texture for nodes and flowing data pulses */
const makeDotTexture = (): THREE.CanvasTexture => {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  grad.addColorStop(0.5, 'rgba(0,240,255,0.4)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
};

export const HeroVisual3D: React.FC<HeroVisual3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = reduced ? 0.35 : 1;
    const isMobile = window.innerWidth < 768;
    let isLight = document.documentElement.classList.contains('light');

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const el = renderer.domElement;
    el.style.touchAction = 'pan-y';
    el.style.display = 'block';
    container.appendChild(el);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(PAL.dark.fog, 8, 26);
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    // --- Dynamic Atmospheric Lights ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const key = new THREE.DirectionalLight(0xe2e8f0, 1.8);
    key.position.set(5, 7, 5);

    const rimCyan = new THREE.DirectionalLight(PAL.dark.cyan, 2.0);
    rimCyan.position.set(-6, 3, -5);
    const rimViolet = new THREE.DirectionalLight(PAL.dark.violet, 2.0);
    rimViolet.position.set(6, -3, -5);

    const corePoint = new THREE.PointLight(PAL.dark.cyan, 10, 8, 2);
    scene.add(ambient, key, rimCyan, rimViolet, corePoint);

    // Floor shadow
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.ShadowMaterial({ opacity: 0.15 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.8;
    floor.receiveShadow = true;
    floor.visible = !isMobile;
    scene.add(floor);

    // Master Rig
    const rig = new THREE.Group();
    scene.add(rig);

    const dotTex = makeDotTexture();

    // ==========================================
    // 1. DUAL 3D COORDINATE PLANES & TENSOR GRIDS
    // ==========================================
    const gridGround = new THREE.GridHelper(5.2, 12, PAL.dark.cyan, PAL.dark.grid);
    gridGround.position.y = -2.1;
    (gridGround.material as THREE.LineBasicMaterial).transparent = true;
    (gridGround.material as THREE.LineBasicMaterial).opacity = 0.22;
    rig.add(gridGround);

    // Vertical Analytical Axis Frame
    const axisGroup = new THREE.Group();
    rig.add(axisGroup);
    const axisMat = new THREE.LineBasicMaterial({
      color: PAL.dark.cyan,
      transparent: true,
      opacity: 0.35,
    });
    const axisGeom = new THREE.BufferGeometry();
    const axisPts = new Float32Array([
      -2.4, -2.1, 0,  2.4, -2.1, 0,
      0, -2.1, -2.4,  0, -2.1, 2.4,
      0, -2.1, 0,     0, 2.3, 0,
    ]);
    axisGeom.setAttribute('position', new THREE.BufferAttribute(axisPts, 3));
    axisGroup.add(new THREE.LineSegments(axisGeom, axisMat));

    // ==========================================
    // 2. CENTRAL FACETED INTELLIGENCE CORE
    // ==========================================
    const coreGroup = new THREE.Group();
    rig.add(coreGroup);

    // Inner Glass Octahedron
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: PAL.dark.core,
      metalness: 0.88,
      roughness: 0.12,
      transmission: 0.5,
      thickness: 1.2,
      ior: 1.6,
      reflectivity: 0.9,
      clearcoat: 0.7,
    });
    const coreMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.95, 1), coreMat);
    coreMesh.castShadow = true;
    coreGroup.add(coreMesh);

    // Luminous inner geometric armature
    const innerLattice = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.72, 1)),
      new THREE.LineBasicMaterial({
        color: PAL.dark.cyan,
        transparent: true,
        opacity: 0.6,
      })
    );
    coreGroup.add(innerLattice);

    // ==========================================
    // ==========================================
    // 3. STRUCTURED DATA SCIENCE & AI ARCHITECTURE
    // ==========================================
    // Clean Feedforward Layer Manifolds (Feature Input -> Projection -> Latent Embedding -> Output Distribution)
    const layerConfigs = [
      { x: -2.2, height: 2.8, depth: 2.0, count: isMobile ? 8 : 16, name: 'input' },
      { x: -1.1, height: 3.4, depth: 2.6, count: isMobile ? 12 : 24, name: 'dense_1' },
      { x: 0.0, height: 3.8, depth: 3.0, count: isMobile ? 16 : 32, name: 'latent_core' },
      { x: 1.1, height: 3.4, depth: 2.6, count: isMobile ? 12 : 24, name: 'dense_2' },
      { x: 2.2, height: 2.6, depth: 1.8, count: isMobile ? 8 : 16, name: 'output' },
    ];

    interface NeuralNode {
      layerIdx: number;
      localU: number; // vertical -1 to 1
      localV: number; // depth -1 to 1
      layerX: number;
      worldPos: THREE.Vector3;
      colorType: 'white' | 'cyan' | 'violet';
    }

    const neuralNodes: NeuralNode[] = [];
    layerConfigs.forEach((cfg, lIdx) => {
      for (let i = 0; i < cfg.count; i++) {
        // Uniform grid-like planar arrangement per layer to eliminate messy sphere entanglements
        const u = ((i % 4) / 3 - 0.5) * 2;
        const v = (Math.floor(i / 4) / (cfg.count / 4 - 0.5) - 0.5) * 2;
        const colType: 'white' | 'cyan' | 'violet' =
          lIdx === 2 ? (i % 3 === 0 ? 'white' : 'cyan') : (lIdx % 2 === 0 ? 'cyan' : 'violet');

        neuralNodes.push({
          layerIdx: lIdx,
          localU: u,
          localV: v,
          layerX: cfg.x,
          worldPos: new THREE.Vector3(cfg.x, u * (cfg.height / 2), v * (cfg.depth / 2)),
          colorType: colType,
        });
      }
    });

    const totalNeuralNodes = neuralNodes.length;

    // Instanced Nodes
    const nodeGeom = new THREE.SphereGeometry(0.048, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nodeInstMesh = new THREE.InstancedMesh(nodeGeom, nodeMat, totalNeuralNodes);
    rig.add(nodeInstMesh);

    // Glowing Node Halos (Instanced Points)
    const haloPositions = new Float32Array(totalNeuralNodes * 3);
    const haloGeom = new THREE.BufferGeometry();
    haloGeom.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3));
    const haloMat = new THREE.PointsMaterial({
      color: PAL.dark.cyan,
      size: 0.35,
      map: dotTex,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const haloPoints = new THREE.Points(haloGeom, haloMat);
    rig.add(haloPoints);

    // Clean, structured synaptic pathways strictly between adjacent layers (No crossing spaghetti)
    const synapsePairs: [number, number][] = [];
    for (let i = 0; i < totalNeuralNodes; i++) {
      for (let j = 0; j < totalNeuralNodes; j++) {
        const nA = neuralNodes[i];
        const nB = neuralNodes[j];
        if (nB.layerIdx === nA.layerIdx + 1) {
          // Connect only topologically proximate nodes across layers to preserve clean visual channels
          const distUV = Math.hypot(nA.localU - nB.localU, nA.localV - nB.localV);
          if (distUV < 0.95) {
            synapsePairs.push([i, j]);
          }
        }
      }
    }

    const synapseLinePos = new Float32Array(synapsePairs.length * 6);
    const synapseGeom = new THREE.BufferGeometry();
    synapseGeom.setAttribute('position', new THREE.BufferAttribute(synapseLinePos, 3));
    const synapseMat = new THREE.LineBasicMaterial({
      color: PAL.dark.cyan,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const synapseLines = new THREE.LineSegments(synapseGeom, synapseMat);
    rig.add(synapseLines);

    // Flowing Data Stream Packets across the Synaptic Highway
    const pulseCount = isMobile ? 16 : 36;
    const pulses = Array.from({ length: pulseCount }, () => ({
      pairIdx: Math.floor(Math.random() * Math.max(1, synapsePairs.length)),
      t: Math.random(),
      speed: 0.8 + Math.random() * 0.9,
    }));
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulseGeom = new THREE.BufferGeometry();
    pulseGeom.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.22,
      map: dotTex,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulsePoints = new THREE.Points(pulseGeom, pulseMat);
    rig.add(pulsePoints);

    // ==========================================
    // 4. FLOATING 3D DATA SCIENCE SCATTER (Latent Feature Clusters)
    // ==========================================
    // Two distinct Gaussian clusters representing dimensionality reduction (e.g. t-SNE / PCA / k-Means)
    const cluster1Count = isMobile ? 25 : 55;
    const cluster2Count = isMobile ? 25 : 55;
    const totalScatterCount = cluster1Count + cluster2Count;
    const scatterPositions = new Float32Array(totalScatterCount * 3);
    
    const scatterBase = [
      ...Array.from({ length: cluster1Count }, () => ({
        cx: -1.3, cy: 1.1, cz: -0.8,
        ox: (Math.random() - 0.5) * 1.2,
        oy: (Math.random() - 0.5) * 1.0,
        oz: (Math.random() - 0.5) * 1.2,
        phase: Math.random() * Math.PI * 2,
      })),
      ...Array.from({ length: cluster2Count }, () => ({
        cx: 1.4, cy: -1.0, cz: 0.9,
        ox: (Math.random() - 0.5) * 1.3,
        oy: (Math.random() - 0.5) * 1.1,
        oz: (Math.random() - 0.5) * 1.3,
        phase: Math.random() * Math.PI * 2,
      })),
    ];

    const scatterGeom = new THREE.BufferGeometry();
    scatterGeom.setAttribute('position', new THREE.BufferAttribute(scatterPositions, 3));
    const scatterMat = new THREE.PointsMaterial({
      color: PAL.dark.violet,
      size: 0.16,
      map: dotTex,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const scatterPoints = new THREE.Points(scatterGeom, scatterMat);
    rig.add(scatterPoints);

    // Mathematical Loss / Optimization Convergence Curve in 3D space
    const curvePointsCount = 42;
    const curvePositions = new Float32Array(curvePointsCount * 3);
    for (let k = 0; k < curvePointsCount; k++) {
      const u = k / (curvePointsCount - 1);
      const cx = -2.4 + u * 4.8;
      const cy = Math.exp(-u * 2.5) * 1.6 - 0.6;
      const cz = Math.sin(u * Math.PI * 2) * 0.45;
      curvePositions.set([cx, cy, cz], k * 3);
    }
    const curveGeom = new THREE.BufferGeometry();
    curveGeom.setAttribute('position', new THREE.BufferAttribute(curvePositions, 3));
    const curveMat = new THREE.LineBasicMaterial({
      color: PAL.dark.cyan,
      transparent: true,
      opacity: 0.55,
    });
    const curveLine = new THREE.Line(curveGeom, curveMat);
    rig.add(curveLine);

    // ==========================================
    // 5. TECHNICAL ANNOTATIONS & TELEMETRY LABELS
    // ==========================================
    const labels: {
      sprite: THREE.Sprite;
      canvas: HTMLCanvasElement;
      tex: THREE.CanvasTexture;
      text: string;
      colorIdx: number;
      basePos: THREE.Vector3;
      phase: number;
    }[] = [];

    const drawLabel = (cv: HTMLCanvasElement, str: string, color: string) => {
      const g = cv.getContext('2d')!;
      g.clearRect(0, 0, 160, 64);
      g.fillStyle = color;
      g.font = 'bold 26px "JetBrains Mono", monospace';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.shadowColor = color;
      g.shadowBlur = 8;
      g.fillText(str, 80, 32);
    };

    if (!isMobile) {
      const labelDefs: [string, [number, number, number]][] = [
        ['NEURAL CORE', [-2.8, 1.6, 0.4]],
        ['LATENT MANIFOLD', [2.9, 1.4, -0.4]],
        ['ATTENTION ⇄ TENSOR', [2.7, -1.5, 0.5]],
        ['∇θ LOSS CONV', [-2.6, -1.4, 0.6]],
        ['MULTI-MODAL', [0.3, 2.4, -0.5]],
      ];

      labelDefs.forEach(([str, pos], i) => {
        const cv = document.createElement('canvas');
        cv.width = 160;
        cv.height = 64;
        const tex = new THREE.CanvasTexture(cv);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity: 0.65,
            depthWrite: false,
          })
        );
        sprite.scale.set(0.7, 0.28, 1);
        sprite.position.set(...pos);
        rig.add(sprite);

        labels.push({
          sprite,
          canvas: cv,
          tex,
          text: str,
          colorIdx: i % 3,
          basePos: new THREE.Vector3(...pos),
          phase: i * 1.3,
        });
      });
    }

    // ==========================================
    // THEME HANDLING (Dark <-> Light)
    // ==========================================
    const applyTheme = () => {
      const P = isLight ? PAL.light : PAL.dark;
      (scene.fog as THREE.Fog).color.setHex(P.fog);
      ambient.intensity = isLight ? 0.95 : 0.4;
      key.intensity = isLight ? 2.2 : 1.8;
      rimCyan.color.setHex(P.cyan);
      rimViolet.color.setHex(P.violet);
      corePoint.color.setHex(P.cyan);
      corePoint.intensity = isLight ? 5 : 10;

      (floor.material as THREE.ShadowMaterial).opacity = isLight ? 0.14 : 0.15;
      coreMat.color.setHex(P.core);
      (innerLattice.material as THREE.LineBasicMaterial).color.setHex(P.cyan);
      synapseMat.color.setHex(P.cyan);
      synapseMat.opacity = isLight ? 0.4 : 0.22;
      haloMat.color.setHex(P.cyan);
      pulseMat.color.setHex(isLight ? P.violet : 0xffffff);
      scatterMat.color.setHex(P.violet);
      curveMat.color.setHex(P.cyan);
      (gridGround.material as THREE.LineBasicMaterial).color.setHex(P.grid);
      axisMat.color.setHex(P.cyan);

      labels.forEach((l) => {
        drawLabel(l.canvas, l.text, P.sym[l.colorIdx]);
        l.tex.needsUpdate = true;
      });
    };
    applyTheme();

    const themeObserver = new MutationObserver(() => {
      const nowLight = document.documentElement.classList.contains('light');
      if (nowLight !== isLight) {
        isLight = nowLight;
        applyTheme();
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // ==========================================
    // DYNAMIC SIZING (Massive Hero Scale)
    // ==========================================
    const handleResize = () => {
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 500;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      const fovRad = THREE.MathUtils.degToRad(camera.fov / 2);
      // Bring camera closer to maximize presence (approx 50% hero zone)
      const targetDist = isMobile ? 4.4 : 4.1;
      camera.position.z = Math.max(targetDist / Math.tan(fovRad), targetDist / (Math.tan(fovRad) * camera.aspect));
      camera.updateProjectionMatrix();
    };
    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // ==========================================
    // POINTER & DRAG INTERACTION
    // ==========================================
    let targetX = 0, targetY = 0, mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (reduced) return;
      const r = container.getBoundingClientRect();
      targetX = THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2), -1, 1);
      targetY = THREE.MathUtils.clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2), -1, 1);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let dragging = false, lastX = 0, lastY = 0, dragRotY = 0, dragRotX = 0, velRotY = 0, velRotX = 0;
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      velRotY = (e.clientX - lastX) * 0.007;
      velRotX = (e.clientY - lastY) * 0.007;
      dragRotY += velRotY;
      dragRotX += velRotX;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = () => { dragging = false; };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);

    let isVisible = true;
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    io.observe(container);

    // ==========================================
    // RENDER LOOP & MULTI-LAYER KINEMATICS
    // ==========================================
    const clock = new THREE.Clock();
    let time = 0;
    let animId = 0;
    const dummyMat = new THREE.Matrix4();
    const dummyVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!isVisible || document.hidden) return;

      time += dt * speed;

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!dragging) {
        dragRotY += velRotY;
        dragRotX += velRotX;
        velRotY *= 0.94;
        velRotX *= 0.94;
        dragRotY *= 0.985;
        dragRotX *= 0.985;
      }
      dragRotY = THREE.MathUtils.clamp(dragRotY, -1.3, 1.3);
      dragRotX = THREE.MathUtils.clamp(dragRotX, -0.7, 0.7);

      // Master Rig dynamic articulation
      rig.rotation.y = time * 0.12 + mouseX * 0.35 + dragRotY;
      rig.rotation.x = Math.sin(time * 0.22) * 0.07 + mouseY * 0.22 + dragRotX;
      rig.position.y = Math.sin(time * 0.75) * 0.06;

      camera.position.x = mouseX * 0.25;
      camera.position.y = 0.35 - mouseY * 0.18;
      camera.lookAt(0, 0, 0);

      // 1. Intelligence Core breathing & counter-twist
      const breath = 1 + Math.sin(time * 1.5) * 0.05;
      coreGroup.scale.set(breath, breath, breath);
      coreMesh.rotation.y = -time * 0.2;
      coreMesh.rotation.x = Math.sin(time * 0.3) * 0.15;
      innerLattice.rotation.y = time * 0.3;

      // 2. Structured Feedforward Neural Manifold Nodes Dynamics
      neuralNodes.forEach((node, idx) => {
        const cfg = layerConfigs[node.layerIdx];
        const curY = node.localU * (cfg.height / 2) + Math.sin(time * 1.1 + node.localU * 2.5 + node.layerIdx) * 0.12;
        const curZ = node.localV * (cfg.depth / 2) + Math.cos(time * 0.9 + node.localV * 2.5 + node.layerIdx) * 0.12;

        node.worldPos.set(node.layerX, curY, curZ);

        dummyMat.setPosition(node.worldPos);
        nodeInstMesh.setMatrixAt(idx, dummyMat);
        haloPositions.set([node.worldPos.x, node.worldPos.y, node.worldPos.z], idx * 3);
      });
      nodeInstMesh.instanceMatrix.needsUpdate = true;
      haloGeom.attributes.position.needsUpdate = true;

      // Pulse halomaterial opacity
      haloMat.opacity = (isLight ? 0.45 : 0.65) + Math.sin(time * 1.6) * 0.18;

      // 3. Synaptic Conduit Lines Update
      synapsePairs.forEach(([i, j], pIdx) => {
        const posA = neuralNodes[i].worldPos;
        const posB = neuralNodes[j].worldPos;
        synapseLinePos.set([posA.x, posA.y, posA.z, posB.x, posB.y, posB.z], pIdx * 6);
      });
      synapseGeom.attributes.position.needsUpdate = true;

      // 4. Data Propagation Pulses
      pulses.forEach((p, idx) => {
        p.t += dt * speed * p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.pairIdx = Math.floor(Math.random() * synapsePairs.length);
        }
        const [nA, nB] = synapsePairs[p.pairIdx];
        dummyVec.lerpVectors(neuralNodes[nA].worldPos, neuralNodes[nB].worldPos, p.t);
        pulsePositions.set([dummyVec.x, dummyVec.y, dummyVec.z], idx * 3);
      });
      pulseGeom.attributes.position.needsUpdate = true;

      // 5. 3D Latent Scatter Clusters Motion
      scatterBase.forEach((sb, idx) => {
        const px = sb.cx + sb.ox + Math.sin(time * 0.75 + sb.phase) * 0.08;
        const py = sb.cy + sb.oy + Math.cos(time * 0.85 + sb.phase) * 0.08;
        const pz = sb.cz + sb.oz + Math.sin(time * 0.65 + sb.phase) * 0.08;
        scatterPositions.set([px, py, pz], idx * 3);
      });
      scatterGeom.attributes.position.needsUpdate = true;

      // 6. Floating Labels
      labels.forEach((l) => {
        l.sprite.position.y = l.basePos.y + Math.sin(time * 0.85 + l.phase) * 0.08;
        l.sprite.position.x = l.basePos.x + Math.cos(time * 0.55 + l.phase) * 0.05;
        (l.sprite.material as THREE.SpriteMaterial).opacity = 0.5 + 0.2 * Math.sin(time * 1.2 + l.phase);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);

      if (container.contains(el)) {
        container.removeChild(el);
      }

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });

      labels.forEach((l) => l.tex.dispose());
      dotTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full flex items-center justify-center ${
        className || 'h-[440px] sm:h-[540px] lg:h-[640px]'
      }`}
    >
      {/* Subtle atmospheric backdrop: zero flat oversaturated glow */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl pointer-events-none scale-105" />

      {hasWebGL ? (
        <div
          ref={mountRef}
          className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
          aria-label="Interactive 3D Neural Network Architecture"
          role="img"
        />
      ) : (
        <div className="relative w-80 h-80 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: '28s' }} />
          <div className="w-32 h-32 rounded-2xl bg-[#080e1c] border border-white/10 flex items-center justify-center">
            <span className="font-mono text-sm font-bold text-cyan-400">AI // DATA</span>
          </div>
        </div>
      )}
    </div>
  );
};
