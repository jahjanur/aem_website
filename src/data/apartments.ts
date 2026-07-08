import { Apartment, ApartmentStatus, Floor, TourScene } from '@/types';

/**
 * AEM Residence — real apartment data (Stan 1–8).
 * One floor's layout of 8 unique units, repeated across TOTAL_FLOORS.
 * Room areas are taken from the official floor plans (Macedonian labels).
 *
 * 360° tour availability:
 *   Stan 1 · 2 · 6 · 7 · 8  → have panoramas (see tourScenes)
 *   Stan 3 · 4 · 5          → no panoramas yet (tourScenes: [])
 */

export const TOTAL_FLOORS = 6;

/** Build a hotspot-free scene (navigation handled by the room bar). */
const scene = (id: string, title: string, image: string): TourScene => ({
  id,
  title,
  image,
  rotationY: 0,
});

// SVG polygon points map each unit onto the floor-plan render image.
// Percentage-based coordinates (0–100) — two rows of four units.
// Regions map onto public/renders/floor-plan-birdeye.jpg (4160×1843),
// traced per-unit with the calibration tool (percentage coords, 0–100).
const SVG_POINTS = [
  '18,1.8 39.4,1.8 39.4,31.6 32.3,31.6 32.3,48 18,48 18,1.8', // 1 Luna
  '39.3,1.4 67.8,1.4 67.8,48.2 44,48.2 44,31.6 39.3,31.6 39.3,1.4', // 2 Stella
  '67.8,1.4 99.6,1.4 99.6,47.6 67.9,47.6 67.9,1', // 3 Aurora
  '71.7,48 99.5,48 99.5,98.1 72,98.1 72,47.8', // 4 Solaris
  '50.5,58.1 71.9,58.1 71.9,97.4 50.8,97.4 50.8,58.1', // 5 Aria
  '28.5,58.1 50.5,58.1 50.5,97.6 28.7,97.6 28.7,57.9', // 6 Lila
  '0.4,63.8 0.4,98.3 28.6,98.3 28.6,57.9 18.2,57.9 18.2,64.5 0.7,64.5', // 7 Sole
  '0.7,1.8 17.8,1.8 17.8,63.8 0.4,63.8 0.4,36.7 0.4,1.6', // 8 Zenith
];

const FLOOR_PLAN_IMAGE = '/renders/floor-plan.jpg';
const MODEL_PATH = '/models/apartment-demo.glb';

type Template = Omit<Apartment, 'floor' | 'id'>;

