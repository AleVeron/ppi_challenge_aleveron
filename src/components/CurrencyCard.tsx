import React from "react";
import CurrencySelector from "./CurrencySelector";
import { currencies } from "../data/currencies";
import vectorIcon from "../assets/Vector.png";

// Propiedades que recibe el componente CurrencyCard
interface CurrencyCardProps {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
  convertedAmount: number;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFromCurrencyChange: (currency: string) => void;
  onToCurrencyChange: (currency: string) => void;
  onSwapCurrencies: () => void;
  isLoading: boolean;
  error?: string;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  amount,
  fromCurrency,
  toCurrency,
  exchangeRate,
  convertedAmount,
  onAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onSwapCurrencies,
  isLoading,
  error,
}) => {
  // Formatear números con la cantidad correcta de decimales
  const formatCurrency = (value: number, decimals: number = 6): string => {
    if (value === 0) return "0.00";
    if (value < 0.001) return value.toExponential(2);
    return value.toFixed(decimals);
  };

  // Formatear la cantidad mostrada según su valor
  const formatDisplayAmount = (value: number): string => {
    if (value === 0) return "0.00";
    if (value >= 1) return value.toFixed(2);
    if (value >= 0.01) return value.toFixed(4);
    return value.toFixed(6);
  };

  // Obtener la fecha y hora actual formateada
  const getLastUpdatedTime = () => {
    return (
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }) +
      ", " +
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })
    );
  };

  // Obtener nombres completos de las monedas
  const getFromCurrencyName = () =>
    currencies.find((c) => c.code === fromCurrency)?.name || fromCurrency;
  const getToCurrencyName = () =>
    currencies.find((c) => c.code === toCurrency)?.name || toCurrency;

  // Generar URL para enlaces a XE.com
  const getCurrencyUrl = (currencyCode: string, currencyName: string) => {
    const formattedName = currencyName.toLowerCase().replace(/\s+/g, '-');
    return `https://www.xe.com/currency/${currencyCode.toLowerCase()}-${formattedName}/`;
  };

  // Filtrar monedas para evitar duplicados en los selectores
  const getFromCurrencies = () => currencies.filter(c => c.code !== toCurrency);
  const getToCurrencies = () => currencies.filter(c => c.code !== fromCurrency);

  return (
    <div className="currency-card">
      {/* Sección del formulario de entrada */}
      <div className="form-section">
        <div className="input-row">
          {/* Campo de cantidad */}
          <div className="amount-input">
            <label className="input-label">Amount</label>
            <div className="amount-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="text"
                value={amount}
                onChange={onAmountChange}
                className="amount-field"
                placeholder="0.00"
                inputMode="decimal"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Selector de moneda origen */}
          <CurrencySelector
            currencies={getFromCurrencies()}
            selectedCurrency={fromCurrency}
            onCurrencyChange={onFromCurrencyChange}
            label="From"
          />

          {/* Botón para intercambiar monedas */}
          <div className="swap-button-container">
            <button onClick={onSwapCurrencies} className="swap-button">
              <img src={vectorIcon} alt="Swap currencies" className="swap-icon" />
            </button>
          </div>

          {/* Selector de moneda destino */}
          <CurrencySelector
            currencies={getToCurrencies()}
            selectedCurrency={toCurrency}
            onCurrencyChange={onToCurrencyChange}
            label="To"
          />
        </div>

        {/* Mostrar errores si existen */}
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* Sección de resultados */}
      <div className="result-section">
        {/* Resultado principal de la conversión */}
        <div className="result-display">
          <h3>
            {formatDisplayAmount(parseFloat(amount) || 0)}{" "}
            {getFromCurrencyName()} = <br />
            {isLoading
              ? "Loading..."
              : `${formatDisplayAmount(
                  convertedAmount
                )} ${getToCurrencyName()}`}
          </h3>

          {/* Tasa de cambio inversa */}
          <p className="reverse-rate">
            1 {toCurrency} ={" "}
            {isLoading
              ? "Loading..."
              : `${formatCurrency(1 / exchangeRate)} ${fromCurrency}`}
          </p>
        </div>

        <div>
          {/* Disclaimer sobre las tasas */}
          <div className="disclaimer">
            <p>
              We use the mid-market rate for our Converter. This is for
              informational purposes only. You won't receive this rate when
              sending money.
            </p>
          </div>
          {/* Información de última actualización con enlaces */}
          <p className="last-updated">
            <a 
              href={getCurrencyUrl(fromCurrency, getFromCurrencyName())} 
              className="currency-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {getFromCurrencyName()}
            </a> to <a 
              href={getCurrencyUrl(toCurrency, getToCurrencyName())} 
              className="currency-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {getToCurrencyName()}
            </a> conversion — Last
            updated {getLastUpdatedTime()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
