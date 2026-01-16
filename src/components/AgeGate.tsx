"use client";

import { useState } from "react";

const STORAGE_KEY = "dth-age-verified";

export default function AgeGate() {
  const [checked, setChecked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  });

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
    setChecked(true);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  if (checked) return null;

  return (
    <div className="age-overlay">
      <div className="age-card">
        <p className="eyebrow">Adults only</p>
        <h3>21+ to enter.</h3>
        <p className="muted">By continuing you confirm you are 21 or older.</p>
        <div className="cta-row" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={handleAccept}>
            I am 21+
          </button>
          <button className="btn ghost" onClick={handleExit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
