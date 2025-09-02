export interface Currency {
  code: string;
  name: string;
}

export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: { [key: string]: number };
}
