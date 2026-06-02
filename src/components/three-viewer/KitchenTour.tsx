'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  useGLTF,
  Html,
  Bounds,
  PerspectiveCamera,
  ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Play, Pause, RotateCcw, ZoomIn, Move } from 'lucide-react';

const MODEL_PATH = '/models/adnan-mutfak.glb';

function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  scene.traverse((obj) => {
    const m = obj as THREE.Mesh;
    if (m.isMesh) {
      m.castShadow = true;
      m.receiveShadow = true;
    }
  });
  return <primitive object={scene} />;
}

function LoadingOverlay() {
  return (
    <Html center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.15)',
            borderTopColor: '#C8956C',
            animation: 'spin 0.9s linear infinite',
          }}
        />
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.02em' }}>
          Loading 3D tour…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

export default function KitchenTour() {
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const resetView = () => {
    controlsRef.current?.reset();
    setAutoRotate(true);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'min(80vh, 780px)',
        minHeight: 520,
        borderRadius: 28,
        overflow: 'hidden',
        background: '#0a0a0b',
        boxShadow: '0 24px 80px -30px rgba(0,0,0,0.45)',
      }}
    >
      <Canvas shadows gl={{ antialias: true, preserveDrawingBuffer: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[3, 2.2, 3.5]} fov={45} />
        <color attach="background" args={['#0f0f10']} />
        <fog attach="fog" args={['#0f0f10', 16, 44]} />

        <ambientLight intensity={0.35} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />
        <pointLight position={[-4, 3, -4]} intensity={0.3} />

        <Suspense fallback={<LoadingOverlay />}>
          <Bounds fit clip observe margin={1.3}>
            <Model />
          </Bounds>
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.45}
            scale={14}
            blur={2.5}
            far={6}
          />
          <Environment preset="apartment" />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan
          enableZoom
          enableRotate
          autoRotate={autoRotate}
          autoRotateSpeed={0.55}
          minDistance={1.2}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2 + 0.08}
        />
      </Canvas>

      {/* Top-left label */}
      <div
        style={{
          position: 'absolute',
          top: 22,
          left: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          color: '#FFFFFF',
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C8956C',
          }}
        >
          Interactive 3D Tour
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display, serif)',
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          Signature Kitchen
        </h3>
      </div>

      {/* Bottom controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 22,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 5,
        }}
      >
        <PillButton onClick={() => setAutoRotate((v) => !v)} active={autoRotate}>
          {autoRotate ? <Pause size={13} /> : <Play size={13} />}
          {autoRotate ? 'Pause' : 'Auto-rotate'}
        </PillButton>
        <PillButton onClick={resetView}>
          <RotateCcw size={13} /> Reset view
        </PillButton>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 11,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          <RotateCcw size={11} /> drag
          <span style={{ opacity: 0.3 }}>·</span>
          <ZoomIn size={11} /> scroll
          <span style={{ opacity: 0.3 }}>·</span>
          <Move size={11} /> right-drag
        </div>
      </div>
    </div>
  );
}

function PillButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 18px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.01em',
        cursor: 'pointer',
        border: '1px solid ' + (active ? 'transparent' : 'rgba(255,255,255,0.12)'),
        background: active ? '#B8824F' : 'rgba(20,20,22,0.72)',
        color: active ? '#FFFFFF' : 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        transition: 'all 0.25s ease',
      }}
    >
      {children}
    </button>
  );
}

useGLTF.preload(MODEL_PATH);
