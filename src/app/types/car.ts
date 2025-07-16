export interface Car {
  id: number;
  model: string;
  brand: string;
  price: number;
  image: string;
  is_available: boolean;
  available: boolean;
  created_at: string;
  features: [];
  updated_at: string;
  year: number;
}

export interface CarListApiResponse {
  success: boolean;
  message: string;
  data: Car[];
  count?: number;
}

export interface CarApiResponse {
  success: boolean;
  message: string;
  car: Car;
  count?: number;
}

export interface CarFilters {
  brand?: string;
  year?: string;
  available?: string; // bisa juga boolean jika yakin selalu boolean
}
