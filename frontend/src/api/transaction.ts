import { apiCall } from "./api";

type TransactionResponse = {
  transactionId: string;
  amountPln: number;
  amountEur: number;
  rate: number;
  timestamp: Date;
};

const createTransaction = async (amountEur: number) => {
  return apiCall<TransactionResponse>("cantor/transaction", "POST", {
    amountEur,
  });
};

export { createTransaction, type TransactionResponse };
