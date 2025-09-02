import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CurrencyCard from './CurrencyCard';
import { convertCurrency } from '../services/currencyService';
import { currencies } from '../data/currencies';
import './CurrencyCard.css';

const CurrencyConverter: React.FC = () => {
  // Estado para manejar los valores del formulario
  const [amount, setAmount] = useState<string>('1.00');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  
  // Estado para los resultados de la conversión
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Validaciones de entrada
  const numericAmount = useMemo(() => parseFloat(amount), [amount]);
  const isValidAmount = useMemo(() => !isNaN(numericAmount) && numericAmount >= 0, [numericAmount]);

  // Función para realizar la conversión de moneda
  const performConversion = useCallback(async () => {
    // Validar que el monto sea válido
    if (!isValidAmount) {
      setError('Please enter a valid positive number');
      return;
    }

    // Si las monedas son iguales, la tasa es 1
    if (fromCurrency === toCurrency) {
      setExchangeRate(1);
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Obtener la tasa de cambio desde la API
      const result = await convertCurrency(1, fromCurrency, toCurrency);
      setExchangeRate(result);
    } catch (err) {
      setError('Failed to fetch exchange rate. Please try again.');
      setExchangeRate(0);
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency, isValidAmount]);

  // Ejecutar conversión cuando cambien las monedas
  useEffect(() => {
    performConversion();
  }, [performConversion]);

  // Manejar cambios en el campo de cantidad
  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Solo permitir números y punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  }, []);

  // Intercambiar las monedas seleccionadas
  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  // Calcular el monto convertido
  const convertedAmount = useMemo(() => {
    if (!isValidAmount || exchangeRate === 0) return 0;
    return numericAmount * exchangeRate;
  }, [numericAmount, exchangeRate, isValidAmount]);

  // Obtener nombres completos de las monedas para mostrar
  const fromCurrencyName = useMemo(() => 
    currencies.find(c => c.code === fromCurrency)?.name || fromCurrency, 
    [fromCurrency]
  );

  const toCurrencyName = useMemo(() => 
    currencies.find(c => c.code === toCurrency)?.name || toCurrency, 
    [toCurrency]
  );

  return (
    <div className="currency-converter">
      {/* Título principal */}
      <div className="converter-header">
        <h1>Currency exchange</h1>
      </div>
      
      {/* Título dinámico con las monedas seleccionadas */}
      <div className="converter-title">
        <h2>{amount} {fromCurrency} to {toCurrency} - Convert {fromCurrencyName} to {toCurrencyName}</h2>
      </div>

      {/* Componente principal del formulario y resultados */}
      <CurrencyCard
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        exchangeRate={exchangeRate}
        convertedAmount={convertedAmount}
        onAmountChange={handleAmountChange}
        onFromCurrencyChange={setFromCurrency}
        onToCurrencyChange={setToCurrency}
        onSwapCurrencies={swapCurrencies}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default CurrencyConverter;
