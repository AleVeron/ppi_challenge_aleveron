import { ExchangeRateResponse } from '../types';

const API_BASE_URL = 'https://api.vatcomply.com/rates';

export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<ExchangeRateResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}?base=${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  try {
    const rates = await fetchExchangeRates(fromCurrency);
    
    if (!rates.rates[toCurrency]) {
      throw new Error(`Exchange rate not found for ${toCurrency}`);
    }
    
    return amount * rates.rates[toCurrency];
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};
