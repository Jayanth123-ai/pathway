"use client";

import { useEffect, useState } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(!window.localStorage.getItem("pathway-cookie-consent")), []);
  const choose = (choice: "accepted" | "essential") => { window.localStorage.setItem("pathway-cookie-consent", choice); setVisible(false); };
  if (!visible) return null;
  return <aside className="cookie-consent" aria-label="Cookie consent"><b>Your privacy, your choice.</b><p>We use essential cookies to keep PATHWAY secure and optional analytics to improve it.</p><div><button className="cookie-minimal" onClick={() => choose("essential")}>Essential only</button><button className="cookie-accept" onClick={() => choose("accepted")}>Accept all</button></div><a href="/cookies">Cookie policy</a></aside>;
}
