"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 18; // seconds in the demo edit

const PHRASES: { start: number; end: number; words: string[] }[] = [
  { start: 0.4, end: 4.2, words: ["pack", "the", "car,", "chase", "the", "sun"] },
  { start: 4.6, end: 8.6, words: ["no", "map,", "no", "plans"] },
  { start: 9.0, end: 13.2, words: ["when", "the", "beat", "hits", "🔥"] },
  { start: 13.6, end: 17.6, words: ["best", "summer", "ever."] },
];

// deterministic bar heights so server and client render identically
const WAVE = Array.from({ length: 64 }, (_, i) => 25 + Math.abs(Math.sin(i * 1.7) * 65));

const TOOLS = [
  {
    label: "Media",
    on: false,
    d: "M4 5h16v14H4zM4 9h16M9 5v4",
  },
  {
    label: "Audio",
    on: false,
    d: "M9 18V5l12-2v13M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  {
    label: "Captions",
    on: true,
    d: "M4 5h16v14H4zM7 15h5m2 0h3",
  },
  {
    label: "Text",
    on: false,
    d: "M5 7V5h14v2M12 5v14m-3 0h6",
  },
  {
    label: "Magic",
    on: false,
    d: "M5 3v4M3 5h4M6 17v4m-2-2h4M13 4l2.5 5.5L21 12l-5.5 2.5L13 20l-2.5-5.5L5 12l5.5-2.5L13 4Z",
  },
];

function fmt(t: number) {
  const s = Math.floor(t);
  const cs = Math.floor((t - s) * 10);
  return `0:${String(s).padStart(2, "0")}.${cs}`;
}

export function EditorDemo() {
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const raf = useRef(0);
  const last = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const tick = (now: number) => {
      if (last.current === null) last.current = now;
      const dt = (now - last.current) / 1000;
      last.current = now;
      setTime((t) => (t + dt) % DURATION);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      last.current = null;
    };
  }, [playing]);

  const phrase = PHRASES.find((p) => time >= p.start && time <= p.end);
  const progress = (time / DURATION) * 100;

  return (
    <div className="demo" id="demo" aria-label="Interactive preview of the Vireo video editor">
      <div className="demo-frame">
        <div className="demo-bar">
          <div className="dots" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="title">
            Vireo Studio — <b>summer-trip reel</b>
          </div>
          <span className="export">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            Export
          </span>
        </div>

        <div className="demo-body">
          <div className="demo-tools" role="presentation">
            {TOOLS.map((t) => (
              <span key={t.label} className={`tool${t.on ? " on" : ""}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={t.d} />
                </svg>
                {t.label}
              </span>
            ))}
          </div>

          <div className="demo-stage">
            <div className="canvas">
              <div className="canvas-bg" aria-hidden="true"></div>
              <span className="chip">9:16 · Reels</span>
              <p className="cap" aria-live="off">
                {phrase
                  ? phrase.words.map((w, i) => {
                      const wStart =
                        phrase.start + ((phrase.end - phrase.start) / phrase.words.length) * i;
                      return (
                        <span key={i} className={`w${time >= wStart ? " on" : ""}`}>
                          {w}{" "}
                        </span>
                      );
                    })
                  : null}
              </p>
              <span className="dur">{fmt(time)} / 0:18</span>
              {!playing && (
                <button className="playbtn" onClick={() => setPlaying(true)} aria-label="Play preview">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
              {playing && (
                <button
                  className="playbtn"
                  style={{ opacity: 0 }}
                  onClick={() => setPlaying(false)}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  aria-label="Pause preview"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="demo-timeline">
            <div className="tl-head">
              <span className="time">{fmt(time)}</span>
              <span>·</span>
              <span>4 clips · beat-synced</span>
              <span className="zoom" aria-hidden="true">
                <i></i>
              </span>
            </div>
            <div className="tl-tracks">
              <div className="playhead" style={{ left: `calc(84px + (100% - 84px) * ${progress / 100})` }} aria-hidden="true"></div>
              <div className="tl-row">
                <span className="tl-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 9h18M9 5v14" />
                  </svg>
                  Video
                </span>
                <div className="track">
                  <div className="clip c1">beach-run.mp4</div>
                  <div className="clip c2">van.mp4</div>
                  <div className="clip c3">sunset.mp4</div>
                  <div className="clip c4">crew.mp4</div>
                </div>
              </div>
              <div className="tl-row">
                <span className="tl-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 5h16v14H4zM7 15h5m2 0h3" />
                  </svg>
                  Captions
                </span>
                <div className="track caps">
                  <div className="clip">pack the car…</div>
                  <div className="clip k2">no map…</div>
                  <div className="clip k3">when the beat hits 🔥</div>
                  <div className="clip k2">best summer ever.</div>
                </div>
              </div>
              <div className="tl-row">
                <span className="tl-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                  Audio
                </span>
                <div className="wave-track" aria-label="Audio track: sunset-lofi.mp3">
                  {WAVE.map((h, i) => (
                    <i key={i} style={{ height: `${h}%` }}></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
