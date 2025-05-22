"use client";

import { fetchExchangeRate } from "@/api/exchangeRate";
import { useQuery } from "@tanstack/react-query";

export function CurrentExchangeRate() {
  const {
    data: exchangeRate,
    isLoading: rateLoading,
    error: rateError,
  } = useQuery({
    queryKey: ["exchangeRate"],
    queryFn: fetchExchangeRate,
    refetchInterval: 60000,
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Current Exchange Rate
      </h2>

      {rateLoading && (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 text-sm">Loading rate...</span>
        </div>
      )}

      {rateError && (
        <div className="text-red-600 text-sm">Failed to load exchange rate</div>
      )}

      {exchangeRate && (
        <div className="flex justify-between items-center">
          <span className="text-2xl font-light text-gray-900">
            1 EUR = {exchangeRate.rate?.toFixed(4) || "N/A"} PLN
          </span>
          <span className="text-xs text-gray-500">
            {exchangeRate.timestamp &&
              new Date(exchangeRate.timestamp).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
