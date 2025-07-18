import { Suspense } from "react";
import SuccessDisplay from "@/app/components/SuccessDisplay";

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessDisplay />
    </Suspense>
  );
}
