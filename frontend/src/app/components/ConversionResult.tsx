import { TransactionResponse } from "@/api/transaction";

type Props = {
  conversionResult: TransactionResponse | null;
  eurAmount: string;
};
export default function ConversionResult({
  conversionResult,
  eurAmount,
}: Props) {
  if (!conversionResult) return null;
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount (EUR):</span>
          <span className="text-gray-500">
            {conversionResult.amountEur?.toFixed(2) || eurAmount}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Exchange Rate:</span>
          <span className="text-gray-500">
            {conversionResult.rate?.toFixed(4)}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg border-t pt-2">
          <span className="font-medium text-gray-900">Total (PLN):</span>
          <span className="font-semibold text-green-600">
            {conversionResult.amountPln?.toFixed(2)} PLN
          </span>
        </div>
        {conversionResult.timestamp && (
          <div className="text-xs text-gray-500 text-center mt-2">
            Converted on {new Date(conversionResult.timestamp).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
