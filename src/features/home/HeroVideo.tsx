import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { getServerThemeSnapshot, getThemeSnapshot, subscribeTheme } from '../../lib/theme';

/** Viewports taller than wide get the portrait cut, composed for phones. */
const PORTRAIT_QUERY = '(max-aspect-ratio: 1/1)';

function subscribePortrait(onChange: () => void): () => void {
  const query = window.matchMedia(PORTRAIT_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const getPortraitSnapshot = () => window.matchMedia(PORTRAIT_QUERY).matches;
const getServerPortraitSnapshot = () => false;

/** Honors the browser's Data Saver setting where the browser exposes it. */
function prefersReducedData(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

/**
 * Looping brand film behind the home hero: the logo's orbit circling the
 * headline over a grid that travels forward. There is one cut per theme and
 * orientation, and each cut's first frame doubles as its poster, so the swap
 * from poster to video is seamless.
 *
 * Reduced motion and Data Saver get the poster only. Playback pauses while the
 * hero is off screen, and a visible control lets anyone stop it (WCAG 2.2.2).
 */
export function HeroVideo() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const portrait = useSyncExternalStore(subscribePortrait, getPortraitSnapshot, getServerPortraitSnapshot);
  const reduceMotion = useReducedMotion();
  const [saveData] = useState(prefersReducedData);
  const animate = !reduceMotion && !saveData;
  const cut = `/video/hero/${theme}-${portrait ? 'portrait' : 'landscape'}`;

  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || !animate) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(layer);
    return () => observer.disconnect();
  }, [animate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (userPaused || !inView) {
      video.pause();
      return;
    }
    // Set before play(): browsers only allow autoplay for muted media.
    video.muted = true;
    video.play().catch(() => {
      // Autoplay refused (e.g. iOS Low Power Mode): the poster stays up and
      // the control offers to play.
    });
  }, [animate, cut, inView, userPaused]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      setUserPaused(true);
      return;
    }
    setUserPaused(false);
    video.play().catch(() => {});
  }

  return (
    <>
      <div ref={layerRef} aria-hidden className="absolute inset-0 -z-20 bg-ast-canvas">
        {animate ? (
          <video
            key={cut}
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={`${cut}.jpg`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={`${cut}.mp4`} type="video/mp4" />
          </video>
        ) : (
          <img src={`${cut}.jpg`} alt="" className="h-full w-full object-cover" decoding="async" />
        )}
      </div>

      {animate && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? 'Pause background video' : 'Play background video'}
          className="absolute bottom-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ast-ink/20 bg-ast-canvas/70 text-ast-ink-muted transition-colors duration-200 hocus:border-ast-accent/50 hocus:text-ast-accent sm:bottom-6 sm:right-6"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
        </button>
      )}
    </>
  );
}
