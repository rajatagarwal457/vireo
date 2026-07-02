"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 18; // seconds in the demo edit

const CLIPS = [
  { name: "beach-run.mp4", start: 0, end: 5.2, grad: "linear-gradient(160deg, #35845f, #10301f)" },
  { name: "van.mp4", start: 5.2, end: 9.6, grad: "linear-gradient(160deg, #b57a45, #462812)" },
  { name: "sunset.mp4", start: 9.6, end: 14, grad: "linear-gradient(160deg, #c95f52, #401b3c)" },
  { name: "crew.mp4", start: 14, end: 18, grad: "linear-gradient(160deg, #3f6ba6, #101d38)" },
];

const PHRASES: { start: number; end: number; words: string[] }[] = [
  { start: 0.4, end: 4.2, words: ["pack", "the", "car,", "chase", "the", "sun"] },
  { start: 4.6, end: 8.6, words: ["no", "map,", "no", "plans"] },
  { start: 9.0, end: 13.2, words: ["when", "the", "beat", "hits", "🔥"] },
  { start: 13.6, end: 17.6, words: ["best", "summer", "ever."] },
];

// deterministic bar heights, rounded so server and client serialize identically
const WAVE = Array.from({ length: 72 }, (_, i) =>
  Math.round(25 + Math.abs(Math.sin(i * 1.7) * 65))
);

const CAP_COLORS = ["#c8f169", "#ffffff", "#ffd166", "#ff6b9e"];

const TEXT_STYLES = [
  { id: "headline", label: "HEADLINE", text: "BEST SUMMER EVER" },
  { id: "script", label: "Handwritten", text: "golden hour ✧" },
  { id: "neon", label: "NEON", text: "ROAD TRIP" },
];

const STICKERS = [
  { emoji: "🔥", top: "12%", left: "12%" },
  { emoji: "⭐", top: "20%", left: "72%" },
  { emoji: "🌊", top: "68%", left: "14%" },
  { emoji: "✨", top: "60%", left: "74%" },
];

