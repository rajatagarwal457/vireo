"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand" aria-label="Vireo home">
          <span className="mark" aria-hidden="true">
            <Logo size={32} />
          </span>
          Vireo
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#demo">Product</a>
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#creators">Creators</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-cta">
          <a href="#try" className="btn btn-green">
            Try Vireo free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