const apartmentTemplates: Template[] = [
  // ── Stan 1 — 80 m² · 2-bedroom ──────────────────────────────────────────
  {
    number: 1,
    type: '2BR',
    name: 'Luna',
    area: 80.04,
    rooms: 2,
    bathrooms: 2,
    balconies: 1,
    status: 'available',
    description:
      'Luna — a serene two-bedroom retreat where soft light and quiet balance meet. Two full bathrooms wrap an open, airy living heart.',
    features: ['2 Bathrooms', 'Balcony', 'Storage Room', 'Open-Plan Living'],
    roomBreakdown: [
      { name: 'Дневен Престој/Кујна/Трпезарија', nameEn: 'Living / Kitchen / Dining', area: 36.83 },
      { name: 'Бања', nameEn: 'Bathroom', area: 3.92 },
      { name: 'Остава', nameEn: 'Storage', area: 4.23 },
      { name: 'Тераса', nameEn: 'Terrace', area: 5.08 },
      { name: 'Спална Соба со Бања', nameEn: 'Bedroom with Ensuite Bathroom', area: 17.9 },
      { name: 'Детска Соба', nameEn: "Children's Room", area: 12.08 },
    ],
    svgPoints: SVG_POINTS[0],
    gallery: [],
    floorPlanImage: FLOOR_PLAN_IMAGE,
    featuredImage: '/apartments/luna-featured.jpg',
    floorPlan: '/apartments/luna-plan.png',
    modelPath: MODEL_PATH,
    tourScenes: [
      scene('living', 'Living Room', '/panoramas/stan-1-living.jpg'),
      scene('bedroom', 'Bedroom', '/panoramas/stan-1-bedroom.jpg'),
      scene('children', "Children's Room", '/panoramas/stan-1-children.jpg'),
      scene('children-2', "Children's Room II", '/panoramas/stan-1-children-2.jpg'),
    ],
  },

  // ── Stan 2 — 117 m² · 3-bedroom ─────────────────────────────────────────
  {
    number: 2,
    type: '3BR',
    name: 'Stella',
    area: 116.56,
    rooms: 3,
    bathrooms: 2,
    balconies: 2,
    status: 'available',
    description:
      'Stella — a radiant three-bedroom residence for family life, opening onto two balconies and generous, sunlit living space.',
    features: ['3 Bedrooms', '2 Balconies', '2 Bathrooms', 'Storage Room'],
    roomBreakdown: [
      { name: 'Ходник', nameEn: 'Hallway', area: 12.08 },
      { name: 'Дневен Престој/Кујна/Трпезарија', nameEn: 'Living / Kitchen / Dining', area: 41.85 },
      { name: 'Бања', nameEn: 'Bathroom', area: 4.89 },
      { name: 'Остава', nameEn: 'Storage', area: 3.53 },
      { name: 'Тераса', nameEn: 'Terrace', area: 6.45 },
      { name: 'Детска Соба', nameEn: "Children's Room", area: 12.24 },
      { name: 'Детска Соба', nameEn: "Children's Room", area: 11.1 },
      { name: 'Спална Соба со Бања', nameEn: 'Bedroom with Ensuite Bathroom', area: 21.2 },
      { name: 'Тераса', nameEn: 'Terrace', area: 3.22 },
    ],
    svgPoints: SVG_POINTS[1],
    gallery: [],
    floorPlanImage: FLOOR_PLAN_IMAGE,
    featuredImage: '/apartments/stella-featured.jpg',
    floorPlan: '/apartments/stella-plan.png',
    modelPath: MODEL_PATH,
    tourScenes: [
      scene('living', 'Living Room', '/panoramas/stan-2-living.jpg'),
      scene('bedroom', 'Bedroom', '/panoramas/stan-2-bedroom.jpg'),
      scene('children', "Children's Room", '/panoramas/stan-2-children.jpg'),
      scene('children-2', "Children's Room II", '/panoramas/stan-2-children-2.jpg'),
    ],
  },

  // ── Stan 3 — 136 m² · 4-bedroom (largest unit) ──────────────────────────
  {
    number: 3,
    type: '4BR',
    name: 'Aurora',
    area: 136.24,
    rooms: 4,
    bathrooms: 3,
    balconies: 3,
    status: 'available',
    description:
      "Aurora — the crowning residence. Four bedrooms, three bathrooms and three balconies bathed in first light; the collection's flagship home.",
    features: ['4 Bedrooms', 'Master Suite', '3 Balconies', '3 Bathrooms', 'Largest Unit'],
    roomBreakdown: [
      { name: 'Дневен Престој/Кујна/Трпезарија', nameEn: 'Living / Kitchen / Dining', area: 40.58 },
      { name: 'Ходник', nameEn: 'Hallway', area: 7.62 },
      { name: 'Остава', nameEn: 'Storage', area: 3.22 },
      { name: 'Бања', nameEn: 'Bathroom', area: 3.67 },
      { name: 'Тераса', nameEn: 'Terrace', area: 5.83 },
      { name: 'Спална Соба со Бања', nameEn: 'Master Bedroom with Ensuite Bathroom', area: 24.24 },
      { name: 'Тераса', nameEn: 'Terrace', area: 4.43 },
      { name: 'Детска Соба', nameEn: "Children's Room", area: 10.02 },
      { name: 'Спална Соба со Бања', nameEn: 'Bedroom with Ensuite Bathroom', area: 17.09 },
      { name: 'Спална Соба', nameEn: 'Bedroom', area: 13.16 },
      { name: 'Тераса', nameEn: 'Terrace', area: 6.38 },
    ],
    svgPoints: SVG_POINTS[2],
    gallery: [],
    floorPlanImage: FLOOR_PLAN_IMAGE,
    featuredImage: '/apartments/aurora-featured.jpg',
    floorPlan: '/apartments/aurora-plan.png',
    modelPath: MODEL_PATH,
    tourScenes: [],
  },

  // ── Stan 4 — 130 m² · 3-bedroom ─────────────────────────────────────────
  {
    number: 4,
    type: '3BR',
    name: 'Solaris',
    area: 130.1,
    rooms: 3,
    bathrooms: 2,
    balconies: 2,
    status: 'reserved',
    description:
      'Solaris — built around the largest living expanse in the building, a luminous three-bedroom home made for gathering.',
    features: ['Largest Living Area', 'Master Suite', '2 Balconies', '2 Bathrooms'],
    roomBreakdown: [
      { name: 'Ходник', nameEn: 'Hallway', area: 11.81 },
      { name: 'Дневен Престој/Кујна/Трпезарија', nameEn: 'Living / Kitchen / Dining', area: 42.35 },
      { name: 'Тераса', nameEn: 'Terrace', area: 7.61 },
      { name: 'Спална Соба со Бања', nameEn: 'Master Bedroom with Ensuite Bathroom', area: 21.19 },
      { name: 'Тераса', nameEn: 'Terrace', area: 3.89 },
      { name: 'Остава', nameEn: 'Storage', area: 3.64 },
      { name: 'Бања', nameEn: 'Bathroom', area: 5.5 },
      { name: 'Ходник', nameEn: 'Hallway', area: 3.11 },
      { name: 'Спална Соба', nameEn: 'Bedroom', area: 18.26 },
      { name: 'Детска Соба', nameEn: "Children's Room", area: 12.74 },
    ],
    svgPoints: SVG_POINTS[3],
    gallery: [],
    floorPlanImage: FLOOR_PLAN_IMAGE,
    featuredImage: '/apartments/solaris-featured.jpg',
    floorPlan: '/apartments/solaris-plan.png',
    modelPath: MODEL_PATH,
    tourScenes: [],
  },

  // ── Stan 5 — 79 m² · 2-bedroom ──────────────────────────────────────────
  {
    number: 5,
    type: '2BR',
    name: 'Aria',
    area: 78.37,
    rooms: 2,
    bathrooms: 1,
    balconies: 1,
    status: 'sold',
    description:
      'Aria — light, graceful and effortless. A beautifully composed two-bedroom home that lives with ease.',
    features: ['Efficient 2BR', 'Balcony', 'Storage Room', 'Open-Plan Living'],
    roomBreakdown: [
      { name: 'Дневен Престој/Кујна/Трпезарија', nameEn: 'Living / Kitchen / Dining', area: 38.33 },
      { name: 'Ходник', nameEn: 'Hallway', area: 3.61 },
      { name: 'Остава', nameEn: 'Storage', area: 3.29 },
      { name: 'Бања', nameEn: 'Bathroom', area: 5.35 },
      { name: 'Спална Соба', nameEn: 'Bedroom', area: 13.35 },
      { name: 'Спална Соба', nameEn: 'Bedroom', area: 10.62 },
      { name: 'Тераса', nameEn: 'Terrace', area: 3.82 },
    ],
    svgPoints: SVG_POINTS[4],
    gallery: [],
    floorPlanImage: FLOOR_PLAN_IMAGE,
    featuredImage: '/apartments/aria-featured.jpg',
    floorPlan: '/apartments/aria-plan.png',
    modelPath: MODEL_PATH,
    tourScenes: [],
  },

  // ── Stan 6 — 78 m² · 2-bedroom (smallest unit) ──────────────────────────
  {
    number: 6,
    type: '2BR',
    name: 'Lila',
    area: 78.26,
    rooms: 2,
    bathrooms: 1,
    balconies: 1,
    status: 'available',
    description:
      'Lila — the intimate jewel of the collection. A compact two-bedroom that glows far beyond its footprint.',
    features: ['Compact 2BR', 'Master Bedroom', 'Balcony', 'Storage Room'],
    roomBreakdown: [
      { name: 'Дневен Престој/Кујна/Трпезарија', nameEn: 'Living / Kitchen / Dining', area: 37.58 },
      { name: 'Ходник', nameEn: 'Hallway', area: 4.89 },
      { name: 'Остава', nameEn: 'Storage', area: 2.36 },
      { name: 'Бања', nameEn: 'Bathroom', area: 3.95 },
      { name: 'Спална Соба', nameEn: 'Master Bedroom', area: 14.84 },
      { name: 'Спална Соба', nameEn: 'Bedroom', area: 11.02 },
      { name: 'Тераса', nameEn: 'Terrace', area: 3.62 },
    ],
    svgPoints: SVG_POINTS[5],
    gallery: [],
    floorPlanImage: FLOOR_PLAN_IMAGE,
    featuredImage: '/apartments/lumina-featured.jpg',
    floorPlan: '/apartments/lumina-plan.png',
    modelPath: MODEL_PATH,
    tourScenes: [
      scene('living', 'Living Room', '/panoramas/stan-6-living.jpg'),
      scene('bedroom', 'Master Bedroom', '/panoramas/stan-6-bedroom.jpg'),
      scene('bedroom-2', 'Second Bedroom', '/panoramas/stan-6-bedroom-2.jpg'),
    ],
  },

  // ── Stan 7 — 92 m² · 2-bedroom ──────────────────────────────────────────
  {
    number: 7,
    type: '2BR',
    name: 'Sole',
    area: 92.15,
    rooms: 2,
    bathrooms: 2,
    balconies: 1,
    status: 'available',
    description:
      'Sole — sun-filled from dawn to dusk. A bright two-bedroom home with two bathrooms and a generous balcony.',
    features: ['2 Bathrooms', 'Generous Balcony', 'Open-Plan Living', 'Storage Room'],
    roomBreakdown: [
      { name: 'Ходник', nameEn: 'Hallway', area: 9.76 },
      { name: 'Дневен Престој/Кујна/Трпезарија', nameEn: 'Living / Kitchen / Dining', area: 35.28 },
      { name: 'Тераса', nameEn: 'Terrace', area: 7.28 },
      { name: 'Детска Соба', nameEn: "Children's Room", area: 17.1 },
      { name: 'Остава', nameEn: 'Storage', area: 3.55 },
      { name: 'Бања', nameEn: 'Bathroom', area: 4.14 },
      { name: 'Спална Соба со Бања', nameEn: 'Bedroom with Ensuite Bathroom', area: 15.04 },
    ],
    svgPoints: SVG_POINTS[6],
    gallery: [],
    floorPlanImage: FLOOR_PLAN_IMAGE,
    featuredImage: '/apartments/sole-featured.jpg',
    floorPlan: '/apartments/sole-plan.png',
    modelPath: MODEL_PATH,
    tourScenes: [
      scene('living', 'Living Room', '/panoramas/stan-7-living.jpg'),
      scene('bedroom', 'Bedroom', '/panoramas/stan-7-bedroom.jpg'),
      scene('children', "Children's Room", '/panoramas/stan-7-children.jpg'),
    ],
  },

  // ── Stan 8 — 103 m² · 2-bedroom ─────────────────────────────────────────
  {
    number: 8,
    type: '2BR',
    name: 'Zenith',
    area: 103.08,
    rooms: 2,
    bathrooms: 2,
    balconies: 1,
    status: 'reserved',
    description:
      'Zenith — an indoor-outdoor sky-home at the peak of the collection, crowned by the largest balcony in the building; two bedrooms, two bathrooms, endless air.',
    features: ['Largest Balcony', '2 Bathrooms', 'Bright Interiors', 'Storage Room'],
    roomBreakdown: [
      { name: 'Ходник', nameEn: 'Hallway', area: 6.88 },
      { name: 'Дневен Престој/Кујна/Трпезарија', nameEn: 'Living / Kitchen / Dining', area: 42.87 },
      { name: 'Тераса', nameEn: 'Terrace', area: 12.45 },
      { name: 'Детска Соба', nameEn: "Children's Room", area: 16.73 },
      { name: 'Остава', nameEn: 'Storage', area: 2.46 },
      { name: 'Спална Соба со Бања', nameEn: 'Bedroom with Ensuite Bathroom', area: 18.77 },
      { name: 'Бања', nameEn: 'Bathroom', area: 2.92 },
    ],
    svgPoints: SVG_POINTS[7],
    gallery: [],
    floorPlanImage: FLOOR_PLAN_IMAGE,
    featuredImage: '/apartments/zenith-featured.jpg',
    floorPlan: '/apartments/zenith-plan.png',
    modelPath: MODEL_PATH,
    tourScenes: [
      scene('living', 'Living Room', '/panoramas/stan-8-living.jpg'),
      scene('bedroom', 'Bedroom', '/panoramas/stan-8-bedroom.jpg'),
      scene('children', "Children's Room", '/panoramas/stan-8-children.jpg'),
    ],
  },
];