const TOOLS: { id: ToolId; label: string; d: string }[] = [
  { id: "media", label: "Media", d: "M4 5h16v14H4zM4 9h16M9 5v4" },
  {
    id: "audio",
    label: "Audio",
    d: "M9 18V5l12-2v13M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  { id: "subtitles", label: "Subtitles", d: "M4 5h16v14H4zM7 15h5m2 0h3" },
  { id: "text", label: "Text", d: "M5 7V5h14v2M12 5v14m-3 0h6" },
  {
    id: "elements",
    label: "Elements",
    d: "M5 3v4M3 5h4M6 17v4m-2-2h4M13 4l2.5 5.5L21 12l-5.5 2.5L13 20l-2.5-5.5L5 12l5.5-2.5L13 4Z",
  },
];

type ToolId = "media" | "audio" | "subtitles" | "text" | "elements";

function fmt(t: number) {
  const s = Math.floor(t);
  const cs = Math.floor((t - s) * 10);
  return `0:${String(s).padStart(2, "0")}.${cs}`;
}

export function EditorDemo() {
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [activeTool, setActiveTool] = useState<ToolId>("subtitles");
  const [selectedClip, setSelectedClip] = useState<number | null>(null);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [capColor, setCapColor] = useState(CAP_COLORS[0]);
  const [textStyle, setTextStyle] = useState<string | null>(null);
  const [stickers, setStickers] = useState<string[]>([]);
  const [volume, setVolume] = useState(80);

  const raf = useRef(0);
  const last = useRef<number | null>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const scrubbing = useRef(false);
  const wasPlaying = useRef(false);

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

  const seekFromPointer = (e: React.PointerEvent) => {
    const el = tlRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - r.left, 0), r.width);
    setTime((x / r.width) * DURATION);
  };

  const onScrubStart = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    scrubbing.current = true;
    wasPlaying.current = playing;
    setPlaying(false);
    seekFromPointer(e);
  };
  const onScrubMove = (e: React.PointerEvent) => {
    if (scrubbing.current) seekFromPointer(e);
  };
  const onScrubEnd = () => {
    if (!scrubbing.current) return;
    scrubbing.current = false;
    if (wasPlaying.current) setPlaying(true);
  };

  const seekTo = (t: number) => setTime(Math.min(Math.max(t, 0), DURATION - 0.01));
  const activeClip = CLIPS.findIndex((c) => time >= c.start && time < c.end);
  const phrase = PHRASES.find((p) => time >= p.start && time <= p.end);
  const progress = (time / DURATION) * 100;
  const chosenText = TEXT_STYLES.find((t) => t.id === textStyle);

  const toggleSticker = (emoji: string) =>
    setStickers((s) => (s.includes(emoji) ? s.filter((e) => e !== emoji) : [...s, emoji]));

  return (
    <div className="demo" id="demo" aria-label="Interactive preview of the Vireo video editor">
      <div className="vd-frame">
        {/* top bar */}
        <div className="vd-top">
          <span className="vd-proj">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            <b>summer-trip reel</b>
            <em>Auto-saved</em>
          </span>
          <span className="vd-history" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 14 5-5-5-5M20 9H10a6 6 0 0 0 0 12h3" />
            </svg>
          </span>
          <span className="vd-export">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            Export Video
          </span>
        </div>

        <div className="vd-main">
          {/* tool rail */}
          <div className="vd-rail" role="tablist" aria-label="Editor tools">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTool === t.id}
                className={`vd-tool${activeTool === t.id ? " on" : ""}`}
                onClick={() => setActiveTool(t.id)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={t.d} />
                </svg>
                {t.label}
              </button>
            ))}
          </div>

          {/* tool panel */}
          <div className="vd-panel">
            {activeTool === "media" && (
              <>
                <h5>Media</h5>
                <div className="vd-media-grid">
                  {CLIPS.map((c, i) => (
                    <button
                      key={c.name}
                      className={`vd-media${selectedClip === i ? " sel" : ""}`}
                      onClick={() => {
                        setSelectedClip(i);
                        seekTo(c.start);
                      }}
                    >
                      <span className="thumb" style={{ background: c.grad }} aria-hidden="true"></span>
                      <span className="nm">{c.name}</span>
                      <span className="dr">{(c.end - c.start).toFixed(1)}s</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeTool === "audio" && (
              <>
                <h5>Audio</h5>
                <div className="vd-audio-card">
                  <span className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  </span>
                  <span>
                    <b>sunset-lofi.mp3</b>
                    <small>0:18 · beat-synced</small>
                  </span>
                </div>
                <label className="vd-slider">
                  Volume <b>{volume}%</b>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                </label>
              </>
            )}

            {activeTool === "subtitles" && (
              <>
                <h5>Subtitles</h5>
                <label className="vd-switch">
                  <input
                    type="checkbox"
                    checked={captionsOn}
                    onChange={(e) => setCaptionsOn(e.target.checked)}
                  />
                  <i aria-hidden="true"></i> Auto subtitles
                </label>
                <div className="vd-swatches" role="group" aria-label="Highlight color">
                  {CAP_COLORS.map((c) => (
                    <button
                      key={c}
                      className={`vd-swatch${capColor === c ? " sel" : ""}`}
                      style={{ background: c }}
                      onClick={() => setCapColor(c)}
                      aria-label={`Highlight color ${c}`}
                    />
                  ))}
                </div>
                <div className="vd-sub-list">
                  {PHRASES.map((p) => (
                    <button
                      key={p.start}
                      className={`vd-sub${phrase === p ? " on" : ""}`}
                      onClick={() => seekTo(p.start)}
                    >
                      <small>{fmt(p.start)}</small>
                      {p.words.join(" ")}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeTool === "text" && (
              <>
                <h5>Text</h5>
                <p className="vd-hint">Tap a style to add it to the canvas.</p>
                {TEXT_STYLES.map((t) => (
                  <button
                    key={t.id}
                    className={`vd-text-preset ${t.id}${textStyle === t.id ? " sel" : ""}`}
                    onClick={() => setTextStyle(textStyle === t.id ? null : t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </>
            )}

            {activeTool === "elements" && (
              <>
                <h5>Elements</h5>
                <p className="vd-hint">Tap to add stickers.</p>
                <div className="vd-emoji-grid">
                  {STICKERS.map((s) => (
                    <button
                      key={s.emoji}
                      className={`vd-emoji${stickers.includes(s.emoji) ? " sel" : ""}`}
                      onClick={() => toggleSticker(s.emoji)}
                    >
                      {s.emoji}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* stage */}
          <div className="vd-stage">
            <button
              className="vd-canvas"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause preview" : "Play preview"}
            >
              {CLIPS.map((c, i) => (
                <span
                  key={c.name}
                  className="vd-scene"
                  style={{ background: c.grad, opacity: activeClip === i ? 1 : 0 }}
                  aria-hidden="true"
                ></span>
              ))}
              <span className="vd-grain" aria-hidden="true"></span>
              <span className="vd-chip">9:16 · Reels</span>
              {chosenText && <span className={`vd-overlay ${chosenText.id}`}>{chosenText.text}</span>}
              {STICKERS.filter((s) => stickers.includes(s.emoji)).map((s) => (
                <span key={s.emoji} className="vd-sticker" style={{ top: s.top, left: s.left }} aria-hidden="true">
                  {s.emoji}
                </span>
              ))}
              {captionsOn && phrase && (
                <span className="vd-cap">
                  {phrase.words.map((w, i) => {
                    const wStart =
                      phrase.start + ((phrase.end - phrase.start) / phrase.words.length) * i;
                    return (
                      <span
                        key={i}
                        className="w"
                        style={time >= wStart ? { opacity: 1, color: capColor } : undefined}
                      >
                        {w}{" "}
                      </span>
                    );
                  })}
                </span>
              )}
              {!playing && (
                <span className="vd-bigplay" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* playback controls */}
        <div className="vd-controls">
          <span className="vd-sel">
            {selectedClip !== null ? CLIPS[selectedClip].name : "4 clips · beat-synced"}
          </span>
          <span className="vd-transport">
            <button onClick={() => seekTo(time - 2)} aria-label="Back 2 seconds">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 19 4 12l7-7M20 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="vd-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
              {playing ? (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button onClick={() => seekTo(time + 2)} aria-label="Forward 2 seconds">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m13 5 7 7-7 7M4 5l7 7-7 7" />
              </svg>
            </button>
            <span className="vd-time">
              {fmt(time)} <em>/ 0:18.0</em>
            </span>
          </span>
          <span className="vd-zoom" aria-hidden="true">
            <i></i>
            <b>Fit</b>
          </span>
        </div>

        {/* timeline */}
        <div
          className="vd-timeline"
          ref={tlRef}
          onPointerDown={onScrubStart}
          onPointerMove={onScrubMove}
          onPointerUp={onScrubEnd}
          onPointerCancel={onScrubEnd}
          aria-label="Timeline — drag to scrub"
        >
          <div className="vd-ruler" aria-hidden="true">
            {Array.from({ length: DURATION + 1 }, (_, s) => (
              <span key={s} className={s % 3 === 0 ? "tick big" : "tick"} style={{ left: `${(s / DURATION) * 100}%` }}>
                {s % 3 === 0 ? `${s}s` : ""}
              </span>
            ))}
          </div>

          <div className={`vd-track vd-subs${captionsOn ? "" : " off"}`}>
            {PHRASES.map((p) => (
              <span
                key={p.start}
                className="vd-block"
                style={{
                  left: `${(p.start / DURATION) * 100}%`,
                  width: `${((p.end - p.start) / DURATION) * 100}%`,
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  seekTo(p.start);
                }}
              >
                {p.words.join(" ")}
              </span>
            ))}
          </div>

          <div className="vd-track vd-video">
            {CLIPS.map((c, i) => (
              <span
                key={c.name}
                className={`vd-clip${selectedClip === i ? " sel" : ""}`}
                style={{
                  left: `${(c.start / DURATION) * 100}%`,
                  width: `${((c.end - c.start) / DURATION) * 100}%`,
                  background: c.grad,
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setSelectedClip(selectedClip === i ? null : i);
                  seekTo(c.start);
                }}
              >
                {c.name}
              </span>
            ))}
          </div>

          <div className="vd-track vd-audio" style={{ opacity: 0.35 + (volume / 100) * 0.65 }}>
            <span className="nm">sunset-lofi.mp3</span>
            {WAVE.map((h, i) => (
              <i key={i} style={{ height: `${Math.max(12, (h * volume) / 100)}%` }}></i>
            ))}
          </div>

          <div className="vd-playhead" style={{ left: `${progress}%` }} aria-hidden="true"></div>
        </div>
      </div>
    </div>
  );
}
