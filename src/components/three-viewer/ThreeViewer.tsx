'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  useGLTF,
  Html,
  Bounds,
  PerspectiveCamera,
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { X, RotateCcw, ZoomIn, Move, Play, Pause, Maximize2, Camera, MapPin } from 'lucide-react';

interface ThreeViewerProps {
  modelPath: string;
  apartmentName: string;
  onClose: () => void;
}

type ViewPreset = 'overview' | 'corner' | 'top' | 'interior';

const HOTSPOTS: Array<{
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
}> = [
  { id: 'bed', label: 'Master Bedroom', description: 'King-size bed, natural light, quiet orientation.', position: [0, 1.4, 0] },
  { id: 'desk', label: 'Workspace', description: 'Dedicated area for remote work or study.', position: [1.8, 1, -0.8] },
  { id: 'window', label: 'Floor-to-ceiling Window', description: 'Panoramic views with triple-glazed glass.', position: [-1.8, 1.6, -1.2] },
];

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);
  return <primitive object={scene} />;
}

function Hotspot({ label, description, position, visible }: { label: string; description: string; position: [number, number, number]; visible: boolean }) {
  const [open, setOpen] = useState(false);
  if (!visible) return null;
  return (
    <Html position={position} center distanceFactor={8} zIndexRange={[50, 0]}>
      <div style={{ pointerEvents: 'auto' }}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-center rounded-full"
          style={{
            width: 28,
            height: 28,
            background: open ? '#C8956C' : 'rgba(255,255,255,0.95)',
            color: open ? '#fff' : '#C8956C',
            border: '2px solid #C8956C',
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
            cursor: 'pointer',
          }}
        >
          <MapPin size={14} />
        </button>
        {open && (
          <div
            className="absolute left-1/2 -translate-x-1/2 mt-2 rounded-xl px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.98)', minWidth: 200, boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}
          >
            <p className="font-semibold text-[13px]" style={{ color: '#111' }}>{label}</p>
            <p className="text-[12px] mt-1" style={{ color: '#666' }}>{description}</p>
          </div>
        )}
      </div>
    </Html>
  );
}

