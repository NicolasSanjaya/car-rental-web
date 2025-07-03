"use client";
interface PaymentMethodProps {
  selectedMethod: "midtrans" | "metamask";
  onMethodChange: (method: "midtrans" | "metamask") => void;
}

export default function PaymentMethod({
  selectedMethod,
  onMethodChange,
}: PaymentMethodProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose Payment Method</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition ${
            selectedMethod === "midtrans"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onMethodChange("midtrans")}
        >
          <div className="flex items-center mb-2">
            <input
              type="radio"
              checked={selectedMethod === "midtrans"}
              onChange={() => onMethodChange("midtrans")}
              className="mr-2"
            />
            <h4 className="font-semibold">Midtrans Payment</h4>
          </div>
          <p className="text-sm text-gray-600">
            Pay with credit/debit card, bank transfer, e-wallet, and more
          </p>
          <div className="mt-2 flex space-x-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              VISA
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              MasterCard
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              BCA
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              GoPay
            </span>
          </div>
        </div>

        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition ${
            selectedMethod === "metamask"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onMethodChange("metamask")}
        >
          <div className="flex items-center mb-2">
            <input
              type="radio"
              checked={selectedMethod === "metamask"}
              onChange={() => onMethodChange("metamask")}
              className="mr-2"
            />
            <h4 className="font-semibold">MetaMask (Ethereum)</h4>
          </div>
          <p className="text-sm text-gray-600">
            Pay with Ethereum on Sepolia testnet
          </p>
          <div className="mt-2 flex space-x-2">
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
              ETH
            </span>
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
              Sepolia
            </span>
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
              Testnet
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
