/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { BookingData } from "@/app/types/booking";
import { Car } from "../types/car";
import { useRouter } from "next/navigation";

interface MetaMaskPaymentProps {
  bookingData: BookingData;
  onSuccess: () => void;
  onError: (error: string) => void;
  car: Car;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function MetaMaskPayment({
  bookingData,
  onSuccess,
  onError,
  car,
}: MetaMaskPaymentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const router = useRouter();

  // Sepolia testnet configuration
  const SEPOLIA_CHAIN_ID = "0xaa36a7";
  const SEPOLIA_RPC_URL = "https://rpc.sepolia.org";

  // Convert USD to ETH (mock rate for demo - in real app, use actual exchange rate)
  // const ETH_RATE = 2000; // 1 ETH = $2000 USD (demo rate)
  const ethAmount = "0.001";

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setConnected(true);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      onError("MetaMask is not installed");
      return;
    }

    try {
      setLoading(true);

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Switch to Sepolia network
      await switchToSepolia();

      setAccount(accounts[0]);
      setConnected(true);
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      onError(error.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        // Chain not added to MetaMask
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: SEPOLIA_CHAIN_ID,
                chainName: "Sepolia Testnet",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: [SEPOLIA_RPC_URL],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
        } catch (addError: any) {
          throw new Error("Failed to add Sepolia network", addError);
        }
      } else {
        throw switchError;
      }
    }
  };

  const processPayment = async () => {
    if (!connected) {
      onError("Wallet not connected");
      return;
    }

    try {
      setLoading(true);

      // Convert ETH amount to Wei
      const amountInWei = (parseFloat(ethAmount) * 1e18).toString(16);

      // Send transaction
      const transactionHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: "0xEe676dfC6EfDAaAbbA0A261c00779bB42D62E247", // Replace with your receiving address
            value: "0x" + amountInWei,
            gas: "0x5208", // 21000 gas limit
          },
        ],
      });

      // Save transaction to backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentData: {
              ...bookingData,
              car,
              txHash: transactionHash,
              fromAddress: account,
              recipientAddress: "0xEe676dfC6EfDAaAbbA0A261c00779bB42D62E247",
              amount: parseFloat(ethAmount),
            },
          }),
        }
      );
      const data = await response.json();
      console.log("data", data);
      onSuccess();
      router.push("/bookings");
    } catch (error: any) {
      console.error("Payment error:", error);
      onError(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">MetaMask Payment</h3>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600 mb-2">Ethereum Sepolia Testnet</p>
        <p className="text-lg font-semibold">
          Total: ${bookingData.totalAmount}
        </p>
        <p className="text-sm text-gray-600">≈ {ethAmount} ETH</p>
      </div>

      {!connected ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {loading ? "Connecting..." : "Connect MetaMask"}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </div>

          <button
            onClick={processPayment}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {loading ? "Processing..." : `Pay ${ethAmount} ETH`}
          </button>
        </div>
      )}
    </div>
  );
}
