'use client';

import Image from 'next/image';
import {Pause, Play} from 'lucide-react';
import {useEffect, useRef, useState, type CSSProperties, type ReactNode, type PointerEvent} from 'react';

type ArtworkProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  controls?: boolean;
  children: ReactNode;
};

export function AnimatedProjectArtwork({src, alt, width, height, className, controls = false, children}: ArtworkProps) {
  const scene = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(preference.matches);
    const syncVisibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {threshold: 0.1},
    );
    observer.observe(element);
    syncPreference();
    syncVisibility();
    preference.addEventListener('change', syncPreference);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', syncPreference);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  function highlight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  }

  return (
    <div
      ref={scene}
      className={`project-diagram animated-project-artwork ${className}`}
      style={{'--artwork-ratio': `${width} / ${height}`} as CSSProperties}
      data-running={visible && pageVisible && !paused && !reducedMotion}
      onPointerMove={highlight}
    >
      <div className="project-artwork-backdrop" aria-hidden="true">
        <Image src={src} alt="" fill sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1320px) 85vw, 1192px" />
      </div>
      <div className="project-artwork-frame">
        <Image
          className="project-artwork-image"
          src={src}
          width={width}
          height={height}
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1320px) 85vw, 1192px"
          alt={alt}
        />
        {children}
      </div>
      <div className="project-artwork-pointer-light" aria-hidden="true" />
      {controls && (
        <button
          className="project-artwork-motion-control"
          onClick={() => setPaused(value => !value)}
          aria-label={reducedMotion ? 'Animation off: reduced motion enabled' : paused ? 'Play animation' : 'Pause animation'}
          disabled={reducedMotion}
        >
          {paused || reducedMotion ? <Play size={14} /> : <Pause size={14} />}
          <span>{reducedMotion ? 'Motion off' : paused ? 'Play' : 'Pause'}</span>
        </button>
      )}
    </div>
  );
}
