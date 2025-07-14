export interface BookingData {
  car_id: number;
  start_date: string;
  end_date: string;
  total_days: number;
  totalAmount: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  payment_method: "midtrans" | "metamask";
  user_id: number;
  carName: string;
}

export interface MidtransConfig {
  serverKey: string;
  clientKey: string;
  isProduction: boolean;
}
