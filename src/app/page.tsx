import Image from "next/image";
import InventoryGrid from "@/components/InventoryGrid";
import AgeGate from "@/components/AgeGate";
import SocialIcon from "@/components/SocialIcon";
import "./home.css";

const heroPills = ["Glass that glows", "CBD that works", "Vapes verified", "Hookah nights"];

const dropHighlights = [
  {
    tag: "Drops",
    title: "Trap Kits",
    body: "Bundles built for sesh, travel, and host mode. Limited runs with glass, torches, storage, and odor control.",
  },
  {
    tag: "Local",
    title: "Artist collabs",
    body: "Denver and RiNo glass artists on rotation. Keep the heat in-store and online with Korona-stocked quantities.",
  },
];

const categoryTiles = [
  { title: "Glass gallery", body: "Headies, daily drivers, and UV-reactive pieces that belong on your shelf." },
  { title: "Vapes & disposables", body: "Lab-verified lines and terp profiles you can actually pick." },
  { title: "CBD + wellness", body: "Topicals, gummies, tinctures, and sleep-friendly stacks." },
  { title: "Hookah & lifestyle", body: "Coals, hoses, torches, storage, odor control, and the finishing touches." },
];

const systemPoints = [
  "Korona POS sync keeps pricing and stock true to the register.",
  "Cart and checkout will run through high-risk friendly gateway (NMI/Authorize.Net).",
  "Pickup-first flow; delivery rules optional once you’re ready.",
  "Bundled SKUs and drops featured without breaking POS data.",
];

