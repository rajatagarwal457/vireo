"use client";

import { useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function EarlyAccessForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [sent, setSent] = useState(false);

  function validate() {
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "That doesn’t look like a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form-card">
        <div className="sent">
          <div className="ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-11" />
            </svg>
          </div>
          <h3>You’re on the list!</h3>
          <p>
            Thanks, {name.trim().split(" ")[0]} — your early-access request is in. We’ll email{" "}
            {email.trim()} shortly.
          </p>
          <button
            type="button"
            className="again"
            onClick={() => {
              setSent(false);
              setName("");
              setEmail("");
              setErrors({});
            }}
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="form-card">
      <form onSubmit={onSubmit} noValidate>
        <div className={`form-error${hasErrors ? " show" : ""}`} role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
          <span>Please fix the highlighted fields below.</span>
        </div>
        <div className={`field${errors.name ? " invalid" : ""}`}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Alex Carter"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.trim()) setErrors((p) => ({ ...p, name: undefined }));
            }}
          />
          {errors.name && (
            <span className="err">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
              {errors.name}
            </span>
          )}
        </div>
        <div className={`field${errors.email ? " invalid" : ""}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@email.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (EMAIL_RE.test(e.target.value.trim())) setErrors((p) => ({ ...p, email: undefined }));
            }}
          />
          {errors.email && (
            <span className="err">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
              {errors.email}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="role">What do you make?</label>
          <select id="role" name="role" defaultValue="">
            <option value="" disabled>
              Select one…
            </option>
            <option>Short-form / Reels &amp; TikTok</option>
            <option>YouTube videos</option>
            <option>Brand / agency content</option>
            <option>Just exploring</option>
          </select>
        </div>
        <button type="submit" className="btn btn-lime">
          Request early access
        </button>
        <p className="fineprint">We’ll only email you about your Vireo invite.</p>
      </form>
    </div>
  );
}
