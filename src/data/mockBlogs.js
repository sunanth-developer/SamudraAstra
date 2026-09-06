import { media } from './media'

const body = (paragraphs) =>
  paragraphs.map((p) => `<p>${p}</p>`).join('')

export const SEED_POSTS = [
  {
    id: 'post-auv-future',
    title: 'The Future of Autonomous Underwater Systems',
    slug: 'the-future-of-autonomous-underwater-systems',
    excerpt:
      'Autonomous systems are changing how complex underwater environments can be observed, understood and managed.',
    content: body([
      'The underwater domain is difficult to access, difficult to illuminate and difficult to interpret in real time. Autonomous platforms are one way of staying present in that environment without requiring a continuous human footprint.',
      'Samudra Astra approaches autonomy as an engineering problem: sensing, decision-making and communication have to remain coherent when conditions degrade. This note describes a capability area under development — not a fielded product catalogue.',
      'The work is less about spectacle and more about persistence. A useful underwater system is one that can collect, classify and return a usable picture of activity beneath the surface.',
    ]),
    featuredImage: media.usv,
    category: 'Technology',
    tags: ['Autonomy', 'USV', 'Maritime'],
    author: 'Samudra Astra',
    status: 'published',
    publishedAt: '2026-08-12T09:00:00.000Z',
    createdAt: '2026-08-08T10:00:00.000Z',
    updatedAt: '2026-08-12T09:00:00.000Z',
    seoTitle: 'The Future of Autonomous Underwater Systems',
    seoDescription:
      'How autonomous platforms can extend observation and understanding in the maritime domain.',
  },
  {
    id: 'post-awareness',
    title: 'Why Underwater Situational Awareness Matters',
    slug: 'why-underwater-situational-awareness-matters',
    excerpt:
      'A coherent picture of sub-surface activity is becoming a basic requirement for maritime security, not an optional extra.',
    content: body([
      'The surface of the ocean is only one layer of a much larger operating environment. What happens beneath it is often slower to observe, harder to communicate and easier to miss.',
      'Situational awareness in this domain is not a single sensor. It is an architecture: distributed sensing, careful classification, and a mission layer that can turn fragments into a usable picture.',
      'This article is a research note. It does not describe a deployed system, a contract or a performance specification. It describes why the problem is worth engineering against.',
    ]),
    featuredImage: media.ocean,
    category: 'Research',
    tags: ['Surveillance', 'Sensing', 'Maritime'],
    author: 'Samudra Astra',
    status: 'published',
    publishedAt: '2026-07-28T09:00:00.000Z',
    createdAt: '2026-07-20T11:00:00.000Z',
    updatedAt: '2026-07-28T09:00:00.000Z',
    seoTitle: 'Why Underwater Situational Awareness Matters',
    seoDescription:
      'Why persistent underwater awareness is becoming central to maritime security.',
  },
  {
    id: 'post-surveillance',
    title: 'The Evolution of Maritime Surveillance',
    slug: 'the-evolution-of-maritime-surveillance',
    excerpt:
      'Maritime surveillance is moving from isolated sensors toward fused pictures of activity across surface and sub-surface layers.',
    content: body([
      'Surveillance at sea has always been a problem of distance, weather and time. The addition of underwater sensing makes that problem more demanding, not less.',
      'A useful evolution is not more spectacle. It is better integration: sensors that can be read together, operators who receive context rather than noise, and systems designed around the constraint of the water column.',
      'This draft is a working note on a technology area. It is not an announcement of a product, partnership or deployment.',
    ]),
    featuredImage: media.deepWater,
    category: 'Maritime',
    tags: ['Surveillance', 'Maritime', 'Sonar'],
    author: 'Samudra Astra',
    status: 'draft',
    publishedAt: null,
    createdAt: '2026-07-04T09:00:00.000Z',
    updatedAt: '2026-07-18T14:20:00.000Z',
    seoTitle: 'The Evolution of Maritime Surveillance',
    seoDescription:
      'A working note on how maritime surveillance is shifting toward fused, multi-layer awareness.',
  },
  {
    id: 'post-indigenous',
    title: 'Building Indigenous Capability Beneath the Surface',
    slug: 'building-indigenous-capability-beneath-the-surface',
    excerpt:
      'Indigenous engineering for the aquatic domain is a long programme of research, integration and validation — not a single platform announcement.',
    content: body([
      'Capability in the underwater domain is built slowly. It depends on laboratories, sea-aware engineering and a willingness to treat the environment as the constraint, not the backdrop.',
      'Samudra Astra is an emerging defence technology company focused on that domain. The work described here is a development posture: research, systems and mission thinking held in one place.',
      'No customer, contract or certification is implied. The point is simpler: the next generation of aquatic defence technology has to be engineered with the water column in mind from the first sketch.',
    ]),
    featuredImage: media.lab,
    category: 'Defence',
    tags: ['Engineering', 'Maritime', 'Autonomy'],
    author: 'Samudra Astra',
    status: 'published',
    publishedAt: '2026-06-18T09:00:00.000Z',
    createdAt: '2026-06-10T08:30:00.000Z',
    updatedAt: '2026-06-18T09:00:00.000Z',
    seoTitle: 'Building Indigenous Capability Beneath the Surface',
    seoDescription:
      'Why indigenous engineering for the aquatic domain has to start with the environment itself.',
  },
  {
    id: 'post-autonomy-challenge',
    title: 'Inside the Challenge of Underwater Autonomy',
    slug: 'inside-the-challenge-of-underwater-autonomy',
    excerpt:
      'Communication, perception and energy all behave differently underwater. Autonomy has to be designed for those constraints, not imported from other domains.',
    content: body([
      'Autonomy that works in air or on land does not automatically transfer beneath the surface. The water column changes how signals travel, how objects appear and how a platform can report back.',
      'The engineering task is therefore conservative: sense what can be sensed, decide with incomplete information, and keep the mission layer informed without inventing certainty.',
      'This draft remains unpublished while the argument is refined. It is a company note on a difficult problem, not a claim of solved performance.',
    ]),
    featuredImage: media.engineer,
    category: 'Technology',
    tags: ['Autonomy', 'AI', 'Underwater'],
    author: 'Samudra Astra',
    status: 'draft',
    publishedAt: null,
    createdAt: '2026-06-02T09:00:00.000Z',
    updatedAt: '2026-06-22T16:10:00.000Z',
    seoTitle: 'Inside the Challenge of Underwater Autonomy',
    seoDescription:
      'Why underwater autonomy is a different engineering problem from autonomy in other domains.',
  },
]
