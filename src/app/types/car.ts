export interface Car {
  id: number;
  image: string;
  brand: string;
  model: string;
  year: number;
  is_available: boolean;
  price: number;
  features?: string[];
  description?: string;
  specifications?: {
    engine: string;
    horsepower: string;
    torque: string;
    transmission: string;
    topSpeed: string;
    acceleration: string;
  };
}

export interface CarFilters {
  brand: string;
  year: string;
  available: string;
}
