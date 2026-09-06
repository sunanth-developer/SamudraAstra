import { media } from './media'

export const brand = {
  name: 'Samudra Astra',
  descriptor: 'Aquatic Defence Technology',
  supporting: 'Technology for the maritime domain',
}

export const navLinks = [
  { label: 'Technology', href: '/technology' },
  { label: 'Systems', href: '/systems' },
  { label: 'About', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
]

export const navCta = { label: 'Contact', href: '/contact' }

export const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Technology', href: '/technology' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Systems', href: '/systems' },
  { label: 'About', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
]

export const journeyMarks = [
  { id: '01', href: '#landing', label: 'Landing' },
  { id: '02', href: '#mission', label: 'Mission' },
  { id: '03', href: '#technology', label: 'Technology' },
  { id: '04', href: '#vessel', label: 'Vessel' },
  { id: '05', href: '#systems', label: 'Systems' },
  { id: '06', href: '#about', label: 'About' },
  { id: '07', href: '#contact', label: 'Contact' },
]

export const serviceLabels = {
  '01': 'Sensing',
  '02': 'Autonomy',
  '03': 'Sensors',
  '04': 'Intelligence',
  '05': 'Mission control',
}

export const services = [
  {
    id: '01',
    name: 'Underwater Surveillance',
    slug: 'underwater-surveillance',
    description: 'Persistent sensing and situational awareness for complex maritime environments.',
    copy: 'A technology area for persistent underwater awareness — sensing architectures designed to operate in environments where visibility, access and communication are constrained.',
    image: media.ocean,
  },
  {
    id: '02',
    name: 'Autonomous Systems',
    slug: 'autonomous-systems',
    description: 'Intelligent unmanned surface platforms designed to operate where persistent presence is required.',
    copy: 'Unmanned surface vehicles under development for persistent maritime operations, reconnaissance and data collection — described as a capability area, not a fielded product.',
    image: media.usv,
  },
  {
    id: '03',
    name: 'Sonar & Sensing',
    slug: 'sonar-sensing',
    description: 'Advanced sensing architectures for detecting, classifying and understanding underwater activity.',
    copy: 'Sensing and sonar architectures intended to detect, classify and interpret activity beneath the surface — without presenting unverified performance claims.',
    image: media.control,
  },
  {
    id: '04',
    name: 'Maritime Intelligence',
    slug: 'maritime-intelligence',
    description: 'Transforming distributed sensor data into actionable operational awareness.',
    copy: 'A development area for fusing distributed sensor information into a coherent maritime picture for operators and mission systems.',
    image: media.engineer,
  },
  {
    id: '05',
    name: 'Mission Systems',
    slug: 'mission-systems',
    description: 'Integrated technologies engineered for demanding maritime missions.',
    copy: 'Integration of sensing, autonomy, communication and operator interfaces into a unified mission architecture.',
    image: media.lab,
  },
]

export const systems = [
  {
    id: '01',
    name: 'Autonomous Surface Systems',
    meta: 'Capability',
    domain: 'Surface',
    mode: 'Autonomous',
    mission: 'Surveillance',
    body: 'Unmanned surface vehicles for persistent maritime operations, reconnaissance and data collection. Described here as a system development area — not a fielded product catalogue.',
    image: media.usv,
  },
  {
    id: '02',
    name: 'Underwater Sensor Systems',
    meta: 'Technology area',
    domain: 'Deep water',
    mode: 'Sensing',
    mission: 'Detection',
    body: 'Advanced sensing technologies designed for challenging underwater environments, where light, range and access are limited.',
    image: media.deepWater,
  },
  {
    id: '03',
    name: 'Maritime Surveillance',
    meta: 'Capability',
    domain: 'Maritime',
    mode: 'Persistent',
    mission: 'Awareness',
    body: 'Integrated sensing and intelligence solutions for monitoring critical maritime environments — from coastal approaches to open water.',
    image: media.ocean,
  },
  {
    id: '04',
    name: 'Mission Control',
    meta: 'System development',
    domain: 'Command',
    mode: 'Fused',
    mission: 'Operations',
    body: 'Command, data fusion and operational interfaces connecting distributed maritime systems into a single working picture.',
    image: media.control,
  },
]

