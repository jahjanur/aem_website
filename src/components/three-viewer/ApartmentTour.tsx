'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Maximize2, Minimize2, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import type { TourScene, TourHotspot } from '@/types';

/* ============================================================
   CONFIG — static tunables. Scenes are passed in via props so
   each apartment (Stan 1/2/6/7/8) renders its own 360° tour.
   ============================================================ */
type Hotspot = TourHotspot;
type SceneCfg = TourScene;

const CONFIG = {
  camera: { fov: 75, fovMin: 40, fovMax: 90, zoomWheelStep: 0.05 },
  controls: {
    rotateSpeed: -0.32,
    dampingFactor: 0.08,
    autoRotateSpeed: 0.18,
    idleResumeMs: 5000,
    minPolarAngle: Math.PI * 0.20,   // ~36°  — can't stare at ceiling
    maxPolarAngle: Math.PI * 0.58,   // ~104° — blocks the broken pano floor
  },
  transition: { durationMs: 600 },
  hotspot: { spriteScale: 42, radius: 480, pulseAmplitude: 0.12, pulseSpeed: 0.003 },
  sphereRadius: 500,
  // "navy" kept as the key name; value is a warm near-black to match the site.
  colors: { navy: '#171009', rose: '#C8956C' },
};

/* ─── Procedural hotspot sprite texture (rose-gold ring + glow) ─── */
function makeHotspotTexture(): THREE.Texture {
  const size = 256;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d')!;
  const c = size / 2;
  const glow = ctx.createRadialGradient(c, c, 18, c, c, c);
  glow.addColorStop(0, 'rgba(200,149,108,0.55)');
  glow.addColorStop(0.4, 'rgba(200,149,108,0.18)');
  glow.addColorStop(1, 'rgba(200,149,108,0)');
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(c, c, c, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#C8956C'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(c, c, 64, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(c, c, 44, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(c, c, 14, 0, Math.PI * 2); ctx.fill();
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function yawPitchToVector(yawDeg: number, pitchDeg: number, radius: number) {
  const yaw = THREE.MathUtils.degToRad(yawDeg);
  const pitch = THREE.MathUtils.degToRad(pitchDeg);
  return new THREE.Vector3(
    radius * Math.sin(yaw) * Math.cos(pitch),
    radius * Math.sin(pitch),
    -radius * Math.cos(yaw) * Math.cos(pitch),
  );
}

/* ─── Inside-out panorama sphere ─── */
function PanoSphere({ texture, rotationY }: { texture: THREE.Texture; rotationY: number }) {
  return (
    <mesh rotation={[0, THREE.MathUtils.degToRad(rotationY), 0]}>
      <sphereGeometry args={[CONFIG.sphereRadius, 80, 50]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

/* ─── Hotspot markers (sprites) with hover + click ─── */
function HotspotMarkers({
  hotspots,
  hotspotTexture,
  onHotspotClick,
  onHover,
}: {
  hotspots: Hotspot[];
  hotspotTexture: THREE.Texture;
  onHotspotClick: (target: string) => void;
  onHover: (h: Hotspot | null, screenX?: number, screenY?: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { size, camera } = useThree();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 3) * CONFIG.hotspot.pulseAmplitude;
    const s = CONFIG.hotspot.spriteScale * pulse;
    groupRef.current.children.forEach((c) => (c as THREE.Sprite).scale.setScalar(s));
  });

  return (
    <group ref={groupRef}>
      {hotspots.map((h, i) => {
        const pos = yawPitchToVector(h.yaw, h.pitch, CONFIG.hotspot.radius);
        return (
          <sprite
            key={i}
            position={pos}
            renderOrder={2}
            onClick={(e) => {
              e.stopPropagation();
              onHotspotClick(h.target);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              const sx = ((e.point.clone().project(camera).x + 1) / 2) * size.width;
              const sy = ((1 - e.point.clone().project(camera).y) / 2) * size.height;
              onHover(h, sx, sy);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              onHover(null);
              document.body.style.cursor = '';
            }}
          >
            <spriteMaterial
              map={hotspotTexture}
              transparent
              depthTest={false}
              depthWrite={false}
            />
          </sprite>
        );
      })}
    </group>
  );
}

/* ─── Custom FOV-based zoom (wheel + pinch) ─── */
function FovZoom() {
  const { camera, gl } = useThree();
  const pinchRef = useRef<{ dist: number; fov: number } | null>(null);

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const dom = gl.domElement;

    const setFov = (fov: number) => {
      cam.fov = THREE.MathUtils.clamp(fov, CONFIG.camera.fovMin, CONFIG.camera.fovMax);
      cam.updateProjectionMatrix();
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setFov(cam.fov + Math.sign(e.deltaY) * cam.fov * CONFIG.camera.zoomWheelStep);
    };
    const dist = (t: TouchList) =>
      Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) pinchRef.current = { dist: dist(e.touches), fov: cam.fov };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current) {
        setFov(pinchRef.current.fov * (pinchRef.current.dist / dist(e.touches)));
        e.preventDefault();
      }
    };
    const onTouchEnd = () => { pinchRef.current = null; };

    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    dom.addEventListener('touchmove', onTouchMove, { passive: false });
    dom.addEventListener('touchend', onTouchEnd);
    return () => {
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
    };
  }, [camera, gl]);

  return null;
}

