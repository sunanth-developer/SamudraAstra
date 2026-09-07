export const brand = {
  name: 'Samudra Astra Defence Systems',
  shortName: 'Samudra Astra',
  parent: 'A subsidiary of Eunoia Innovations Private Limited',
  tagline: 'Command the Blue Horizon. No Compromise.',
  taglineLines: ['Command the', 'Blue Horizon.', 'No Compromise.'],
  secondary: 'Engineered for resilience. Built for sovereignty.',
  supporting: "India's next-generation marine unmanned systems for surveillance, reconnaissance, and interception.",
  email: 'contact@samudraastra.in',
  phone: '',
  location: '',
}

export const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
]

export const navCta = { label: 'Contact', href: '/contact' }
export const navPrimary = { label: 'Request Datasheet', href: '/contact?subject=Product%20Enquiry' }

export const footerLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export const enquirySubjects = ['General', 'Product Enquiry', 'Partnership', 'Careers']

export const datasheetProducts = [
  { value: 'sentinel-series', label: 'Sentinel Series' },
  { value: 'sentinel-m', label: 'Sentinel-M' },
  { value: 'sentinel-r', label: 'Sentinel-R' },
  { value: 'sentinel-i', label: 'Sentinel-I' },
]

export const platformSpecs = [
  { label: 'Length Overall', value: '5.8', unit: 'metres' },
  { label: 'Beam', value: '1.8–1.9', unit: 'metres' },
  { label: 'Draft', value: '≤0.7', unit: 'metres' },
  { label: 'Hull', value: 'Deep-V aluminium monohull', unit: '5083 / 5086' },
  { label: 'Operational Displacement', value: '≤1.8', unit: 'tonnes' },
  { label: 'Propulsion', value: 'Twin diesel outdrive', unit: 'Protected propulsion' },
  { label: 'Autonomy', value: 'Supervised autonomy', unit: 'Remote override' },
  { label: 'Navigation', value: 'GNSS + INS', unit: 'Radar + AIS' },
  { label: 'Communications', value: 'LOS + BLOS-ready', unit: '' },
  { label: 'Sea State Target', value: 'SS3–4', unit: '' },
]

export const commonTechnical = [
  { label: 'Hull Material', value: 'Marine aluminium 5083/5086 or composite option' },
  { label: 'Propulsion', value: 'Twin diesel outdrive / stern drive' },
  { label: 'Fuel', value: 'Diesel' },
  { label: 'Autonomy', value: 'GNSS + INS + radar + AIS; supervised autonomy with remote override' },
  { label: 'Communications', value: 'LOS radio + BLOS-ready satellite terminal' },
  { label: 'Payload Interface', value: 'Modular mechanical + electrical (standardized)' },
  { label: 'Hull Protection', value: 'Multiple watertight compartments' },
  { label: 'Transport', value: 'Road trailer + container-compatible' },
]

export const missionModules = [
  {
    id: 'isr',
    name: 'ISR Module',
    items: ['EO/IR', 'Radar', 'AIS', 'Communications Relay'],
  },
  {
    id: 'hydrography',
    name: 'Hydrography Module',
    items: ['Multi-beam sonar', 'Side-scan sonar', 'Sound Velocity Profiler'],
  },
  {
    id: 'electronic',
    name: 'Electronic Support Module',
    items: ['SIGINT / EW sensors'],
  },
  {
    id: 'weapons',
    name: 'Weapons Module',
    items: ['Remote weapon station', 'Loitering munitions', 'Customer-provided'],
  },
]

