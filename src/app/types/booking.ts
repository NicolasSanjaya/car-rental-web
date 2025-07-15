export interface Booking {
  id: string;
  car_id: string;
  start_date: string;
  end_date: string;
  full_name: string;
  email: string;
  phone_number: string;
  payment_method: "metamask" | "midtrans";
  is_paid: boolean;
  tx_hash: string | null;
  amount: number;
  created_at: string;
  updated_at: string;
  car_name?: string;
  car_brand?: string;
  car_image?: string;
}
