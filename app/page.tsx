import { Nav } from "@/components/Nav";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { EditorDemo } from "@/components/EditorDemo";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";

const FAQS = [
  {
    q: "What is Vireo?",
    a: "Vireo is an AI video editor for creators. You upload raw clips and a music track, describe the video you want in plain English, and Vireo edits a post-ready vertical video — with beat-synced cuts, captions, and transitions — in seconds.",
  },
  {
    q: "Which platforms does Vireo edit for?",
    a: "Vireo is vertical-first: it produces 9:16 videos optimized for TikTok, Instagram Reels, and YouTube Shorts, and automatically reframes your footage to keep the action in frame.",
  },
  {
    q: "Do I need video editing experience?",
    a: "No. There's no timeline scrubbing or keyframing required. You brief Vireo the way you'd brief a human editor — the vibe, the length, the platform — and it does the cutting.",
  },
  {
    q: "Can I use my own music?",
    a: "Yes. Upload any track and Vireo analyzes it, syncs cuts to the beat, and rides the drop. You can also just describe the sound you want.",
  },
  {
    q: "How much does Vireo cost?",
    a: "Vireo is free during early access. No credit card required — just request an invite and start editing.",
  },
];

const TWEETS = [
  {
    name: "Maya Rivera",
    handle: "@mayamakes",
    avatar: "",
    initial: "M",
    verified: true,
    body: (
      <>
        ok <span className="hl">@vireo</span> is unfair. dumped 11 messy clips, typed{" "}
        <b>&ldquo;make it a 22s reel, hype, cut to the beat&rdquo;</b> and had a postable edit
        before my coffee. then just said &ldquo;tighten the intro&rdquo; and it… did 😭
      </>
    ),
    stats: ["312", "1.2K", "9.4K"],
  },
  {
    name: "Leo Fontaine",
    handle: "@leoshootsfilm",
    avatar: "c",
    initial: "L",
    verified: false,
    body: (
      <>
        the beat-syncing is the part that got me. dropped in my own track and the cuts just landed
        on the transients. i&rsquo;ve spent years doing that by hand.
      </>
    ),
    stats: ["47", "206", "1.8K"],
  },
  {
    name: "Priya Nair",
    handle: "@priyacreates",
    avatar: "d",
    initial: "P",
    verified: true,
    body: (
      <>
        went from 2 reels a week to 2 a day. not because i&rsquo;m faster — because i finally
        don&rsquo;t dread the editing part. this is a real unlock for solo creators.
      </>
    ),
    stats: ["133", "512", "3.9K"],
  },
  {
    name: "Jordan Pak",
    handle: "@jpakshoots",
    avatar: "b",
    initial: "J",
    verified: true,
    body: <>replaced my whole editing weekend with one upload. wild.</>,
    stats: ["88", "430", "2.7K"],
  },
  {
    name: "Devon Carter",
    handle: "@dcartermedia",
    avatar: "e",
    initial: "D",
    verified: false,
    body: (
      <>
        was fully ready to hate this. AI editors are usually a mess. but the auto-captions actually
        matched my brand font and it kept the cuts <b>tasteful</b>. didn&rsquo;t overstuff
        transitions. impressed tbh.
      </>
    ),
    clip: "reel-final.mp4 · 0:19",
    stats: ["61", "318", "2.4K"],
  },
  {
    name: "Sofia Brenner",
    handle: "@sofiabrenner",
    avatar: "f",
    initial: "S",
    verified: false,
    body: (
      <>
        i run socials for 3 small clients and never learned Premiere. told{" "}
        <span className="hl">@vireo</span> the vibe in plain english for each and had a week of
        content by lunch. this is the tool i&rsquo;ve been waiting for.
      </>
    ),
    stats: ["94", "377", "3.1K"],
  },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vireo.video";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Vireo",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description: "Vireo is the AI video editor for creators, backed by Entrepreneurs First.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Vireo",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Vireo",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      description:
        "AI video editor for creators. Upload clips, describe the vibe, and get a post-ready vertical video for TikTok, Reels & Shorts — beat-synced cuts, auto-captions, drafts in seconds.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free during early access" },
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

function XLogo() {
  return (
    <span className="x-logo" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    </span>
  );
}

