import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CHF: 'CHF',
  CAD: 'C$',
  AUD: 'A$',
};

const flags = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  JPY: '🇯🇵',
  CHF: '🇨🇭',
  CAD: '🇨🇦',
  AUD: '🇦🇺',
};

const currencyNames = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound Sterling',
  JPY: 'Japanese Yen',
  CHF: 'Swiss Franc',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
};

const ExchangeRatePopUp = ({ 
  onClose, 
  baseCurrency = "USD",
  exchangeCurrencies = ["EUR", "CHF", "JPY", "GBP"],
  variation = "percentage",
  decimalPlaces = 2,
  currencyFormat = "en-US",
  theme = "dark",
  textFont = "Arial",
  customTextColor = "",
  textShadow = false,
  backgroundGradient = false,
  customBgColor = "",
  customBgImage = null,
  scrollSpeed = "",
}) => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy exchange rate data
  const dummyRates = {
    EUR: { rate: 0.93, trend: 'up' },
    GBP: { rate: 0.80, trend: 'down' },
    JPY: { rate: 148.25, trend: 'up' },
    CHF: { rate: 0.88, trend: 'down' },
    CAD: { rate: 1.35, trend: 'up' },
    AUD: { rate: 1.54, trend: 'down' },
  };

  useEffect(() => {
    // Using dummy data instead of API call
    try {
      const newRates = exchangeCurrencies.map(curr => {
        const rateData = dummyRates[curr] || { rate: 1.0, trend: 'up' };
        const rate = rateData.rate;
        const isPositive = rateData.trend === 'up';
        
        // Format the rate based on decimal places
        const formattedRate = rate.toLocaleString(currencyFormat, { 
          minimumFractionDigits: decimalPlaces, 
          maximumFractionDigits: decimalPlaces 
        });
        
        // Generate variation value
        const variationValue = variation === 'percentage' 
          ? (isPositive ? '+0.5%' : '-0.3%') 
          : (isPositive ? '+0.02' : '-0.01');

        return {
          currency: curr,
          rate: formattedRate,
          variationValue,
          isPositive
        };
      });

      setRates(newRates);
    } catch (err) {
      setError('Failed to load exchange rates.');
    }
  }, [baseCurrency, exchangeCurrencies, variation, decimalPlaces, currencyFormat]);

  const popupStyle = {
    backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
    color: customTextColor || (theme === "dark" ? "white" : "black"),
    fontFamily: textFont,
    textShadow: textShadow ? "1px 1px 2px rgba(0,0,0,0.5)" : "none",
    backgroundImage: backgroundGradient ? "linear-gradient(to bottom, #333, #000)" : (customBgImage ? `url(${customBgImage})` : "none"),
    backgroundSize: customBgImage ? "cover" : "auto",
    ...(customBgColor ? { backgroundColor: customBgColor } : {}),
  };

  if (error) {
    return (
      <div style={styles.overlay}>
        <div style={{...styles.popup, ...popupStyle}}>
          <div style={styles.topBar}>
            <button onClick={onClose} style={styles.closeBtn}>
              <IoMdClose />
            </button>
          </div>
          <div style={styles.content}>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <div style={{...styles.popup, ...popupStyle, width: '1000px',height:'90vh'}}>
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>
        <div style={styles.content}>
          <div style={styles.baseCurrency}>
            <span style={styles.baseFlag}>{flags[baseCurrency] || ''}</span>
            <span style={styles.baseText}>1 {baseCurrency}</span>
          </div>
          
          <div style={styles.ratesGrid}>
            {rates.map((item, index) => (
              <div key={index} style={{
                ...styles.rateCard,
                backgroundColor: theme === "dark" ? "#2a2a2a" : "#f9f9f9",
                color: theme === "dark" ? "white" : "black"
              }}>
                <div style={styles.currencyInfo}>
                  <span style={styles.flag}>{flags[item.currency] || ''}</span>
                  <div style={styles.currencyDetails}>
                    <div style={styles.currencyCode}>1{item.currency}</div>
                    <div style={styles.currencyName}>{currencyNames[item.currency] || item.currency}</div>
                  </div>
                </div>
                
                <div style={styles.rateInfo}>
                  <div style={{
                    ...styles.rateValue,
                    color: item.isPositive ? '#4caf50' : '#f44336'
                  }}>
                    {currencySymbols[baseCurrency] || ''}{item.rate}
                  </div>
                  <div style={{
                    ...styles.variation,
                    color: item.isPositive ? '#4caf50' : '#f44336'
                  }}>
                    {item.isPositive ? '▲' : '▼'} {item.variationValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    background: "#f1f1f1",
    padding: "8px 10px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  content: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  baseCurrency: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  baseFlag: {
    fontSize: '24px',
    marginRight: '10px'
  },
  baseText: {
    fontSize: '16px'
  },
  ratesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%'
  },
  rateCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  currencyInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  currencyDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  currencyCode: {
    fontWeight: 'bold',
    fontSize: '14px'
  },
  currencyName: {
    fontSize: '12px',
    opacity: 0.8
  },
  rateInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  rateValue: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  variation: {
    fontSize: '12px'
  },
};

export default ExchangeRatePopUp;