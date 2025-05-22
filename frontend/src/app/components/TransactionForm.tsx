"use client";

import { createTransaction, TransactionResponse } from "@/api/transaction";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import ConversionResult from "./ConversionResult";

export function TransactionForm() {
  const [eurAmount, setEurAmount] = useState<string>("");
  const [conversionResult, setConversionResult] =
    useState<TransactionResponse | null>(null);

  const { mutate: makeTransaction, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      setConversionResult(data);
    },
    onError: (error) => {
      console.error("Conversion error:", error);
      toast.error("Failed to convert currency");
    },
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(eurAmount || "");
    if (!eurAmount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    makeTransaction(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEurAmount(value);
    if (conversionResult) {
      setConversionResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Convert EUR to PLN
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="eurAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount in EUR
          </label>
          <div className="relative">
            <input
              id="eurAmount"
              type="number"
              step="0.01"
              min="0.01"
              value={eurAmount}
              onChange={handleInputChange}
              placeholder="Enter amount..."
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={isPending}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 text-sm pr-5">EUR</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending || !eurAmount}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isPending ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Converting...</span>
            </div>
          ) : (
            "Convert to PLN"
          )}
        </button>
      </form>

      {/* Conversion Result */}
      <ConversionResult
        conversionResult={conversionResult}
        eurAmount={eurAmount}
      />
    </div>
  );
}