const visitCards = [
  {
    title: "Location",
    body: "2193 W Evans Ave, Denver, CO 80223. Parking-friendly and easy to find.",
  },
  {
    title: "Hours",
    body: "Night-owl friendly hours posted at soft launch.",
  },
  {
    title: "Talk to us",
    body: "Artists, vendors, collabs welcome. Tell us what to stock or call the shop.",
    cta: "sales@denvertraphouse.com",
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <div className="glow-layer" />
      <div className="grid-layer" />
      <AgeGate />
      <div className="container">
        <header className="nav-bar">
          <div className="brand-block">
            <div className="brand-logo">
              <Image src="/trap-house-logo-sm.png" alt="Denver Trap House logo" width={64} height={64} priority />
            </div>
            <div>
              <p className="eyebrow">Denver, CO</p>
              <h1 className="brand-title">Denver Trap House</h1>
              <p className="muted">Smoke shop + digital marketplace</p>
            </div>
          </div>
          <div className="nav-actions">
            <a href="#lineup">Lineup</a>
            <a href="#drops">Drops</a>
            <a href="#visit">Visit</a>
            <a href="/shop">Shop</a>
            <a href="/cart">Cart</a>
            <a href="/account">Account</a>
            <span className="pill neon">Korona synced</span>
          </div>
          <div className="social-row top">
            <a href="https://www.instagram.com/denvertraphouse" aria-label="Instagram" target="_blank" rel="noreferrer">
              <SocialIcon kind="instagram" />
            </a>
            <a href="https://www.tiktok.com/@denvertraphouse" aria-label="TikTok" target="_blank" rel="noreferrer">
              <SocialIcon kind="tiktok" />
            </a>
            <a href="https://x.com/DenverTrapHouse" aria-label="X" target="_blank" rel="noreferrer">
              <SocialIcon kind="x" />
            </a>
            <a href="https://www.facebook.com/denvertraphouse" aria-label="Facebook" target="_blank" rel="noreferrer">
              <SocialIcon kind="facebook" />
            </a>
          </div>
        </header>

        <main>
          <section className="hero" id="top">
            <div className="hero-text">
              <p className="eyebrow">Stoner / new-age / futuristic</p>
              <h2>Glass, vapes, CBD, and lifestyle with the loudest branding in Denver.</h2>
              <p className="lead">
                Trap House blends the in-store vibe with a Korona-powered marketplace. Real stock, real pricing, no gas
                station energy.
              </p>
              <div className="pill-row">
                {heroPills.map((pill) => (
                  <span key={pill} className="pill soft">
                    {pill}
                  </span>
                ))}
              </div>
            <div className="cta-row">
              <a className="btn primary" href="#lineup">
                Shop the lineup
              </a>
              <a className="btn ghost" href="#visit">
                See the shop plan
              </a>
              <a className="btn ghost" href="tel:3037895233">
                Call 303.789.5233
              </a>
              <a className="btn" href="/shop">
                Enter shop
              </a>
            </div>
          </div>
            <div className="hero-art">
              <div className="art-card">
                <div className="badge">Live sync</div>
                <h3>Korona data fuels the site.</h3>
                <p className="muted">Inventory, pricing, and availability flow straight from POS to web.</p>
              </div>
              <div className="hero-logos">
                <div className="logo-wrap">
                  <Image src="/trap-house-logo-sm.png" alt="Trap House mascot logo" width={320} height={320} priority />
                </div>
                <div className="logo-wrap skyline">
                  <Image src="/denver-skyline-sm.png" alt="Denver skyline art" width={440} height={240} priority />
                </div>
              </div>
            </div>
          </section>

          <section className="section drops" id="drops">
            <div className="section-head">
              <p className="eyebrow">Drops & features</p>
              <h3>Louder merchandising, built for the brand.</h3>
            </div>
            <div className="card-grid two">
              {dropHighlights.map((drop) => (
                <article className="glass-card tilt" key={drop.title}>
                  <div className="pill outline">{drop.tag}</div>
                  <h4>{drop.title}</h4>
                  <p className="muted">{drop.body}</p>
                </article>
              ))}
              <article className="glass-card focus">
                <div className="pill neon">Checkout</div>
                <h4>High-risk ready: NMI / Authorize.Net.</h4>
                <p className="muted">
                  PaymentCloud placement, hosted payment page, and Korona-side inventory checks keep us compliant while
                  we sell glass, kratom, and lifestyle goods.
                </p>
              </article>
            </div>
          </section>

          <section className="section carry" id="lineup">
            <div className="section-head">
              <p className="eyebrow">What we carry</p>
              <h3>Curated inventory, synced to Korona POS.</h3>
            </div>
            <div className="card-grid four">
              {categoryTiles.map((tile) => (
                <article className="tile-card" key={tile.title}>
                  <h4>{tile.title}</h4>
                  <p className="muted">{tile.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section lineup">
            <div className="section-head">
              <p className="eyebrow">Live lineup</p>
              <h3>Real-time inventory feed (mocked until Korona keys land).</h3>
              <p className="muted">
                This grid pulls from the API route. Once your Korona credentials are live, it will reflect register stock
                and pricing.
              </p>
            </div>
            <InventoryGrid />
          </section>

          <section className="section system">
            <div className="section-head">
              <p className="eyebrow">System flow</p>
              <h3>How the Korona + checkout integration will ship.</h3>
            </div>
            <ul className="system-list">
              {systemPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="section visit" id="visit">
            <div className="section-head">
              <p className="eyebrow">Visit</p>
              <h3>Denver Trap House storefront.</h3>
            </div>
            <div className="location-block">
              <div>
                <p className="muted">Denver Trap House</p>
                <h4>2193 W Evans Ave</h4>
                <p className="muted">Denver, CO 80223</p>
                <p className="muted">
                  Phone: <a href="tel:3037895233">303.789.5233</a>
                </p>
              </div>
              <div className="map-card">
                <iframe
                  title="Denver Trap House map"
                  loading="lazy"
                  src="https://www.google.com/maps?q=2193%20W%20Evans%20Ave%20Denver%20CO%2080223&output=embed"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="card-grid three">
              {visitCards.map((card) => (
                <article className="visit-card" key={card.title}>
                  <h4>{card.title}</h4>
                  <p className="muted">{card.body}</p>
                  {card.cta && (
                    <p className="tiny">
                      <a href={`mailto:${card.cta}`}>{card.cta}</a>
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
            <p className="muted">Built loud on purpose. Korona-synced and checkout ready.</p>
          </div>
          <div className="pill-row">
            <span className="pill soft">Glass</span>
            <span className="pill soft">CBD</span>
            <span className="pill soft">Vapes</span>
            <span className="pill soft">Hookah</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