function Verified() {
  return (
    <svg className="verified" viewBox="0 0 24 24" fill="currentColor" aria-label="Verified account">
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34Zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77Z" />
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="top">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">
                <span className="dot" aria-hidden="true"></span> AI video editor for creators —
                backed by EF
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="hero-title" id="hero-title">
                Make scroll-stopping videos by just{" "}
                <span className="hl">
                  describing
                  <svg viewBox="0 0 120 12" preserveAspectRatio="none" fill="none" aria-hidden="true">
                    <path
                      d="M3 9c30-6 84-7 114-3"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                them.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero-sub">
                Upload your clips, drop in a track, and tell Vireo the vibe you&rsquo;re going for.
                It edits a post-ready video for TikTok, Reels &amp; Shorts in seconds — beat-synced
                cuts, auto-captions, zero timeline scrubbing.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-actions">
                <a href="#try" className="btn btn-green">
                  Try Vireo free
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="#demo" className="btn btn-ghost">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" stroke="none" />
                  </svg>
                  See it in action
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="hero-trust">
                <span className="stars" aria-label="Rated 4.9 out of 5 by early creators">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  4.9/5 from early creators
                </span>
                <span className="sep" aria-hidden="true"></span>
                <span className="ef-badge">
                  <span className="efbox" aria-hidden="true">
                    EF
                  </span>
                  Backed by Entrepreneurs First
                </span>
                <span className="sep" aria-hidden="true"></span>
                <span>TikTok · Reels · Shorts</span>
              </div>
            </Reveal>

            {/* EDITOR DEMO */}
            <Reveal delay={380}>
              <EditorDemo />
            </Reveal>
          </div>
        </section>

        {/* LOGO STRIP */}
        <div className="logo-strip">
          <div className="wrap">
            <p>Trusted by 2,400+ creators &amp; teams</p>
            <div className="logo-row" aria-hidden="true">
              <span>lumen&amp;co</span>
              <span>REELCRAFT</span>
              <span>studio nomad</span>
              <span>PULSE.media</span>
              <span>okframe</span>
              <span>viralist</span>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <section id="how" aria-labelledby="how-title">
          <div className="wrap">
            <Reveal className="sec-head">
              <p className="kicker">How it works</p>
              <h2 className="sec-title" id="how-title">
                From raw clips to a posted reel in <span className="hl">four steps.</span>
              </h2>
              <p>
                No timeline scrubbing, no keyframes. Just bring the footage and brief Vireo like
                you&rsquo;d brief a great editor.
              </p>
            </Reveal>
            <Reveal className="steps">
              <div className="step">
                <span className="n">1</span>
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  </svg>
                </span>
                <h3>Upload your clips</h3>
                <p>Drag in raw footage from your phone or camera — as many takes as you&rsquo;ve got.</p>
              </div>
              <div className="step">
                <span className="n">2</span>
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 12h10M4 18h7" />
                    <circle cx="18" cy="16" r="3" />
                    <path d="M21 16V9l-3 1" />
                  </svg>
                </span>
                <h3>Describe it + add audio</h3>
                <p>Say the vibe, length, and platform. Upload a track or tell Vireo the sound you want.</p>
              </div>
              <div className="step">
                <span className="n">3</span>
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4" />
                    <path d="m13 4 2.5 5.5L21 12l-5.5 2.5L13 20l-2.5-5.5L5 12l5.5-2.5L13 4Z" />
                  </svg>
                </span>
                <h3>Vireo edits the video</h3>
                <p>It cuts, paces to the beat, adds captions and transitions — a post-ready first draft.</p>
              </div>
              <div className="step">
                <span className="n">4</span>
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 16V8m0 8 8 5V3l-8 5m0 8-8 5V3l8 5" />
                  </svg>
                </span>
                <h3>Refine &amp; export</h3>
                <p>&ldquo;Punch up the intro,&rdquo; &ldquo;cut the dead air,&rdquo; &ldquo;swap the hook.&rdquo; Vireo re-edits on the fly.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" aria-labelledby="features-title">
          <div className="wrap">
            <Reveal className="sec-head">
              <p className="kicker">Why Vireo</p>
              <h2 className="sec-title" id="features-title">
                An editor that <span className="hl">listens</span>, not a timeline that fights you.
              </h2>
            </Reveal>
            <div className="bento">
              <Reveal className="cell dark tall">
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4" />
                    <path d="m13 4 2.5 5.5L21 12l-5.5 2.5L13 20l-2.5-5.5L5 12l5.5-2.5L13 4Z" />
                  </svg>
                </span>
                <h3>Describe-to-edit</h3>
                <p>
                  Edit by describing. Every instruction re-cuts the video instantly — no scrubbing
                  required.
                </p>
                <div className="mock-caps" aria-hidden="true">
                  <span className="hot">make the first 3s punchier</span>
                  <span>Tightened the hook and added a snap cut on the beat ✅</span>
                  <span className="hot">add captions, bigger font</span>
                </div>
              </Reveal>
              <Reveal className="cell mint" delay={80}>
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </span>
                <h3>Bring your own sound</h3>
                <p>Upload a track or describe it. Vireo cuts to the beat and rides the drop.</p>
              </Reveal>
              <Reveal className="cell lilac" delay={160}>
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="7" y="3" width="10" height="18" rx="2" />
                    <path d="M11 6h2" />
                  </svg>
                </span>
                <h3>Born vertical</h3>
                <p>9:16 by default — perfect for Reels, TikTok &amp; Shorts. Reframes the action automatically.</p>
              </Reveal>
              <Reveal className="cell peach" delay={80}>
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7V5a2 2 0 0 1 2-2h2M4 17v2a2 2 0 0 0 2 2h2M16 3h2a2 2 0 0 1 2 2v2M16 21h2a2 2 0 0 0 2-2v-2" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <h3>Auto-captions that pop</h3>
                <p>Word-by-word captions, styled to match — punched up on the beat, no typing.</p>
              </Reveal>
              <Reveal className="cell sky" delay={160}>
                <span className="ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
                  </svg>
                </span>
                <h3>Drafts in seconds</h3>
                <p>From upload to a watchable first cut faster than you can open a timeline.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CREATORS */}
        <section id="creators" aria-labelledby="creators-title">
          <div className="wrap">
            <Reveal className="sec-head">
              <p className="kicker">Loved by creators</p>
              <h2 className="sec-title" id="creators-title">
                The internet is already <span className="hl">talking.</span>
              </h2>
              <p>Early creators are shipping more, faster — and telling everyone about it.</p>
            </Reveal>
            <Reveal className="stat-strip">
              <div className="stat-pill">
                <span className="big">4×</span>
                <span>faster to a posted video</span>
              </div>
              <div className="stat-pill">
                <span className="big">18s</span>
                <span>median time to first cut</span>
              </div>
              <div className="stat-pill">
                <span className="big">2,400+</span>
                <span>creators on the waitlist</span>
              </div>
            </Reveal>
            <Reveal className="tweet-wall">
              {TWEETS.map((t) => (
                <figure className="tw" key={t.handle}>
                  <div className="tw-head">
                    <span className={`avatar ${t.avatar}`.trim()} aria-hidden="true">
                      {t.initial}
                    </span>
                    <span className="nm">
                      <span className="row">
                        {t.name} {t.verified && <Verified />}
                      </span>
                      <span className="h">{t.handle}</span>
                    </span>
                    <XLogo />
                  </div>
                  <blockquote className="tw-body">{t.body}</blockquote>
                  {t.clip && (
                    <span className="clip-chip">
                      <span className="ic" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      {t.clip}
                    </span>
                  )}
                  <div className="tw-foot" aria-hidden="true">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
                      </svg>
                      {t.stats[0]}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 1l4 4-4 4" />
                        <path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4" />
                        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                      </svg>
                      {t.stats[1]}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
                      </svg>
                      {t.stats[2]}
                    </span>
                  </div>
                </figure>
              ))}
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title">
          <div className="wrap">
            <Reveal className="sec-head">
              <p className="kicker">FAQ</p>
              <h2 className="sec-title" id="faq-title">
                Questions, <span className="hl">answered.</span>
              </h2>
            </Reveal>
            <Reveal className="faq">
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        {/* TRY / CTA */}
        <section id="try" aria-labelledby="try-title">
          <div className="wrap">
            <Reveal className="try-wrap">
              <div className="try-grid">
                <div>
                  <p className="kicker">Try the product</p>
                  <h2 id="try-title">
                    Get early access to <span className="hl">Vireo.</span>
                  </h2>
                  <p className="lead">
                    Be one of the first creators to edit videos just by describing them. Tell us
                    where to send your invite.
                  </p>
                  <ul className="try-perks">
                    <li>
                      <span className="ck" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5 9-11" />
                        </svg>
                      </span>
                      Free during early access
                    </li>
                    <li>
                      <span className="ck" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5 9-11" />
                        </svg>
                      </span>
                      Bring your own clips &amp; audio
                    </li>
                    <li>
                      <span className="ck" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5 9-11" />
                        </svg>
                      </span>
                      No credit card, no timeline software
                    </li>
                  </ul>
                </div>
                <EarlyAccessForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <a href="#top" className="brand" aria-label="Vireo home">
                <span className="mark" aria-hidden="true">
                  <Logo size={28} />
                </span>
                Vireo
              </a>
              <p>
                The AI video editor you brief like a human. Upload, describe, and ship
                scroll-stopping videos for every feed.
              </p>
              <div style={{ marginTop: 20 }}>
                <span className="ef-badge">
                  <span className="efbox" aria-hidden="true">
                    EF
                  </span>
                  Backed by Entrepreneurs First
                </span>
              </div>
            </div>
            <nav className="foot-cols" aria-label="Footer navigation">
              <div className="foot-col">
                <h4>Product</h4>
                <a href="#demo">Product demo</a>
                <a href="#how">How it works</a>
                <a href="#features">Features</a>
                <a href="#try">Early access</a>
              </div>
              <div className="foot-col">
                <h4>Company</h4>
                <a href="#creators">Creators</a>
                <a href="#faq">FAQ</a>
                <a href="#try">Contact</a>
              </div>
              <div className="foot-col">
                <h4>Social</h4>
                <a href="https://x.com" rel="noopener noreferrer" target="_blank">
                  X / Twitter
                </a>
                <a href="https://instagram.com" rel="noopener noreferrer" target="_blank">
                  Instagram
                </a>
                <a href="https://tiktok.com" rel="noopener noreferrer" target="_blank">
                  TikTok
                </a>
              </div>
            </nav>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Vireo. All rights reserved.</span>
            <span>Made for creators · Vertical-first</span>
          </div>
        </div>
      </footer>
    </>
  );
}