/**
 * Sold units per floor. `'all'` = the whole floor is sold; an array = the sold
 * unit numbers on that floor (Sole = unit 7). Floors not listed are all available.
 */
const SOLD_UNITS: Record<number, 'all' | number[]> = {
  1: [7], // Floor 1 — only Sole sold
  2: [7], // Floor 2 — only Sole sold
  6: 'all', // Floor 6 — sold out
};

/** Generate all floors with the same 8-unit layout; status is set per unit/floor. */
export function generateFloors(): Floor[] {
  return Array.from({ length: TOTAL_FLOORS }, (_, floorIndex) => {
    const floorNumber = floorIndex + 1;
    const sold = SOLD_UNITS[floorNumber];
    return {
      number: floorNumber,
      apartments: apartmentTemplates.map((template) => {
        const isSold = sold === 'all' || (Array.isArray(sold) && sold.includes(template.number));
        return {
          ...template,
          id: `f${floorNumber}-apt${template.number}`,
          floor: floorNumber,
          status: (isSold ? 'sold' : 'available') as ApartmentStatus,
        };
      }),
    };
  });
}

export const floors = generateFloors();

/** First floor with availability — the sensible default view (skips sold-out floors). */
export const firstAvailableFloor: number =
  floors.find((f) => f.apartments.some((a) => a.status === 'available'))?.number ?? 1;

/** The 8 canonical unit types (from a representative available floor). */
export const apartmentTypes: Apartment[] =
  (floors.find((f) => f.number === firstAvailableFloor) ?? floors[0]).apartments;

/** Units that have a 360° virtual tour. */
export const tourableApartments: Apartment[] = apartmentTypes.filter(
  (a) => a.tourScenes.length > 0
);

export function getApartment(floorNumber: number, aptNumber: number): Apartment | undefined {
  const floor = floors.find((f) => f.number === floorNumber);
  return floor?.apartments.find((a) => a.number === aptNumber);
}

export function getFloor(floorNumber: number): Floor | undefined {
  return floors.find((f) => f.number === floorNumber);
}

/** Look up a unit type by its number (1–8), ignoring floor. */
export function getApartmentType(aptNumber: number): Apartment | undefined {
  return apartmentTypes.find((a) => a.number === aptNumber);
}

/** Look up a specific unit by its id (e.g. "f2-apt5"). */
export function getApartmentById(id: string): Apartment | undefined {
  for (const floor of floors) {
    const found = floor.apartments.find((a) => a.id === id);
    if (found) return found;
  }
  return undefined;
}
