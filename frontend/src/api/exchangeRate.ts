import { apiCall } from "./api";

type GetExchangeRateResponse = {
  rate: number;
  timestamp: Date;
};

const fetchExchangeRate = async () => {
  return apiCall<GetExchangeRateResponse>("cantor/rate/eur-to-pln");
};

export { fetchExchangeRate, type GetExchangeRateResponse };
