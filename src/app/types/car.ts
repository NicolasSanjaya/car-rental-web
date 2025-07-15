export interface Car {
  id: number;
  car_id: string;
  name: string;
  brand: string;
  price_per_day: number;
  image_url: string;
  available: boolean;
  created_at: string;
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
