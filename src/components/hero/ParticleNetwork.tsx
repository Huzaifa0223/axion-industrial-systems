"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count: number;
  linkDistance: number;
}

function ParticlesScene({ count, linkDistance }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Initialize random particle positions and velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    return [pos, vel];
  }, [count]);

  const maxLines = count * 6;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Update positions
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce off boundaries
      if (Math.abs(pos[i * 3]) > 8) velocities[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 3) velocities[i * 3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Connect close points
    let lineIndex = 0;
    const linePos = linesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < linkDistance * linkDistance && lineIndex < maxLines) {
          linePos[lineIndex * 6] = pos[i * 3];
          linePos[lineIndex * 6 + 1] = pos[i * 3 + 1];
          linePos[lineIndex * 6 + 2] = pos[i * 3 + 2];

          linePos[lineIndex * 6 + 3] = pos[j * 3];
          linePos[lineIndex * 6 + 4] = pos[j * 3 + 1];
          linePos[lineIndex * 6 + 5] = pos[j * 3 + 2];

          lineIndex++;
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;

    // Parallax mouse tilt
    pointsRef.current.rotation.y = mouse.current.x * 0.15;
    pointsRef.current.rotation.x = -mouse.current.y * 0.15;
    linesRef.current.rotation.y = mouse.current.x * 0.15;
    linesRef.current.rotation.x = -mouse.current.y * 0.15;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#00C2FF"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#5B4BFF"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

export function ParticleNetwork() {
  const [nodeCount, setNodeCount] = useState(120);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNodeCount(window.innerWidth < 768 ? 50 : 140);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10 opacity-75"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        frameloop={isIntersecting ? "always" : "demand"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <ParticlesScene count={nodeCount} linkDistance={1.4} />
      </Canvas>
    </div>
  );
}
