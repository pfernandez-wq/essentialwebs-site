"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { MODULES, type ModuleId } from "@/lib/site";

const ACTIVE_COLOR = new THREE.Color("#ffc72c");
const IDLE_COLOR = new THREE.Color("#b9c3da");
const SIZE = 1.3;
const GAP = 1.42;

// Where idle blocks drift, around the assembled piece.
const IDLE_SPOTS: [number, number, number][] = [
  [-3.6, 2.1, -1.5],
  [3.7, 1.8, -2],
  [-3.9, -1.9, -1],
  [3.4, -2.2, -1.2],
  [0.2, 3.1, -2.6],
  [-0.4, -3.2, -2.2],
];

function assembledSpot(index: number, count: number): [number, number, number] {
  const cols = count <= 2 ? count : count === 4 ? 2 : 3;
  const rows = Math.ceil(count / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);
  const inRow = row === rows - 1 ? count - row * cols : cols;
  return [(col - (inRow - 1) / 2) * GAP, ((rows - 1) / 2 - row) * GAP, 0];
}

function Block({
  target,
  active,
  seed,
  still,
}: {
  target: [number, number, number];
  active: boolean;
  seed: number;
  still: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  // Start far away so the first render flies in.
  const start = useMemo<[number, number, number]>(
    () => (still ? target : [target[0] * 3, target[1] * 3, -14]),
    // Only the initial position matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m || !material.current) return;
    const t = state.clock.elapsedTime;
    const bob = still || active ? 0 : Math.sin(t * 0.8 + seed) * 0.25;
    const k = still ? 1 : 1 - Math.pow(0.02, delta);
    m.position.x += (target[0] - m.position.x) * k;
    m.position.y += (target[1] + bob - m.position.y) * k;
    m.position.z += (target[2] - m.position.z) * k;
    if (!still && !active) {
      m.rotation.x += delta * 0.15;
      m.rotation.y += delta * 0.2;
    } else {
      m.rotation.x += (0 - m.rotation.x) * k;
      m.rotation.y += (0 - m.rotation.y) * k;
    }
    material.current.color.lerp(active ? ACTIVE_COLOR : IDLE_COLOR, still ? 1 : k);
  });

  return (
    <RoundedBox ref={mesh} args={[SIZE, SIZE, SIZE]} radius={0.16} smoothness={4} position={start}>
      <meshStandardMaterial ref={material} roughness={0.45} metalness={0.05} />
    </RoundedBox>
  );
}

function Blocks({ active, still }: { active: Set<ModuleId>; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const activeIds = MODULES.filter((m) => active.has(m.id)).map((m) => m.id);
  // Pull idle blocks inward on narrow canvases so they stay in frame.
  const { viewport } = useThree();
  const spread = Math.min(1, (viewport.width / 2 - SIZE) / 3.9);
  const lift = Math.min(1, (viewport.height / 2 - SIZE) / 3.2);

  useFrame((state, delta) => {
    if (!group.current || still) return;
    const k = 1 - Math.pow(0.05, delta);
    group.current.rotation.y += (state.pointer.x * 0.35 - group.current.rotation.y) * k;
    group.current.rotation.x += (-state.pointer.y * 0.2 - group.current.rotation.x) * k;
  });

  return (
    <group ref={group}>
      {MODULES.map((m, i) => {
        const isActive = active.has(m.id);
        const idle = IDLE_SPOTS[i % IDLE_SPOTS.length];
        const target: [number, number, number] = isActive
          ? assembledSpot(activeIds.indexOf(m.id), activeIds.length)
          : [idle[0] * spread, idle[1] * lift, idle[2]];
        return <Block key={m.id} target={target} active={isActive} seed={i * 1.7} still={still} />;
      })}
    </group>
  );
}

export default function HeroScene({ active }: { active: Set<ModuleId> }) {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 8]} intensity={1.6} />
      <directionalLight position={[-6, -2, 4]} intensity={0.4} />
      <Blocks active={active} still={still} />
    </Canvas>
  );
}