function ViewController({ preset, controlsRef }: { preset: ViewPreset; controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree();

  useEffect(() => {
    const target = controlsRef.current?.target ?? new THREE.Vector3();
    const size = 6;
    const presets: Record<ViewPreset, [number, number, number]> = {
      overview: [target.x + size, target.y + size * 0.7, target.z + size],
      corner: [target.x + size * 1.2, target.y + 1.2, target.z - size * 0.4],
      top: [target.x, target.y + size * 1.4, target.z + 0.01],
      interior: [target.x + 0.4, target.y + 0.8, target.z + 0.6],
    };
    const [x, y, z] = presets[preset];
    const from = camera.position.clone();
    const to = new THREE.Vector3(x, y, z);
    let t = 0;
    let raf = 0;
    const animate = () => {
      t = Math.min(1, t + 0.04);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      camera.position.lerpVectors(from, to, e);
      controlsRef.current?.update();
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  return null;
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-sand-300 border-t-accent rounded-full animate-spin" style={{ borderTopColor: '#C8956C', borderColor: 'rgba(255,255,255,0.2)', borderTopWidth: 3, borderStyle: 'solid', borderWidth: 3 }} />
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>Loading 3D model…</p>
      </div>
    </Html>
  );
}

export default function ThreeViewer({ modelPath, apartmentName, onClose }: ThreeViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [preset, setPreset] = useState<ViewPreset>('overview');
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const toggleFullscreen = () => {
    const el = canvasRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const screenshot = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${apartmentName.replace(/\s+/g, '-')}-3d-tour.png`;
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 60, background: '#0a0a0b', fontFamily: 'var(--font-sans)' }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)',
        }}
      >
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8824F' }}>
            Interactive 3D Tour
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: '#FFFFFF', letterSpacing: '-0.02em', marginTop: 4 }}>
            {apartmentName}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <ViewerIconBtn onClick={screenshot} title="Screenshot"><Camera size={16} /></ViewerIconBtn>
          <ViewerIconBtn onClick={toggleFullscreen} title="Fullscreen"><Maximize2 size={16} /></ViewerIconBtn>
          <ViewerIconBtn onClick={onClose} title="Close"><X size={18} /></ViewerIconBtn>
        </div>
      </div>

      {/* View preset switcher */}
      <div
        style={{
          position: 'absolute',
          top: 96,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: 4,
          padding: 5,
          borderRadius: 999,
          background: 'rgba(20,20,22,0.7)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
        }}
      >
        {(['overview', 'corner', 'top', 'interior'] as ViewPreset[]).map((p) => (
          <button
            key={p}
            onClick={() => setPreset(p)}
            style={{
              padding: '9px 18px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.03em',
              textTransform: 'capitalize',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              background: preset === p ? '#B8824F' : 'transparent',
              color: preset === p ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
              transition: 'all 0.25s',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Bottom controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <ViewerPillBtn onClick={() => setAutoRotate((v) => !v)} active={autoRotate}>
          {autoRotate ? <Pause size={13} /> : <Play size={13} />}
          {autoRotate ? 'Pause rotation' : 'Auto-rotate'}
        </ViewerPillBtn>
        <ViewerPillBtn onClick={() => setShowHotspots((v) => !v)} active={showHotspots}>
          <MapPin size={13} />
          {showHotspots ? 'Hide pins' : 'Show pins'}
        </ViewerPillBtn>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.55)',
            fontSize: 11,
          }}
        >
          <RotateCcw size={11} /> drag
          <span style={{ opacity: 0.3 }}>·</span>
          <ZoomIn size={11} /> scroll
          <span style={{ opacity: 0.3 }}>·</span>
          <Move size={11} /> right-drag
        </div>
      </div>

      {/* Three.js Canvas */}
      <div ref={canvasRef} style={{ width: '100%', height: '100%' }}>
        <Canvas shadows gl={{ preserveDrawingBuffer: true, antialias: true }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[5, 4, 6]} fov={45} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow shadow-mapSize={[2048, 2048]} />
          <pointLight position={[-4, 3, -4]} intensity={0.4} />

          <color attach="background" args={['#0f0f10']} />
          <fog attach="fog" args={['#0f0f10', 18, 42]} />
          <Suspense fallback={<LoadingSpinner />}>
            <Bounds fit clip observe margin={1.2}>
              <Model modelPath={modelPath} />
            </Bounds>
            <ViewController preset={preset} controlsRef={controlsRef} />
            {HOTSPOTS.map((h) => (
              <Hotspot key={h.id} {...h} visible={showHotspots} />
            ))}
            <Environment preset="apartment" />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enablePan
            enableZoom
            enableRotate
            autoRotate={autoRotate}
            autoRotateSpeed={0.6}
            minDistance={1.5}
            maxDistance={25}
            maxPolarAngle={Math.PI / 2 + 0.1}
            makeDefault
          />
        </Canvas>
      </div>
    </motion.div>
  );
}

useGLTF.preload('/models/apartment-demo.glb');

function ViewerIconBtn({ children, onClick, title }: { children: React.ReactNode; onClick?: () => void; title?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.08)',
        color: '#FFFFFF',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
    >
      {children}
    </button>
  );
}

function ViewerPillBtn({ children, onClick, active }: { children: React.ReactNode; onClick?: () => void; active?: boolean }) {
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
        cursor: 'pointer',
        border: '1px solid ' + (active ? 'transparent' : 'rgba(255,255,255,0.1)'),
        background: active ? '#B8824F' : 'rgba(20,20,22,0.7)',
        color: active ? '#FFFFFF' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        transition: 'all 0.25s',
      }}
    >
      {children}
    </button>
  );
}
