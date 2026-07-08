export type ApartmentStatus = 'available' | 'reserved' | 'sold';

export type Locale = 'mk' | 'en' | 'de' | 'sq' | 'tr';

/** A single room's area from the official floor plan. */
export interface RoomArea {
  /** Room name in Macedonian, as printed on the plans. */
  name: string;
  /** English label. */
  nameEn: string;
  /** Area in m². */
  area: number;
}

/** A hotspot marker inside a 360° scene that navigates to another scene. */
export interface TourHotspot {
  yaw: number; // degrees: 0 = forward, +right, -left
  pitch: number; // degrees: 0 = horizon, + up, - down
  label: string;
  target: string; // target scene id
}

/** One 360° panorama scene within an apartment's virtual tour. */
export interface TourScene {
  id: string;
  title: string;
  image: string;
  rotationY?: number;
  hotspots?: TourHotspot[];
}

export interface Apartment {
  id: string;
  number: number;
  floor: number;
  type: string;
  name: string;
  area: number;
  rooms: number;
  bathrooms: number;
  balconies: number;
  status: ApartmentStatus;
  description: string;
  features: string[];
  roomBreakdown: RoomArea[];
  svgPoints: string;
  gallery: string[];
  floorPlanImage: string;
  /** Furnished marketing render — used as the card image and detail hero. */
  featuredImage?: string;
  /** Dimensioned technical floor-plan drawing shown on the detail page. */
  floorPlan?: string;
  modelPath: string;
  /** 360° tour scenes. Empty when no panoramas exist for this unit. */
  tourScenes: TourScene[];
}

export interface Floor {
  number: number;
  apartments: Apartment[];
}

export interface Building {
  name: string;
  floors: Floor[];
  totalFloors: number;
  address: string;
  description: string;
}
