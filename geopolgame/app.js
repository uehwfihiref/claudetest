"use strict";

const COUNTRY_SUGGESTIONS = [
  "Afghanistan",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Belarus",
  "Belgium",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Cuba",
  "Czechoslovakia",
  "Denmark",
  "East Germany",
  "Egypt",
  "Ethiopia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Kenya",
  "Libya",
  "Mexico",
  "Netherlands",
  "Nigeria",
  "North Korea",
  "Norway",
  "Pakistan",
  "People's Republic of China",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "South Africa",
  "South Korea",
  "Soviet Union",
  "Spain",
  "Sweden",
  "Syria",
  "Taiwan",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Kingdom",
  "United States",
  "Vietnam",
  "West Germany",
  "Yugoslavia"
];

const FIELD_DEFINITIONS = {
  targetCountry: {
    label: "Target country or actor",
    type: "text",
    placeholder: "State, government, alliance, or proxy"
  },
  partnerCountry: {
    label: "Partner or broker",
    type: "text",
    placeholder: "Ally, institution, or covert intermediary"
  },
  targetRegion: {
    label: "Target theatre / province",
    type: "text",
    placeholder: "Baltics, DMZ, Arctic corridor, capital district"
  },
  objective: {
    label: "Operational objective",
    type: "textarea",
    placeholder: "Describe what success looks like in campaign terms.",
    wide: true
  },
  justification: {
    label: "Strategic justification",
    type: "textarea",
    placeholder: "Casus belli, internal rationale, or messaging rationale.",
    wide: true
  },
  scale: {
    label: "Scale",
    type: "select",
    options: ["Limited", "Regional", "National", "Global"]
  },
  visibility: {
    label: "Visibility",
    type: "select",
    options: ["Plausibly deniable", "Quiet official", "Public signal", "Maximum publicity"]
  },
  timeline: {
    label: "Desired timeline",
    type: "select",
    options: ["Immediate", "This turn", "Next quarter", "Long program"]
  },
  budget: {
    label: "Resource posture",
    type: "select",
    options: ["Minimal", "Sustained", "Priority", "Crash effort"]
  },
  assetType: {
    label: "Asset type",
    type: "select",
    options: ["Fighter", "Bomber", "Drone", "VTOL", "Transport", "Submarine", "Carrier", "Satellite", "Missile battery"]
  },
  method: {
    label: "Method",
    type: "select",
    options: ["Diplomatic note", "Coercive signal", "Technical intrusion", "Industrial program", "Force deployment", "Covert channel"]
  },
  targetDeviceType: {
    label: "Target device type",
    type: "select",
    options: ["BIOS / UEFI", "Baseband", "IoT", "Industrial control", "Network core", "Air defense node"]
  },
  deliveryMode: {
    label: "Delivery mode",
    type: "select",
    options: ["Remote", "Insider assisted", "Physical access", "Proxy enabled"]
  },
  missionProfile: {
    label: "Mission profile",
    type: "select",
    options: ["Reconnaissance", "Deterrence", "Attrition", "Escalation control", "Prestige", "Humanitarian cover"]
  },
  targetAudience: {
    label: "Target audience",
    type: "select",
    options: ["Domestic public", "Alliance leadership", "Adversary elite", "Global media", "Neutral states"]
  },
  legalPosture: {
    label: "Legal posture",
    type: "select",
    options: ["Emergency decree", "Existing authority", "UN framed", "Secret directive"]
  },
  readiness: {
    label: "Readiness level",
    type: "select",
    options: ["Routine", "Elevated", "Crisis", "Maximum"]
  },
  intensity: {
    label: "Intensity",
    type: "select",
    options: ["Low", "Measured", "Severe", "Breakthrough"]
  },
  narrative: {
    label: "Narrative line",
    type: "textarea",
    placeholder: "How should the move be explained, concealed, or sold politically?",
    wide: true
  },
  resourceType: {
    label: "Resource focus",
    type: "select",
    options: ["Fuel", "Food", "Rare earths", "Industrial metals", "Ammunition", "Financial reserves"]
  },
  theatre: {
    label: "Primary theatre",
    type: "select",
    options: ["Atlantic", "Pacific", "Mediterranean", "Baltics", "Central Europe", "Middle East", "Arctic", "Indian Ocean", "Domestic interior", "Space"]
  },
  capability: {
    label: "Capability focus",
    type: "select",
    options: ["Counter-air", "Missile defense", "Strike", "ISR", "Counterinsurgency", "Electronic attack", "Cyber defense", "Nuclear posture"]
  },
  programType: {
    label: "Program type",
    type: "select",
    options: ["Aircraft modernization", "Armored vehicle line", "Rocketry lab", "Cryptography bureau", "Drone swarm", "Biodefense institute", "Civil nuclear line", "Missile warning network"]
  },
  directive: {
    label: "Custom directive",
    type: "textarea",
    placeholder: "Describe the move in natural language. The director will resolve it as a custom action.",
    wide: true
  }
};

function action(id, label, summary, earliestYear, fieldIds, options = {}) {
  return {
    id,
    label,
    summary,
    earliestYear,
    fieldIds,
    warning: options.warning || "",
    tags: options.tags || [],
    pressure: options.pressure || 0,
    secrecy: options.secrecy || 0,
    domainTone: options.domainTone || "general"
  };
}

