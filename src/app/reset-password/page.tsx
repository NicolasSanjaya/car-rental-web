import { Suspense } from "react";
import ResetPasswordDisplayPage from "../components/ResetPasswordDisplay";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordDisplayPage />
    </Suspense>
  );
}