export const products = [
  {
    slug: 'sentinel-m',
    code: 'SENTINEL-M',
    role: 'Surveillance',
    epithet: 'The Persistent Guardian',
    summary: 'Persistent ISR and Maritime Domain Awareness.',
    mission: [
      'Intelligence, Surveillance, and Reconnaissance (ISR)',
      'Maritime Domain Awareness',
      'Exclusive Economic Zone (EEZ) monitoring',
    ],
    philosophy: 'Range and sensor endurance prioritized over all-out sprint speed.',
    systems: [
      'High-performance EO/IR turret',
      'Maritime navigation radar',
      'AIS transceiver',
      'Advanced communications relay (LOS/BLOS)',
      'Modular mission computer',
    ],
    annotations: [
      { label: 'EO/IR', x: 58, y: 28 },
      { label: 'Radar', x: 46, y: 18 },
      { label: 'AIS', x: 62, y: 42 },
      { label: 'Communications', x: 34, y: 36 },
      { label: 'Mission computer', x: 52, y: 58 },
    ],
    performance: [
      { label: 'Endurance', value: '24–48', unit: 'hours', description: 'On station' },
      { label: 'Cruise Speed', value: '20–25', unit: 'knots' },
      { label: 'Operational Range', value: '400+', unit: 'NM' },
      { label: 'Payload', value: '200–300', unit: 'kg' },
    ],
    useCases: [
      'Coastal border surveillance',
      'EEZ patrol',
      'Search and rescue support',
      'Maritime law enforcement',
    ],
    seo: {
      title: 'Sentinel-M | Unmanned Maritime Surveillance USV',
      description:
        'Sentinel-M is a persistent unmanned maritime surveillance USV for ISR, Maritime Domain Awareness and EEZ monitoring.',
    },
  },
  {
    slug: 'sentinel-r',
    code: 'SENTINEL-R',
    role: 'Reconnaissance & Hydrography',
    epithet: 'The Precision Navigator',
    summary: 'Hydrography, mapping and precision navigation.',
    mission: [
      'Coastal hydrographic survey',
      'Seabed mapping',
      'Channel inspection',
      'Precision navigation support for naval fleets',
    ],
    philosophy:
      '“Sensor-first” integration — the hull is optimized for acoustic clarity and minimal self-noise, ensuring high-quality sonar returns.',
    systems: [
      'Multi-beam echo sounder',
      'Side-scan sonar',
      'Sound velocity profiler',
      'High-accuracy INS/GNSS',
      'Hydrographic data processing computer',
    ],
    annotations: [
      { label: 'Multi-beam echo sounder', x: 48, y: 72 },
      { label: 'Side-scan sonar', x: 28, y: 68 },
      { label: 'SVP', x: 64, y: 60 },
      { label: 'INS/GNSS', x: 54, y: 24 },
    ],
    performance: [
      { label: 'Survey Speed', value: '6–12', unit: 'knots' },
      { label: 'Operational Range', value: '400+', unit: 'NM' },
      { label: 'Payload', value: '200–300', unit: 'kg', description: 'Configurable sensor suites' },
      { label: 'Stability', value: 'Low-speed', unit: 'survey lines', description: 'Optimized for precision' },
    ],
    useCases: [
      'Port and harbour surveys',
      'Underwater hazard mapping',
      'Pipeline and cable route surveys',
      'Naval charting and bathymetry',
    ],
    seo: {
      title: 'Sentinel-R | Reconnaissance & Hydrography USV',
      description:
        'Sentinel-R is a reconnaissance and hydrography USV for coastal survey, seabed mapping and precision navigation support.',
    },
  },
  {
    slug: 'sentinel-i',
    code: 'SENTINEL-I',
    role: 'Interceptor',
    epithet: 'The Tactical Response Unit',
    summary: 'Rapid interdiction and force protection.',
    mission: [
      'Rapid interdiction',
      'Coastal patrol',
      'Force protection',
      'Swift response to asymmetric threats',
    ],
    philosophy:
      'High-speed efficiency with a compact 6-metre footprint — combining tactical agility with operational reach.',
    systems: [
      'Lightweight EO/IR targeting system',
      'Short-range radar',
      'BLOS communications for over-the-horizon targeting',
      'Optional lightweight armament provisions',
      'Electronic warfare support sensors',
    ],
    annotations: [
      { label: 'EO/IR', x: 56, y: 30 },
      { label: 'Short-range radar', x: 44, y: 18 },
      { label: 'BLOS communications', x: 32, y: 36 },
      { label: 'Payload bay', x: 50, y: 56 },
    ],
    performance: [
      { label: 'Maximum Speed', value: '40–45+', unit: 'knots' },
      { label: 'Cruise Speed', value: '20–25', unit: 'knots' },
      { label: 'Operational Range', value: '400+', unit: 'NM' },
      { label: 'Endurance', value: '24+', unit: 'hours', description: 'At cruise' },
      { label: 'Payload', value: '200', unit: 'kg' },
    ],
    useCases: [
      'Anti-piracy and anti-smuggling operations',
      'Force protection for high-value units',
      'Rapid response to maritime threats',
      'Counter-USV operations',
    ],
    seo: {
      title: 'Sentinel-I | High-Speed Maritime Interceptor USV',
      description:
        'Sentinel-I is a high-speed unmanned maritime interceptor for rapid interdiction, coastal patrol and force protection.',
    },
  },
]

