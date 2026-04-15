# Geopol Command Prototype

This workspace now contains a self-contained browser prototype for a geopolitical command game shell. It is designed as a playable first slice of the concept you described:

- campaign setup with freeform country input
- year selection from `1910` to `2026`
- historical, alternate-history, and sandbox scenario modes
- dynamic UI theming based on country and era
- a real 3D globe view with live country borders when online, plus a local fallback map if border data fails to load
- left-side strategic domains that now expand into sub-domains
- 10 sub-domains per major domain with 20+ choices inside each sub-domain
- dynamic action forms with year-based anachronism guards
- campaign-start and turn-start director briefings with OOB, news, known foreign actions, and a detailed rundown
- turn resolution with incident generation, foreign moves, fog-of-war style summaries, and a history log
- unit roster generation for the player country
- mid-campaign scenario editing
- a debug menu for forcing crises and events

## Files

- [index.html](C:/Users/lemon/Downloads/geopolgame/index.html)
- [styles.css](C:/Users/lemon/Downloads/geopolgame/styles.css)
- [app.js](C:/Users/lemon/Downloads/geopolgame/app.js)

## Running It

Open [index.html](C:/Users/lemon/Downloads/geopolgame/index.html) in a browser.

No package install is required for this prototype. It is plain HTML, CSS, and JavaScript so the UI can be reviewed immediately.

The live globe border layer uses CDN scripts and a public country border dataset, so the real globe view needs an internet connection. If that load fails, the older local fallback map still renders.

## Current Scope

This is a strategic shell and simulation prototype, not yet a fully data-driven historical engine. The following pieces are intentionally stubbed or simulated:

- Perplexity Sonar, Llama, and other model providers are represented in the UI, but not connected to live APIs yet.
- The map is stylized and geopolitical rather than a true province-accurate border dataset.
- Order of battle, incidents, and foreign moves are generated from internal rules and era-aware templates instead of live web research.

## Good Next Steps

1. Replace the stylized map with real country and province geometry.
2. Add a backend service for live model orchestration and historical data retrieval.
3. Store campaign state and event history in persistent saves.
4. Expand country-specific unit libraries, doctrines, and scenario packs.
5. Add tooltips, search, filtering, and nested action categories for deeper domain browsing.
