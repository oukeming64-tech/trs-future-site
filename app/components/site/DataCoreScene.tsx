"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_LABELS = [
  { label: "DATA", sub: "数据", className: "scene-label--data" },
  { label: "KNOWLEDGE", sub: "知识", className: "scene-label--knowledge" },
  { label: "MODEL", sub: "模型", className: "scene-label--model" },
  { label: "AGENT", sub: "智能体", className: "scene-label--agent" },
];

function createSpherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const ringRadius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    positions[index * 3] = Math.cos(theta) * ringRadius * radius;
    positions[index * 3 + 1] = y * radius;
    positions[index * 3 + 2] = Math.sin(theta) * ringRadius * radius;
  }

  return positions;
}

export function DataCoreScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      mount.parentElement?.classList.add("is-fallback");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);

    const coreGeometry = new THREE.IcosahedronGeometry(1.16, 5);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4d7dff,
      emissive: 0x0b2f88,
      emissiveIntensity: 1.3,
      metalness: 0.25,
      roughness: 0.18,
      transparent: true,
      opacity: 0.8,
      transmission: 0.26,
      thickness: 1.4,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    world.add(core);

    const wireGeometry = new THREE.IcosahedronGeometry(1.42, 2);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x75e9ff,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    world.add(wire);

    const pointPositions = createSpherePoints(360, 2.22);
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(pointPositions, 3),
    );
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x87edff,
      size: 0.022,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.64,
      blending: THREE.AdditiveBlending,
    });
    const pointCloud = new THREE.Points(pointGeometry, pointMaterial);
    world.add(pointCloud);

    const linePositions: number[] = [];
    for (let index = 0; index < 72; index += 1) {
      const start = (index * 5) % 360;
      const end = (start + 11 + (index % 7)) % 360;
      linePositions.push(
        pointPositions[start * 3],
        pointPositions[start * 3 + 1],
        pointPositions[start * 3 + 2],
        pointPositions[end * 3],
        pointPositions[end * 3 + 1],
        pointPositions[end * 3 + 2],
      );
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4b83ff,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const network = new THREE.LineSegments(lineGeometry, lineMaterial);
    world.add(network);

    const rings = [
      { radius: 2.78, tube: 0.007, color: 0x65def5, rotation: [1.22, 0.18, 0.34] },
      { radius: 3.08, tube: 0.006, color: 0x5279ff, rotation: [0.38, 1.14, -0.2] },
      { radius: 3.36, tube: 0.005, color: 0xff8057, rotation: [1.58, 0.74, 0.12] },
    ].map((ring) => {
      const geometry = new THREE.TorusGeometry(ring.radius, ring.tube, 8, 220);
      const material = new THREE.MeshBasicMaterial({
        color: ring.color,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(...(ring.rotation as [number, number, number]));
      world.add(mesh);
      return mesh;
    });

    const satelliteGeometry = new THREE.SphereGeometry(0.055, 16, 16);
    const satellites = [
      { color: 0x5ee7ff, radius: 2.78, speed: 0.55, offset: 0.2 },
      { color: 0x7c9cff, radius: 3.08, speed: -0.38, offset: 2.2 },
      { color: 0xff8b5f, radius: 3.36, speed: 0.32, offset: 4.1 },
      { color: 0xa6f0bd, radius: 2.78, speed: -0.48, offset: 5.2 },
    ].map((item) => {
      const material = new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.95,
      });
      const mesh = new THREE.Mesh(satelliteGeometry, material);
      world.add(mesh);
      return { ...item, mesh };
    });

    const backgroundGeometry = new THREE.BufferGeometry();
    const backgroundPositions = new Float32Array(720 * 3);
    for (let index = 0; index < 720; index += 1) {
      const seed = Math.sin(index * 12.9898) * 43758.5453;
      const seed2 = Math.sin(index * 78.233) * 19283.112;
      const seed3 = Math.sin(index * 39.425) * 9384.221;
      backgroundPositions[index * 3] = ((seed - Math.floor(seed)) - 0.5) * 13;
      backgroundPositions[index * 3 + 1] =
        ((seed2 - Math.floor(seed2)) - 0.5) * 10;
      backgroundPositions[index * 3 + 2] =
        ((seed3 - Math.floor(seed3)) - 0.5) * 8 - 1;
    }
    backgroundGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(backgroundPositions, 3),
    );
    const backgroundMaterial = new THREE.PointsMaterial({
      color: 0x9edfff,
      size: 0.011,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
    });
    const background = new THREE.Points(
      backgroundGeometry,
      backgroundMaterial,
    );
    scene.add(background);

    const keyLight = new THREE.PointLight(0x65d9ff, 34, 22, 2);
    keyLight.position.set(3.4, 2.8, 4.5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xff774b, 22, 20, 2);
    rimLight.position.set(-3.8, -2.4, 3.2);
    scene.add(rimLight);
    scene.add(new THREE.AmbientLight(0x2b4d83, 1.5));

    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    let scrollTarget = 0;
    let scrollValue = 0;
    let visible = true;
    let frame = 0;
    let elapsed = 0;
    let previousTime = Date.now();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerTarget.set(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        -((event.clientY - rect.top) / rect.height - 0.5) * 2,
      );
    };

    const onPointerLeave = () => pointerTarget.set(0, 0);
    const onScroll = () => {
      scrollTarget = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.8);
    };

    const renderFrame = () => {
      const now = Date.now();
      elapsed += Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      pointer.lerp(pointerTarget, 0.045);
      scrollValue += (scrollTarget - scrollValue) * 0.045;

      world.rotation.y = elapsed * 0.075 + pointer.x * 0.18 + scrollValue * 0.24;
      world.rotation.x = -0.08 + pointer.y * 0.13 + scrollValue * 0.08;
      world.position.y = -scrollValue * 0.12;
      wire.rotation.y = -elapsed * 0.12;
      wire.rotation.z = elapsed * 0.06;
      pointCloud.rotation.y = elapsed * 0.032;
      network.rotation.y = -elapsed * 0.018;
      rings[0].rotation.z += 0.0007;
      rings[1].rotation.x -= 0.00045;
      rings[2].rotation.y += 0.00035;

      const pulse = 1 + Math.sin(elapsed * 1.15) * 0.022;
      core.scale.setScalar(pulse);
      coreMaterial.emissiveIntensity = 1.15 + Math.sin(elapsed * 1.4) * 0.22;

      satellites.forEach((satellite) => {
        const angle = elapsed * satellite.speed + satellite.offset;
        satellite.mesh.position.set(
          Math.cos(angle) * satellite.radius,
          Math.sin(angle * 0.73) * satellite.radius * 0.42,
          Math.sin(angle) * satellite.radius * 0.62,
        );
      });

      camera.position.x += (pointer.x * 0.36 - camera.position.x) * 0.035;
      camera.position.y += (pointer.y * 0.22 - camera.position.y) * 0.035;
      camera.lookAt(0, -scrollValue * 0.08, 0);
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(renderFrame);
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion && !frame) {
        previousTime = Date.now();
        frame = window.requestAnimationFrame(renderFrame);
      } else if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    resizeObserver.observe(mount);
    visibilityObserver.observe(mount);
    mount.addEventListener("pointermove", onPointerMove, { passive: true });
    mount.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();
    onScroll();

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      frame = window.requestAnimationFrame(renderFrame);
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.LineSegments
        ) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="data-core">
      <div className="data-core__canvas" ref={mountRef} />
      <div className="data-core__halo" aria-hidden="true" />
      <div className="data-core__axis" aria-hidden="true" />
      {NODE_LABELS.map((node) => (
        <div
          key={node.label}
          className={`scene-label ${node.className}`}
          aria-hidden="true"
        >
          <span>{node.label}</span>
          <small>{node.sub}</small>
        </div>
      ))}
      <div className="data-core__readout" aria-hidden="true">
        <span>SEMANTIC CORE</span>
        <strong>ONLINE</strong>
        <i />
      </div>
    </div>
  );
}
