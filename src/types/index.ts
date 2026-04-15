export type ApartmentStatus = 'available' | 'reserved' | 'sold';

export type Locale = 'mk' | 'en' | 'de' | 'sq' | 'tr';

export interface Apartment {
  id: string;
  number: number;
  floor: number;
  type: string;
  name: string;
  area: number;
  rooms: number;
  bathrooms: number;
  price: number;
  status: ApartmentStatus;
  description: string;
  features: string[];
  svgPoints: string;
  gallery: string[];
  floorPlanImage: string;
  tourUrl: string;
  modelPath: string;
  panoramas: string[];
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
