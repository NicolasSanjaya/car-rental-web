export interface Booking {
  id: string;
  car_id: number;
  start_date: string;
  end_date: string;
  full_name: string;
  email: string;
  phone_number: string;
  payment_method: "metamask" | "midtrans";
  is_paid: boolean;
  tx_hash: string | null;
  amount: number;
  total_days?: number;
  totalAmount?: string;
  created_at: string;
  updated_at: string;
  car_name?: string;
  car_brand?: string;
  car_image?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  user_id?: number;
  carName?: string;
}
