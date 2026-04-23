# GEOPOLITICS: A Turn-Based Strategic Simulation Game

An ambitious, AI-driven grand strategy game built in React. Play as any nation across 1910-2026, make decisions through 11 strategic domains with 180+ contextual actions, and watch as Claude AI simulates a living, breathing world responding to your choices.

## Overview

GEOPOLITICS is a text-based geopolitical strategy game where you assume control of a nation and navigate a dynamically simulated world. Every turn, you choose actions across domains like Military, Diplomacy, Economics, Cyber Operations, Intelligence, and more. The AI generates consequences, world events, and the reactions of other powers—no scripted events, no predetermined outcomes.

**Key Features:**
- **Real-world map** with 177 countries and accurate borders (powered by Natural Earth)
- **11 strategic domains** with 180+ granular actions, each with detailed multi-field forms
- **AI-driven world** — Claude generates turn resolutions, NPC nation actions, crises, and diplomatic shifts in real-time
- **Dynamic thematic styling** — the UI adapts aesthetically based on your nation and era (Soviet 1985 feels different from modern USA)
- **Auto-save campaigns** — your progress persists between sessions
- **Anachronism prevention** — you can't launch cyber operations in 1914 or space missions before 1957
- **Debug event injection** — inject world events mid-game to steer the narrative

## Getting Started

### Prerequisites
- Node.js 14+ (for local development)
- React 18+
- An Anthropic API key (for turn resolution and world generation)

### Installation

It should be as simple as double-tapping the file in your file explorer!

## Gameplay

### Menus

**Campaign Creation:**
1. Choose a nation (any country name that matches ISO codes)
2. Set the start year (1910–2026)
3. Pick a scenario: Historical, Alternate History, or Sandbox
4. (Optional) Write a campaign premise to guide the AI's tone
5. Set turn duration (1 day, 1 week, 1 month, 3 months)

The AI generates a historically accurate starting state for your nation with leaders, military units, key concerns, and opening world events.

### The Game Screen

**Map:** A real-world 2D map showing all 177 countries. Your nation glows, allies are dimmed, rivals are red. Scroll/pinch to zoom, drag to pan. Tap countries to see their names.

**Domains Sidebar:** 11 buttons representing strategic categories. Click any domain to expand and see 15–20 contextual actions.

**Action Forms:** Select an action (e.g., "Declare War," "Launch Cyber Espionage," "Impose Sanctions"). Fill out the form with specifics:
- Multi-select dropdowns (force size, doctrine, delivery method)
- Text fields (target nation, region, coordinates)
- Textareas (justifications, parameters, strategic goals)

**History Log:** A scrolling record of events, world news, and incidents as they happen. Recent 6 entries shown; full log available in-game.

**Military Inventory:** View your ground forces, naval vessels, air wings, space assets, and CBRN capabilities—all fetched from historical data for the nation and year you're playing.

### Turn Resolution

After you submit an action, the AI:
1. Takes 20–60 seconds to process (live timer shows elapsed time)
2. Generates your action outcome (1–5 sentences, immersive)
3. Simulates 3–6 world events elsewhere (what other powers did)
4. Rolls 1–4 incidents (military, diplomatic, economic, intelligence)
5. Updates your allies/rivals if relationships shifted
6. Provides a cabinet briefing and incomplete intel on rivals' movements

Everything feels historical and specific—"Polish authorities arrest 47 Solidarity activists in Gdansk" not generic "unrest occurred."

## Domains & Actions (180+ total)

### Military (18 actions)
Declare war, mobilize forces, ground offensives/defenses, amphibious operations, air campaigns, naval strikes, submarine patrols, recon, force modernization, aircraft development, ground systems development, strategic redeployment, military exercises, ceasefires.

### Cyber (18 actions)
DDoS campaigns, ransomware deployment, data exfiltration, firmware/supply-chain attacks, zero-day stockpiling, information operations, botnet building, intrusions, destructive attacks, cyber defense hardening, threat hunts, public attribution, international cooperation, talent recruitment, election system probing, satellite hacking, AI poisoning, custom operations.