const DOMAIN_DEFINITIONS = [
  {
    id: "logistics",
    label: "Logistics",
    earliestYear: 1910,
    summary: "Move fuel, materiel, medical support, transport capacity, and industrial sustainment through the theatre.",
    actions: [
      action("rail-mobilization", "Rail Mobilization", "Shift troops and stores along interior rail lines.", 1910, ["targetRegion", "scale", "timeline", "objective"], { tags: ["Mobility", "Rail"], pressure: 4 }),
      action("convoy-routing", "Convoy Routing", "Reprioritize convoy lanes around threat zones.", 1910, ["theatre", "resourceType", "scale", "visibility"], { tags: ["Sea lift", "Security"], pressure: 5 }),
      action("repair-depots", "Repair Depot Surge", "Stand up forward repair depots for attritional campaigns.", 1910, ["targetRegion", "budget", "timeline", "objective"], { tags: ["Sustainment"], pressure: 3 }),
      action("fuel-rationing", "Fuel Rationing", "Redirect domestic and military fuel consumption.", 1910, ["resourceType", "scale", "narrative", "timeline"], { tags: ["Domestic"], pressure: 2 }),
      action("port-expansion", "Port Expansion", "Expand throughput at a strategic port or naval base.", 1910, ["targetRegion", "budget", "timeline", "objective"], { tags: ["Infrastructure"], pressure: 3 }),
      action("winterization", "Winterization Program", "Prepare formations and supply chains for extreme weather.", 1910, ["targetRegion", "scale", "timeline", "objective"], { tags: ["Readiness"], pressure: 2 }),
      action("sealift-charter", "Sealift Charter", "Charter civilian hulls to reinforce military transport.", 1910, ["theatre", "scale", "visibility", "objective"], { tags: ["Lift"], pressure: 4 }),
      action("air-bridge", "Strategic Air Bridge", "Open an emergency air bridge for priority cargo.", 1939, ["targetRegion", "assetType", "scale", "objective"], { tags: ["Air lift"], pressure: 5 }),
      action("preposition", "Preposition Reserves", "Hide or stage reserves close to a threatened frontier.", 1910, ["targetRegion", "readiness", "visibility", "objective"], { tags: ["Stocks"], secrecy: 2, pressure: 4 }),
      action("medevac-lattice", "Medical Evacuation Lattice", "Expand battlefield evacuation and trauma support.", 1910, ["targetRegion", "scale", "timeline", "objective"], { tags: ["Medical"], pressure: 1 })
    ]
  },
  {
    id: "internal-security",
    label: "Internal Security",
    earliestYear: 1910,
    summary: "Manage unrest, border controls, emergency powers, counter-subversion, and civil resilience.",
    actions: [
      action("emergency-law", "Emergency Law", "Invoke emergency powers to stabilize the state.", 1910, ["legalPosture", "targetAudience", "justification", "timeline"], { tags: ["State power"], pressure: 6 }),
      action("counterinsurgency", "Counter-Insurgency Sweep", "Launch a security sweep in restive districts.", 1910, ["targetRegion", "scale", "readiness", "objective"], { tags: ["Security"], pressure: 7 }),
      action("anti-corruption", "Anti-Corruption Purge", "Target compromised officials inside the state apparatus.", 1910, ["targetRegion", "visibility", "narrative", "objective"], { tags: ["Governance"], pressure: 4 }),
      action("border-policing", "Border Policing Surge", "Reinforce frontier controls against infiltration and smuggling.", 1910, ["targetRegion", "scale", "readiness", "objective"], { tags: ["Border"], pressure: 3 }),
      action("refugee-controls", "Refugee Intake Controls", "Adjust asylum and population movement rules.", 1910, ["targetRegion", "legalPosture", "targetAudience", "objective"], { tags: ["Population"], pressure: 4 }),
      action("media-stabilization", "Media Stabilization Campaign", "Calm domestic panic and shape the information environment.", 1920, ["targetAudience", "narrative", "visibility", "timeline"], { tags: ["Narrative"], pressure: 2 }),
      action("election-security", "Election Security Push", "Harden polling systems and elite political networks.", 1920, ["targetRegion", "visibility", "objective", "timeline"], { tags: ["Institutions"], pressure: 3 }),
      action("governor-reshuffle", "Regional Governor Reshuffle", "Replace fragile regional leadership before a crisis worsens.", 1910, ["targetRegion", "justification", "narrative", "timeline"], { tags: ["Elite politics"], pressure: 4 }),
      action("civil-defense-network", "Civil Defense Broadcast Network", "Expand shelters, alerts, and public instruction channels.", 1938, ["targetAudience", "scale", "timeline", "objective"], { tags: ["Resilience"], pressure: 2 }),
      action("amnesty", "Prisoner Amnesty Or Detention Review", "Release or reclassify detainees to reshape domestic conditions.", 1910, ["targetAudience", "scale", "objective", "narrative"], { tags: ["Domestic"], pressure: 3 })
    ]
  },
  {
    id: "military",
    label: "Military",
    earliestYear: 1910,
    summary: "Signal, mobilize, strike, or escalate with conventional military tools and force posture.",
    actions: [
      action("mobilize-reserves", "Mobilize Reserves", "Raise reserve formations and accelerate wartime posture.", 1910, ["readiness", "scale", "targetRegion", "objective"], { tags: ["Mobilization"], pressure: 8 }),
      action("declare-war", "Declare War", "Issue a formal declaration and open hostilities.", 1910, ["targetCountry", "justification", "targetRegion", "readiness"], {
        tags: ["Irreversible", "War"],
        pressure: 18,
        warning: "This is treated as a major escalation move and can trigger immediate foreign reactions."
      }),
      action("border-exercise", "Border Exercise", "Conduct visible maneuvers near a frontier.", 1910, ["targetRegion", "scale", "visibility", "objective"], { tags: ["Signal"], pressure: 7 }),
      action("precision-strike", "Precision Strike Package", "Conduct a tightly scoped strike against a strategic target set.", 1940, ["targetCountry", "targetRegion", "capability", "objective"], { tags: ["Air / Missile"], pressure: 12 }),
      action("air-patrols", "Escalate Air Patrols", "Increase combat air patrols in a contested airspace.", 1939, ["targetRegion", "assetType", "readiness", "objective"], { tags: ["Aerial"], pressure: 8 }),
      action("fortify-theatre", "Fortify Theatre", "Harden defenses, disperse units, and build depth.", 1910, ["targetRegion", "budget", "timeline", "objective"], { tags: ["Defense"], pressure: 5 }),
      action("expeditionary-force", "Deploy Expeditionary Force", "Move expeditionary elements outside the homeland.", 1910, ["targetCountry", "theatre", "scale", "objective"], { tags: ["Projection"], pressure: 11 }),
      action("arm-proxies", "Arm Proxy Forces", "Expand covert or semi-deniable support to proxy actors.", 1910, ["targetCountry", "partnerCountry", "scale", "objective"], { tags: ["Proxy"], secrecy: 4, pressure: 9 }),
      action("ceasefire-corridor", "Ceasefire Corridor Proposal", "Pair military posture with a monitored ceasefire line.", 1910, ["targetCountry", "targetRegion", "partnerCountry", "objective"], { tags: ["De-escalation"], pressure: -3 }),
      action("special-operations", "Special Operations Raid", "Conduct a narrow raid for capture, disruption, or rescue.", 1930, ["targetCountry", "targetRegion", "objective", "visibility"], { tags: ["SOF"], secrecy: 3, pressure: 10 })
    ]
  },
  {
    id: "diplomacy",
    label: "Diplomacy",
    earliestYear: 1910,
    summary: "Reframe the crisis through summits, guarantees, coalitions, ultimatums, and covert diplomatic channels.",
    actions: [
      action("summon-ambassador", "Summon Ambassador", "Issue a formal protest and demand clarification.", 1910, ["targetCountry", "justification", "targetAudience", "visibility"], { tags: ["Protest"], pressure: 3 }),
      action("propose-summit", "Propose Summit", "Invite leaders or ministers to a crisis dialogue.", 1910, ["targetCountry", "partnerCountry", "objective", "timeline"], { tags: ["Summit"], pressure: -2 }),
      action("backchannel", "Broker Backchannel", "Create a deniable line for crisis management.", 1910, ["targetCountry", "partnerCountry", "objective", "visibility"], { tags: ["Covert"], secrecy: 3, pressure: -1 }),
      action("security-guarantee", "Offer Security Guarantees", "Extend formal or informal guarantees to a partner.", 1910, ["partnerCountry", "targetRegion", "objective", "visibility"], { tags: ["Alliance"], pressure: 6 }),
      action("un-pressure", "Pressure Through The UN", "Frame the crisis through multilateral institutions.", 1945, ["targetCountry", "justification", "targetAudience", "objective"], { tags: ["UN"], pressure: 1 }),
      action("recognition", "Recognize Breakaway State", "Redraw legitimacy and spark diplomatic shockwaves.", 1910, ["targetCountry", "targetRegion", "justification", "visibility"], { tags: ["Recognition"], pressure: 10 }),
      action("mediate-conflict", "Mediate A Third-Party Conflict", "Offer services as mediator to shape the wider board.", 1910, ["partnerCountry", "targetCountry", "objective", "timeline"], { tags: ["Mediator"], pressure: -1 }),
      action("ultimatum", "Issue Ultimatum", "Deliver a final set of demands with a deadline.", 1910, ["targetCountry", "justification", "timeline", "objective"], { tags: ["Coercive"], pressure: 11 }),
      action("coalition", "Build Coalition", "Assemble a political or sanctions coalition around your line.", 1910, ["partnerCountry", "targetCountry", "targetAudience", "objective"], { tags: ["Bloc"], pressure: 4 }),
      action("arms-control", "Negotiate Arms Control Lane", "Open a channel focused on escalation limits.", 1920, ["targetCountry", "partnerCountry", "objective", "timeline"], { tags: ["Arms control"], pressure: -4 })
    ]
  },
  {
    id: "economics",
    label: "Economics",
    earliestYear: 1910,
    summary: "Use financial policy, sanctions, stockpiles, and mobilization to bend strategic stamina.",
    actions: [
      action("energy-embargo", "Energy Embargo", "Restrict energy exports or access to strategic fuels.", 1910, ["targetCountry", "resourceType", "visibility", "objective"], { tags: ["Energy"], pressure: 8 }),
      action("subsidies", "Emergency Subsidies", "Stabilize production or shield consumers from shock.", 1910, ["resourceType", "scale", "timeline", "objective"], { tags: ["Domestic"], pressure: -1 }),
      action("currency-defense", "Stabilize Currency", "Use reserves, controls, and messaging to defend the currency.", 1910, ["targetAudience", "budget", "timeline", "objective"], { tags: ["Finance"], pressure: -2 }),
      action("rearmament-bond", "Sovereign Rearmament Bond", "Raise capital for long-cycle defense spending.", 1910, ["targetAudience", "budget", "timeline", "objective"], { tags: ["Finance"], pressure: 3 }),
      action("sanctions", "Sanctions Package", "Coordinate sanctions against a foreign actor.", 1910, ["targetCountry", "partnerCountry", "scale", "objective"], { tags: ["Sanctions"], pressure: 7 }),
      action("trade-opening", "Trade Opening", "Open a strategic trade lane to relieve pressure.", 1910, ["partnerCountry", "resourceType", "timeline", "objective"], { tags: ["Trade"], pressure: -2 }),
      action("debt-restructuring", "Debt Restructuring", "Reshape foreign or domestic obligations to buy time.", 1910, ["partnerCountry", "targetAudience", "objective", "timeline"], { tags: ["Debt"], pressure: -1 }),
      action("industrial-mobilization", "Industrial Mobilization", "Reorient factories and procurement toward war footing.", 1910, ["resourceType", "scale", "budget", "objective"], { tags: ["Industry"], pressure: 6 }),
      action("grain-release", "Grain Reserve Release", "Cool domestic pressure through food reserve policy.", 1910, ["targetAudience", "scale", "timeline", "objective"], { tags: ["Food"], pressure: -1 }),
      action("strategic-stockpile", "Strategic Stockpile Build", "Expand reserves of a chosen strategic input.", 1910, ["resourceType", "budget", "timeline", "objective"], { tags: ["Reserves"], pressure: 2 })
    ]
  },
  {
    id: "intelligence",
    label: "Intelligence",
    earliestYear: 1910,
    summary: "Run collection, counterintelligence, deception, signals intercept, and clandestine influence assessment.",
    actions: [
      action("recruit-assets", "Recruit Assets", "Develop new human sources inside a rival system.", 1910, ["targetCountry", "targetRegion", "objective", "visibility"], { tags: ["HUMINT"], secrecy: 5, pressure: 2 }),
      action("satellite-recon", "Satellite Reconnaissance Burst", "Task orbital assets for rapid imagery coverage.", 1957, ["targetRegion", "timeline", "objective", "visibility"], { tags: ["ISR", "Space"], pressure: 2 }),
      action("counterintelligence", "Counterintelligence Sweep", "Purge leaks and hostile penetrations at home.", 1910, ["targetRegion", "scale", "objective", "timeline"], { tags: ["Defensive"], pressure: 3 }),
      action("influence-assessment", "Influence Assessment", "Map elite factions and likely alignment shifts.", 1910, ["targetCountry", "targetAudience", "objective", "timeline"], { tags: ["Analysis"], pressure: 1 }),
      action("signals-intercept", "Signals Intercept Surge", "Increase comms collection against a theatre.", 1920, ["targetCountry", "targetRegion", "objective", "timeline"], { tags: ["SIGINT"], secrecy: 3, pressure: 2 }),
      action("black-bag", "Clandestine Collection", "Run a deniable collection operation for hard evidence.", 1910, ["targetCountry", "targetRegion", "objective", "visibility"], { tags: ["Covert"], secrecy: 5, pressure: 4 }),
      action("border-surveillance", "Border Surveillance Web", "Expand reconnaissance along a frontier or coastline.", 1910, ["targetRegion", "scale", "objective", "timeline"], { tags: ["Watch"], pressure: 2 }),
      action("penetration", "Strategic Penetration", "Try to penetrate a rival command, party, or industrial node.", 1910, ["targetCountry", "targetRegion", "objective", "visibility"], { tags: ["Deep source"], secrecy: 5, pressure: 4 }),
      action("deception-plan", "Deception Plan", "Shape rival expectations with planted signals and decoys.", 1910, ["targetCountry", "narrative", "objective", "timeline"], { tags: ["Maskirovka"], secrecy: 4, pressure: 3 }),
      action("strategic-estimate", "Strategic Estimate", "Commission an integrated intelligence estimate for leadership.", 1910, ["targetCountry", "objective", "timeline", "targetAudience"], { tags: ["Estimate"], pressure: 0 })
    ]
  },
  {
    id: "cyber",
    label: "Cyber",
    earliestYear: 1970,
    summary: "Shape digital access, disruption, data theft, and cyber defense without exposing technical specifics.",
    actions: [
      action("network-disruption", "Network Disruption", "Pressure a rival through temporary network degradation.", 1970, ["targetCountry", "targetRegion", "intensity", "objective"], { tags: ["Disruption"], secrecy: 3, pressure: 7 }),
      action("ransomware-pressure", "Ransomware Pressure", "Generate political and economic pressure through criminal-style disruption.", 1989, ["targetCountry", "targetRegion", "visibility", "objective"], { tags: ["Coercive"], secrecy: 4, pressure: 8 }),
      action("data-exfiltration", "Data Exfiltration", "Extract strategic information from a rival network.", 1970, ["targetCountry", "targetRegion", "objective", "deliveryMode"], { tags: ["Collection"], secrecy: 5, pressure: 3 }),
      action("election-interference", "Election Interference", "Disturb a rival electoral cycle through influence operations.", 1990, ["targetCountry", "targetAudience", "narrative", "objective"], { tags: ["Influence"], secrecy: 5, pressure: 8 }),
      action("firmware-attack", "Firmware Attack", "Target device trust layers in a fictionalized high-level way.", 1980, ["targetCountry", "targetDeviceType", "deliveryMode", "objective"], { tags: ["Firmware"], secrecy: 5, pressure: 9 }),
      action("botnet-probing", "Botnet Probing", "Probe resilience and pressure thresholds with distributed traffic.", 1990, ["targetCountry", "targetRegion", "intensity", "objective"], { tags: ["Probe"], secrecy: 4, pressure: 5 }),
      action("telecom-spoofing", "Telecom Spoofing", "Distort a rival information environment through telecom manipulation.", 1980, ["targetCountry", "targetAudience", "narrative", "objective"], { tags: ["Info war"], secrecy: 4, pressure: 7 }),
      action("ics-intrusion", "Industrial Control Intrusion", "Compromise industrial systems at a high level without implementation detail.", 1980, ["targetCountry", "targetRegion", "intensity", "objective"], { tags: ["Infrastructure"], secrecy: 5, pressure: 9 }),
      action("counter-hunt", "Counter-Cyber Hunt", "Purge hostile footholds from national systems.", 1970, ["targetRegion", "scale", "objective", "timeline"], { tags: ["Defense"], pressure: -1 }),
      action("synthetic-narrative", "Synthetic Narrative Flood", "Overwhelm an information space with conflicting digital stories.", 1995, ["targetCountry", "targetAudience", "narrative", "objective"], { tags: ["Narrative"], secrecy: 4, pressure: 6 })
    ]
  },
  {
    id: "electronic-warfare",
    label: "Electronic Warfare",
    earliestYear: 1935,
    summary: "Contest the spectrum with jamming, spoofing, emissions control, and anti-drone coverage.",
    actions: [
      action("jam-radar", "Jam Radar Net", "Degrade early warning or fire-control coverage.", 1935, ["targetCountry", "targetRegion", "intensity", "objective"], { tags: ["Jamming"], pressure: 7 }),
      action("spoof-navigation", "Spoof Navigation", "Confuse navigation and positioning in a contested zone.", 1978, ["targetRegion", "intensity", "visibility", "objective"], { tags: ["Spoof"], pressure: 6 }),
      action("emissions-control", "Emissions Control Drill", "Reduce signature and sharpen survivability.", 1935, ["targetRegion", "readiness", "timeline", "objective"], { tags: ["EMCON"], pressure: 2 }),
      action("spectrum-recon", "Spectrum Reconnaissance", "Map emitters and rhythms across the theatre.", 1935, ["targetRegion", "objective", "timeline", "visibility"], { tags: ["Recon"], pressure: 1 }),
      action("decoy-emitters", "Deploy Decoy Emitters", "Flood the battlespace with misleading signatures.", 1940, ["targetRegion", "intensity", "objective", "timeline"], { tags: ["Deception"], secrecy: 3, pressure: 4 }),
      action("anti-drone", "Anti-Drone Envelope", "Layer portable defenses against unmanned systems.", 1990, ["targetRegion", "scale", "readiness", "objective"], { tags: ["Counter-UAS"], pressure: 3 }),
      action("comms-degradation", "Comms Degradation", "Disrupt rival operational coordination.", 1935, ["targetCountry", "targetRegion", "intensity", "objective"], { tags: ["Comms"], pressure: 7 }),
      action("signal-denial", "Signal Denial Corridor", "Create a temporary denial corridor in a theatre.", 1940, ["targetRegion", "timeline", "intensity", "objective"], { tags: ["Denial"], pressure: 8 }),
      action("ew-export", "EW Export Package", "Arm a partner with electronic warfare capabilities.", 1945, ["partnerCountry", "capability", "budget", "objective"], { tags: ["Alliance"], pressure: 4 }),
      action("counter-jam", "Counter-Jam Upgrade", "Harden your own formations against hostile EW.", 1935, ["targetRegion", "budget", "timeline", "objective"], { tags: ["Hardening"], pressure: -1 })
    ]
  },
  {
    id: "space",
    label: "Space",
    earliestYear: 1957,
    summary: "Task space assets, prestige launches, early-warning architecture, and orbital signaling.",
    actions: [
      action("launch-recon", "Launch Recon Satellite", "Expand strategic imagery and orbital watch.", 1957, ["targetRegion", "budget", "timeline", "objective"], { tags: ["Launch"], pressure: 3 }),
      action("imagery-burst", "Orbital Imagery Burst", "Task satellites for rapid revisit rates over a theatre.", 1957, ["targetRegion", "timeline", "objective", "visibility"], { tags: ["ISR"], pressure: 2 }),
      action("asat-test", "Anti-Satellite Test", "Conduct a space-denial signal without low-level detail.", 1960, ["targetAudience", "readiness", "objective", "visibility"], { tags: ["Deterrence"], pressure: 12 }),
      action("tracking-treaty", "Space Tracking Treaty", "Propose transparency measures for orbital traffic.", 1957, ["partnerCountry", "targetAudience", "objective", "timeline"], { tags: ["Treaty"], pressure: -2 }),
      action("crewed-prestige", "Crewed Prestige Mission", "Use space prestige to shape political momentum.", 1961, ["targetAudience", "narrative", "timeline", "objective"], { tags: ["Prestige"], pressure: 1 }),
      action("responsive-launch", "Responsive Launch Pad", "Prepare a rapid-launch option for crisis conditions.", 1957, ["readiness", "budget", "timeline", "objective"], { tags: ["Readiness"], pressure: 4 }),
      action("isr-sharing", "ISR Sharing Framework", "Share space-derived intelligence with partners.", 1957, ["partnerCountry", "targetRegion", "objective", "visibility"], { tags: ["Alliance"], pressure: 2 }),
      action("satcom-hardening", "Satcom Hardening", "Protect military communications in orbit.", 1957, ["capability", "budget", "timeline", "objective"], { tags: ["Protection"], pressure: -1 }),
      action("lunar-propaganda", "Lunar Research Prestige Drive", "Expand long-horizon space prestige for domestic effect.", 1960, ["targetAudience", "narrative", "timeline", "objective"], { tags: ["Prestige"], pressure: 1 }),
      action("missile-warning", "Missile Warning Network", "Improve strategic warning through space-linked sensors.", 1960, ["capability", "budget", "timeline", "objective"], { tags: ["Early warning"], pressure: 4 })
    ]
  },
  {
    id: "cbrn",
    label: "CBRN",
    earliestYear: 1915,
    summary: "Handle deterrence, civil defense, proliferation diplomacy, radiological readiness, and biosecurity posture.",
    actions: [
      action("civil-defense", "Civil Defense Drill", "Exercise the population for fallout, contamination, or shelter procedures.", 1915, ["targetAudience", "scale", "timeline", "objective"], { tags: ["Civil defense"], pressure: 1 }),
      action("deterrent-alert", "Strategic Deterrent Alert", "Raise the visibility of strategic deterrent forces.", 1945, ["readiness", "visibility", "objective", "targetAudience"], { tags: ["Nuclear"], pressure: 14 }),
      action("stockpile-inspection", "Chemical Stockpile Inspection", "Audit readiness, security, and command discipline.", 1915, ["targetRegion", "visibility", "objective", "timeline"], { tags: ["Chemical"], pressure: 2 }),
      action("cleanup-prep", "Radiological Cleanup Prep", "Preposition cleanup units and radiological response teams.", 1945, ["targetRegion", "scale", "timeline", "objective"], { tags: ["Radiological"], pressure: 1 }),
      action("posture-review", "Nuclear Posture Review", "Reframe doctrine, signaling, and escalation thresholds.", 1945, ["targetAudience", "justification", "objective", "timeline"], { tags: ["Doctrine"], pressure: 7 }),
      action("nonproliferation", "Non-Proliferation Bargain", "Trade concessions for restraint in a sensitive program.", 1945, ["targetCountry", "partnerCountry", "objective", "timeline"], { tags: ["Diplomacy"], pressure: -4 }),
      action("pathogen-surveillance", "Pathogen Surveillance Net", "Strengthen biosecurity watchlists and response posture.", 1918, ["targetRegion", "scale", "timeline", "objective"], { tags: ["Biosecurity"], pressure: 1 }),
      action("shelter-expansion", "Fallout Shelter Expansion", "Expand civil shelter capacity in vulnerable zones.", 1945, ["targetRegion", "budget", "timeline", "objective"], { tags: ["Shelter"], pressure: 2 }),
      action("missile-defense-dispersal", "Missile Defense Dispersal", "Disperse defensive nodes against strategic attack.", 1950, ["targetRegion", "readiness", "objective", "timeline"], { tags: ["Defense"], pressure: 5 }),
      action("bio-cordon", "Biosecurity Cordon", "Impose a strict health cordon over a sensitive zone.", 1918, ["targetRegion", "legalPosture", "objective", "timeline"], { tags: ["Health security"], pressure: 3 })
    ]
  },
  {
    id: "r-and-d",
    label: "R&D",
    earliestYear: 1910,
    summary: "Invest in future military and state capabilities through labs, programs, and doctrinal innovation.",
    actions: [
      action("aircraft-modernization", "Develop Next-Generation Aircraft", "Push a new airframe or aviation modernization line.", 1930, ["assetType", "programType", "budget", "objective"], { tags: ["Aviation"], pressure: 3 }),
      action("missile-modernization", "Missile Modernization", "Advance long-range strike or missile defense research.", 1944, ["capability", "budget", "timeline", "objective"], { tags: ["Missile"], pressure: 5 }),
      action("armor-program", "Armored Vehicle Program", "Refresh the armored fleet through a focused program.", 1916, ["programType", "budget", "timeline", "objective"], { tags: ["Armor"], pressure: 2 }),
      action("nuclear-research", "Nuclear Research Line", "Expand civil or military nuclear research posture.", 1938, ["programType", "visibility", "objective", "timeline"], { tags: ["Nuclear"], pressure: 7 }),
      action("ai-decision", "AI Decision Support", "Build analytic support tools for strategic planning.", 1995, ["capability", "budget", "timeline", "objective"], { tags: ["Modern systems"], pressure: 1 }),
      action("rocketry", "Rocketry Lab", "Accelerate launch, missile, or propulsion research.", 1930, ["programType", "budget", "timeline", "objective"], { tags: ["Rocketry"], pressure: 4 }),
      action("crypto-bureau", "Cryptography Bureau", "Expand state cryptography and secure communications work.", 1910, ["programType", "budget", "timeline", "objective"], { tags: ["Security"], pressure: 1 }),
      action("drone-swarm", "Drone Swarm Program", "Prototype a high-volume unmanned capability.", 1980, ["assetType", "budget", "timeline", "objective"], { tags: ["Drone"], pressure: 3 }),
      action("early-warning", "Early Warning Radar Line", "Build a new long-range warning architecture.", 1935, ["capability", "budget", "timeline", "objective"], { tags: ["Warning"], pressure: 2 }),
      action("biodefense", "Biodefense Institute", "Stand up a dedicated biodefense and response program.", 1918, ["programType", "budget", "timeline", "objective"], { tags: ["Biodefense"], pressure: 1 })
    ]
  }
];