export const processSteps = [
  {
    id: '01',
    title: 'Sense',
    body: 'Capture signals from the surrounding environment — acoustic, environmental and operational.',
    image: media.ocean,
    meta: 'Sonar',
  },
  {
    id: '02',
    title: 'Detect',
    body: 'Identify objects, patterns and anomalies against a complex underwater background.',
    image: media.auv,
    meta: 'Target',
  },
  {
    id: '03',
    title: 'Understand',
    body: 'Fuse multiple data sources into a coherent picture operators can act on.',
    image: media.engineer,
    meta: 'Data',
  },
  {
    id: '04',
    title: 'Respond',
    body: 'Deliver actionable intelligence to the mission layer — calmly, and with context.',
    image: media.lab,
    meta: 'Mission',
  },
]

export const principles = [
  {
    title: 'Autonomy',
    body: 'Autonomous decision-making for complex maritime environments.',
  },
  {
    title: 'Sensing',
    body: 'Advanced underwater perception and detection.',
  },
  {
    title: 'AI & Fusion',
    body: 'Converting distributed information into meaningful intelligence.',
  },
  {
    title: 'Communication',
    body: 'Reliable information exchange across challenging operating environments.',
  },
  {
    title: 'Integration',
    body: 'Connecting sensors, platforms and mission systems into a unified architecture.',
  },
]

export const principleNotes = [
  'Engineering around the actual constraint of the maritime domain.',
  'Capability-level language until systems are formally announced.',
  'Precision over spectacle. Depth over noise.',
]

export const engineeringSteps = [
  { id: '01', title: 'Research' },
  { id: '02', title: 'Design' },
  { id: '03', title: 'Prototype' },
  { id: '04', title: 'Integrate' },
  { id: '05', title: 'Test' },
  { id: '06', title: 'Deploy' },
]

export const whyStatements = [
  {
    title: 'Innovation',
    body: 'Developing technology for the challenges ahead.',
  },
  {
    title: 'Autonomy',
    body: 'Enabling new approaches to maritime operations.',
  },
  {
    title: 'Integration',
    body: 'Bringing sensing, intelligence and platforms together.',
  },
  {
    title: 'Mission focus',
    body: 'Engineering technology around real-world operational requirements.',
  },
]

export const aboutPillars = [
  { id: '01', title: 'Research' },
  { id: '02', title: 'Engineering' },
  { id: '03', title: 'Systems' },
  { id: '04', title: 'Mission' },
]

export const securityFeatures = [
  {
    id: '01',
    title: 'Research',
    body: 'Inquiry first. The maritime domain is treated as the constraint, not the backdrop.',
  },
  {
    id: '02',
    title: 'Engineering',
    body: 'From sketch to integration, every interface is specified with intent.',
  },
  {
    id: '03',
    title: 'Validation',
    body: 'Laboratory performance is a starting point. The environment is the test.',
  },
  {
    id: '04',
    title: 'Mission layer',
    body: 'Sensing, autonomy and operator interfaces are designed as one system.',
  },
]

export const fieldNodes = [
  { id: 'S1', name: 'Surface', coord: 'Layer 01', x: 22, y: 28 },
  { id: 'S2', name: 'Sub-surface', coord: 'Layer 02', x: 48, y: 22 },
  { id: 'S3', name: 'Deep water', coord: 'Layer 03', x: 74, y: 36 },
  { id: 'S4', name: 'Sensing', coord: 'Layer 04', x: 36, y: 58 },
  { id: 'S5', name: 'Intelligence', coord: 'Layer 05', x: 62, y: 66 },
  { id: 'S6', name: 'Autonomy', coord: 'Layer 06', x: 84, y: 54 },
]

export const articles = [
  {
    category: 'Technology',
    title: 'The future of autonomous underwater systems',
    date: '12 Aug 2026',
    image: media.auv,
    href: '/blogs',
  },
  {
    category: 'Maritime',
    title: 'Why underwater situational awareness matters',
    date: '28 Jul 2026',
    image: media.ocean,
    href: '/blogs',
  },
  {
    category: 'Defence',
    title: 'The evolution of maritime surveillance',
    date: '04 Jul 2026',
    image: media.deepWater,
    href: '/blogs',
  },
  {
    category: 'Research',
    title: 'Building indigenous capability beneath the surface',
    date: '18 Jun 2026',
    image: media.lab,
    href: '/blogs',
  },
  {
    category: 'Company',
    title: 'The challenge of underwater autonomy',
    date: '02 Jun 2026',
    image: media.engineer,
    href: '/blogs',
  },
]

export const stats = [
  { value: 'Maritime', label: 'Domain' },
  { value: 'Active', label: 'System status' },
  { value: 'Autonomous', label: 'Technology' },
]