### CBRN (18 actions)
Chemical weapons programs, biological programs, nuclear weapons programs, nuclear testing, radiological capabilities, nuclear posture setting, tactical nuclear deployment, first-strike preparation, nuclear employment, chemical weapons employment, CBRN defense, treaty signing/withdrawal, inspection response, nuclear sharing, scientific recruitment, irregular CBRN plots, unilateral disarmament.

### Diplomacy (16 actions)
Recognize/de-recognize nations, propose alliances, summit meetings, formal protests, expel ambassadors, sever relations, mediation, international treaties, UN/international body actions, refugee policy, foreign aid, secret agreements, asylum grants/denials, cultural diplomacy.

### Economics (17 actions)
Sanctions, tariffs, trade agreements, currency intervention, nationalization/privatization, aid packages, industrial policy, resource strategy, debt/default action, monetary policy, economic blockades, tech export controls, strategic reserves, fiscal stimulus, major infrastructure projects, economic warfare escalation.

### Intelligence (16 actions)
Recruit HUMINT assets, SIGINT collection, covert political action, targeted elimination, coup support, counter-intelligence, surveillance programs, strategic deception, asset exfiltration, interrogation, OSINT intensification, cyber espionage, IC reorganization, intelligence sharing agreements, controlled leaks/disclosures, custom operations.

### Logistics (15 actions)
Build supply depots, expand rail networks, port development, fuel stockpiling, munitions stockpiling, strategic reserves, transport fleet expansion, forward logistics deployment, secure supply chains, attack adversary logistics, civilian logistics (wartime), medical/casualty systems, overseas pre-positioning, reroute trade flows, custom actions.

### Internal Security (15 actions)
Declare martial law, crackdown on dissent, political purges, propaganda campaigns, grant amnesty, constitutional reform, election policy, succession/leadership change, internal security forces, media control, ethnic/minority policy, religious policy, labor unrest response, domestic terrorism response, custom actions.

### Space (15 actions)
Satellite launches, manned programs, anti-satellite operations, space stations, deep space missions, military constellations, ground station networks, launch site development, space weapon programs, space treaty actions, commercial space policy, space-based intelligence, space cooperation agreements, space force creation, custom actions.

### Electronic Warfare (15 actions)
Jamming campaigns, GNSS/navigation spoofing, radar deception, SIGINT/ELINT collection, EMP/HEMP capability, harden against EW, communications intercept, directed energy programs, SEAD/DEAD operations, broadcast/psyop operations, ocean surveillance systems, frequency spectrum policy, cryptography programs, underwater SIGINT, custom actions.

### R&D (15 actions)
Strategic crash programs, basic research funding, technology acquisition, weapons system development, AI/computing programs, biotech/medical R&D, energy R&D, aerospace research, materials science, naval systems R&D, standards/IP strategy, scientific talent policy, classified black projects, international collaboration, custom actions.

## Architecture

### Tech Stack
- **Frontend:** React 18, vanilla SVG for the world map
- **Backend:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Data:** Embedded Natural Earth 110m topojson (177 countries pre-computed as SVG paths)
- **Persistence:** Browser artifact storage API (auto-save campaigns as JSON)

### File Structure
```
geopolitics.jsx                    # Main artifact (2200+ lines)
├── Themes (11 era-specific color/font schemes)
├── Domain definitions (F field builder, 180 actions)
├── Game logic (campaign state, turn resolution, event generation)
├── UI Components (menus, map, domain panels, action forms, modals)
├── World map (177 pre-computed SVG country paths + zoom/pan/highlight)
└── Artifact storage helpers (auto-save/load)
```

### API Integration

**World Generation** (turn 1):
```
POST /v1/messages
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 4000,
  "system": "You are populating the initial world state...",
  "messages": [{ "role": "user", "content": "..." }]
}
```

**Turn Resolution:**
```
POST /v1/messages
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 4000,
  "system": "You are the game master for a geopolitical simulation...",
  "messages": [{ "role": "user", "content": "WORLD STATE:...\nPLAYER ACTION:...\nResolve this turn..." }]
}
```

Responses are parsed to extract JSON turn outcomes (new date, action results, world events, incidents, briefing).

## Customization

### Adding New Actions

Edit the `DOMAINS` constant to add actions to any domain:

```javascript
const DOMAINS = {
  military: {
    name: 'MILITARY',
    actions: [
      {
        id: 'my_action',
        name: 'My Custom Action',
        fields: [
          F.text('field1', 'Label', true),
          F.sel('field2', 'Label', ['Option 1', 'Option 2'], true),
          F.area('field3', 'Description', false),
        ],
      },
      // ... more actions
    ],
  },
  // ... other domains
};
```

### Modifying Themes

Themes control the visual mood based on era and nation. Add or edit in `THEMES`:

```javascript
const THEMES = {
  my_era: {
    bg: '#000000', fg: '#00ff00', accent: '#ff0000', dim: '#333333',
    panel: '#111111', border: '#222222',
    font: "'JetBrains Mono', monospace",
    display: "'Arial Black', sans-serif",
    scan: true, // scanline effect
  },
};
```

Then in `pickTheme()`, add logic to detect era/country and return your theme key.

### Adjusting World Generation Prompts

The `startGame()` function builds a system prompt for world generation. Customize the schema or prompt text to change what attributes are generated (e.g., add cybersecurity posture, space capabilities tier, etc.).

## Known Limitations

1. **Province-level borders don't shift during war** — the narrative reflects territorial changes, but the visual map doesn't redraw. Full dynamic borders would require a province-level map (e.g., Worldometer-style detailed GeoJSON).

2. **Country lookup is fuzzy** — "Soviet Union," "USSR," "Russia" all match the same nation, but unusual variants may fail. The lookup table can be expanded.

3. **No persistent world** — other nations are simulated fresh each turn. There's no global state file recording what China did last turn. Each turn, the AI reads recent history and generates plausible actions.

4. **Turn resolution can be slow** — 30–60 seconds per turn is typical. Complex turns or API lag can push this longer.

5. **Limited historical scenarios** — the game works best 1910–2026, but other eras can be added with custom themes and year-gating for actions.

6. **No multiplayer** — campaigns are single-player; no competing players or real-time interaction.

## Future Enhancements

- **Dynamic province-level borders** — redraw map as territories change hands
- **Persistent world state** — track major powers' alliances, resources, tech levels across turns
- **Deep learning NPC behavior** — instead of fresh AI generation each turn, train embeddings of nation personality
- **Scripted scenarios** — historical "what-if" campaigns (Cuban Missile Crisis, Korean War, etc.)
- **Multiplayer** — simultaneous play as different nations
- **Mobile optimization** — better touch UX for mobile artifact viewing
- **Detailed economic simulation** — GDP, trade flows, sanctions impact
- **Social media integration** — generate world headlines that players can share
- **Advanced visualizations** — terrain, supply lines, force composition on the map

## Development

### Running Locally

```bash
npm install
npm start
```

Then navigate to `http://localhost:3000` and use the artifact artifact system or paste the JSX into Claude.ai.

### Testing

To test a campaign without running the full game:
1. Start a campaign with a known nation (e.g., "Soviet Union", 1985)
2. Verify world state generation completes in < 60 seconds
3. Take a test action (e.g., declare war) and verify turn resolution completes
4. Check that the action log updates and new events appear

### Debugging

Enable the **Debug Menu** (⚠ DEBUG button in top-right):
- Inject arbitrary world events mid-turn
- Observe how the AI reacts to crises you create
- Useful for testing event type variations and narrative quality

## Contributing

Contributions welcome! Especially:
- New domains or actions
- Improved country name matching
- Historical accuracy fixes
- Performance optimizations (turn resolution speed)
- Better mobile UX
- Bug reports and gameplay feedback

## License

MIT License. See LICENSE file for details.

## Acknowledgments

- **Natural Earth Data** — the 110m topojson dataset for accurate world borders
- **Anthropic Claude** — the AI backbone driving all world simulation and turn resolution
- **React** — the UI framework
- The grand strategy game community (Crusader Kings, Europa Universalis, Hearts of Iron) for design inspiration

## Contact & Feedback

- **Report bugs:** Open an issue on GitHub
- **Suggest features:** Discussions tab
- **Play & share:** Try a campaign and tag us with your story

---

**Play at:** [Claude.ai artifact link or your deployment URL]

**Made with Claude & React. A simulation of statecraft.**
