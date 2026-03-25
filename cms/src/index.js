'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// Default seed data — mirrors the content previously hardcoded in React
// ─────────────────────────────────────────────────────────────────────────────
const PORTFOLIO_ITEMS = [
  { title: 'Aero Dynamics',      subtitle: 'Brand Campaign',    category: 'brand',  layout: 'horizontal', isPhoto: false, bg: '#0f1319', order: 1 },
  { title: 'Gym Motivation',     subtitle: 'Instagram Reel',    category: 'social', layout: 'vertical',   isPhoto: false, bg: '#151a15', order: 2 },
  { title: 'Editorial Lookbook', subtitle: 'Photography',       category: 'photo',  layout: 'square',     isPhoto: true,  bg: null,      order: 3 },
  { title: 'Founder Vlog 01',    subtitle: 'YouTube Short',     category: 'social', layout: 'vertical',   isPhoto: false, bg: '#111',    order: 4 },
  { title: 'TechFlow Launch',    subtitle: 'Product Reveal',    category: 'brand',  layout: 'horizontal', isPhoto: false, bg: '#191414', order: 5 },
  { title: 'Behind the Scenes',  subtitle: 'Production Stills', category: 'photo',  layout: 'vertical',   isPhoto: true,  bg: null,      order: 6 },
  { title: 'Lumina Aesthetics',  subtitle: 'Corporate Ad',      category: 'brand',  layout: 'square',     isPhoto: false, bg: '#0a0e17', order: 7 },
];

const SERVICES = [
  {
    title: 'VIDEO EDITING', iconType: 'video', order: 1,
    description: 'Cinematic post-production designed to hold attention and drive conversion across digital platforms.',
    tags: ['Motion Design', 'Color Grading', 'VFX & Cleanup', 'Content Strategy'],
  },
  {
    title: 'GRAPHIC DESIGN', iconType: 'design', order: 2,
    description: 'Bold visual identities and high-conversion assets that define premium brand presence.',
    tags: ['Thumbnails', 'Logo Systems', 'Social Media Kits', 'Brand Guidelines'],
  },
];

const TEAM_MEMBERS = [
  { name: 'Nikhil',    role: 'Founder',  initials: 'AK', order: 1 },
  { name: 'Janmejoy', role: 'Editor',   initials: 'SP', order: 2 },
  { name: 'Dilesh',   role: 'Editor',   initials: 'RV', order: 3 },
  { name: 'Siddharth',role: 'Designer', initials: 'NR', order: 4 },
];

const PRICING_PLANS = [
  {
    tag: 'Creators', amount: '$500', featured: false, buttonLabel: 'Get Started ↗', iconType: 'starter', order: 1,
    features: ['2 Long forms', '4 Short forms -/per video', '2 Thumbnails'],
  },
  {
    tag: 'Customise ™', amount: '$XX,000', featured: true, buttonLabel: 'Apply Now ↗', iconType: 'diamond', order: 2,
    features: ['Unlimited Long Form', 'Premium Thumbnails', 'Unlimited Short Form', 'Growth Guarantee'],
  },
  {
    tag: 'Brands', amount: '$1,000', featured: false, buttonLabel: 'Schedule Call ↗', iconType: 'brands', order: 3,
    features: ['4 Long forms', '4 Short forms -/per video', '4 Thumbnails'],
  },
];

const REVIEWS = [
  {
    authorName: 'James Doherty', authorInitials: 'JD', authorTitle: 'Founder, TechFlow',
    type: 'text', layout: 'wide', order: 1,
    quote: "Bridge didn't just edit our videos; they completely re-engineered our visual narrative. Our engagement metrics doubled in the first month, and the ROI on our ad spend has been unprecedented.",
  },
  { authorName: 'Sarah Jenkins', authorInitials: 'SJ', authorTitle: 'CEO, Lumina Brands', type: 'video', layout: 'tall',   order: 2, quote: '' },
  {
    authorName: 'Marcus Reed',   authorInitials: 'MR', authorTitle: 'Creative Director',
    type: 'text', layout: 'square', order: 3,
    quote: 'The level of precision and architectural thinking they bring to post-production is unmatched.',
  },
  { authorName: 'David Chen',    authorInitials: 'DC', authorTitle: 'Marketing Head',    type: 'video', layout: 'square', order: 4, quote: '' },
];

const BRAND_SECTION = {
  stats: [
    { value: "100+", label: "Brands Transformed" },
    { value: "98%", label: "Client Retention Rate" },
    { value: "30+", label: "Awards & Recognitions" },
    { value: "9.6", label: "Client Satisfaction" },
  ],
  logos: [] // user will upload these
};

// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await seedCollection(strapi, 'api::portfolio-item.portfolio-item', PORTFOLIO_ITEMS);
    await seedCollection(strapi, 'api::service.service',               SERVICES);
    await seedCollection(strapi, 'api::team-member.team-member',       TEAM_MEMBERS);
    await seedCollection(strapi, 'api::pricing-plan.pricing-plan',     PRICING_PLANS);
    await seedCollection(strapi, 'api::review.review',                 REVIEWS);
    await seedSingle(strapi, 'api::brand-section.brand-section',       BRAND_SECTION);
    await grantPublicAccess(strapi);
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function seedCollection(strapi, uid, items) {
  const count = await strapi.documents(uid).count();
  if (count > 0) return; // already seeded, skip
  for (const item of items) {
    await strapi.documents(uid).create({ data: item });
  }
  strapi.log.info(`[bridge-seed] Seeded ${items.length} ${uid} records.`);
}

async function seedSingle(strapi, uid, data) {
  const count = await strapi.documents(uid).count();
  if (count > 0) return; // already seeded
  await strapi.documents(uid).create({ data });
  strapi.log.info(`[bridge-seed] Seeded single type ${uid}.`);
}

async function grantPublicAccess(strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' }, populate: ['permissions'] });

  if (!publicRole) return;

  const collections = [
    'api::portfolio-item.portfolio-item',
    'api::service.service',
    'api::team-member.team-member',
    'api::pricing-plan.pricing-plan',
    'api::review.review',
    'api::brand-section.brand-section',
  ];

  for (const uid of collections) {
    const [apiName, contentType] = uid.replace('api::', '').split('.');
    for (const action of ['find', 'findOne']) {
      const permAction = `api::${apiName}.${contentType}.${action}`;
      const existing = await strapi.query('plugin::users-permissions.permission').findOne({
        where: { action: permAction, role: publicRole.id },
      });
      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action: permAction, role: publicRole.id, enabled: true },
        });
      } else if (!existing.enabled) {
        await strapi.query('plugin::users-permissions.permission').update({
          where: { id: existing.id },
          data: { enabled: true },
        });
      }
    }
  }
  strapi.log.info('[bridge-seed] Public read access granted to all collections.');
}