const CUSTOM_DOMAIN = {
  id: "custom",
  label: "Custom Directive",
  earliestYear: 1910,
  summary: "Type any bespoke strategic move and let the simulation adjudicate it within the current year and scenario constraints.",
  actions: [
    action("custom-directive", "Freeform Strategic Directive", "Write a natural-language directive for the campaign director to resolve.", 1910, ["directive", "targetCountry", "targetRegion", "scale", "visibility"], {
      tags: ["Flexible", "Narrative"],
      pressure: 4,
      warning: "Custom directives resolve through a high-level narrative adjudication layer and may be interpreted broadly."
    })
  ]
};

const SUITE_VARIANTS = [
  { name: "Rapid response", summary: "Shift the action into an immediate-response posture.", pressureDelta: 2, secrecyDelta: 0, fieldBoost: ["timeline", "readiness"] },
  { name: "Covert track", summary: "Run the move through deniable channels and compartmented execution.", pressureDelta: 1, secrecyDelta: 2, fieldBoost: ["visibility", "partnerCountry"] },
  { name: "Pressure lane", summary: "Apply a firmer coercive version designed to reshape rival choices.", pressureDelta: 3, secrecyDelta: 0, fieldBoost: ["targetAudience", "intensity"] },
  { name: "Alliance package", summary: "Tie the move to allies, clients, or institutional support.", pressureDelta: 1, secrecyDelta: 0, fieldBoost: ["partnerCountry", "targetAudience"] },
  { name: "Defensive shield", summary: "Recast the move as a defensive hedge with resilience framing.", pressureDelta: -1, secrecyDelta: 0, fieldBoost: ["legalPosture", "objective"] },
  { name: "Escalation control", summary: "Constrain the move with off-ramps and crisis management guardrails.", pressureDelta: -2, secrecyDelta: 0, fieldBoost: ["timeline", "narrative"] },
  { name: "Black budget option", summary: "Increase resources and discretion behind the scenes.", pressureDelta: 2, secrecyDelta: 1, fieldBoost: ["budget", "visibility"] },
  { name: "Strategic signal", summary: "Use the action for visible messaging and deterrent posture.", pressureDelta: 2, secrecyDelta: -1, fieldBoost: ["targetAudience", "visibility"] },
  { name: "Infrastructure branch", summary: "Anchor the action in industrial, institutional, or logistical follow-through.", pressureDelta: 1, secrecyDelta: 0, fieldBoost: ["budget", "resourceType"] },
  { name: "Long-game program", summary: "Turn the move into a slower but deeper institutional line of effort.", pressureDelta: 0, secrecyDelta: 0, fieldBoost: ["timeline", "programType"] },
  { name: "Shock option", summary: "Package the move as a short, high-intensity strategic jolt.", pressureDelta: 4, secrecyDelta: -1, fieldBoost: ["intensity", "readiness"] },
  { name: "Attrition plan", summary: "Stretch the action into a grinding cumulative pressure line.", pressureDelta: 2, secrecyDelta: 0, fieldBoost: ["timeline", "resourceType"] },
  { name: "Public diplomacy lane", summary: "Make the move visible and politically consumable to outside audiences.", pressureDelta: 1, secrecyDelta: -2, fieldBoost: ["targetAudience", "narrative"] },
  { name: "Gray-zone track", summary: "Keep the move below formal thresholds while still reshaping the board.", pressureDelta: 2, secrecyDelta: 2, fieldBoost: ["visibility", "narrative"] },
  { name: "Industrial surge", summary: "Back the action with faster procurement, throughput, and state capacity.", pressureDelta: 1, secrecyDelta: 0, fieldBoost: ["budget", "programType"] },
  { name: "Countermove package", summary: "Position the action explicitly as a response to hostile activity.", pressureDelta: 1, secrecyDelta: 0, fieldBoost: ["justification", "targetCountry"] },
  { name: "Prestige play", summary: "Tie the move to symbolic, elite, or prestige signaling value.", pressureDelta: 1, secrecyDelta: -1, fieldBoost: ["targetAudience", "objective"] },
  { name: "Limited pilot", summary: "Run the action in a small bounded test before scaling further.", pressureDelta: -1, secrecyDelta: 0, fieldBoost: ["scale", "timeline"] },
  { name: "Proxy-enabled lane", summary: "Route the move through intermediaries, auxiliaries, or partner hands.", pressureDelta: 2, secrecyDelta: 2, fieldBoost: ["partnerCountry", "visibility"] }
];

augmentDomains();

function augmentDomains() {
  DOMAIN_DEFINITIONS.forEach((domain) => augmentStandardDomain(domain));
  augmentCustomDomain(CUSTOM_DOMAIN);
}

function augmentStandardDomain(domain) {
  const baseActions = domain.actions.slice(0, 10);
  const suites = baseActions.map((primary, index) => {
    const variants = createVariantActions(primary);
    return {
      id: `${domain.id}-suite-${index + 1}`,
      label: createSuiteLabel(primary),
      summary: createSuiteSummary(domain, primary, variants.length + 1),
      earliestYear: primary.earliestYear,
      actions: [primary, ...variants]
    };
  });

  domain.actionSuites = suites;
  domain.actions = suites.flatMap((suite) => suite.actions);
}

function augmentCustomDomain(domain) {
  domain.actionSuites = [
    {
      id: "custom-suite-1",
      label: "Freeform strategic directive",
      summary: "A direct narrative order channel for custom statecraft, crisis intervention, or off-menu campaign ideas.",
      earliestYear: domain.earliestYear,
      actions: domain.actions.slice()
    }
  ];
}

function createVariantActions(primary) {
  return SUITE_VARIANTS.map((variant, index) => createVariantAction(primary, variant, index));
}

function createVariantAction(primary, variant, variantIndex) {
  const boostedFields = variant.fieldBoost.filter((fieldId) => !primary.fieldIds.includes(fieldId));
  const fieldIds = [...primary.fieldIds, ...boostedFields].slice(0, 5);

  return action(
    `${primary.id}-variant-${variantIndex + 1}`,
    variant.name,
    `${variant.summary} This version stays focused on ${primary.summary.toLowerCase()}`,
    primary.earliestYear,
    fieldIds,
    {
      warning: primary.warning,
      tags: [...primary.tags, variant.name],
      pressure: primary.pressure + variant.pressureDelta,
      secrecy: primary.secrecy + variant.secrecyDelta,
      domainTone: primary.domainTone
    }
  );
}

function createSuiteLabel(primary) {
  return `${primary.label} Sub-Domain`;
}

function createSuiteSummary(domain, primary, actionCount) {
  return `${primary.label} serves as the anchor sub-domain inside ${domain.label.toLowerCase()}, with ${actionCount} total choices ranging from restrained to escalatory variants.`;
}

const WORLD_REGIONS = [
  { id: "canada", label: "Canada", points: "90,108 244,92 285,136 238,178 110,170 78,132", hotspots: ["Arctic convoy lanes", "Quebec corridor", "Pacific gateway"] },
  { id: "united-states", label: "United States", points: "116,184 274,180 308,236 258,284 156,282 108,232", hotspots: ["Eastern Seaboard", "Great Plains logistics", "Pacific aerospace belt"] },
  { id: "mexico", label: "Mexico", points: "168,290 246,288 270,334 228,362 164,344 146,312", hotspots: ["Northern border", "Gulf coastline", "Pacific ports"] },
  { id: "greenland", label: "Greenland", points: "300,76 364,52 398,96 360,154 308,132", hotspots: ["Thule corridor", "North Atlantic air route"] },
  { id: "cuba", label: "Cuba", points: "270,320 322,316 334,334 292,346", hotspots: ["Caribbean approaches"] },
  { id: "colombia", label: "Colombia", points: "274,362 320,350 338,386 314,418 278,408", hotspots: ["Caribbean coast", "Andean interior"] },
  { id: "peru", label: "Peru", points: "288,422 336,412 350,482 314,534 282,496", hotspots: ["Pacific ports", "Highland logistics"] },
  { id: "brazil", label: "Brazil", points: "344,388 436,382 472,446 454,534 392,570 320,540 354,470", hotspots: ["Amazon basin", "Southeast industry", "South Atlantic coast"] },
  { id: "argentina", label: "Argentina", points: "366,538 420,536 434,606 396,612 356,572", hotspots: ["Patagonian south", "La Plata corridor"] },
  { id: "united-kingdom", label: "United Kingdom", points: "510,132 548,116 560,146 534,182 506,164", hotspots: ["North Sea", "Atlantic approaches"] },
  { id: "spain", label: "Spain", points: "486,210 548,208 564,242 514,268 474,244", hotspots: ["Iberian airspace", "Western Med approaches"] },
  { id: "france", label: "France", points: "552,180 606,176 622,220 582,254 538,228", hotspots: ["Northern corridor", "Mediterranean fleet"] },
  { id: "germany", label: "Germany", points: "618,150 672,146 684,194 638,218 606,188", hotspots: ["Rhine industry", "Central Europe rail net"] },
  { id: "italy", label: "Italy", points: "612,226 660,236 676,314 638,322 618,274", hotspots: ["Po valley", "Tyrrhenian fleet"] },
  { id: "poland", label: "Poland", points: "686,152 738,152 754,196 704,220 676,190", hotspots: ["Belarus corridor", "Baltic frontage"] },
  { id: "ukraine", label: "Ukraine", points: "756,172 822,172 844,222 786,252 734,218", hotspots: ["Donbas line", "Black Sea coast", "Dnipro crossing"] },
  { id: "algeria", label: "Algeria", points: "546,304 626,300 664,360 610,392 526,372", hotspots: ["Saharan belt", "Mediterranean coast"] },
  { id: "egypt", label: "Egypt", points: "706,304 750,300 764,342 724,372 690,346", hotspots: ["Suez canal zone", "Nile delta"] },
  { id: "nigeria", label: "Nigeria", points: "606,404 662,398 674,446 626,470 594,436", hotspots: ["Delta energy sites", "Northern interior"] },
  { id: "ethiopia", label: "Ethiopia", points: "736,392 790,390 804,440 756,470 726,436", hotspots: ["Horn corridor", "Addis plateau"] },
  { id: "south-africa", label: "South Africa", points: "654,532 724,530 742,586 694,606 642,578", hotspots: ["Cape route", "Industrial south"] },
  { id: "turkey", label: "Turkey", points: "772,244 846,244 868,286 812,312 758,286", hotspots: ["Bosporus", "Anatolian plateau"] },
  { id: "saudi-arabia", label: "Saudi Arabia", points: "808,320 876,314 910,390 846,424 794,368", hotspots: ["Gulf coast", "Red Sea flank"] },
  { id: "iran", label: "Iran", points: "886,248 958,248 982,314 920,356 866,304", hotspots: ["Hormuz arc", "Caspian flank"] },
  { id: "russia", label: "Russia", points: "824,90 1112,82 1146,182 1104,232 932,214 824,166", hotspots: ["Western military district", "Arctic fleet", "Far East aerospace belt"] },
  { id: "pakistan", label: "Pakistan", points: "922,366 972,360 986,408 944,434 906,406", hotspots: ["Khyber corridor", "Arabian Sea approaches"] },
  { id: "india", label: "India", points: "982,348 1068,344 1090,428 1022,488 958,430", hotspots: ["Northern frontier", "Bay of Bengal", "Western naval command"] },
  { id: "china", label: "China", points: "1030,224 1142,224 1170,330 1090,396 992,342 980,274", hotspots: ["Taiwan Strait", "Northern theatre", "South China Sea"] },
  { id: "korea", label: "Korea", points: "1128,250 1150,250 1158,292 1132,304", hotspots: ["DMZ", "Yellow Sea"] },
  { id: "japan", label: "Japan", points: "1168,214 1190,204 1198,268 1178,300 1162,264", hotspots: ["Sea of Japan", "Home islands air defense"] },
  { id: "indonesia", label: "Indonesia", points: "1034,482 1122,476 1148,508 1058,524", hotspots: ["Java Sea", "Malacca approaches"] },
  { id: "australia", label: "Australia", points: "1042,548 1142,544 1168,610 1074,616 1024,576", hotspots: ["Northern approaches", "West coast naval yard"] }
];

const PROVINCE_HINTS = {
  Russia: ["Baltic district", "Kaliningrad enclave", "Black Sea frontage", "Far East district"],
  "Soviet Union": ["Baltic republics", "Western military district", "Far East district", "Central Asian interior"],
  "United States": ["Eastern Seaboard", "Great Plains logistics", "Pacific aerospace belt", "Alaskan approach"],
  China: ["Northern theatre", "Taiwan Strait coast", "Western plateau", "Pearl River corridor"],
  India: ["Northern frontier", "Bay of Bengal", "Western command", "Deccan logistics belt"],
  Ukraine: ["Donbas line", "Dnipro crossings", "Black Sea littoral", "Kyiv corridor"],
  "United Kingdom": ["Scotland air defense zone", "North Sea frontage", "London political core", "Atlantic submarine arc"]
};

const RELATION_PRESETS = {
  Russia: {
    allies: ["Iran", "China", "Algeria"],
    rivals: ["United States", "United Kingdom", "Germany", "Poland", "Ukraine", "Japan"],
    watched: ["Turkey", "India", "Saudi Arabia"]
  },
  "Soviet Union": {
    allies: ["Cuba", "Poland", "East Germany"],
    rivals: ["United States", "United Kingdom", "France", "West Germany", "Japan"],
    watched: ["Turkey", "China", "Iran"]
  },
  "United States": {
    allies: ["United Kingdom", "Canada", "Germany", "Japan", "South Korea", "Australia"],
    rivals: ["Russia", "China", "Iran", "North Korea"],
    watched: ["India", "Saudi Arabia", "Turkey"]
  },
  China: {
    allies: ["Pakistan", "Iran", "Russia"],
    rivals: ["United States", "Japan", "India", "Taiwan"],
    watched: ["Australia", "Indonesia", "Saudi Arabia"]
  },
  India: {
    allies: ["France", "United States", "Japan", "Australia"],
    rivals: ["Pakistan", "China"],
    watched: ["Iran", "Saudi Arabia", "Russia"]
  },
  Iran: {
    allies: ["Russia", "Syria", "China"],
    rivals: ["United States", "Saudi Arabia", "Israel"],
    watched: ["Turkey", "India", "Pakistan"]
  }
};

const DEBUG_EVENT_TYPES = [
  "Border clash",
  "Coup rumor",
  "Market crash",
  "Satellite failure",
  "Carrier standoff",
  "Insurgency flare-up",
  "Cyber blackout",
  "Refugee surge",
  "Oil shock",
  "Weapons test"
];

const INCIDENT_THEATRES = [
  "North Atlantic",
  "Baltics",
  "Black Sea",
  "Arctic corridor",
  "Persian Gulf",
  "Taiwan Strait",
  "Central Europe",
  "Korean DMZ",
  "South China Sea",
  "Mediterranean",
  "Sahel belt",
  "Levant corridor",
  "Indian Ocean"
];

const uiState = {
  gameState: null,
  activeOverlay: null,
  activeDomainId: null,
  activeSuiteId: null,
  activeActionId: null,
  globe: {
    instance: null,
    features: [],
    ready: false,
    resizeFrame: null
  },
  pendingBriefingAfterSummary: false,
  isGenerating: false,
  lastGenerationStep: ""
};

const els = {};

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  cacheElements();
  populateCountrySuggestions();
  populateDebugOptions();
  wireSetupForm();
  wireGlobalControls();
  loadSampleCampaign();
  updateYearOutput();
  setSetupStatus("Ready to launch. A sample campaign is preloaded so Start Campaign works immediately.");
  applyTheme(deriveTheme("Soviet Union", 1983, "alternate-history"));
}