export const whyPillars = [
  {
    id: '01',
    title: 'Modular',
    line: 'Standardized payload interfaces that enable multi-role versatility.',
  },
  {
    id: '02',
    title: 'Survivable',
    line: 'Redundant architectures that ensure mission continuity even in the face of system failures.',
  },
  {
    id: '03',
    title: 'Affordable',
    line: 'Commercial engineering principles applied to defence requirements, delivering high capability at low cost.',
  },
  {
    id: '04',
    title: 'Indigenous',
    line: 'Conceived in India, engineered in India, built in India, for India and for the world.',
  },
]

export const scalePoints = [
  {
    title: 'Low Acquisition Cost',
    body: 'Commercially proven marine engines and modular electronics reduce development risk and total cost of ownership.',
  },
  {
    title: 'Scalable Indian Manufacturing',
    body: "Designed for rapid production at scale, leveraging India's defence manufacturing ecosystem.",
  },
]

export const autonomyLayers = [
  { id: '01', title: 'USV', items: ['Sentinel-class hull'] },
  { id: '02', title: 'Autonomy stack', items: ['Supervised autonomy', 'Remote override', 'Loss-of-link procedures'] },
  { id: '03', title: 'Navigation sensors', items: ['GNSS', 'INS', 'Radar', 'AIS'] },
  { id: '04', title: 'Communications', items: ['LOS', 'BLOS-ready'] },
  { id: '05', title: 'Command & Control', items: ['Naval C2 integration'] },
]

export const developmentStatus = [
  {
    id: '01',
    when: 'August 2026',
    title: 'Incorporation',
    body: 'Samudra Astra Defence Systems incorporated as a subsidiary of Eunoia Innovations.',
  },
  {
    id: '02',
    when: 'Preliminary Design Phase',
    title: 'Benchmark study',
    body: 'Sentinel Series benchmark study completed.',
  },
  {
    id: '03',
    when: 'Coming soon',
    title: 'Prototype development',
    body: 'Prototype development announcement.',
  },
]

export const technologyTracks = [
  { id: '01', title: 'Hull Design & Hydrodynamics' },
  { id: '02', title: 'Propulsion & Power Architecture' },
  { id: '03', title: 'Autonomy Stack & C2 Integration' },
  { id: '04', title: 'Payload Modularity Framework' },
  { id: '05', title: 'Manufacturing & Supply Chain' },
]

export const aboutFacts = [
  { label: 'Domain Focus', value: 'Marine Unmanned Systems, Defence Applications' },
  { label: 'Capabilities', value: 'System Architecture, Integration, Testing, Production' },
  { label: 'Partners', value: 'Indian Navy, Defence Research & Development Organisation, Domestic Industry' },
]

export const heritageSteps = [
  { id: '01', title: 'Conceive' },
  { id: '02', title: 'Design' },
  { id: '03', title: 'Integrate' },
  { id: '04', title: 'Test' },
  { id: '05', title: 'Deliver' },
]

export const designPhilosophy = [
  {
    id: '01',
    title: 'Redundancy is Not Optional',
    body: 'For unmanned platforms, recovery after an offshore mechanical failure is substantially more difficult than for crewed vessels. Our systems feature distributed power, redundant steering, and fault-tolerant control — no single-point failure should result in loss of vessel control.',
  },
  {
    id: '02',
    title: 'Modularity Drives Versatility',
    body: 'A single 5.8-metre hull serves multiple missions through interchangeable payload bays. This reduces logistics burden, lowers total ownership cost, and enables rapid reconfiguration for evolving threats.',
  },
  {
    id: '03',
    title: 'Commercial Engineering, Defence Standards',
    body: "We leverage commercially available marine propulsion systems, proven autonomy stacks, and scalable manufacturing techniques — reducing development risk while meeting the rigorous qualification standards of India's Armed Forces.",
  },
]

export const redundancyPaths = [
  ['Power A', 'Power B'],
  ['Control A', 'Control B'],
  ['Steering A', 'Steering B'],
  ['Communication Path A', 'Communication Path B'],
]

export function getProduct(slug) {
  return products.find((item) => item.slug === slug)
}