/* ─── Idle auto-rotate (re-enables after user goes quiet) ─── */
function AutoRotateOnIdle({
  controlsRef,
  lastInteractionRef,
  gyroActive,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  lastInteractionRef: React.MutableRefObject<number>;
  gyroActive: boolean;
}) {
  useFrame(() => {
    if (gyroActive) return; // gyro owns the camera
    const c = controlsRef.current;
    if (!c) return;
    if (!c.autoRotate && performance.now() - lastInteractionRef.current > CONFIG.controls.idleResumeMs) {
      c.autoRotate = true;
    }
  });
  return null;
}

/* ─── Gyroscope camera control (VR-style look-around on phones) ─── */
function GyroController({
  enabled,
  onNoSignal,
  onFirstSignal,
}: {
  enabled: boolean;
  onNoSignal?: () => void;
  onFirstSignal?: () => void;
}) {
  const { camera } = useThree();
  const orientRef = useRef({ alpha: 0, beta: 0, gamma: 0, orient: 0 });
  const hasSignalRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      hasSignalRef.current = false;
      return;
    }

    const onOrient = (e: DeviceOrientationEvent) => {
      // Some browsers emit events with all-null values when sensor is unsupported — ignore those
      if (e.alpha == null && e.beta == null && e.gamma == null) return;
      orientRef.current = {
        alpha: e.alpha != null ? THREE.MathUtils.degToRad(e.alpha) : 0,
        beta:  e.beta  != null ? THREE.MathUtils.degToRad(e.beta)  : 0,
        gamma: e.gamma != null ? THREE.MathUtils.degToRad(e.gamma) : 0,
        orient: window.screen?.orientation?.angle
          ? THREE.MathUtils.degToRad(window.screen.orientation.angle)
          : 0,
      };
      if (!hasSignalRef.current) {
        hasSignalRef.current = true;
        onFirstSignal?.();
      }
    };

    window.addEventListener('deviceorientation', onOrient, true);

    // If no event arrives in 2.5s, the browser doesn't support / blocks it (HTTPS required) — bail.
    const timeout = window.setTimeout(() => {
      if (!hasSignalRef.current) onNoSignal?.();
    }, 2500);

    return () => {
      window.removeEventListener('deviceorientation', onOrient, true);
      clearTimeout(timeout);
    };
  }, [enabled, onFirstSignal, onNoSignal]);

  const zee   = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const euler = useMemo(() => new THREE.Euler(), []);
  const q0    = useMemo(() => new THREE.Quaternion(), []);
  const q1    = useMemo(() => new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)), []);

  useFrame(() => {
    if (!enabled) return;
    // Don't touch the camera until we've actually received sensor data —
    // otherwise the default zero-values quaternion pitches the camera straight down.
    if (!hasSignalRef.current) return;
    const { alpha, beta, gamma, orient } = orientRef.current;
    euler.set(beta, alpha, -gamma, 'YXZ');
    camera.quaternion.setFromEuler(euler);
    camera.quaternion.multiply(q1);
    camera.quaternion.multiply(q0.setFromAxisAngle(zee, -orient));
  });

  return null;
}

