import amethyst from "../assets/amethyst.jpg";
import greenquartz from "../assets/greenquartz.jpg";
import hematite from "../assets/hematite.jpg";
import lava from "../assets/lava.jpg";
import pyrite from "../assets/pyrite.jpg";
import signature from "../assets/signature.jpg";
import tigerMarble from "../assets/editorial/tiger-eye-marble.jpg";
import tigerSlate from "../assets/editorial/tiger-eye-slate.jpg";
import tigerWood from "../assets/editorial/tiger-eye-wood.jpg";
import citrineObsidian from "../assets/editorial/citrine-obsidian.jpg";
import pyriteAtelier from "../assets/editorial/pyrite-atelier.jpg";
import greenQuartzMarble from "../assets/editorial/green-quartz-marble.jpg";
import packTiger from "../assets/editorial/pack-tiger-eye.jpg";
import packAmethyst from "../assets/editorial/pack-amethyst.jpg";
import packBlackOnyx from "../assets/editorial/pack-black-onyx.jpg";
import packagingStudy from "../assets/editorial/packaging-colour-study.jpg";
import ritualCrimson from "../assets/editorial/ritual-crimson.jpg";
import ritualForest from "../assets/editorial/ritual-forest.jpg";

export interface Collection {
  slug: string;
  name: string;
  title: string;
  stone: string;
  subtitle: string;
  qualities: string[];
  intention: string;
  ritual: string;
  story: string;
  price: number;
  image: string;
  images: string[];
  tone: string;
  beadSize: string;
  finish: string;
  origin: string;
  badge?: string;
}

