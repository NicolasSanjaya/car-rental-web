export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  is_available: boolean;
  created_at: string; // karena dari API berupa ISO date string
  image: string;
  price: number;
  features: string[]; // dari API: array of string (tapi tanpa escape quote)
}

export interface CarListApiResponse {
  status: boolean;
  message: string;
  cars: Car[];
  count: number;
}

export interface CarApiResponse {
  status: boolean;
  message: string;
  car: Car;
  count: number;
}

export interface CarFilters {
  brand?: string;
  year?: string;
  available?: string; // bisa juga boolean jika yakin selalu boolean
}