/* Request DeviceOrientation permission (iOS 13+ requires a user-gesture call) */
async function requestGyroPermission(): Promise<boolean> {
  const DOE = (window as unknown as {
    DeviceOrientationEvent?: { requestPermission?: () => Promise<'granted' | 'denied'> };
  }).DeviceOrientationEvent;
  if (DOE && typeof DOE.requestPermission === 'function') {
    try {
      const state = await DOE.requestPermission();
      return state === 'granted';
    } catch {
      return false;
    }
  }
  // Android + most browsers don't need permission
  return true;
}

function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

/* ============================================================
   Main component
   ============================================================ */
type ApartmentTourProps = {
  /** Ordered list of 360° scenes for this apartment. */
  scenes: TourScene[];
  /** Scene id to open first (defaults to the first scene). */
  initialSceneId?: string;
  /** Apartment name shown in the top-left brand label (e.g. "Stan 2"). */
  title?: string;
};

export default function ApartmentTour({ scenes, initialSceneId, title }: ApartmentTourProps) {
  const t = useTranslations('tour');
  const firstSceneId = initialSceneId ?? scenes[0]?.id;
  const [currentSceneId, setCurrentSceneId] = useState(firstSceneId);
  const [textures, setTextures] = useState<Map<string, THREE.Texture>>(new Map());
  const [loadingPct, setLoadingPct] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderLabel, setLoaderLabel] = useState(t('loaderPreparing'));
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [tooltip, setTooltip] = useState<{ label: string; x: number; y: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pseudoFullscreen, setPseudoFullscreen] = useState(false); // iOS fallback
  const [gyroActive, setGyroActive] = useState(false);
  const [gyroStatus, setGyroStatus] = useState<'idle' | 'waiting' | 'live' | 'unavailable'>('idle');
  const [isMobile, setIsMobile] = useState(false);
  const inFullscreen = isFullscreen || pseudoFullscreen;

  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const lastInteractionRef = useRef<number>(performance.now());
  const transitioningRef = useRef(false);
  const hotspotTexture = useMemo(() => makeHotspotTexture(), []);

  const currentScene = scenes.find((s) => s.id === currentSceneId) ?? scenes[0];
  const currentIndex = Math.max(0, scenes.findIndex((s) => s.id === currentSceneId));

  /* Track viewport size for responsive tour chrome (room bar, watermark) */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  /* Load a texture with progress; cache by URL */
  const loadTexture = (
    url: string,
    onProgress?: (pct: number) => void,
  ): Promise<THREE.Texture> =>
    new Promise((resolve, reject) => {
      const cached = textures.get(url);
      if (cached) return resolve(cached);
      new THREE.TextureLoader().load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          setTextures((m) => {
            const next = new Map(m);
            next.set(url, tex);
            return next;
          });
          resolve(tex);
        },
        (xhr) => {
          if (xhr.lengthComputable) onProgress?.((xhr.loaded / xhr.total) * 100);
        },
        (err) => reject(err),
      );
    });

  /* Initial load + background preload of other rooms */
  useEffect(() => {
    let cancelled = false;
    const first = scenes.find((s) => s.id === firstSceneId) ?? scenes[0];
    if (!first) return;
    setLoaderLabel(t('loaderLoadingScene', { scene: first.title }));
    loadTexture(first.image, (pct) => setLoadingPct(pct))
      .then(() => {
        if (cancelled) return;
        setLoaderVisible(false);
        // Background-fetch the remaining scenes so transitions are instant
        scenes
          .filter((s) => s.id !== first.id)
          .forEach((s) => loadTexture(s.image).catch(() => {}));
      })
      .catch((err) => {
        console.error(err);
        setLoaderLabel(t('loaderFailed'));
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Fullscreen toggle + auto-gyro on mobile (with iOS fallbacks) */
  useEffect(() => {
    type FSDoc = Document & { webkitFullscreenElement?: Element };
    const onFs = () => {
      const d = document as FSDoc;
      const fs = !!(document.fullscreenElement || d.webkitFullscreenElement);
      setIsFullscreen(fs);
      if (!fs) setGyroActive(false);
    };
    document.addEventListener('fullscreenchange', onFs);
    document.addEventListener('webkitfullscreenchange', onFs);
    return () => {
      document.removeEventListener('fullscreenchange', onFs);
      document.removeEventListener('webkitfullscreenchange', onFs);
    };
  }, []);

  /* Open the immersive fullscreen view when the hero "View 360° tour" button fires.
     Runs synchronously from that click, so gyro permission (iOS) keeps its gesture. */
  useEffect(() => {
    const open = () => {
      setPseudoFullscreen(true);
      if (isMobileDevice()) {
        requestGyroPermission().then((ok) => {
          if (ok) {
            setGyroActive(true);
            setGyroStatus('waiting');
          }
        });
      }
    };
    window.addEventListener('aem-open-tour', open);
    return () => window.removeEventListener('aem-open-tour', open);
  }, []);

  const toggleFullscreen = async () => {
    type FSElement = HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };
    type FSDoc = Document & {
      webkitExitFullscreen?: () => Promise<void>;
      webkitFullscreenElement?: Element;
    };
    const el = containerRef.current as FSElement | null;
    const d  = document as FSDoc;

    const currentlyFs = !!(document.fullscreenElement || d.webkitFullscreenElement || pseudoFullscreen);

    if (!currentlyFs) {
      // ENTER fullscreen — try standard, then webkit, else CSS pseudo
      try {
        if (el?.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el?.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        } else {
          setPseudoFullscreen(true);
        }
      } catch {
        // Fallback if the API exists but throws (e.g. iOS Safari)
        setPseudoFullscreen(true);
      }
      // Request gyro permission inside the same user gesture (works on iOS)
      if (isMobileDevice()) {
        const ok = await requestGyroPermission();
        if (ok) setGyroActive(true);
      }
    } else {
      // EXIT
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (d.webkitFullscreenElement && d.webkitExitFullscreen) {
          await d.webkitExitFullscreen();
        }
      } catch {
        /* ignore */
      }
      setPseudoFullscreen(false);
      setGyroActive(false);
    }
  };

  // Manual gyro toggle (useful on desktop-mobile emulation or to re-enable after denial)
  const toggleGyro = async () => {
    if (gyroActive) {
      setGyroActive(false);
      setGyroStatus('idle');
      return;
    }
    const ok = await requestGyroPermission();
    if (ok) {
      setGyroActive(true);
      setGyroStatus('waiting');
    } else {
      setGyroStatus('unavailable');
      setTimeout(() => setGyroStatus('idle'), 3000);
    }
  };

  /* Cross-fade scene transition */
  const transitionTo = async (sceneId: string) => {
    if (transitioningRef.current) return;
    if (sceneId === currentSceneId) return;
    transitioningRef.current = true;
    setTooltip(null);

    const target = scenes.find((s) => s.id === sceneId)!;
    // Preload target texture (shows loader if not cached)
    if (!textures.has(target.image)) {
      setLoaderLabel(t('loaderLoadingScene', { scene: target.title }));
      setLoadingPct(0);
      setLoaderVisible(true);
      try {
        await loadTexture(target.image, (pct) => setLoadingPct(pct));
      } catch (e) {
        console.error(e);
        setLoaderLabel(t('loaderFailed'));
        transitioningRef.current = false;
        return;
      }
      setLoaderVisible(false);
    }

    const half = CONFIG.transition.durationMs / 2;
    setFadeOpacity(1);
    await new Promise((r) => setTimeout(r, half));
    setCurrentSceneId(sceneId);
    await new Promise((r) => setTimeout(r, 20)); // let scene swap commit
    setFadeOpacity(0);
    await new Promise((r) => setTimeout(r, half));
    transitioningRef.current = false;
  };

  const currentTexture = textures.get(currentScene.image);
  const markUserInteract = () => {
    lastInteractionRef.current = performance.now();
    if (controlsRef.current) controlsRef.current.autoRotate = false;
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: pseudoFullscreen ? 'fixed' : 'relative',
        inset: pseudoFullscreen ? 0 : undefined,
        width: pseudoFullscreen ? '100vw' : '100%',
        height: inFullscreen ? '100vh' : 'min(85vh, 820px)',
        minHeight: pseudoFullscreen ? '100vh' : 520,
        borderRadius: inFullscreen ? 0 : 28,
        overflow: 'hidden',
        background: CONFIG.colors.navy,
        boxShadow: inFullscreen ? 'none' : '0 24px 80px -30px rgba(0,0,0,0.45)',
        zIndex: pseudoFullscreen ? 9999 : undefined,
        fontFamily: 'var(--font-sans, "Plus Jakarta Sans", system-ui, sans-serif)',
      }}
    >
      {currentTexture && (
        <Canvas
          camera={{ fov: CONFIG.camera.fov, position: [0, 0, 0.1], near: 0.1, far: 1100 }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
          onPointerDown={markUserInteract}
          onWheel={markUserInteract}
        >
          <PanoSphere texture={currentTexture} rotationY={currentScene.rotationY ?? 0} />
          <HotspotMarkers
            hotspots={currentScene.hotspots ?? []}
            hotspotTexture={hotspotTexture}
            onHotspotClick={transitionTo}
            onHover={(h, x, y) => {
              if (h && x !== undefined && y !== undefined) {
                setTooltip({ label: h.label, x, y });
              } else {
                setTooltip(null);
              }
            }}
          />
          {/* Zoom disabled for now */}
          <AutoRotateOnIdle
            controlsRef={controlsRef}
            lastInteractionRef={lastInteractionRef}
            gyroActive={gyroActive}
          />
          <GyroController
            enabled={gyroActive}
            onFirstSignal={() => setGyroStatus('live')}
            onNoSignal={() => {
              setGyroActive(false);
              setGyroStatus('unavailable');
              setTimeout(() => setGyroStatus('idle'), 4000);
            }}
          />
          <OrbitControls
            ref={controlsRef}
            enabled={!gyroActive}
            enableDamping
            dampingFactor={CONFIG.controls.dampingFactor}
            enablePan={false}
            enableZoom={false}
            rotateSpeed={CONFIG.controls.rotateSpeed}
            minPolarAngle={CONFIG.controls.minPolarAngle}
            maxPolarAngle={CONFIG.controls.maxPolarAngle}
            autoRotate={!gyroActive}
            autoRotateSpeed={CONFIG.controls.autoRotateSpeed}
            target={[0, 0, 0]}
          />
        </Canvas>
      )}

      {/* Top-left brand label */}
      <div
        style={{
          position: 'absolute',
          top: 22, left: 24,
          display: 'flex', flexDirection: 'column', gap: 4,
          color: '#fff', pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: CONFIG.colors.rose,
          }}
        >
          {title ? t('eyebrowTitleTour', { title }) : t('eyebrowVirtualTour')}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display, serif)',
            fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em',
          }}
        >
          {currentScene.title}
        </h3>
      </div>

      {/* Powered by Zulbera — bottom-left watermark on desktop (mobile version sits above the room bar) */}
      {!isMobile && (
        <a
          href="https://zulbera.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Zulbera"
          style={{
            position: 'absolute',
            bottom: 20,
            left: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            pointerEvents: 'auto',
            zIndex: 6,
          }}
        >
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            {t('poweredBy')}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/zulbera-white.svg" alt={t('zulberaLogoAlt')} style={{ height: 14, width: 'auto', opacity: 0.8 }} />
        </a>
      )}

      {/* Top-right controls — gyro toggle (mobile only) + fullscreen */}
      {isMobileDevice() && (
        <button
          onClick={toggleGyro}
          aria-label={t('toggleGyroLabel')}
          style={{
            position: 'absolute', top: 22, right: 74,
            width: 42, height: 42,
            borderRadius: 14,
            border: '1px solid ' + (gyroActive ? CONFIG.colors.rose : 'rgba(255,255,255,0.12)'),
            background: gyroActive
              ? 'linear-gradient(135deg, #C8956C 0%, #a47350 100%)'
              : 'rgba(20,20,22,0.5)',
            color: gyroActive ? '#fff' : '#fff',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            transition: 'all 0.25s ease',
            boxShadow: gyroActive ? '0 6px 22px rgba(200,149,108,0.45)' : 'none',
          }}
        >
          <Compass size={16} />
        </button>
      )}
      <button
        onClick={toggleFullscreen}
        aria-label={t('toggleFullscreenLabel')}
        style={{
          position: 'absolute', top: 22, right: 22,
          width: 42, height: 42,
          borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(20,20,22,0.5)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = CONFIG.colors.rose)}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
      >
        {inFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>

      {/* Gyro status toast */}
      {(gyroStatus === 'waiting' || gyroStatus === 'unavailable') && (
        <div
          style={{
            position: 'absolute',
            top: 80, left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 18px',
            borderRadius: 12,
            background: 'rgba(20,20,22,0.75)',
            border: '1px solid ' +
              (gyroStatus === 'unavailable' ? 'rgba(255,120,120,0.4)' : 'rgba(200,149,108,0.3)'),
            backdropFilter: 'blur(18px) saturate(160%)',
            WebkitBackdropFilter: 'blur(18px) saturate(160%)',
            color: gyroStatus === 'unavailable' ? '#ff9c9c' : CONFIG.colors.rose,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            zIndex: 12,
            maxWidth: '85%',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          {gyroStatus === 'waiting'
            ? t('gyroCalibrating')
            : t('gyroBlocked')}
        </div>
      )}

      {/* Bottom room navigation — pills wrap and center (no horizontal slider) */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 20 : 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          maxWidth: 'calc(100vw - 24px)',
          zIndex: 5,
        }}
      >
        {/* Zulbera watermark sits above the room bar on mobile */}
        {isMobile && (
          <a
            href="https://zulbera.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zulbera"
            style={{ display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'auto' }}
          >
            <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
              {t('poweredBy')}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/zulbera-white.svg" alt={t('zulberaLogoAlt')} style={{ height: 13, width: 'auto', opacity: 0.8 }} />
          </a>
        )}
        {isMobile ? (
          /* Mobile: compact prev / current-room / next stepper + position dots */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: 5,
                borderRadius: 999,
                background: 'rgba(20,20,22,0.62)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(18px) saturate(160%)',
                WebkitBackdropFilter: 'blur(18px) saturate(160%)',
              }}
            >
              <button
                type="button"
                aria-label="Previous room"
                onClick={() => transitionTo(scenes[(currentIndex - 1 + scenes.length) % scenes.length].id)}
                style={{
                  width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.08)', color: '#F8F3EB', flexShrink: 0,
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <span
                style={{
                  minWidth: 140, textAlign: 'center', padding: '0 8px',
                  fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#F8F3EB', whiteSpace: 'nowrap',
                }}
              >
                {currentScene.title}
              </span>
              <button
                type="button"
                aria-label="Next room"
                onClick={() => transitionTo(scenes[(currentIndex + 1) % scenes.length].id)}
                style={{
                  width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.08)', color: '#F8F3EB', flexShrink: 0,
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {scenes.map((s) => {
                const on = s.id === currentSceneId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={s.title}
                    onClick={() => transitionTo(s.id)}
                    style={{
                      width: on ? 20 : 7, height: 7, padding: 0, border: 'none', cursor: 'pointer',
                      borderRadius: 999,
                      background: on ? 'linear-gradient(135deg, #C8956C 0%, #a47350 100%)' : 'rgba(255,255,255,0.34)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          /* Desktop: full pill row */
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 4,
              padding: 6,
              maxWidth: '100%',
              borderRadius: 999,
              background: 'rgba(20,20,22,0.55)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(18px) saturate(160%)',
              WebkitBackdropFilter: 'blur(18px) saturate(160%)',
            }}
          >
            {scenes.map((s) => {
              const active = s.id === currentSceneId;
              return (
                <button
                  key={s.id}
                  onClick={() => transitionTo(s.id)}
                  style={{
                    background: active
                      ? 'linear-gradient(135deg, #C8956C 0%, #a47350 100%)'
                      : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.85)',
                    border: 'none',
                    padding: '10px 22px',
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: active ? 600 : 500,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    fontFamily: 'inherit',
                  }}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Hotspot tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: 0, top: 0,
            transform: `translate(${tooltip.x}px, ${tooltip.y}px) translate(-50%, -180%)`,
            pointerEvents: 'none',
            padding: '8px 16px',
            borderRadius: 12,
            background: 'rgba(20,20,22,0.7)',
            border: '1px solid rgba(200,149,108,0.3)',
            backdropFilter: 'blur(18px) saturate(160%)',
            WebkitBackdropFilter: 'blur(18px) saturate(160%)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: CONFIG.colors.rose,
            whiteSpace: 'nowrap',
            zIndex: 12,
            boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
          }}
        >
          {tooltip.label}
        </div>
      )}

      {/* Cross-fade overlay — warm dark with Zulbera branding during room changes */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: CONFIG.colors.navy,
          opacity: fadeOpacity,
          transition: `opacity ${CONFIG.transition.durationMs / 2}ms ease`,
          pointerEvents: 'none',
          zIndex: 8,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 14,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
          {t('poweredBy')}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/zulbera-white.svg" alt={t('zulberaLogoAlt')} style={{ width: 156, height: 'auto', opacity: 0.92 }} />
      </div>

      {/* Loader */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at center, #2a1e10 0%, ${CONFIG.colors.navy} 70%)`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 22,
          opacity: loaderVisible ? 1 : 0,
          pointerEvents: loaderVisible ? 'auto' : 'none',
          transition: 'opacity 0.5s ease',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: 9, letterSpacing: '0.42em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)',
          }}>
            {t('poweredBy')}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/zulbera-white.svg"
            alt={t('zulberaLogoAlt')}
            style={{ width: 180, height: 'auto', opacity: 0.96 }}
          />
        </div>
        <div style={{
          width: 240, height: 2,
          background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden',
        }}>
          <div style={{
            width: `${loadingPct}%`, height: '100%',
            background: `linear-gradient(90deg, ${CONFIG.colors.rose}, #ffd0bc)`,
            transition: 'width 0.25s ease',
            boxShadow: '0 0 10px rgba(200,149,108,0.5)',
          }} />
        </div>
        <div style={{
          fontSize: 10, letterSpacing: '0.32em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
        }}>
          {loaderLabel} {Math.round(loadingPct)}%
        </div>
      </div>
    </div>
  );
}
