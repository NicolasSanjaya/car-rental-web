export interface BookingData {
  carId: number;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: "midtrans" | "metamask";
}

export interface MidtransConfig {
  serverKey: string;
  clientKey: string;
  isProduction: boolean;
}
