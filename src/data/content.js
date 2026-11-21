import { Compass, Camera, CalendarDays, Palette, Film, Sparkles, Utensils, Flower2, Leaf, Layers, Lightbulb } from 'lucide-react';

/* All copy lives here so it is easy to edit without touching components.
   Replace placeholder images by adding an `image` URL to any project. */

export const site = {
  name: 'Sideform',
  first: 'Megan',
  owner: 'Megan McKay',
  tagline: 'Your social media team, without the full-time commitment.',
  portrait: '/images/portrait.jpg',
  email: 'meganmckay.mm@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/',
    scrappy: 'https://www.tiktok.com/@megandoesarttt', // Scrappy Books on TikTok
  },
};

export const navLinks = [
  { label: 'Results', href: '#results' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Packages', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const marqueeItems = [
  'Social media strategy',
  'Content creation',
  'Creative direction',
  'Video editing',
  'Graphic design',
  'Brand storytelling',
];

export const about = {
  paragraphs: [
    "I'm a Creative Business honours student at Hogeschool Utrecht with a background in graphic design and digital marketing. I love products and services that mix creativity, business thinking and a bit of good for the planet.",
    'I have built social strategy from zero for a film festival, grown a B2B channel from under 100 to over 5,000 viewers, and designed brand identities from the first logo to the packaging. Sideform is where I bring all of that to small brands.',
    "I'm also SEO qualified, so the content I plan is built to be found as well as loved.",
  ],
  note: 'Megan Mckay',
  tools: ['Photoshop', 'Illustrator', 'InDesign', 'Lightroom', 'Figma', 'Canva', 'WordPress', 'Riverside', 'Storybook', 'Google Analytics'],
};

export const experience = [
  {
    role: 'Social Media & Content Lead',
    org: 'Merrill MultiMedia',
    place: 'Zandvoort Film Festival',
    when: 'Jun – Sep 2025',
    tone: 'blush',
    points: [
      'Built the social strategy for the festival’s first edition from the ground up, with no existing audience or data.',
      'Created all Instagram content: reels, carousels, countdowns and storytelling campaigns, plus scripts and voiceover copy.',
      'Turned the full film programme into audience-friendly posts and launched engagement activations.',
    ],
  },
  {
    role: 'Graphic Design & Marketing Intern',
    org: 'Channext',
    place: 'B2B SaaS',
    when: 'Apr – Oct 2024',
    tone: 'sky',
    points: [
      'Created content and edited video for YouTube, LinkedIn and Spotify, reaching 10,000+ people.',
      'Turned podcast snippets into LinkedIn shorts, growing video viewers from under 100 to over 5,000.',
      'Redesigned the asset sets and landing page using SEO and UX analysis to lift CTAs and lower bounce rates.',
    ],
  },
  {
    role: 'Content Creator & Manager',
    org: 'every-wen',
    place: 'Art boutique, Amsterdam',
    when: '2022 – 2024',
    tone: 'butter',
    points: [
      'Created the brand identity: colours, logo, fonts and packaging.',
      'Built Photoshop templates for social posts and print-on-demand product uploads.',
      'Repurposed existing content into new digital products to widen the offer.',
    ],
  },
];

export const education = [
  { title: 'Creative Business (Honours)', where: 'Hogeschool Utrecht', when: '2024 – now', note: 'Honours Programme student and Chair of the Student Programme Council' },
  { title: 'Certified Search Marketing Specialist', where: 'Digital Marketing Institute', when: '2024' },
  { title: 'Graphic Design', where: 'United Pop Amsterdam', when: '2022 – 2024' },
  { title: 'Figma UI/UX · UX Deep Dive · SEO & Analytics', where: 'Certifications', when: '2024' },
];

export const recognition = {
  title: 'ADCN Dutch Student Creativity Awards finalist, 2026',
  text: 'Droppy, my concept for edible, zero-waste hydration at city marathons, reached the final, with branding and social content built around the Droppy Running Club.',
  href: 'https://www.dutchcreativityawards.nl/gallery/droppy',
};

export const approach = [
  { title: 'Listen first', text: 'I start with your people, your product and what you want to feel like online.' },
  { title: 'Plan with intent', text: 'Every post earns its place, tied to a goal, a pillar and a rhythm you can keep up.' },
  { title: 'Make it human', text: 'Strategy sets the direction. Warm, specific content is what makes people follow.' },
];

export const services = [
  {
    title: 'Social Media Strategy',
    text: 'A clear plan for what to post, where and why, built around your goals and your audience.',
    tags: ['Audit', 'Content pillars', 'Growth plan'],
    icon: Compass,
    tone: 'blush',
  },
  {
    title: 'Content Creation',
    text: 'Photos, short-form video and copy that look like you and stop the scroll.',
    tags: ['Reels & TikTok', 'Photography', 'Copywriting'],
    icon: Camera,
    tone: 'butter',
  },
  {
    title: 'Social Media Management',
    text: 'Planning, posting and community care so your channels stay alive without you.',
    tags: ['Calendar', 'Scheduling', 'Community'],
    icon: CalendarDays,
    tone: 'sky',
  },
  {
    title: 'Graphic Design',
    text: 'Posts, carousels and templates that feel cohesive and look good in a feed.',
    tags: ['Carousels', 'Templates', 'Brand kits'],
    icon: Palette,
    tone: 'wine',
  },
  {
    title: 'Video Editing',
    text: 'Tight, rhythmic edits with captions and sound, paced for small screens.',
    tags: ['Reels', 'YouTube', 'Podcast clips'],
    icon: Film,
    tone: 'sky',
  },
  {
    title: 'Brand Content',
    text: 'Storytelling that turns your values, product and process into content people remember.',
    tags: ['Storytelling', 'Campaigns', 'Brand voice'],
    icon: Sparkles,
    tone: 'blush',
  },
];

/* Media is declared once so every page that shows it shares the same file. */
export const media = {
  ggHarvest: '/videos/gg-harvest.mp4',
  ggPoster: '/images/garnish-growing-poster.jpg',
  ggPhoto: '/images/garnish-photo.jpg',
  scrappyPoster: '/images/scrappy-poster.jpg',
  droppyBillboard: '/images/droppy.jpg',
  droppyVideo: '/videos/droppy.mp4',
};
const PG = {
  2: '/images/pg-02.jpg',
  3: '/images/pg-03.jpg',
  4: '/images/pg-04.jpg',
  6: '/images/pg-06.jpg',
  8: '/images/pg-08.jpg',
  10: '/images/pg-10.jpg',
  11: '/images/pg-11.jpg',
  13: '/images/pg-13.jpg',
  14: '/images/pg-14.jpg',
  16: '/images/pg-16.jpg',
  17: '/images/pg-17.jpg',
  19: '/images/pg-19.jpg',
  21: '/images/pg-21.jpg',
  22: '/images/pg-22.jpg',
  23: '/images/pg-23.jpg',
  24: '/images/pg-24.jpg',
  25: '/images/pg-25.jpg',
  26: '/images/pg-26.jpg',
  27: '/images/pg-27.jpg',
  28: '/images/pg-28.jpg',
};
const pg = (n) => PG[Number(n)];

/* tier 1 = featured, 2 = major, 3 = standard, 4 = shown but not opened.
   Projects without a `slug` do not open a case study. */
export const projects = [
  {
    slug: 'the-garnish-garden',
    tier: 1,
    title: 'The Garnish Garden',
    category: 'Branding · Content · Strategy · Social media',
    year: '2026',
    tone: 'blush',
    ratio: 'aspect-[9/16]',
    icon: Utensils,
    video: media.ggHarvest,
    image: media.ggPoster,
    summary: 'A local microgreens grower, built from scratch: brand, strategy, content and social media, all in one.',
    tags: ['Brand book', 'Content strategy', 'Social media management', 'Video'],
    brief:
      'The Garnish Garden started with great produce and no brand. It grows fresh microgreens and garnishes for independent chefs, cafés and caterers in East Sussex, and needed an identity, a plan and a voice.',
    challenge:
      'Stand out in a chef-led, trust-driven market with no existing audience, while feeling premium and dependable. And show the grower behind the produce.',
    role: 'Brand identity, brand book, content and marketing strategy and day-to-day social media management, from the first logo to the weekly posting rhythm.',
    approach:
      'A dark green and lilac identity in Poppins, a “grower talking to a chef” voice and close-up, appetite-led photography, all written down in a brand book. Then the harvest became the content: process videos, harvest ASMR and behind-the-scenes growing moments, plus product posts and story templates chefs can act on.',
    outcome: 'The harvest videos found an audience: the Garnish Garden content reached 216K views and earned thousands of likes.',
    gallery: [pg(22), pg(21), pg(23), pg(24), pg(25), pg(26), pg(27), pg(28)],
    videos: [
      { src: '/videos/gg-started.mp4', caption: 'How it started' },
      { src: media.ggHarvest, caption: 'Harvest day' },
      { src: '/videos/gg-ladies.mp4', caption: 'Meet our ladies' },
      { src: '/videos/gg-pov.mp4', caption: 'POV: what my microgreens watch me do all day' },
      { src: '/videos/gg-radish.mp4', caption: 'Red radish harvest' },
      { src: '/videos/gg-busy.mp4', caption: 'Too busy “growing” my business' },
      { src: '/videos/gg-husks.mp4', caption: 'Picking husks (ASMR)' },
      { src: '/videos/gg-peas.mp4', caption: 'In the growing room' },
      { src: '/videos/gg-gloomy.mp4', caption: 'When it’s gloomy outside we make it a party inside' },
      { src: '/videos/gg-harvest20.mp4', caption: 'Harvest with me in 20 seconds' },
      { src: '/videos/gg-spooky.mp4', caption: 'Spooky plant' },
    ],
  },
  {
    slug: 'droppy',
    tier: 2,
    title: 'Droppy',
    category: 'Product concept · Branding · ADCN finalist',
    year: '2026',
    tone: 'sky',
    ratio: 'aspect-[16/9]',
    icon: Sparkles,
    video: media.droppyVideo,
    image: media.droppyBillboard,
    summary: 'An edible hydration pod that ends plastic cups at city marathons. A university project, and a finalist at the ADCN student awards.',
    tags: ['Product development', 'Branding', 'Campaign', 'Social content'],
    brief:
      'A university brief: design and validate an innovative solution within a decentralized ecosystem. The project was scouted for the ADCN Dutch Student Creativity Awards, one of the largest advertising awards in Europe, and we reached the final.',
    challenge:
      'Races leave behind mountains of plastic cups and gel wrappers. How do you keep runners hydrated without leaving anything behind?',
    role: 'Product development, branding and creative thinking, plus campaign and social content.',
    approach:
      'Droppy is a bite-sized, fully edible hydration pod with electrolytes, so there are no cups and no wrappers. Around it we built a bold orange identity, “hassle free hydration” billboards, the Droppy Running Club with its zero-waste stickers, and an Instagram campaign set around the TCS Amsterdam Marathon.',
    outcome: 'Finalist at the ADCN Dutch Student Creativity Awards, 2026.',
    links: [{ label: 'See the award entry', href: 'https://www.dutchcreativityawards.nl/gallery/droppy' }],
    gallery: [pg(16), pg(17), '/images/droppy-collage.jpg'],
    videos: [
      { src: media.droppyVideo, caption: 'The Droppy film', ratio: 'aspect-[16/9]' },
      { src: '/videos/droppy-2.mp4', caption: 'Film, alternate cut', ratio: 'aspect-[16/9]' },
    ],
  },
  {
    slug: 'scrappy-books',
    tier: 2,
    title: 'Scrappy',
    category: 'Self project · TikTok content',
    year: '2026',
    tone: 'blush',
    ratio: 'aspect-[16/9]',
    icon: Lightbulb,
    image: pg(19),
    video: '/videos/sc-journal.mp4',
    summary: 'My own creative direction: scrapbooks, journaling and art, shared on TikTok through savable, honest content.',
    tags: ['Content strategy', 'Creative direction', 'TikTok', 'Video'],
    brief:
      'A self-initiated project that began as a content marketing assignment: show my love for creating scrapbooks and journals on TikTok, through content people want to save.',
    challenge:
      'Creative TikTok is full of polished finished artwork. The gap I found was the imperfect process and artist’s block. And I was starting from 16 followers.',
    role: 'Everything: strategy, content pillars, filming, editing, posting and analysing.',
    approach:
      'I researched the platform, category and competitors, then built four pillars: artist’s block experiments, creative inspiration, tools and supplies, and creative places. Honest, warm tone, a soft pink and cream look, three posts a week, and every idea designed to be saved or shared.',
    outcome: 'Goals: 800 average views and 5–8 saves per post. Along the way the account reached 129 followers and 1,635 likes, with the top video at about 7.6K views.',
    links: [{ label: 'Scrappy Books on TikTok', href: site.socials.scrappy }],
    gallery: [pg(19), '/images/artists-block.jpg'],
    videos: [
      { src: '/videos/sc-markers.mp4', caption: 'Marker haul' },
      { src: '/videos/sc-artblock.mp4', caption: 'Getting over art block' },
    ],
  },
  {
    slug: 'zandvoort-film-festival',
    tier: 3,
    title: 'Zandvoort Film Festival',
    category: 'Branding · Content strategy · Social media',
    year: '2025',
    tone: 'butter',
    ratio: 'aspect-[2/1]',
    icon: Film,
    image: '/images/zandvoort-brand.jpg',
    summary: 'The social presence for a festival’s very first edition, built with no audience and no data.',
    tags: ['Branding', 'Social media', 'Copywriting'],
    brief: 'A brand new film festival needed branding, mockups, a content strategy and someone to run its social media.',
    challenge: 'Build awareness from zero for a first edition, with no existing content or audience data.',
    role: 'Social media and content lead at Merrill MultiMedia, June to September 2025.',
    approach:
      'A bold black, red and yellow moodboard set the look. I wrote the strategy, created all Instagram content (reels, carousels, countdowns, storytelling), turned the film programme into audience-friendly posts, wrote scripts and voiceover copy, and launched engagement activations.',
    gallery: [pg(13), pg(14)],
    videos: [],
  },
  {
    slug: 'channext',
    tier: 3,
    title: 'Channext',
    category: 'Graphic design internship · B2B SaaS',
    year: '2024',
    tone: 'sky',
    ratio: 'aspect-[16/8.4]',
    icon: Layers,
    image: '/images/channext.jpg',
    summary: 'Consistent branding and shorter, snackable video for a B2B partner marketing platform.',
    tags: ['Graphic design', 'Video editing', 'SEO', 'LinkedIn'],
    brief: 'Channext is a B2B SaaS partner marketing platform. I joined as a graphic design and marketing intern, April to October 2024.',
    challenge: 'Make a technical product feel consistent and watchable, and reach more people on YouTube, LinkedIn and Spotify.',
    role: 'Content creation, video editing, graphic design, merchandise and SEO reporting.',
    approach:
      'I redesigned the video and graphic asset sets for consistent branding, wrote SEO reports and tagging fixes, and improved the landing page in Figma using UX analysis to reduce bounce rates. I also turned podcast episodes into short LinkedIn clips.',
    outcome: 'Video viewers grew from under 100 to over 5,000, across channels reaching 10,000+ people.',
    gallery: [pg('02'), pg('03'), pg('04')],
    videos: [],
  },
  {
    slug: 'mocha-paws-cafe',
    tier: 3,
    title: 'Mocha Paws Café',
    category: 'Branding · Packaging · Social media',
    year: '2023',
    tone: 'wine',
    ratio: 'aspect-[3/4]',
    icon: Sparkles,
    image: '/images/mocha-paws.jpg',
    summary: 'A playful cat café identity, from cups to shopfront.',
    tags: ['Branding', 'Packaging', 'Mockups'],
    brief: 'A café asked for branding and mockups, as well as packaging.',
    challenge: 'Give a cat café a memorable, playful identity that works on a cup, a sign and a feed.',
    role: 'Brand identity, packaging and mockups.',
    approach: 'A paw-print logo and a cat-print pattern in warm brown and red, applied to cups, sleeves, packaging, shopfront signage and Instagram posts.',
    gallery: [pg(10), pg(11)],
    videos: [],
  },
  {
    slug: 'every-wen',
    tier: 3,
    title: 'every-wen Art Boutique',
    category: 'Branding · Merchandise · Content',
    year: '2022 – 2024',
    tone: 'butter',
    ratio: 'aspect-[4/3]',
    icon: Palette,
    image: '/images/every-wen.jpg',
    summary: 'Brand identity and merchandise for an Amsterdam art boutique.',
    tags: ['Branding', 'Merchandise', 'Photoshop templates'],
    brief: 'An art studio asked for branding and mockups.',
    challenge: 'Turn colourful illustrated work into a brand and products that sell.',
    role: 'Content creator and manager, 2022 to 2024.',
    approach:
      'I created the brand identity (colour scheme, logo, fonts and packaging), built Photoshop templates for social posts and print-on-demand uploads, and made new digital content from existing artwork to widen the product range.',
    gallery: [pg('08')],
    videos: [],
  },
  {
    slug: 'tiny-tikes',
    tier: 3,
    title: 'Tiny Tikes',
    category: 'Branding · Children’s boutique',
    year: '2023',
    tone: 'butter',
    ratio: 'aspect-square',
    icon: Palette,
    image: '/images/tiny-tikes.jpg',
    summary: 'A gentle brand for a children’s boutique.',
    tags: ['Branding', 'Packaging'],
    brief: 'A customer came with a branding brief for a children’s boutique.',
    challenge: 'Feel soft and trustworthy for parents, and simple enough to work on tags, stickers and bags.',
    role: 'Brand identity and mockups.',
    approach: 'A quiet, line-drawn mark with kraft stickers and tags, patterned paper bags and a calm, natural palette.',
    gallery: [pg('06')],
    videos: [],
  },
  { title: 'Vitamin Me', category: 'Branding · Packaging', tier: 4, tone: 'blush', ratio: 'aspect-[16/8.8]', icon: Sparkles, image: '/images/vitamin-me.jpg' },
  { title: 'HRBOR', category: 'UI/UX · Landing page', tier: 4, tone: 'sky', ratio: 'aspect-[1/2]', icon: Layers, image: '/images/hrbor.jpg' },
  { title: 'Stedelijk Museum', category: 'Social media · Poster design', tier: 4, tone: 'blush', ratio: 'aspect-[16/8.4]', icon: Lightbulb, image: '/images/stedelijk.jpg' },
  { title: 'Logofolio', category: 'Logo design', tier: 4, tone: 'butter', ratio: 'aspect-[2/1]', icon: Sparkles, image: '/images/logofolio.jpg' },
];

export const projectHref = (p) => `#project-${p.slug}`;

export const niches = [
  {
    title: 'Food & Lifestyle',
    text: 'Cafés, makers and everyday-living brands. Warm, appetising content that leaves people hungry for more.',
    chips: ['Recipes', 'Cafés', 'Home'],
    tone: 'blush',
    icon: Utensils,
    image: '/images/niche-food.jpg',
  },
  {
    title: 'Beauty & Wellness',
    text: 'Skin, self-care and wellbeing brands that need to feel soft, honest and trustworthy on camera.',
    chips: ['Skincare', 'Self-care', 'Studios'],
    tone: 'sky',
    icon: Flower2,
    image: '/images/niche-beauty.jpg',
  },
  {
    title: 'Creative & Sustainable Brands',
    text: 'Independent makers and planet-first brands with a story worth telling and a small team to tell it.',
    chips: ['Indie brands', 'Slow fashion', 'Startups'],
    tone: 'butter',
    icon: Leaf,
    image: '/images/niche-creative.jpg',
  },
];

/* PLACEHOLDERS: replace with real client quotes and names before launch. */
export const testimonials = [
  {
    quote: 'She understood our brand from the first call and gave our feed a voice we are proud of.',
    name: 'Client name',
    company: 'Brand · Role',
    tone: 'butter',
  },
  {
    quote: 'Clear plans, lovely content and zero chasing. It finally feels like we have a social team.',
    name: 'Client name',
    company: 'Brand · Role',
    tone: 'sky',
  },
  {
    quote: 'Our engagement went up, but what I notice most is how much more like us everything feels.',
    name: 'Client name',
    company: 'Brand · Role',
    tone: 'blush',
  },
];

export const pricing = {
  note: 'Monthly packages have a 3-month minimum and include 2 rounds of revisions. Paid ads management is not included. Message me and I will send the prices.',
  addons: 'Single graphic posts and extra strategy work are also available.',
  packages: [
    {
      name: 'The Direction',
      price: 'Contact for price',
      per: 'One-off project',
      tone: 'sky',
      blurb: 'A clear starting point for brands that want to know what to post and why, before committing to a monthly plan.',
      features: ['Creative and content direction for your brand', 'Delivered as a one-off project', 'A solid base to run yourself or build on with me'],
    },
    {
      name: 'The Creative Partner',
      price: 'Contact for price',
      per: 'Monthly',
      tone: 'blush',
      blurb: 'Steady, on-brand content created for you every month.',
      features: ['8 content pieces per month', 'Up to 3 video edits', '2 rounds of revisions', '3-month minimum'],
    },
    {
      name: 'The Social Partner',
      price: 'Contact for price',
      per: 'Monthly',
      tone: 'butter',
      blurb: 'The fuller setup: more content, more video and more than one platform.',
      features: ['12–16 content pieces per month', 'Up to 5 video edits', '2 platforms', '2 rounds of revisions', '3-month minimum'],
    },
  ],
};

export const results = [
  { big: '216K', label: 'views reached', note: 'The Garnish Garden content, with thousands of likes', tone: 'butter' },
  { big: '10,000+', label: 'people reached', note: 'Channext social and video content, 2025', tone: 'sky' },
  { big: '100 → 5,000+', label: 'video viewers', note: 'Podcast snippets turned into LinkedIn shorts', tone: 'paper' },
  { big: '0 → live', label: 'a festival audience', note: 'Zandvoort Film Festival social strategy, built from scratch', tone: 'blush' },
  { big: 'Finalist', label: 'Dutch Creativity Awards', note: 'Droppy, ADCN 2026', tone: 'butter' },
];

export const howItWorks = [
  { icon: 'MessageCircle', title: 'Say hello', text: 'Tell me about your brand and what you want social media to do for you. A relaxed intro chat, no pressure.' },
  { icon: 'ClipboardList', title: 'Get a plan', text: 'I research your audience and competitors, then map out pillars, formats and a posting rhythm you can actually keep up.' },
  { icon: 'Video', title: 'I create', text: 'Content, design and editing, made to look and sound like you, so you can get on with running your business.' },
  { icon: 'TrendingUp', title: 'Grow together', text: 'We look at what works, keep doing it and tweak the rest, so your channels keep getting better.' },
];