export const collections: Collection[] = [
  {
    slug: "tiger-eye",
    name: "Leadership",
    title: "The Tiger's Eye Bracelet",
    stone: "Tiger's Eye",
    subtitle: "The stone of courage and a steady gaze",
    qualities: ["Courage", "Focus", "Protection"],
    intention: "Worn by those who decide.",
    ritual: "Wear before important meetings, presentations, journeys, or decisions as a private reminder to move with a steady gaze.",
    story: "Tiger's Eye has long been carried as a symbol of courage, composure, and clear intention. Its shifting golden bands reward a slower look - a small reminder that confidence can be quiet.",
    price: 899,
    image: tigerMarble,
    images: [tigerMarble, ritualCrimson, tigerSlate, tigerWood, packTiger],
    tone: "leadership",
    beadSize: "8 mm",
    finish: "Natural polish",
    origin: "South Africa",
    badge: "House favourite",
  },
  {
    slug: "hematite",
    name: "Grounding",
    title: "The Hematite Bracelet",
    stone: "Hematite",
    subtitle: "Mirror-dark stone for disciplined hours",
    qualities: ["Grounding", "Strength", "Balance"],
    intention: "For the depth of your work.",
    ritual: "Wear during study, training, focused work, or any period that asks you to remain steady and present.",
    story: "Hematite is an iron-rich stone valued since antiquity. Its cool weight and silver-black surface have made it an enduring symbol of steadiness, discipline, and resolve.",
    price: 799,
    image: hematite,
    images: [hematite, packBlackOnyx, ritualForest],
    tone: "focus",
    beadSize: "8 mm",
    finish: "High polish",
    origin: "Brazil",
  },
  {
    slug: "lava",
    name: "Resilience",
    title: "The Lava Bracelet",
    stone: "Lava Stone",
    subtitle: "Earth transformed by fire",
    qualities: ["Grounding", "Protection", "Stability"],
    intention: "Forged, not given.",
    ritual: "Wear through periods of change as a reminder that pressure can become form, texture, and strength.",
    story: "Lava stone is the earth's record of pressure transformed into permanence. Porous and elemental, it carries a tactile honesty unlike any polished gemstone.",
    price: 799,
    image: lava,
    images: [lava, packBlackOnyx],
    tone: "resilience",
    beadSize: "8 mm",
    finish: "Natural matte",
    origin: "India",
  },
  {
    slug: "citrine",
    name: "Joy",
    title: "The Citrine Bracelet",
    stone: "Citrine",
    subtitle: "A clear amber note of optimism",
    qualities: ["Joy", "Clarity", "Abundance"],
    intention: "Carry a little light.",
    ritual: "Wear at the beginning of the day, when setting an intention, or when you want a warm reminder of possibility.",
    story: "Citrine's honeyed translucence has made it a traditional symbol of warmth, confidence, and abundance. Each bead holds its own natural variation of amber light.",
    price: 699,
    image: citrineObsidian,
    images: [citrineObsidian, signature],
    tone: "joy",
    beadSize: "8 mm",
    finish: "Natural polish",
    origin: "Brazil",
    badge: "New",
  },
  {
    slug: "pyrite",
    name: "Prosperity",
    title: "The Pyrite Bracelet",
    stone: "Pyrite",
    subtitle: "Metallic lustre for ambitious beginnings",
    qualities: ["Courage", "Motivation", "Prosperity"],
    intention: "For the future you are building.",
    ritual: "Wear during planning, negotiations, or the first hours of a new project as a symbol of disciplined ambition.",
    story: "Pyrite has been associated with prosperity and opportunity for centuries. PASHAN treats that symbolism as a reminder of meaningful work - not a promise of luck.",
    price: 799,
    image: pyriteAtelier,
    images: [pyriteAtelier, pyrite],
    tone: "prosperity",
    beadSize: "8 mm",
    finish: "Natural polish",
    origin: "Peru",
  },
  {
    slug: "hematite-jamunia",
    name: "Equilibrium",
    title: "The Hematite + Jamunia Bracelet",
    stone: "Hematite + Jamunia",
    subtitle: "Grounded silver, contemplative violet",
    qualities: ["Grounding", "Calm", "Intuition"],
    intention: "Stillness with structure.",
    ritual: "Wear during journaling, travel, or thoughtful work when calm and clarity must coexist.",
    story: "This composed pairing brings the cool, grounded character of Hematite together with the violet depth of Jamunia, known globally as Amethyst.",
    price: 899,
    image: amethyst,
    images: [amethyst, hematite, packAmethyst],
    tone: "equilibrium",
    beadSize: "8 mm",
    finish: "Natural polish",
    origin: "Brazil",
  },
  {
    slug: "dhan-yog",
    name: "Signature",
    title: "The Dhan Yog Bracelet",
    stone: "Dhan Yog",
    subtitle: "A considered composition for purposeful work",
    qualities: ["Prosperity", "Focus", "Growth"],
    intention: "Many stones. One direction.",
    ritual: "Wear when setting long-term goals or beginning work that will be built patiently over time.",
    story: "Dhan Yog is a composed bracelet built around balance rather than a single stone - a wearable arrangement of complementary tones, textures, and traditional associations.",
    price: 799,
    image: signature,
    images: [signature, packagingStudy, pyriteAtelier],
    tone: "signature",
    beadSize: "8 mm",
    finish: "Mixed natural polish",
    origin: "Curated in India",
    badge: "Atelier composition",
  },
  {
    slug: "seven-chakra",
    name: "Alignment",
    title: "The 7 Chakra Bracelet",
    stone: "7 Chakra",
    subtitle: "Seven colours held in one quiet circle",
    qualities: ["Balance", "Harmony", "Alignment"],
    intention: "A spectrum, brought into balance.",
    ritual: "Wear as a visual reminder to give equal care to work, rest, relationships, reflection, and renewal.",
    story: "Seven natural stone colours are arranged as a single composition. PASHAN presents the bracelet as a symbol of balance and intentional living, without medical or supernatural claims.",
    price: 799,
    image: packagingStudy,
    images: [packagingStudy, signature, packAmethyst],
    tone: "alignment",
    beadSize: "8 mm",
    finish: "Mixed natural polish",
    origin: "Curated in India",
  },
  {
    slug: "amethyst",
    name: "Stillness",
    title: "The Amethyst Bracelet",
    stone: "Amethyst",
    subtitle: "Violet depth for quieter hours",
    qualities: ["Calm", "Clarity", "Restful energy"],
    intention: "For the quieter hours.",
    ritual: "Wear while reading, journaling, meditating, or making room for a slower rhythm.",
    story: "Amethyst has been treasured across cultures for its saturated violet colour and association with considered thought. Every bracelet carries natural shifts in tone and clarity.",
    price: 899,
    image: amethyst,
    images: [amethyst, packAmethyst],
    tone: "balance",
    beadSize: "8 mm",
    finish: "Natural polish",
    origin: "Brazil",
  },
  {
    slug: "green-quartz",
    name: "Renewal",
    title: "The Green Quartz Bracelet",
    stone: "Green Quartz",
    subtitle: "Fresh colour for the next chapter",
    qualities: ["Growth", "Renewal", "New beginnings"],
    intention: "For everything you have yet to become.",
    ritual: "Wear when beginning again - a project, a practice, a season, or a more deliberate daily rhythm.",
    story: "Green Quartz is traditionally connected to growth and renewal - the colour of first leaves and seasons turning. No two beads carry exactly the same clouding or depth.",
    price: 799,
    image: greenQuartzMarble,
    images: [greenQuartzMarble, greenquartz],
    tone: "growth",
    beadSize: "8 mm",
    finish: "Natural polish",
    origin: "Brazil",
    badge: "Limited batch",
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export const intentions = [
  { key: "confidence", label: "Courage", slug: "tiger-eye" },
  { key: "prosperity", label: "Prosperity", slug: "pyrite" },
  { key: "focus", label: "Focus", slug: "hematite" },
  { key: "growth", label: "Growth", slug: "green-quartz" },
  { key: "balance", label: "Balance", slug: "seven-chakra" },
  { key: "stillness", label: "Stillness", slug: "amethyst" },
] as const;

export const rashiGuide = [
  { sign: "Aries", stones: "Hematite, Tiger's Eye", note: "For decisive, action-driven temperaments." },
  { sign: "Taurus", stones: "Green Quartz, Amethyst", note: "For steady builders who value beauty and patience." },
  { sign: "Gemini", stones: "Tiger's Eye, 7 Chakra", note: "For curious minds and many-sided lives." },
  { sign: "Cancer", stones: "Amethyst, Green Quartz", note: "For reflective hearts and considered emotion." },
  { sign: "Leo", stones: "Pyrite, Tiger's Eye", note: "For natural leaders and luminous presence." },
  { sign: "Virgo", stones: "Hematite, Amethyst", note: "For meticulous craft and quiet excellence." },
  { sign: "Libra", stones: "Green Quartz, 7 Chakra", note: "For seekers of balance and beauty." },
  { sign: "Scorpio", stones: "Lava, Hematite", note: "For depth, intensity, and unwavering will." },
  { sign: "Sagittarius", stones: "Citrine, Green Quartz", note: "For expansive ambition and new horizons." },
  { sign: "Capricorn", stones: "Hematite, Pyrite", note: "For disciplined builders of long arcs." },
  { sign: "Aquarius", stones: "Amethyst, 7 Chakra", note: "For original thinkers and quiet rebels." },
  { sign: "Pisces", stones: "Amethyst, Green Quartz", note: "For poetic temperaments and inner worlds." },
];

export const journal = [
  { slug: "the-discipline-of-confidence", category: "Confidence", title: "The Discipline of Confidence", excerpt: "Why composure is a practice, not a personality trait." },
  { slug: "leadership-is-a-quiet-art", category: "Leadership", title: "Leadership Is a Quiet Art", excerpt: "On presence, decisions, and the weight of choosing." },
  { slug: "the-architecture-of-prosperity", category: "Prosperity", title: "The Architecture of Prosperity", excerpt: "Wealth as discipline rendered over time." },
  { slug: "focus-as-a-form-of-respect", category: "Focus", title: "Focus as a Form of Respect", excerpt: "What you give attention to, you give shape to." },
  { slug: "the-stones-our-ancestors-trusted", category: "Ancient Wisdom", title: "The Stones Our Ancestors Trusted", excerpt: "How natural stones became symbols across cultures." },
  { slug: "becoming-quietly", category: "Personal Growth", title: "Becoming, Quietly", excerpt: "On the small, daily acts of becoming someone new." },
];