function cacheElements() {
  const ids = [
    "setup-screen",
    "game-screen",
    "setup-form",
    "start-campaign",
    "setup-status",
    "campaign-country",
    "campaign-year",
    "year-output",
    "turn-duration",
    "scenario-mode",
    "campaign-premise",
    "provider-search",
    "provider-reasoner",
    "provider-resolver",
    "country-suggestions",
    "sample-campaign",
    "theme-label",
    "campaign-heading",
    "campaign-subheading",
    "topbar-metrics",
    "briefing-button",
    "scenario-button",
    "debug-button",
    "resolve-turn",
    "custom-directive",
    "domain-list",
    "globe-view",
    "globe-status",
    "world-map",
    "map-legend",
    "incident-watch",
    "incident-watch-count",
    "country-profile-title",
    "country-profile",
    "provider-badge",
    "unit-roster",
    "intel-feed",
    "queue-list",
    "queue-count",
    "history-log",
    "history-count",
    "overlay-backdrop",
    "domain-overlay",
    "overlay-domain-kicker",
    "overlay-domain-title",
    "overlay-domain-summary",
    "close-domain-overlay",
    "suite-grid-title",
    "suite-grid",
    "action-grid-title",
    "action-grid",
    "action-form-intro",
    "action-form",
    "summary-overlay",
    "summary-title",
    "summary-content",
    "close-summary-overlay",
    "briefing-overlay",
    "briefing-title",
    "briefing-summary",
    "briefing-oob",
    "briefing-news",
    "briefing-actions",
    "briefing-rundown",
    "close-briefing-overlay",
    "generation-overlay",
    "generation-title",
    "generation-summary",
    "generation-phase",
    "generation-step-count",
    "generation-progress-label",
    "generation-progress-bar",
    "generation-step",
    "generation-log",
    "scenario-overlay",
    "scenario-form",
    "scenario-edit-mode",
    "scenario-edit-premise",
    "close-scenario-overlay",
    "debug-overlay",
    "debug-form",
    "debug-event-type",
    "debug-event-severity",
    "debug-event-note",
    "close-debug-overlay"
  ];

  ids.forEach((id) => {
    els[id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = document.getElementById(id);
  });
}

function ensureGlobeInitialized() {
  if (uiState.globe.instance || !els.globeView) {
    queueGlobeViewportRefresh();
    return;
  }
  initializeGlobe();
}

function setGlobeStatus(message, visible = true) {
  if (!els.globeStatus) {
    return;
  }
  els.globeStatus.textContent = message;
  els.globeStatus.classList.toggle("hidden", !visible);
}

function initializeGlobe() {
  if (!window.Globe || !els.globeView) {
    setGlobeStatus("3D globe unavailable / using fallback map", true);
    return;
  }

  setGlobeStatus("Loading globe borders...", true);

  const globe = window.Globe()(els.globeView)
    .backgroundColor("rgba(0,0,0,0)")
    .showAtmosphere(true)
    .atmosphereColor("#8dd2ff")
    .atmosphereAltitude(0.16)
    .polygonAltitude((feature) => polygonAltitudeForFeature(feature))
    .polygonCapColor((feature) => polygonCapColorForFeature(feature))
    .polygonSideColor((feature) => polygonSideColorForFeature(feature))
    .polygonStrokeColor(() => "rgba(232,242,255,0.72)")
    .polygonsTransitionDuration(500)
    .onPolygonClick((feature) => handleGlobeCountrySelect(feature))
    .onPolygonHover(() => {});

  if (els.globeStatus && !els.globeStatus.isConnected) {
    els.globeView.appendChild(els.globeStatus);
  }

  if (window.THREE && window.THREE.MeshPhongMaterial) {
    globe.globeMaterial(new window.THREE.MeshPhongMaterial({ color: "#173650", emissive: "#102437", shininess: 10 }));
  }

  const controls = globe.controls();
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.minDistance = 180;
  controls.maxDistance = 360;
  controls.rotateSpeed = 0.85;
  controls.zoomSpeed = 0.9;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.18;

  globe.pointOfView({ lat: 18, lng: 12, altitude: 2.45 }, 0);
  uiState.globe.instance = globe;
  queueGlobeViewportRefresh();
  loadGlobeBorders();
}

function queueGlobeViewportRefresh() {
  if (!uiState.globe.instance || !els.globeView) {
    return;
  }

  if (uiState.globe.resizeFrame) {
    window.cancelAnimationFrame(uiState.globe.resizeFrame);
  }

  uiState.globe.resizeFrame = window.requestAnimationFrame(() => {
    uiState.globe.resizeFrame = null;
    refreshGlobeViewport();
  });
}

function refreshGlobeViewport() {
  if (!uiState.globe.instance || !els.globeView) {
    return;
  }

  const width = Math.max(els.globeView.clientWidth, 320);
  const height = Math.max(els.globeView.clientHeight, 320);
  uiState.globe.instance.width(width).height(height);

  if (uiState.gameState) {
    uiState.globe.instance.pointOfView(globeCameraForState(uiState.gameState), 0);
  }
}

async function loadGlobeBorders() {
  if (!window.topojson || !uiState.globe.instance) {
    return;
  }

  try {
    const world = window.WORLD_ATLAS_COUNTRIES_110M;
    const countriesMeta = window.WORLD_COUNTRIES_META;
    if (!world || !countriesMeta) {
      throw new Error("Local border datasets unavailable");
    }
    const metaByNumericCode = new Map(
      countriesMeta
        .filter((country) => country.ccn3 && country.name && country.name.common)
        .map((country) => [String(country.ccn3), country.name.common])
    );

    const features = window.topojson.feature(world, world.objects.countries).features
      .map((feature) => {
        const featureId = String(feature.id || "");
        const name = feature.properties && feature.properties.name ? feature.properties.name : metaByNumericCode.get(featureId);
        return {
          ...feature,
          properties: {
            ...(feature.properties || {}),
            name
          }
        };
      })
      .filter((feature) => feature.properties && feature.properties.name && feature.properties.name !== "Antarctica");
    if (!features.length) {
      throw new Error("No named country features returned");
    }
    uiState.globe.features = features;
    uiState.globe.ready = true;
    queueGlobeViewportRefresh();
    syncGlobeWithState(uiState.gameState);
    setGlobeStatus("Globe ready / click a country", false);
  } catch (error) {
    setGlobeStatus(`Border dataset failed / ${error.message}`, true);
    els.worldMap.classList.remove("hidden");
  }
}

function wireSetupForm() {
  els.campaignYear.addEventListener("input", updateYearOutput);
  els.campaignCountry.addEventListener("input", handleSetupFieldChange);
  els.turnDuration.addEventListener("change", handleSetupFieldChange);
  els.scenarioMode.addEventListener("change", handleSetupFieldChange);
  els.campaignPremise.addEventListener("input", handleSetupFieldChange);
  els.providerSearch.addEventListener("change", handleSetupFieldChange);
  els.providerReasoner.addEventListener("change", handleSetupFieldChange);
  els.providerResolver.addEventListener("change", handleSetupFieldChange);
  els.sampleCampaign.addEventListener("click", loadSampleCampaign);
  els.setupForm.addEventListener("submit", handleSetupSubmit);
}

function wireGlobalControls() {
  els.resolveTurn.addEventListener("click", handleResolveTurn);
  els.briefingButton.addEventListener("click", openBriefingOverlay);
  els.scenarioButton.addEventListener("click", openScenarioOverlay);
  els.debugButton.addEventListener("click", openDebugOverlay);
  els.customDirective.addEventListener("click", () => openDomainOverlay(CUSTOM_DOMAIN.id));

  els.closeDomainOverlay.addEventListener("click", hideOverlay);
  els.closeSummaryOverlay.addEventListener("click", handleSummaryDismiss);
  els.closeBriefingOverlay.addEventListener("click", hideOverlay);
  els.closeScenarioOverlay.addEventListener("click", hideOverlay);
  els.closeDebugOverlay.addEventListener("click", hideOverlay);
  els.overlayBackdrop.addEventListener("click", handleBackdropClick);
  window.addEventListener("resize", queueGlobeViewportRefresh);

  els.scenarioForm.addEventListener("submit", handleScenarioUpdate);
  els.debugForm.addEventListener("submit", handleDebugSubmit);
}

function populateCountrySuggestions() {
  els.countrySuggestions.innerHTML = COUNTRY_SUGGESTIONS.map((country) => `<option value="${escapeHtml(country)}"></option>`).join("");
}

function populateDebugOptions() {
  els.debugEventType.innerHTML = DEBUG_EVENT_TYPES.map((eventType) => `<option value="${escapeHtml(eventType)}">${escapeHtml(eventType)}</option>`).join("");
}

function updateYearOutput() {
  els.yearOutput.textContent = els.campaignYear.value;
}

function setSetupStatus(message, tone = "ready") {
  if (!els.setupStatus) {
    return;
  }
  els.setupStatus.textContent = message;
  els.setupStatus.dataset.tone = tone;
}

function handleSetupFieldChange() {
  if (uiState.isGenerating) {
    return;
  }
  setSetupStatus("Setup updated. Press Start Campaign when ready.", "ready");
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function setBusyMode(isBusy) {
  uiState.isGenerating = isBusy;
  const controls = [
    els.resolveTurn,
    els.briefingButton,
    els.scenarioButton,
    els.debugButton,
    els.customDirective,
    els.closeDomainOverlay,
    els.closeSummaryOverlay,
    els.closeBriefingOverlay,
    els.closeScenarioOverlay,
    els.closeDebugOverlay
  ].filter(Boolean);
  const setupSubmit = els.setupForm ? els.setupForm.querySelector('button[type="submit"]') : null;

  if (setupSubmit) {
    controls.push(setupSubmit);
  }

  if (els.startCampaign) {
    if (!els.startCampaign.dataset.idleLabel) {
      els.startCampaign.dataset.idleLabel = els.startCampaign.textContent;
    }
    els.startCampaign.textContent = isBusy ? "Generating..." : els.startCampaign.dataset.idleLabel;
    els.startCampaign.setAttribute("aria-busy", String(isBusy));
  }

  controls.forEach((control) => {
    control.disabled = isBusy;
    control.setAttribute("aria-disabled", String(isBusy));
  });
}

function renderGenerationOverlay(payload) {
  const progress = Math.max(0, Math.min(payload.progress || 0, 1));
  const totalSteps = payload.totalSteps || 0;
  const stepIndex = payload.stepIndex || 0;
  els.generationTitle.textContent = payload.title;
  els.generationSummary.textContent = payload.summary;
  els.generationPhase.textContent = payload.phase;
  els.generationStepCount.textContent = totalSteps ? `Step ${stepIndex} / ${totalSteps}` : "Step 0 / 0";
  els.generationProgressLabel.textContent = `${Math.round(progress * 100)}%`;
  els.generationStep.textContent = payload.step;
  els.generationProgressBar.style.width = `${Math.round(progress * 100)}%`;
  els.generationLog.innerHTML = payload.logs.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function generationPhaseLabel(stepIndex, totalSteps) {
  if (stepIndex <= 0) {
    return "Booting director";
  }
  if (stepIndex >= totalSteps) {
    return "Finalizing packet";
  }
  if (stepIndex === 1) {
    return "Parsing campaign state";
  }
  if (stepIndex >= totalSteps - 1) {
    return "Assembling final output";
  }
  return "Simulating and drafting";
}

async function runGenerationSequence(payload) {
  const logs = [];
  const totalSteps = payload.steps.length;
  uiState.lastGenerationStep = "Initializing director";
  setBusyMode(true);
  showOverlay("generation");
  renderGenerationOverlay({
    title: payload.title,
    summary: payload.summary,
    phase: generationPhaseLabel(0, totalSteps),
    stepIndex: 0,
    totalSteps,
    step: "Initializing director...",
    progress: 0,
    logs
  });

  try {
    for (let index = 0; index < payload.steps.length; index += 1) {
      const step = payload.steps[index];
      uiState.lastGenerationStep = step.label;
      renderGenerationOverlay({
        title: payload.title,
        summary: payload.summary,
        phase: generationPhaseLabel(index + 1, totalSteps),
        stepIndex: index + 1,
        totalSteps,
        step: step.label,
        progress: (index + 1) / payload.steps.length,
        logs
      });

      if (typeof step.run === "function") {
        await step.run();
      }

      const resolvedLog = typeof step.log === "function" ? step.log() : step.log;
      if (resolvedLog) {
        logs.push(resolvedLog);
        renderGenerationOverlay({
          title: payload.title,
          summary: payload.summary,
          phase: generationPhaseLabel(index + 1, totalSteps),
          stepIndex: index + 1,
          totalSteps,
          step: step.label,
          progress: (index + 1) / payload.steps.length,
          logs
        });
      }

      await sleep(step.delay || 650);
    }
  } finally {
    uiState.lastGenerationStep = "";
    setBusyMode(false);
    hideOverlay(true);
  }
}

function loadSampleCampaign() {
  els.campaignCountry.value = "Soviet Union";
  els.campaignYear.value = "1983";
  els.turnDuration.value = "30";
  els.scenarioMode.value = "alternate-history";
  els.campaignPremise.value =
    "NATO and Warsaw Pact postures are fraying after maritime reconnaissance collisions, pipeline sabotage rumors, and a sudden leadership health scare in Moscow.";
  els.providerSearch.value = "Perplexity Sonar";
  els.providerReasoner.value = "Llama Strategist";
  els.providerResolver.value = "Local Simulation Director";
  updateYearOutput();
  setSetupStatus("Sample loaded. Start Campaign will boot immediately with this configuration.", "ready");
}

async function handleSetupSubmit(event) {
  event.preventDefault();
  if (uiState.isGenerating) {
    return;
  }

  const country = sanitizeCountry(els.campaignCountry.value.trim());
  if (!country) {
    setSetupStatus("Type or pick a country first. The preloaded sample is also ready to launch.", "warning");
    els.campaignCountry.reportValidity();
    els.campaignCountry.focus();
    return;
  }

  setSetupStatus("Director booting campaign package. Generation overlay should appear now.", "working");

  const config = {
    country,
    year: Number(els.campaignYear.value),
    turnDurationDays: Number(els.turnDuration.value),
    scenario: els.scenarioMode.value,
    premise: els.campaignPremise.value.trim() || "A fragile geopolitical moment is waiting to be shaped.",
    providers: {
      search: els.providerSearch.value,
      reasoner: els.providerReasoner.value,
      resolver: els.providerResolver.value
    }
  };

  const hotspotPreview = getProvinceHints(config.country).slice(0, 3).join(", ") || "priority theatres";
  let nextState = null;

  try {
    await runGenerationSequence({
      title: `Generating ${config.country} / ${config.year}`,
      summary: `The director is building a fresh ${scenarioLabel(config.scenario).toLowerCase()} campaign package, assembling the order of battle, and drafting the opening intelligence packet.`,
      steps: [
        {
          label: "Opening the situation room and parsing the campaign frame",
          log: `${config.country} / ${config.year} / ${scenarioLabel(config.scenario)} campaign accepted for generation.`,
          delay: 760,
          run: () => {
            nextState = createInitialState(config);
            uiState.gameState = nextState;
          }
        },
        {
          label: "Building the opening order of battle and state posture",
          log: `Generating an era-appropriate OOB with logistics, intelligence, economic, military, and special capability context for ${config.country}.`,
          delay: 880
        },
        {
          label: "Reviewing rival alignments, flashpoints, and crisis indicators",
          log: `Scanning likely hotspots around ${hotspotPreview} and updating the initial map posture.`,
          delay: 760
        },
        {
          label: "Drafting news, foreign actions, and first-turn analysis",
          log: "Preparing the first known foreign moves, news cycle, and leadership rundown.",
          delay: 720,
          run: () => {
            nextState.currentBriefing = compileDirectorBriefing(nextState, "campaign");
          }
        },
        {
          label: "Finalizing the director packet for turn one",
          log: () => `Campaign package locked for ${formatDate(nextState.date)}. Entering the first turn with a freshly generated briefing.`,
          delay: 580
        }
      ]
    });
  } catch (error) {
    console.error("Campaign generation failed.", error);
    uiState.gameState = null;
    setScreen("setup");
    const detail = error && error.message ? error.message : String(error);
    const stepLabel = uiState.lastGenerationStep || "campaign startup";
    setSetupStatus(`Campaign generation failed during ${stepLabel}: ${detail}`, "error");
    return;
  }

  if (!nextState) {
    uiState.gameState = null;
    setScreen("setup");
    setSetupStatus("Campaign generation failed during startup: campaign state was not created.", "error");
    return;
  }

  if (!nextState.currentBriefing) {
    nextState.currentBriefing = compileDirectorBriefing(nextState, "campaign");
  }

  try {
    setScreen("game");
    renderGame();
    renderBriefing(nextState.currentBriefing);
  } catch (error) {
    console.error("Campaign presentation failed.", error);
    setScreen("setup");
    const detail = error && error.message ? error.message : String(error);
    setSetupStatus(`Campaign generated but failed while opening the command screen: ${detail}`, "error");
    return;
  }

  setSetupStatus("Campaign ready. Opening the director briefing.", "ready");
  showOverlay("briefing");
}

function setScreen(which) {
  const showSetup = which === "setup";
  els.setupScreen.classList.toggle("screen--active", showSetup);
  els.gameScreen.classList.toggle("screen--active", !showSetup);

  if (!showSetup) {
    window.requestAnimationFrame(() => {
      ensureGlobeInitialized();
      queueGlobeViewportRefresh();
      if (uiState.gameState) {
        renderMap(uiState.gameState);
      }
    });
  }
}

function createInitialState(config) {
  const theme = deriveTheme(config.country, config.year, config.scenario);
  const state = {
    config,
    theme,
    turn: 1,
    date: new Date(Date.UTC(config.year, 0, 1)),
    worldTension: initialTension(config.scenario),
    incidentCount: 0,
    queue: [],
    queueCounter: 0,
    historyLog: [],
    intelligenceFeed: [],
    incidentWatch: [],
    selectedMapCountry: findMapMatch(config.country) || "Russia",
    units: generateUnits(config.country, config.year),
    crisisIndex: baseCrisisIndex(config),
    contestedRegions: [],
    summary: null,
    latestForeignMoves: [],
    latestNews: [],
    currentBriefing: null
  };

  const first = generateIncident(state, "diplomatic", "serious");
  const second = generateIncident(state, "reconnaissance", "serious");
  const third = generateIncident(state, "economic", "contained");
  state.incidentWatch = [first, second, third];
  state.incidentCount = 3;
  state.intelligenceFeed = [
    intelCard("Director estimate", `The opening premise suggests the core line of pressure is "${trimText(config.premise, 96)}".`),
    intelCard("Foreign posture", `Rivals are testing reaction times against ${config.country} while neutral states remain cautious.`),
    intelCard("Capability snapshot", `The simulation unlocked ${countUnlockedDomains(config.year)} strategic domains for ${config.year}.`)
  ];
  state.latestForeignMoves = buildForeignMoves(state);
  state.latestNews = buildNewsHeadlines(state, [first, second, third]);
  state.historyLog = [
    historyCard(formatDate(state.date), "Campaign initialized", `${config.country} enters ${config.year} under a ${scenarioLabel(config.scenario).toLowerCase()} frame.`),
    historyCard(formatDate(state.date), first.headline, first.detail),
    historyCard(formatDate(state.date), second.headline, second.detail)
  ];

  return state;
}

function renderGame() {
  const state = uiState.gameState;
  if (!state) {
    return;
  }

  applyTheme(state.theme);
  renderTopbar(state);
  renderDomains(state);
  renderLegend();
  renderMap(state);
  renderIncidentWatch(state);
  renderCountryProfile(state);
  renderUnits(state);
  renderIntelFeed(state);
  renderQueue(state);
  renderHistory(state);
}

function renderTopbar(state) {
  els.themeLabel.textContent = state.theme.label;
  els.campaignHeading.textContent = `${state.config.country} / ${state.config.year}`;
  els.campaignSubheading.textContent = `${scenarioLabel(state.config.scenario)} / ${trimText(state.config.premise, 120)}`;
  els.providerBadge.textContent = state.config.providers.resolver;

  const metrics = [
    { label: "Date", value: formatDate(state.date) },
    { label: "Turn", value: `#${state.turn}` },
    { label: "Tension", value: `${state.worldTension}/100` },
    { label: "Events logged", value: `${state.incidentCount}` }
  ];

  els.topbarMetrics.innerHTML = metrics
    .map((metric) => `<article class="metric-card"><span>${escapeHtml(metric.label)}</span><strong>${escapeHtml(metric.value)}</strong></article>`)
    .join("");
}

function renderDomains(state) {
  const domains = [...DOMAIN_DEFINITIONS, CUSTOM_DOMAIN];
  els.domainList.innerHTML = domains
    .map((domain) => {
      const unlocked = domain.earliestYear <= state.config.year;
      const suiteCount = domain.actionSuites ? domain.actionSuites.length : 0;
      const tone = unlocked ? `${suiteCount} sub-domains / ${domain.actions.length} actions` : `Unlocks in ${domain.earliestYear}`;
      return `
        <button class="domain-button ${unlocked ? "" : "domain-button--locked"}" type="button" data-domain-id="${escapeHtml(domain.id)}">
          <div class="domain-button__headline">
            <strong>${escapeHtml(domain.label)}</strong>
            <span class="panel-pill">${escapeHtml(tone)}</span>
          </div>
          <div class="domain-button__summary">${escapeHtml(domain.summary)}</div>
          <div class="tag-row">
            <span class="tag">${escapeHtml(unlocked ? "Available" : "Anachronistic")}</span>
            <span class="tag">${escapeHtml(String(domain.earliestYear))}</span>
          </div>
        </button>
      `;
    })
    .join("");

  els.domainList.querySelectorAll("[data-domain-id]").forEach((button) => {
    button.addEventListener("click", () => openDomainOverlay(button.dataset.domainId));
  });
}

function renderLegend() {
  const items = [
    { label: "Player", color: "var(--map-player)" },
    { label: "Allied", color: "var(--map-allied)" },
    { label: "Rival", color: "var(--map-rival)" },
    { label: "Contested", color: "var(--map-contested)" },
    { label: "Watched", color: "var(--map-watched)" },
    { label: "Neutral", color: "var(--map-neutral)" }
  ];

  els.mapLegend.innerHTML = items
    .map((item) => `<span class="legend-chip" style="color:${item.color}">${escapeHtml(item.label)}</span>`)
    .join("");
}

function renderMap(state) {
  if (uiState.globe.ready && uiState.globe.instance) {
    els.worldMap.classList.add("hidden");
    syncGlobeWithState(state);
    return;
  }

  els.worldMap.classList.remove("hidden");
  const selected = findMapMatch(state.selectedMapCountry) || findMapMatch(state.config.country) || "Russia";
  const preset = getRelationPreset(state.config.country);
  const contested = new Set(state.contestedRegions);
  const plateTop = "82,86 1110,72 1166,128 1118,548 202,578 72,522 34,164";
  const plateDepth = offsetPolygon(plateTop, 0, 34);

  const svgContent = WORLD_REGIONS.map((region) => {
    const status = relationForRegion(region.label, state.config.country, preset, contested);
    const selectedClass = sameCountry(region.label, selected) ? " map-region--selected" : "";
    const centroid = polygonCentroid(region.points);
    const shadowPoints = offsetPolygon(region.points, 18, 24);
    return `
      <g data-map-country="${escapeHtml(region.label)}">
        <polygon class="map-region map-shadow-region map-region--${escapeHtml(status)}" points="${shadowPoints}"></polygon>
        <polygon class="map-region map-region-face map-region--${escapeHtml(status)}${selectedClass}" points="${region.points}"></polygon>
        <polygon class="map-border-line map-border-line--soft" points="${region.points}"></polygon>
        <polygon class="map-border-line" points="${region.points}"></polygon>
        <text class="map-label" x="${centroid.x}" y="${centroid.y + 4}" text-anchor="middle">${escapeHtml(shortLabel(region.label))}</text>
      </g>
    `;
  }).join("");

  els.worldMap.innerHTML = `
    <defs>
      <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(18,54,78,0.92)"></stop>
        <stop offset="55%" stop-color="rgba(8,24,39,0.96)"></stop>
        <stop offset="100%" stop-color="rgba(4,10,17,1)"></stop>
      </linearGradient>
    </defs>
    <polygon class="map-ocean-depth" points="${plateDepth}"></polygon>
    <polygon class="map-ocean-plate" points="${plateTop}"></polygon>
    ${svgContent}
  `;
  els.worldMap.querySelectorAll("[data-map-country]").forEach((group) => {
    group.addEventListener("click", () => {
      state.selectedMapCountry = group.dataset.mapCountry;
      renderMap(state);
      renderCountryProfile(state);
    });
  });
}

function syncGlobeWithState(state) {
  if (!uiState.globe.instance || !uiState.globe.features.length || !state) {
    return;
  }

  refreshGlobeViewport();
  const globe = uiState.globe.instance;
  globe.polygonsData(uiState.globe.features);
  globe.polygonAltitude((feature) => polygonAltitudeForFeature(feature, state));
  globe.polygonCapColor((feature) => polygonCapColorForFeature(feature, state));
  globe.polygonSideColor((feature) => polygonSideColorForFeature(feature, state));
  globe.pointOfView(globeCameraForState(state), 900);
}

function polygonAltitudeForFeature(feature, state = uiState.gameState) {
  if (!state || !feature || !feature.properties) {
    return 0.01;
  }
  const relation = relationForRegion(feature.properties.name, state.config.country, getRelationPreset(state.config.country), new Set(state.contestedRegions));
  if (sameCountry(feature.properties.name, state.selectedMapCountry || state.config.country)) {
    return 0.14;
  }
  if (relation === "player") {
    return 0.1;
  }
  if (relation === "contested") {
    return 0.07;
  }
  if (relation === "rival") {
    return 0.04;
  }
  if (relation === "allied") {
    return 0.03;
  }
  return 0.014;
}

function polygonCapColorForFeature(feature, state = uiState.gameState) {
  if (!state || !feature || !feature.properties) {
    return "rgba(120, 146, 170, 0.75)";
  }
  const relation = relationForRegion(feature.properties.name, state.config.country, getRelationPreset(state.config.country), new Set(state.contestedRegions));
  return relationColor(relation, 0.92);
}

function polygonSideColorForFeature(feature, state = uiState.gameState) {
  if (!state || !feature || !feature.properties) {
    return "rgba(48, 66, 82, 0.9)";
  }
  const relation = relationForRegion(feature.properties.name, state.config.country, getRelationPreset(state.config.country), new Set(state.contestedRegions));
  return relationSideColor(relation);
}

function handleGlobeCountrySelect(feature) {
  if (!uiState.gameState || !feature || !feature.properties) {
    return;
  }
  uiState.gameState.selectedMapCountry = feature.properties.name;
  renderMap(uiState.gameState);
  renderCountryProfile(uiState.gameState);
}

function globeCameraForState(state) {
  const focus = canonicalCountry(state.selectedMapCountry || state.config.country);
  const viewpoints = {
    "United States": { lat: 38, lng: -96, altitude: 2.28 },
    Russia: { lat: 58, lng: 88, altitude: 2.34 },
    "Soviet Union": { lat: 58, lng: 88, altitude: 2.34 },
    China: { lat: 34, lng: 104, altitude: 2.28 },
    India: { lat: 23, lng: 80, altitude: 2.2 },
    "United Kingdom": { lat: 55, lng: -3, altitude: 2.18 },
    France: { lat: 46, lng: 2, altitude: 2.18 },
    Iran: { lat: 32, lng: 53, altitude: 2.22 },
    Brazil: { lat: -14, lng: -52, altitude: 2.3 },
    Australia: { lat: -25, lng: 134, altitude: 2.3 }
  };
  return viewpoints[focus] || { lat: 20, lng: 15, altitude: 2.4 };
}

function renderIncidentWatch(state) {
  els.incidentWatchCount.textContent = `${state.incidentWatch.length} active`;
  els.incidentWatch.innerHTML = state.incidentWatch
    .slice(0, 5)
    .map(
      (incident) => `
        <li>
          <small>${escapeHtml(incident.category.toUpperCase())}</small>
          <div>${escapeHtml(incident.headline)}</div>
        </li>
      `
    )
    .join("");
}

function renderCountryProfile(state) {
  const selectedCountry = state.selectedMapCountry || state.config.country;
  const relation = relationForRegion(selectedCountry, state.config.country, getRelationPreset(state.config.country), new Set(state.contestedRegions));
  const provinceHints = getProvinceHints(selectedCountry);
  const profile = [
    { title: "Campaign State", value: state.config.country },
    { title: "Map Selection", value: selectedCountry },
    { title: "Relation", value: relationLabel(relation) },
    { title: "Theme", value: state.theme.label },
    { title: "Premise", value: trimText(state.config.premise, 88) },
    { title: "Province Watch", value: provinceHints.join(", ") }
  ];

  els.countryProfileTitle.textContent = `Selected Country / ${selectedCountry}`;
  els.countryProfile.innerHTML = profile
    .map(
      (item) => `
        <article>
          <h5>${escapeHtml(item.title)}</h5>
          <p>${escapeHtml(item.value)}</p>
        </article>
      `
    )
    .join("");
}

function renderUnits(state) {
  els.unitRoster.innerHTML = Object.entries(state.units)
    .map(
      ([group, items]) => `
        <section class="unit-group">
          <h5>${escapeHtml(group)}</h5>
          <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      `
    )
    .join("");
}

function renderIntelFeed(state) {
  els.intelFeed.innerHTML = state.intelligenceFeed
    .slice(0, 6)
    .map(
      (item) => `
        <li>
          <small>${escapeHtml(item.kicker)}</small>
          <div>${escapeHtml(item.text)}</div>
        </li>
      `
    )
    .join("");
}

function renderQueue(state) {
  els.queueCount.textContent = `${state.queue.length} queued`;
  if (!state.queue.length) {
    els.queueList.innerHTML = `
      <article class="queue-card">
        <div class="queue-card__headline">
          <strong>No pending actions</strong>
          <span class="panel-pill">Idle</span>
        </div>
        <p>Open a domain to queue military, economic, intelligence, diplomatic, or custom directives before resolving the turn.</p>
      </article>
    `;
    return;
  }

  els.queueList.innerHTML = state.queue
    .map(
      (queued) => `
        <article class="queue-card">
          <div class="queue-card__headline">
            <strong>${escapeHtml(queued.actionLabel)}</strong>
            <span class="panel-pill">${escapeHtml(queued.domainLabel)}</span>
          </div>
          <small>Turn ${escapeHtml(String(queued.queuedAtTurn))}</small>
          <p>${escapeHtml(queued.summary)}</p>
        </article>
      `
    )
    .join("");
}

function renderHistory(state) {
  els.historyCount.textContent = `${state.historyLog.length} entries`;
  els.historyLog.innerHTML = state.historyLog
    .slice(0, 10)
    .map(
      (item) => `
        <article class="history-card">
          <div class="queue-card__headline">
            <strong>${escapeHtml(item.title)}</strong>
            <span class="panel-pill">${escapeHtml(item.stamp)}</span>
          </div>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `
    )
    .join("");
}

function openDomainOverlay(domainId) {
  const state = uiState.gameState;
  if (!state) {
    return;
  }

  const domain = getDomainById(domainId);
  if (!domain) {
    return;
  }

  uiState.activeDomainId = domain.id;
  uiState.activeSuiteId = domain.actionSuites[0] ? domain.actionSuites[0].id : null;
  uiState.activeActionId = null;
  els.overlayDomainKicker.textContent = domain.label;
  els.overlayDomainTitle.textContent = `${domain.label} Action Palette`;
  els.overlayDomainSummary.textContent = domain.summary;
  els.suiteGridTitle.textContent = `${domain.actionSuites.length} sub-domains`;
  renderSuiteGrid(domain, state);
  renderActionGrid(domain, state, uiState.activeSuiteId);
  els.actionForm.classList.add("hidden");
  els.actionFormIntro.classList.remove("hidden");
  els.actionForm.innerHTML = "";
  showOverlay("domain");
}

function renderSuiteGrid(domain, state) {
  els.suiteGrid.innerHTML = domain.actionSuites
    .map((item) => {
      const unlocked = item.earliestYear <= state.config.year;
      const selected = uiState.activeSuiteId === item.id;
      const availability = unlocked ? "Ready" : `Year ${item.earliestYear}`;
      return `
        <button class="suite-card ${unlocked ? "" : "action-card--locked"} ${selected ? "suite-card--selected" : ""}" type="button" data-suite-id="${escapeHtml(item.id)}">
          <div class="suite-card__headline">
            <strong>${escapeHtml(item.label)}</strong>
            <span class="panel-pill">${escapeHtml(availability)}</span>
          </div>
          <div class="suite-card__summary">${escapeHtml(item.summary)}</div>
          <div class="tag-row">
            <span class="tag">${escapeHtml(`${item.actions.length} choices`)}</span>
            <span class="tag">${escapeHtml(unlocked ? "Open" : "Locked")}</span>
          </div>
        </button>
      `;
    })
    .join("");

  els.suiteGrid.querySelectorAll("[data-suite-id]").forEach((button) => {
    button.addEventListener("click", () => {
      uiState.activeSuiteId = button.dataset.suiteId;
      uiState.activeActionId = null;
      renderSuiteGrid(domain, state);
      renderActionGrid(domain, state, uiState.activeSuiteId);
      els.actionForm.classList.add("hidden");
      els.actionFormIntro.classList.remove("hidden");
      els.actionForm.innerHTML = "";
    });
  });
}

function renderActionGrid(domain, state, suiteId) {
  const suite = findSuiteById(domain, suiteId) || domain.actionSuites[0];
  if (!suite) {
    els.actionGridTitle.textContent = "No sub-domains";
    els.actionGrid.innerHTML = "";
    return;
  }

  els.actionGridTitle.textContent = `${suite.label} / ${suite.actions.length} choices`;
  els.actionGrid.innerHTML = suite.actions
    .map((item) => {
      const unlocked = item.earliestYear <= state.config.year;
      const selected = uiState.activeActionId === item.id;
      const availability = unlocked ? "Ready" : `Year ${item.earliestYear}`;
      return `
        <button class="action-card ${unlocked ? "" : "action-card--locked"} ${selected ? "action-card--selected" : ""}" type="button" data-action-id="${escapeHtml(item.id)}">
          <div class="action-card__headline">
            <strong>${escapeHtml(item.label)}</strong>
            <span class="panel-pill">${escapeHtml(availability)}</span>
          </div>
          <div class="action-card__summary">${escapeHtml(item.summary)}</div>
          <div class="tag-row">${item.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </button>
      `;
    })
    .join("");

  els.actionGrid.querySelectorAll("[data-action-id]").forEach((button) => {
    button.addEventListener("click", () => {
      uiState.activeActionId = button.dataset.actionId;
      renderActionGrid(domain, state, suite.id);
      renderActionForm(domain.id, suite.id, button.dataset.actionId, state);
    });
  });
}

function renderActionForm(domainId, suiteId, actionId, state) {
  const domain = getDomainById(domainId);
  const suite = findSuiteById(domain, suiteId);
  const item = suite ? suite.actions.find((entry) => entry.id === actionId) : null;
  if (!item) {
    return;
  }

  const unlocked = item.earliestYear <= state.config.year;
  const introBlocks = [];
  if (item.warning) {
    introBlocks.push(`<div class="action-form__warning">${escapeHtml(item.warning)}</div>`);
  }
  if (!unlocked) {
    introBlocks.push(`<div class="action-form__availability">Blocked by anachronism guard. ${escapeHtml(item.label)} becomes available in ${item.earliestYear}.</div>`);
  }

  els.actionFormIntro.classList.add("hidden");
  els.actionForm.classList.remove("hidden");
  els.actionForm.innerHTML = `
    <h3>${escapeHtml(item.label)}</h3>
    <p class="subdued">${escapeHtml(item.summary)}</p>
    <div class="tag-row">
      <span class="tag">${escapeHtml(suite.label)}</span>
      <span class="tag">${escapeHtml(domain.label)}</span>
    </div>
    ${introBlocks.join("")}
    <div class="form-grid">${item.fieldIds.map((fieldId) => renderField(fieldId)).join("")}</div>
    <button class="primary-button" type="submit" ${unlocked ? "" : "disabled"}>Queue Action</button>
  `;

  els.actionForm.onsubmit = (event) => {
    event.preventDefault();
    if (!unlocked) {
      return;
    }
    const formData = collectFormData(els.actionForm, item.fieldIds);
    queueAction(domain, item, formData);
    hideOverlay();
  };
}

function findSuiteById(domain, suiteId) {
  return domain.actionSuites.find((suite) => suite.id === suiteId);
}

function renderField(fieldId) {
  const field = FIELD_DEFINITIONS[fieldId];
  if (!field) {
    return "";
  }

  const wrapperClass = field.wide ? "field field--wide" : "field";
  if (field.type === "textarea") {
    return `
      <label class="${wrapperClass}">
        <span>${escapeHtml(field.label)}</span>
        <textarea name="${escapeHtml(fieldId)}" rows="4" placeholder="${escapeHtml(field.placeholder || "")}"></textarea>
      </label>
    `;
  }
  if (field.type === "select") {
    return `
      <label class="${wrapperClass}">
        <span>${escapeHtml(field.label)}</span>
        <select name="${escapeHtml(fieldId)}">
          ${field.options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}
        </select>
      </label>
    `;
  }
  return `
    <label class="${wrapperClass}">
      <span>${escapeHtml(field.label)}</span>
      <input name="${escapeHtml(fieldId)}" type="text" placeholder="${escapeHtml(field.placeholder || "")}" />
    </label>
  `;
}

function collectFormData(form, fieldIds) {
  const data = {};
  fieldIds.forEach((fieldId) => {
    const input = form.elements.namedItem(fieldId);
    data[fieldId] = input ? String(input.value).trim() : "";
  });
  return data;
}

function queueAction(domain, item, formData) {
  const state = uiState.gameState;
  state.queueCounter += 1;

  const summaryParts = [];
  if (formData.targetCountry) {
    summaryParts.push(`Target: ${formData.targetCountry}`);
  }
  if (formData.targetRegion) {
    summaryParts.push(`Theatre: ${formData.targetRegion}`);
  }
  if (formData.objective) {
    summaryParts.push(trimText(formData.objective, 72));
  }
  if (formData.directive) {
    summaryParts.push(trimText(formData.directive, 72));
  }

  state.queue.push({
    id: `q-${state.queueCounter}`,
    domainId: domain.id,
    domainLabel: domain.label,
    actionId: item.id,
    actionLabel: item.label,
    summary: summaryParts.join(" / ") || item.summary,
    formData,
    queuedAtTurn: state.turn
  });

  state.historyLog.unshift(historyCard(formatDate(state.date), `Queued / ${item.label}`, summaryParts.join(" / ") || item.summary));
  renderQueue(state);
  renderHistory(state);
}

async function handleResolveTurn() {
  const state = uiState.gameState;
  if (!state || uiState.isGenerating) {
    return;
  }

  let summary = null;

  try {
    await runGenerationSequence({
      title: `Resolving Turn ${state.turn}`,
      summary: `The director is adjudicating ${state.config.country}'s queued directives, generating foreign reactions, and staging the next intelligence cycle for ${formatDate(addDays(state.date, state.config.turnDurationDays))}.`,
      steps: [
        {
          label: "Reviewing queued directives and current national posture",
          log: state.queue.length
            ? `${state.queue.length} directive${state.queue.length === 1 ? "" : "s"} queued for adjudication.`
            : "No directives were queued, so the director is preparing a passive monitoring turn.",
          delay: 620
        },
        {
          label: "Adjudicating rival, allied, and neutral responses",
          log: `Foreign reactions projected across ${countUnlockedDomains(state.date.getUTCFullYear())} unlocked strategic domains.`,
          delay: 760,
          run: () => {
            summary = resolveTurnState(state);
            renderGame();
          }
        },
        {
          label: "Recording incidents and updating the world state",
          log: "Incident wave adjudicated and the new strategic baseline has been recorded for the coming turn.",
          delay: 700
        },
        {
          label: "Preparing the summary while the full intelligence packet remains pending",
          log: "Turn summary assembled. The detailed OOB, news packet, and known-action briefing will be generated after this review screen.",
          delay: 560
        }
      ]
    });
  } catch (error) {
    console.error("Turn resolution failed.", error);
    return;
  }

  renderGame();
  renderSummary(summary);
  showOverlay("summary");
}

function resolveTurnState(state) {
  const outcomes = state.queue.length ? state.queue.map((entry) => resolveQueuedAction(entry, state)) : [passiveOutcome(state)];
  const foreignMoves = buildForeignMoves(state);
  const incidents = buildIncidentWave(state);
  const tensionDelta = outcomes.reduce((sum, outcome) => sum + outcome.tensionDelta, 0) + incidents.reduce((sum, incident) => sum + incident.tensionDelta, 0);

  state.worldTension = clamp(state.worldTension + tensionDelta, 0, 100);
  state.crisisIndex = clamp(state.crisisIndex + Math.max(1, Math.round(tensionDelta / 2)), 0, 100);
  state.date = addDays(state.date, state.config.turnDurationDays);
  state.turn += 1;
  state.incidentWatch = incidents.slice(0, 5);
  state.incidentCount += incidents.length;
  state.contestedRegions = deriveContestedRegions(incidents, foreignMoves);
  state.intelligenceFeed = [
    intelCard("Turn assessment", outcomes[0].detail),
    intelCard("Foreign moves", foreignMoves[0]),
    intelCard("Crisis watch", incidents[0].detail),
    ...state.intelligenceFeed
  ].slice(0, 6);

  const summary = {
    title: `Turn ${state.turn - 1} Summary`,
    playerOutcomes: outcomes.map((item) => `${item.title}: ${item.detail}`),
    foreignMoves,
    incidents: incidents.map((incident) => `${incident.headline}: ${incident.detail}`),
    overview: buildOverview(state, outcomes, foreignMoves, incidents)
  };

  state.summary = summary;
  state.latestForeignMoves = foreignMoves;
  state.latestNews = [];
  state.currentBriefing = null;
  uiState.pendingBriefingAfterSummary = true;
  state.historyLog.unshift(historyCard(formatDate(state.date), summary.title, summary.overview));
  foreignMoves.slice(0, 2).forEach((move, index) => state.historyLog.unshift(historyCard(formatDate(state.date), `Foreign move ${index + 1}`, move)));
  incidents.slice(0, 2).forEach((incident) => state.historyLog.unshift(historyCard(formatDate(state.date), incident.headline, incident.detail)));
  outcomes.forEach((outcome) => state.historyLog.unshift(historyCard(formatDate(state.date), outcome.title, outcome.detail)));

  state.queue = [];
  state.units = generateUnits(state.config.country, state.date.getUTCFullYear());
  return summary;
}

function passiveOutcome(state) {
  return {
    title: "Passive monitoring turn",
    detail: `Leadership withheld new directives, so the director focused on quiet contingency planning around ${trimText(state.config.premise, 76)}.`,
    tensionDelta: 1
  };
}

function resolveQueuedAction(entry, state) {
  const domain = getDomainById(entry.domainId);
  const actionItem = domain.actions.find((candidate) => candidate.id === entry.actionId);
  const roll = Math.random();
  let grade = "success";

  if (roll + actionItem.pressure / 40 > 1.2) {
    grade = "blowback";
  } else if (roll + actionItem.pressure / 70 > 0.82) {
    grade = "mixed";
  }

  const target = entry.formData.targetCountry || entry.formData.targetRegion || "the theatre";
  const objective = entry.formData.objective || entry.formData.directive || entry.formData.justification || actionItem.summary;

  return {
    title: `${actionItem.label} / ${gradeLabel(grade)}`,
    detail: narrativeByDomain(domain.id, actionItem.label, target, objective, grade, state),
    tensionDelta: actionTensionDelta(actionItem.pressure, grade)
  };
}

function narrativeByDomain(domainId, label, target, objective, grade, state) {
  const objectiveTrimmed = trimText(objective, 90);
  const targetText = target || "the theatre";
  const premiseHook = trimText(state.config.premise, 68);

  const successSnippets = {
    logistics: `Quartermasters and planners turned ${label.toLowerCase()} into a real throughput gain around ${targetText}, giving leadership new tempo and making "${objectiveTrimmed}" feel achievable.`,
    "internal-security": `Security ministries executed ${label.toLowerCase()} with discipline, tightening control around ${targetText} while publicly framing it around "${objectiveTrimmed}".`,
    military: `Field commands treated ${label.toLowerCase()} as a serious operational shift, and the first effects around ${targetText} were sharp enough to force foreign watchers to recalculate.`,
    diplomacy: `The diplomatic corps turned ${label.toLowerCase()} into a usable lane, and private reactions suggest the line around ${targetText} is no longer being dismissed.`,
    economics: `Finance and industry officials synchronized ${label.toLowerCase()} faster than expected, producing real leverage tied to ${targetText} and reinforcing "${objectiveTrimmed}".`,
    intelligence: `Collection and analytic teams translated ${label.toLowerCase()} into a clearer picture of ${targetText}, reducing uncertainty around ${premiseHook}.`,
    cyber: `The cyber move generated a meaningful but high-level strategic effect around ${targetText}, buying pressure without exposing the exact means.`,
    "electronic-warfare": `Spectrum operators made ${label.toLowerCase()} felt across ${targetText}, complicating rival timing and sharpening your own operational window.`,
    space: `The space apparatus used ${label.toLowerCase()} to broaden strategic awareness over ${targetText}, giving leadership a calmer picture of the board.`,
    cbrn: `CBRN planners treated ${label.toLowerCase()} as a genuine readiness move, tightening deterrence and resilience cues linked to ${targetText}.`,
    "r-and-d": `Technocrats and procurement managers gave ${label.toLowerCase()} institutional backing, turning it from concept into a credible long-cycle program around "${objectiveTrimmed}".`,
    custom: `The director accepted the freeform directive and translated it into a coherent state move aimed at ${targetText}, with momentum building around "${objectiveTrimmed}".`
  };

  const mixedSnippets = {
    logistics: `The plan moved, but chokepoints around ${targetText} slowed the desired effect and exposed the gap between ambition and transport reality.`,
    "internal-security": `The state tightened its grip, but ${label.toLowerCase()} generated friction and a louder-than-expected social aftertaste near ${targetText}.`,
    military: `The move signaled resolve, yet rival surveillance absorbed enough of it that ${label.toLowerCase()} around ${targetText} became a warning shot more than a breakthrough.`,
    diplomacy: `Backchannel interest surfaced, but public messaging and elite mistrust kept ${label.toLowerCase()} from fully resetting the mood around ${targetText}.`,
    economics: `Markets and ministries reacted unevenly, so ${label.toLowerCase()} bought time without fully stabilizing the line tied to ${targetText}.`,
    intelligence: `Fresh reporting arrived, but analysts still disagree about what it really means for ${targetText} and the broader premise.`,
    cyber: `The operation landed partially. It rattled networks around ${targetText}, but the strategic signal became noisier and less controllable than intended.`,
    "electronic-warfare": `The spectrum picture shifted, but rival adaptation blunted the edge of ${label.toLowerCase()} across ${targetText}.`,
    space: `The orbital move improved awareness, but weather, timing, or politics limited how decisive the effect really felt over ${targetText}.`,
    cbrn: `Readiness increased, though public interpretation and foreign nerves made ${label.toLowerCase()} around ${targetText} look more alarming than stabilizing.`,
    "r-and-d": `The program survived, but industrial drag and bureaucratic bargaining made ${label.toLowerCase()} feel promising rather than transformational.`,
    custom: `The freeform directive resolved with mixed results: leadership created motion, but the board around ${targetText} stayed more ambiguous than planned.`
  };

  const blowbackSnippets = {
    logistics: `${label} exposed bottlenecks and political strain, leaving rivals with evidence that ${targetText} is under heavier pressure than leadership wanted to admit.`,
    "internal-security": `${label} restored order only superficially, and the coercive edge around ${targetText} is now feeding wider instability.`,
    military: `${label} pushed the crisis closer to the cliff. Around ${targetText}, rivals interpreted the move as escalation rather than controlled signaling.`,
    diplomacy: `${label} backfired publicly, hardening positions and making quiet compromise over ${targetText} more difficult than before.`,
    economics: `${label} triggered economic whiplash, with the domestic cost now competing directly against the strategic gain sought around ${targetText}.`,
    intelligence: `${label} surfaced too visibly, compromising channels and muddying the picture of ${targetText} at the exact moment clarity was needed.`,
    cyber: `${label} produced disruptive blowback and attribution rumors, turning the move around ${targetText} into a strategic liability.`,
    "electronic-warfare": `${label} created temporary chaos, but rival operators adapted quickly and now your own forces are paying for the exposure around ${targetText}.`,
    space: `${label} spooked outside observers and inflated crisis signaling beyond what leadership seems ready to manage around ${targetText}.`,
    cbrn: `${label} triggered diplomatic alarm and domestic anxiety, raising the crisis temperature around ${targetText} instead of containing it.`,
    "r-and-d": `${label} became a contested prestige gamble, drawing scrutiny and slowing practical capability gains.`,
    custom: `The freeform directive achieved motion but also strategic blowback, and leadership now has to absorb consequences it only partly anticipated around ${targetText}.`
  };

  if (grade === "success") {
    return successSnippets[domainId] || successSnippets.custom;
  }
  if (grade === "mixed") {
    return mixedSnippets[domainId] || mixedSnippets.custom;
  }
  return blowbackSnippets[domainId] || blowbackSnippets.custom;
}

function actionTensionDelta(pressure, grade) {
  if (grade === "success") {
    return Math.round(pressure * 0.65);
  }
  if (grade === "mixed") {
    return Math.round(pressure * 0.85);
  }
  return Math.round(pressure * 1.15);
}

function buildForeignMoves(state) {
  const preset = getRelationPreset(state.config.country);
  const rival = randomFrom(preset.rivals.length ? preset.rivals : ["United States", "Russia", "China"]);
  const ally = randomFrom(preset.allies.length ? preset.allies : ["France", "India", "Turkey"]);
  const neutral = randomFrom(preset.watched.length ? preset.watched : ["Turkey", "Saudi Arabia", "India"]);

  return [
    `${rival} quietly shifted readiness and public messaging, suggesting it believes ${state.config.country} may test another lever next turn.`,
    `${ally} opened a discreet channel offering either political cover or practical coordination if the crisis linked to "${trimText(state.config.premise, 58)}" worsens.`,
    `${neutral} is hedging, signaling concern about escalation while probing for economic and diplomatic advantage.`
  ];
}

function buildKnownForeignActions(state) {
  const moves = state.latestForeignMoves && state.latestForeignMoves.length ? state.latestForeignMoves : buildForeignMoves(state);
  return moves.map((move) => `Known to your services: ${move}`);
}

function buildNewsHeadlines(state, incidents) {
  return incidents.slice(0, 5).map((incident) => `Newswire / ${incident.headline}: ${incident.detail}`);
}

function buildIncidentWave(state) {
  const availableCategories = categoriesForYear(state.date.getUTCFullYear());
  return [0, 1, 2, 3].map(() => {
    const category = randomFrom(availableCategories);
    const severity = randomFrom(["contained", "serious", "serious", "extreme"]);
    return generateIncident(state, category, severity);
  });
}

function generateIncident(state, category, severity, forcedNote = "") {
  const preset = getRelationPreset(state.config.country);
  const actorPool = [...preset.rivals, ...preset.allies, ...preset.watched, ...WORLD_REGIONS.map((entry) => entry.label)];
  const actor = randomFrom(actorPool.filter(Boolean));
  const target = randomFrom([state.config.country, ...preset.rivals, ...preset.watched, "shipping lanes", "alliance posture"]);
  const theatre = randomFrom(INCIDENT_THEATRES);
  const severityText = severity === "extreme" ? "high-consequence" : severity === "serious" ? "tense" : "contained";

  const templates = {
    aerial: {
      headline: `Aerial intercept over ${theatre}`,
      detail: `To your knowledge, ${actor} aircraft challenged movement near ${theatre}, forcing a ${severityText} interception cycle that now colors how ${target} interprets the crisis.`
    },
    naval: {
      headline: `Naval shadowing in ${theatre}`,
      detail: `${actor} surface or submarine activity near ${theatre} triggered shadowing and messaging contests, with ${target} now reassessing the maritime balance.`
    },
    ground: {
      headline: `Ground alert near ${theatre}`,
      detail: `Field units tied to ${actor} shifted posture around ${theatre}, creating a visible ground alert that makes local commanders more nervous than public officials admit.`
    },
    reconnaissance: {
      headline: `Reconnaissance spike around ${theatre}`,
      detail: `${actor} appears to be mapping the theatre more aggressively. Analysts suspect the move is linked to ${trimText(state.config.premise, 66)}.`
    },
    military: {
      headline: `Military signal from ${actor}`,
      detail: `${actor} paired readiness moves with harsher language, and the signal reached ${target} with enough clarity to move crisis planners into a tighter cycle.`
    },
    diplomatic: {
      headline: `Diplomatic rupture watch`,
      detail: `Diplomatic traffic suggests ${actor} is considering a harder line over ${theatre}, while ${target} searches for a face-saving reply.`
    },
    economic: {
      headline: `Economic shock ripple`,
      detail: `Commodity and currency chatter tied to ${actor} pushed a ${severityText} economic ripple into the board, especially around ${theatre}.`
    },
    cyber: {
      headline: `Cyber disruption rumor`,
      detail: `Network disruptions and attribution rumors around ${theatre} are circulating, but the exact mechanism remains intentionally unclear. ${target} is reacting as though the threat is real.`
    },
    space: {
      headline: `Orbital alert notice`,
      detail: `${actor} activity in orbit or strategic warning networks has sharpened attention over ${theatre}, nudging the crisis into a more technical register.`
    },
    "internal-security": {
      headline: `Domestic stability concern`,
      detail: `Domestic or border security signals connected to ${actor} have made ${theatre} feel less stable, especially as rumor outruns verified reporting.`
    }
  };

  const selected = templates[category] || templates.diplomatic;
  return {
    category,
    severity,
    headline: forcedNote ? `${selected.headline} / ${forcedNote}` : selected.headline,
    detail: forcedNote ? `${selected.detail} ${forcedNote}` : selected.detail,
    tensionDelta: severity === "extreme" ? 8 : severity === "serious" ? 5 : 2,
    involved: [actor, target, theatre]
  };
}

function renderSummary(summary) {
  els.summaryTitle.textContent = summary.title;
  els.summaryContent.innerHTML = `
    <article class="summary-card">
      <h3>Operational Overview</h3>
      <p>${escapeHtml(summary.overview)}</p>
    </article>
    <div class="summary-grid">
      <article class="summary-card">
        <h3>Your Actions</h3>
        <ul class="summary-list">${summary.playerOutcomes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article class="summary-card">
        <h3>Foreign Moves</h3>
        <ul class="summary-list">${summary.foreignMoves.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article class="summary-card">
        <h3>World Incidents</h3>
        <ul class="summary-list">${summary.incidents.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article class="summary-card">
        <h3>Director Note</h3>
        <p>${escapeHtml(summary.overview)}</p>
      </article>
    </div>
  `;
}

function renderBriefing(briefing) {
  els.briefingTitle.textContent = briefing.title;
  els.briefingSummary.textContent = briefing.executiveSummary;
  els.briefingOob.innerHTML = briefing.oob
    .map(
      (group) => `
        <section class="unit-group">
          <h5>${escapeHtml(group.title)}</h5>
          <ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      `
    )
    .join("");
  els.briefingNews.innerHTML = briefing.news.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  els.briefingActions.innerHTML = briefing.knownActions.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  els.briefingRundown.innerHTML = briefing.rundown.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function compileDirectorBriefing(state, stage) {
  const turnLabel = stage === "campaign" ? "Campaign Initialization Briefing" : `Turn ${state.turn} Briefing`;
  const selectedHotspots = getProvinceHints(state.config.country).slice(0, 3).join(", ");
  const tensionBand = state.worldTension >= 75 ? "critical" : state.worldTension >= 50 ? "elevated" : "manageable";
  const knownActions = buildKnownForeignActions(state);
  const rundown = [
    `${state.config.country} enters this turn with ${countUnlockedDomains(state.date.getUTCFullYear())} unlocked strategic domains and a ${scenarioLabel(state.config.scenario).toLowerCase()} ruleset.`,
    `Priority theatres currently look like ${selectedHotspots}. Contested map focus includes ${state.contestedRegions.length ? state.contestedRegions.join(", ") : "no active territorial highlights yet"}.`,
    `Known foreign behavior indicates ${knownActions[0].toLowerCase()}`,
    `The director assesses the crisis climate as ${tensionBand}, with world tension at ${state.worldTension}/100 and ${state.incidentCount} logged events so far.`,
    `Order of battle generation remains perspective-based: you receive a national OOB snapshot, not a full omniscient ledger of every rival asset on earth.`
  ];

  return {
    title: turnLabel,
    executiveSummary: `The director has reviewed the campaign frame, current tensions, incident queue, and plausible foreign moves. This turn opens with a ${tensionBand} strategic climate and a focus on ${selectedHotspots}.`,
    oob: Object.entries(state.units).map(([title, items]) => ({
      title,
      items
    })),
    news: state.latestNews.length ? state.latestNews : buildNewsHeadlines(state, state.incidentWatch),
    knownActions,
    rundown
  };
}

async function ensureCurrentBriefingGenerated(state, stage) {
  if (!state) {
    return null;
  }
  if (state.currentBriefing) {
    renderBriefing(state.currentBriefing);
    return state.currentBriefing;
  }

  const forceGroups = Object.keys(state.units || {}).length;
  const foreignMoves = state.latestForeignMoves && state.latestForeignMoves.length ? state.latestForeignMoves : buildForeignMoves(state);
  const dateLabel = formatDate(state.date);

  await runGenerationSequence({
    title: stage === "campaign" ? `Finalizing ${state.config.country} Opening Briefing` : `Generating Turn ${state.turn} Briefing`,
    summary:
      stage === "campaign"
        ? "The director is taking extra time to assemble the opening OOB, news packet, foreign-action picture, and executive rundown."
        : `The director is now building the full post-turn intelligence packet for ${dateLabel}, including the refreshed OOB, news, known foreign actions, and detailed rundown.`,
    steps: [
      {
        label: "Refreshing the national order of battle snapshot",
        log: `OOB snapshot refreshed across ${forceGroups} force group${forceGroups === 1 ? "" : "s"} for ${dateLabel}.`,
        delay: 760
      },
      {
        label: "Drafting the news packet from current incident reporting",
        log: state.incidentWatch[0]
          ? `Lead item queued: ${state.incidentWatch[0].headline}.`
          : "No lead incident dominated the cycle, so the news packet is being built from lower-intensity reporting.",
        delay: 720,
        run: () => {
          state.latestNews = buildNewsHeadlines(state, state.incidentWatch);
        }
      },
      {
        label: "Filtering known foreign actions through your intelligence picture",
        log: foreignMoves[0]
          ? `Foreign-action lead: ${trimText(foreignMoves[0], 128)}`
          : "Foreign-action picture remains fragmented and is being reconciled from incomplete reporting.",
        delay: 760
      },
      {
        label: "Writing the detailed director rundown",
        log: `Strategic rundown updated for ${state.config.country} on turn ${state.turn}.`,
        delay: 700,
        run: () => {
          state.currentBriefing = compileDirectorBriefing(state, stage);
        }
      },
      {
        label: "Locking the intelligence packet for review",
        log: `Director packet sealed for ${dateLabel}.`,
        delay: 540,
        run: () => {
          renderBriefing(state.currentBriefing);
        }
      }
    ]
  });

  return state.currentBriefing;
}

function openScenarioOverlay() {
  const state = uiState.gameState;
  if (!state) {
    return;
  }
  els.scenarioEditMode.value = state.config.scenario;
  els.scenarioEditPremise.value = state.config.premise;
  showOverlay("scenario");
}

function handleScenarioUpdate(event) {
  event.preventDefault();
  const state = uiState.gameState;
  if (!state) {
    return;
  }

  state.config.scenario = els.scenarioEditMode.value;
  state.config.premise = els.scenarioEditPremise.value.trim() || state.config.premise;
  state.theme = deriveTheme(state.config.country, state.date.getUTCFullYear(), state.config.scenario);
  state.historyLog.unshift(historyCard(formatDate(state.date), "Scenario updated", `Campaign mode shifted to ${scenarioLabel(state.config.scenario)} with a revised premise.`));
  renderGame();
  hideOverlay();
}

function openDebugOverlay() {
  if (!uiState.gameState) {
    return;
  }
  els.debugEventNote.value = "";
  els.debugEventSeverity.value = "serious";
  showOverlay("debug");
}

async function openBriefingOverlay() {
  const state = uiState.gameState;
  if (!state || uiState.isGenerating) {
    return;
  }
  if (!state.currentBriefing) {
    uiState.pendingBriefingAfterSummary = false;
    await ensureCurrentBriefingGenerated(state, state.turn === 1 ? "campaign" : "turn");
  }
  showOverlay("briefing");
}

async function handleSummaryDismiss() {
  const shouldGenerateBriefing = uiState.activeOverlay === "summary" && uiState.pendingBriefingAfterSummary && uiState.gameState;
  hideOverlay();

  if (!shouldGenerateBriefing) {
    return;
  }

  uiState.pendingBriefingAfterSummary = false;
  await ensureCurrentBriefingGenerated(uiState.gameState, "turn");
  showOverlay("briefing");
}

function handleBackdropClick() {
  if (uiState.activeOverlay === "summary") {
    void handleSummaryDismiss();
    return;
  }
  hideOverlay();
}

function handleDebugSubmit(event) {
  event.preventDefault();
  const state = uiState.gameState;
  if (!state) {
    return;
  }

  const type = els.debugEventType.value;
  const severity = els.debugEventSeverity.value;
  const note = els.debugEventNote.value.trim();
  const incident = generateIncident(state, debugTypeToCategory(type), severity, note || type);

  state.incidentWatch.unshift(incident);
  state.incidentWatch = state.incidentWatch.slice(0, 5);
  state.incidentCount += 1;
  state.worldTension = clamp(state.worldTension + incident.tensionDelta, 0, 100);
  state.contestedRegions = deriveContestedRegions([incident], []);
  state.intelligenceFeed.unshift(intelCard("Debug inject", `${type} forced into the simulation as a ${severity} event.`));
  state.intelligenceFeed = state.intelligenceFeed.slice(0, 6);
  state.historyLog.unshift(historyCard(formatDate(state.date), `Debug / ${type}`, incident.detail));

  renderGame();
  hideOverlay();
}

function showOverlay(kind) {
  const panels = {
    domain: els.domainOverlay,
    summary: els.summaryOverlay,
    briefing: els.briefingOverlay,
    generation: els.generationOverlay,
    scenario: els.scenarioOverlay,
    debug: els.debugOverlay
  };

  Object.values(panels).forEach((panel) => panel.classList.add("hidden"));
  panels[kind].classList.remove("hidden");
  els.overlayBackdrop.classList.toggle("hidden", kind === "generation");
  uiState.activeOverlay = kind;
}

function hideOverlay(force = false) {
  if (!force && (uiState.isGenerating || uiState.activeOverlay === "generation")) {
    return;
  }

  els.overlayBackdrop.classList.add("hidden");
  els.domainOverlay.classList.add("hidden");
  els.summaryOverlay.classList.add("hidden");
  els.briefingOverlay.classList.add("hidden");
  els.generationOverlay.classList.add("hidden");
  els.scenarioOverlay.classList.add("hidden");
  els.debugOverlay.classList.add("hidden");
  uiState.activeOverlay = null;
}

function categoriesForYear(year) {
  return [
    "diplomatic",
    "economic",
    "ground",
    "naval",
    "reconnaissance",
    "military",
    "internal-security",
    ...(year >= 1939 ? ["aerial"] : []),
    ...(year >= 1970 ? ["cyber"] : []),
    ...(year >= 1957 ? ["space"] : [])
  ];
}

function deriveContestedRegions(incidents, foreignMoves) {
  const regions = [];

  incidents.forEach((incident) => {
    incident.involved.forEach((item) => {
      const match = findMapMatch(item);
      if (match && !regions.includes(match)) {
        regions.push(match);
      }
    });
  });

  foreignMoves.forEach((move) => {
    WORLD_REGIONS.forEach((region) => {
      if (move.includes(region.label) && !regions.includes(region.label)) {
        regions.push(region.label);
      }
    });
  });

  return regions.slice(0, 6);
}

function buildOverview(state, outcomes, foreignMoves, incidents) {
  return `${outcomes[0].detail} The most visible world signal was "${incidents[0].headline}", while rival capitals are likely to interpret the new posture as ${
    state.worldTension > 70 ? "a crisis edging toward dangerous escalation." : "a pressure cycle that can still be redirected."
  }`;
}

function generateUnits(country, year) {
  const era = eraForYear(year);
  const canonical = canonicalCountry(country);
  const flavor = {
    Russia: {
      ground: ["1st Guards Combined Arms Army", "20th Guards Army", "Western District rapid reserve"],
      air: ["PVO interceptor regiment", "Long-range aviation detachment", "Frontal aviation brigade"],
      naval: ["Northern Fleet surface group", "Black Sea task unit", "Pacific submarine squadron"],
      space: ["Missile warning directorate", "Military satellite control node"],
      cbrn: ["Radiation reconnaissance regiment", "Strategic deterrent readiness group"]
    },
    "Soviet Union": {
      ground: ["1st Guards Tank Army", "8th Guards Army", "Far East combined arms formation"],
      air: ["Frontal aviation regiment", "PVO interceptor regiment", "Long-range aviation division"],
      naval: ["Northern Fleet cruiser group", "Baltic Fleet combatants", "Pacific Fleet submarine flotilla"],
      space: ["Strategic warning complex", "Cosmodrome support command"],
      cbrn: ["Strategic rocket forces alert chain", "Chemical defense battalion"]
    },
    "United States": {
      ground: ["III Corps ready group", "Marine expeditionary brigade", "Airborne rapid response brigade"],
      air: ["Carrier air wing detachment", "Tactical fighter squadron", "Strategic airlift command"],
      naval: ["Carrier strike group", "Submarine squadron", "Amphibious ready group"],
      space: ["Space surveillance squadron", "Missile warning command"],
      cbrn: ["CBRN response battalion", "Strategic deterrence support cell"]
    },
    China: {
      ground: ["Combined arms brigade", "Theatre reserve corps", "Border reaction formation"],
      air: ["Theatre air brigade", "Maritime strike regiment", "Strategic transport wing"],
      naval: ["South Sea task force", "East Sea flotilla", "Submarine wolfpack"],
      space: ["Space tracking unit", "Strategic support aerospace cell"],
      cbrn: ["Rocket force readiness node", "CBRN response regiment"]
    }
  }[canonical];

  const eraLibrary = {
    prewar: {
      ground: ["Army corps reserve", "Border infantry division", "Rail artillery group"],
      air: ["Aeronautical detachment", "Observation squadron"],
      naval: ["Battleship squadron", "Coastal flotilla", "Destroyer screen"],
      space: [],
      cbrn: ["Chemical defense detachment"]
    },
    interwar: {
      ground: ["Mechanized brigade", "Cavalry reserve", "Border infantry corps"],
      air: ["Reconnaissance wing", "Interceptor squadron", "Bomber detachment"],
      naval: ["Cruiser division", "Destroyer flotilla", "Submarine patrol group"],
      space: [],
      cbrn: ["Chemical defense regiment"]
    },
    worldwar: {
      ground: ["Shock army", "Armored corps", "Strategic reserve division"],
      air: ["Fighter regiment", "Bomber wing", "Transport command"],
      naval: ["Escort group", "Submarine pack", "Carrier task element"],
      space: [],
      cbrn: ["NBC defense battalion"]
    },
    coldwar: {
      ground: ["Motor rifle division", "Armored division", "Air assault brigade"],
      air: ["Interceptor regiment", "Strike aviation regiment", "Strategic bomber wing"],
      naval: ["Carrier or cruiser group", "Nuclear submarine detachment", "Fleet aviation element"],
      space: ["Early warning center", "Satellite control wing"],
      cbrn: ["Strategic deterrent unit", "Radiation defense battalion"]
    },
    modern: {
      ground: ["Rapid reaction brigade", "Combined arms brigade", "Special operations task group"],
      air: ["Multirole squadron", "ISR drone wing", "Strategic lift group"],
      naval: ["Carrier or amphibious group", "Submarine squadron", "Maritime patrol wing"],
      space: ["Space operations center", "Missile warning network", "Orbital surveillance cell"],
      cbrn: ["CBRN response group", "Strategic deterrence cell"]
    }
  }[era];

  const merged = {};
  ["ground", "air", "naval", "space", "cbrn"].forEach((group) => {
    const specific = flavor ? flavor[group] || [] : [];
    const generic = eraLibrary[group] || [];
    const label = group === "cbrn" ? "CBRN / Strategic" : capitalize(group);
    merged[label] = [...specific, ...generic].filter(Boolean).slice(0, group === "space" ? 2 : 3);
  });

  return merged;
}

function getProvinceHints(country) {
  const canonical = canonicalCountry(country);
  return PROVINCE_HINTS[canonical] || fallbackHotspots(country);
}

function fallbackHotspots(country) {
  const region = WORLD_REGIONS.find((entry) => sameCountry(entry.label, country));
  if (region) {
    return region.hotspots;
  }
  return ["Capital district", "Industrial heartland", "Border corridor", "Command reserve zone"];
}

function deriveTheme(country, year, scenario) {
  const canonical = canonicalCountry(country);
  if ((canonical === "Soviet Union" || canonical === "Russia") && year >= 1947 && year <= 1991) {
    return {
      label: "Soviet CRT Command",
      accent: "#ff7568",
      accentStrong: "#ff3f37",
      accentWarm: "#ffcc6c",
      bgBase: "#100b0d",
      panel: "rgba(34, 10, 12, 0.78)",
      border: "rgba(255, 120, 120, 0.18)",
      mapPlayer: "#ff6c63",
      mapAllied: "#ffb56b",
      mapRival: "#89d8ff",
      mapContested: "#ffe27a",
      mapWatched: "#c4a8ff",
      displayFont: '"Trebuchet MS", "Lucida Sans Unicode", sans-serif',
      bodyFont: '"Courier New", "Consolas", monospace',
      scanlineOpacity: "0.07"
    };
  }

  if (canonical === "United States" && year >= 1945 && year <= 1991) {
    return {
      label: "NORAD Glass Wall",
      accent: "#8dd2ff",
      accentStrong: "#48b8ff",
      accentWarm: "#ffc672",
      bgBase: "#08111a",
      panel: "rgba(7, 16, 30, 0.78)",
      border: "rgba(141, 210, 255, 0.18)",
      mapPlayer: "#48b8ff",
      mapAllied: "#8de4a8",
      mapRival: "#ff8b73",
      mapContested: "#ffd36b",
      mapWatched: "#c196ff",
      displayFont: '"Trebuchet MS", "Lucida Sans Unicode", sans-serif',
      bodyFont: '"Palatino Linotype", "Book Antiqua", serif',
      scanlineOpacity: "0.02"
    };
  }

  if (year < 1939) {
    return {
      label: "Imperial Situation Room",
      accent: "#d8b57b",
      accentStrong: "#f1cb91",
      accentWarm: "#d6634b",
      bgBase: "#16110d",
      panel: "rgba(33, 24, 18, 0.78)",
      border: "rgba(216, 181, 123, 0.18)",
      mapPlayer: "#d8b57b",
      mapAllied: "#9fd0b0",
      mapRival: "#de7663",
      mapContested: "#f1cb91",
      mapWatched: "#b5a4ff",
      displayFont: '"Palatino Linotype", "Book Antiqua", serif',
      bodyFont: '"Georgia", serif',
      scanlineOpacity: "0"
    };
  }

  if (scenario === "sandbox") {
    return {
      label: "Sandbox Strategy Lab",
      accent: "#8de4a8",
      accentStrong: "#53d58a",
      accentWarm: "#8dd2ff",
      bgBase: "#07140f",
      panel: "rgba(8, 26, 20, 0.78)",
      border: "rgba(141, 228, 168, 0.18)",
      mapPlayer: "#53d58a",
      mapAllied: "#8dd2ff",
      mapRival: "#ff8b73",
      mapContested: "#ffd36b",
      mapWatched: "#c196ff",
      displayFont: '"Trebuchet MS", "Lucida Sans Unicode", sans-serif',
      bodyFont: '"Palatino Linotype", "Book Antiqua", serif',
      scanlineOpacity: "0.01"
    };
  }

  return {
    label: "Modern Strategic Command",
    accent: "#8dd2ff",
    accentStrong: "#48b8ff",
    accentWarm: "#ffc672",
    bgBase: "#08111a",
    panel: "rgba(10, 22, 36, 0.78)",
    border: "rgba(140, 174, 208, 0.18)",
    mapPlayer: "#48b8ff",
    mapAllied: "#65d7b8",
    mapRival: "#ff8b73",
    mapContested: "#ffd36b",
    mapWatched: "#c196ff",
    displayFont: '"Trebuchet MS", "Lucida Sans Unicode", sans-serif',
    bodyFont: '"Palatino Linotype", "Book Antiqua", serif',
    scanlineOpacity: "0.01"
  };
}

function applyTheme(theme) {
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-strong", theme.accentStrong);
  document.documentElement.style.setProperty("--accent-warm", theme.accentWarm);
  document.documentElement.style.setProperty("--bg-base", theme.bgBase);
  document.documentElement.style.setProperty("--panel", theme.panel);
  document.documentElement.style.setProperty("--border", theme.border);
  document.documentElement.style.setProperty("--map-player", theme.mapPlayer);
  document.documentElement.style.setProperty("--map-allied", theme.mapAllied);
  document.documentElement.style.setProperty("--map-rival", theme.mapRival);
  document.documentElement.style.setProperty("--map-contested", theme.mapContested);
  document.documentElement.style.setProperty("--map-watched", theme.mapWatched);
  document.documentElement.style.setProperty("--display-font", theme.displayFont);
  document.documentElement.style.setProperty("--body-font", theme.bodyFont);
  document.documentElement.style.setProperty("--scanline-opacity", theme.scanlineOpacity);
}

function getDomainById(id) {
  if (id === CUSTOM_DOMAIN.id) {
    return CUSTOM_DOMAIN;
  }
  return DOMAIN_DEFINITIONS.find((domain) => domain.id === id);
}

function scenarioLabel(scenario) {
  return { historical: "Historical", "alternate-history": "Alternate history", sandbox: "Sandbox" }[scenario] || "Scenario";
}

function initialTension(scenario) {
  if (scenario === "historical") {
    return 44;
  }
  if (scenario === "sandbox") {
    return 32;
  }
  return 58;
}

function baseCrisisIndex(config) {
  return clamp(initialTension(config.scenario) + Math.round(config.turnDurationDays / 10), 20, 80);
}

function countUnlockedDomains(year) {
  return [...DOMAIN_DEFINITIONS, CUSTOM_DOMAIN].filter((domain) => domain.earliestYear <= year).length;
}

function relationForRegion(regionLabel, playerCountry, preset, contestedSet) {
  if (sameCountry(regionLabel, playerCountry)) {
    return "player";
  }
  if (contestedSet.has(regionLabel)) {
    return "contested";
  }
  if (preset.allies.some((item) => sameCountry(item, regionLabel))) {
    return "allied";
  }
  if (preset.rivals.some((item) => sameCountry(item, regionLabel))) {
    return "rival";
  }
  if (preset.watched.some((item) => sameCountry(item, regionLabel))) {
    return "watched";
  }
  return "neutral";
}

function relationLabel(relation) {
  return {
    player: "Player controlled",
    allied: "Friendly or aligned",
    rival: "Rival or adversarial",
    contested: "Contested / unstable",
    watched: "Watch closely",
    neutral: "Neutral"
  }[relation] || "Neutral";
}

function relationColor(relation, alpha = 1) {
  const palette = {
    player: `rgba(72, 184, 255, ${alpha})`,
    allied: `rgba(101, 215, 184, ${alpha})`,
    rival: `rgba(255, 139, 115, ${alpha})`,
    contested: `rgba(255, 211, 107, ${alpha})`,
    watched: `rgba(193, 150, 255, ${alpha})`,
    neutral: `rgba(110, 126, 146, ${Math.min(alpha, 0.85)})`
  };
  return palette[relation] || palette.neutral;
}

function relationSideColor(relation) {
  const palette = {
    player: "rgba(14, 92, 136, 0.96)",
    allied: "rgba(17, 112, 88, 0.96)",
    rival: "rgba(136, 56, 44, 0.96)",
    contested: "rgba(156, 108, 18, 0.96)",
    watched: "rgba(97, 65, 145, 0.96)",
    neutral: "rgba(54, 65, 78, 0.96)"
  };
  return palette[relation] || palette.neutral;
}

function getRelationPreset(country) {
  const canonical = canonicalCountry(country);
  return RELATION_PRESETS[canonical] || {
    allies: ["France", "India"],
    rivals: ["Russia", "United States", "China"],
    watched: ["Turkey", "Saudi Arabia", "Japan"]
  };
}

function intelCard(kicker, text) {
  return { kicker, text };
}

function historyCard(stamp, title, detail) {
  return { stamp, title, detail };
}

function debugTypeToCategory(type) {
  if (type === "Carrier standoff" || type === "Oil shock") {
    return "naval";
  }
  if (type === "Cyber blackout") {
    return "cyber";
  }
  if (type === "Satellite failure") {
    return "space";
  }
  if (type === "Border clash") {
    return "ground";
  }
  if (type === "Insurgency flare-up" || type === "Refugee surge" || type === "Coup rumor") {
    return "internal-security";
  }
  if (type === "Market crash") {
    return "economic";
  }
  return "military";
}

function sanitizeCountry(country) {
  return country.replace(/\s+/g, " ").trim();
}

function canonicalCountry(country) {
  const value = sanitizeCountry(country);
  const map = {
    USSR: "Soviet Union",
    "U.S.S.R.": "Soviet Union",
    "Soviet Russia": "Soviet Union",
    USA: "United States",
    "United States of America": "United States",
    "Russian Federation": "Russia",
    "Republic of Korea": "South Korea",
    "Korea, Rep.": "South Korea",
    "Dem. Rep. Korea": "North Korea",
    "Korea, Dem. Rep.": "North Korea",
    "Iran (Islamic Republic of)": "Iran",
    Turkiye: "Turkey",
    America: "United States",
    UK: "United Kingdom",
    Britain: "United Kingdom",
    PRC: "China",
    "People's Republic of China": "China"
  };
  return map[value] || value;
}

function sameCountry(a, b) {
  return canonicalCountry(a).toLowerCase() === canonicalCountry(b).toLowerCase();
}

function findMapMatch(country) {
  const canonical = canonicalCountry(country);
  const match = WORLD_REGIONS.find((region) => sameCountry(region.label, canonical));
  if (match) {
    return match.label;
  }
  if (canonical === "Soviet Union") {
    return "Russia";
  }
  if (canonical === "East Germany" || canonical === "West Germany") {
    return "Germany";
  }
  if (canonical === "North Korea" || canonical === "South Korea") {
    return "Korea";
  }
  return null;
}

function polygonCentroid(pointsString) {
  const points = pointsString.split(" ").map((pair) => pair.split(",").map(Number));
  const total = points.reduce((acc, [x, y]) => ({ x: acc.x + x, y: acc.y + y }), { x: 0, y: 0 });
  return { x: Math.round(total.x / points.length), y: Math.round(total.y / points.length) };
}

function offsetPolygon(pointsString, dx, dy) {
  return pointsString
    .split(" ")
    .map((pair) => {
      const [x, y] = pair.split(",").map(Number);
      return `${Math.round(x + dx)},${Math.round(y + dy)}`;
    })
    .join(" ");
}

function shortLabel(label) {
  const replacements = {
    "United States": "USA",
    "United Kingdom": "UK",
    "South Africa": "S. Africa",
    "Saudi Arabia": "Saudi",
    "Soviet Union": "USSR"
  };
  return replacements[label] || label;
}

function eraForYear(year) {
  if (year < 1918) {
    return "prewar";
  }
  if (year < 1939) {
    return "interwar";
  }
  if (year < 1960) {
    return "worldwar";
  }
  if (year < 1992) {
    return "coldwar";
  }
  return "modern";
}

function addDays(date, dayCount) {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + dayCount);
  return next;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function gradeLabel(grade) {
  return { success: "Advantage gained", mixed: "Mixed effect", blowback: "Blowback" }[grade] || grade;
}

function trimText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 3).trim()}...`;
}

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
