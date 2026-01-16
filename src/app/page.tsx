import Image from "next/image";
import InventoryGrid from "@/components/InventoryGrid";
import "./home.css";

const categories = [
  "Glass gallery",
  "CBD + wellness",
  "Vapes & disposables",
  "Hookah & coal",
  "Torches & storage",
  "Gifts & lifestyle",
];

const koronaHighlights = [
  {
    title: "Korona-connected",
    body: "Inventory, pricing, and availability flow straight from KORONA POS, so your online shelf is always true to the register.",
    tag: "API Sync",
  },
  {
    title: "Marketplace ready",
    body: "Built for carts, promos, and pickup. Flip on delivery or shipping rules once you are ready to take orders online.",
    tag: "Checkout",
  },
  {
    title: "Drops + kits",
    body: "Feature artist collabs, terp-based bundles, and starter kits without breaking your POS flow.",
    tag: "Drops",
  },
];

const vibeCards = [
  {
    title: "Neon trap aesthetic",
    body: "Bold, playful, and a little chaotic — matching the house-with-arms mascot and Denver skyline splash.",
    tag: "Brand",
  },
  {
    title: "Budtender energy",
    body: "Staff picks, terp-y notes, and in-store recommendations surfaced online so customers can shop with confidence.",
    tag: "Hospitality",
  },
  {
    title: "Built for night runs",
    body: "Late-friendly vibe, quick pickup flows, and clear parking / access info once the doors open.",
    tag: "Convenience",
  },
];

const visitCards = [
  {
    title: "Location",
    body: "Denver storefront reveal coming soon. Central, accessible, and designed to show off the art.",
  },
  {
    title: "Hours",
    body: "Night-owl friendly. Final hours go live alongside the soft opening.",
  },
  {
    title: "Talk to us",
    body: "Artists, vendors, and event collabs are welcome. Tell us what to stock next.",
    cta: "hello@denvertraphouse.com",
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <div className="container">
        <header className="site-header">
          <div className="brand">
            <div className="brand-mark">
              <Image
                src="/trap-house-logo-sm.png"
                alt="Denver Trap House logo"
                width={58}
                height={58}
                priority
              />
            </div>
            <div>
              <p className="eyebrow">Denver, CO</p>
              <div className="brand-name">Denver Trap House</div>
              <div className="tagline">Smoke shop + digital marketplace</div>
            </div>
          </div>
          <div className="header-actions">
            <div className="pill glow">Live inventory synced with KORONA POS</div>
            <a className="pill" href="#visit">
              Visit soon
            </a>
          </div>
        </header>

        <main>
          <section className="hero" id="top">
            <div className="hero-copy">
              <p className="eyebrow">Stoner / new-age / futuristic vibe</p>
              <h1>Smoke shop energy with a plugged-in marketplace.</h1>
              <p className="lead">
                Real-time inventory pulled from KORONA POS, matched with the neon Trap House brand. Glass, vapes, CBD,
                hookah, and lifestyle goods that feel as loud as the art on your wall.
              </p>
              <div className="cta-row">
                <a className="btn primary" href="#inventory">
                  Shop live inventory
                </a>
                <a className="btn" href="#story">
                  See the vibe
                </a>
              </div>
              <div className="chips">
                {categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="floating-card">
                <p className="eyebrow">Always-on sync</p>
                <h3>Korona POS pipes data straight to the site.</h3>
                <p className="muted">
                  Inventory, pricing, and categories stream in automatically. No manual double-entry, no mismatched stock.
                </p>
                <div className="meta" style={{ marginTop: 12 }}>
                  <span className="dot" />
                  Live marketplace feed
                </div>
              </div>
              <div className="logo-stack">
                <div className="logo-tile">
                  <Image
                    src="/trap-house-logo-sm.png"
                    alt="Trap House mascot logo"
                    width={420}
                    height={420}
                    priority
                  />
                </div>
                <div className="logo-tile skyline-card">
                  <Image src="/denver-skyline-sm.png" alt="Denver skyline art" width={520} height={420} priority />
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="inventory">
            <div className="section-header">
              <p className="eyebrow">Marketplace</p>
              <h2>Live lineup from your POS — ready to sell online.</h2>
              <p className="section-sub">
                Products below load from the API (with featured picks as a backup). Pricing, availability, and categories
                all stay locked to Korona.
              </p>
            </div>
            <InventoryGrid />
          </section>

          <section className="section" id="connected">
            <div className="section-header">
              <p className="eyebrow">Korona native</p>
              <h2>POS-grade accuracy, web-grade experience.</h2>
              <p className="section-sub">
                The site ships with Korona API wiring and a product model built for smoke shop SKUs — glass attributes,
                strengths, and bundle pricing included.
              </p>
            </div>
            <div className="feature-grid">
              {koronaHighlights.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <div className="pill orange">{feature.tag}</div>
                  <h3>{feature.title}</h3>
                  <p className="muted">{feature.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="story">
            <div className="section-header">
              <p className="eyebrow">The vibe</p>
              <h2>Denver Trap House is loud, playful, and curated.</h2>
              <p className="section-sub">
                We lean into color, art, and local makers while keeping the experience clean, fast, and trustworthy.
              </p>
            </div>
            <div className="feature-grid">
              {vibeCards.map((card) => (
                <article className="feature-card" key={card.title}>
                  <div className="pill">{card.tag}</div>
                  <h3>{card.title}</h3>
                  <p className="muted">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="visit">
            <div className="section-header">
              <p className="eyebrow">Visit</p>
              <h2>Denver storefront, coming in hot.</h2>
              <p className="section-sub">
                Stay tuned for the block drop, hours, and launch events. We are building a space that matches the brand
                you see online.
              </p>
            </div>
            <div className="visit-grid">
              {visitCards.map((card) => (
                <article className="visit-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p className="muted">{card.body}</p>
                  {card.cta && (
                    <p className="tiny" style={{ marginTop: 8 }}>
                      Email: <a href={`mailto:${card.cta}`}>{card.cta}</a>
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <div>
            <p className="eyebrow">Denver Trap House</p>
            <p className="muted">Korona-synced smoke shop and marketplace built in Denver.</p>
          </div>
          <div className="chips">
            <span>Glass</span>
            <span>Vapes</span>
            <span>CBD</span>
            <span>Hookah</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
