# Denver Trap House — Smoke Shop + Marketplace

Stoner / new-age / futuristic site for Denver Trap House with Korona POS inventory wiring, neon brand energy, and a ready-to-go marketplace layout.

## Tech
- Next.js (App Router, TypeScript, CSS)
- API route for Korona POS inventory (`/api/inventory`)
- Assets live in `public/` (`trap-house-logo-sm.png`, `denver-skyline-sm.png`)

## Local dev
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Korona POS wiring
Set environment variables (copy `.env.example` → `.env.local`):
```
KORONA_API_BASE=https://api.korona.cloud/v3   # change if you self-host
KORONA_ORG_ID=YOUR_ORG_ID
KORONA_API_TOKEN=YOUR_TOKEN                   # or use basic auth below
# KORONA_API_USERNAME=your_username
# KORONA_API_PASSWORD=your_password
```
- The API route (`src/app/api/inventory/route.ts`) fetches products from Korona; if credentials are missing or fail, it falls back to the sample set in `src/lib/sampleInventory.ts`.
- Adjust the Korona endpoint query (sort, max) as needed for your catalog.

## Deployment (Vercel)
1) Push to GitHub (`https://github.com/BrandonRFreeman/denvertraphouse.git`).
2) In Vercel: **Add New Project** → import the repo → Framework: *Next.js* (defaults are fine).
3) Add environment variables from above in Vercel Project Settings → Environment Variables.
4) Deploy.

### Connect `denversmokeshop.com` (GoDaddy → Vercel)
1) In Vercel Project Settings → Domains: add `denversmokeshop.com` and `www.denversmokeshop.com`.
2) In GoDaddy DNS:
   - `A` record for `@` → `76.76.21.21`
   - `CNAME` record for `www` → `cname.vercel-dns.com`
3) Back in Vercel, set `denversmokeshop.com` as primary after verification.

## Content & design notes
- Colors pulled from the provided Trap House mascot and Denver skyline art (neon lime, magenta, orange, cyan, yellow) on a dark base.
- Sections: hero, marketplace grid (Korona-powered), Korona highlight cards, vibe/brand cards, visit/contact info.
- Logos are optimized copies of the provided files (`trap-house-logo-sm.png`, `denver-skyline-sm.png`). Original hi-res assets remain in the repo root’s sibling folder `old-site-backup/` if needed.

## Next steps
- Swap in real Korona credentials and confirm the product shape; tweak the normalizer in `route.ts` if your API response differs.
- Add real product imagery (use Next/Image in `InventoryGrid`).
- Wire checkout/pickup flows once Korona online sales rules are set.
