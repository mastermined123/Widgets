/* eslint-disable no-unused-vars */
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
  PKR: 'Rs',
  AFN: 'Af',
  ALL: 'L',
  AMD: '֏',
  ANG: 'ƒ',
  AOA: 'Kz',
  ARS: '$',
  AWG: 'ƒ',
  AZN: '₼',
  BAM: 'КМ',
  BBD: '$',
  BDT: '৳',
  BGN: 'лв',
  BHD: '.د.ب',
  BIF: 'FBu',
  BMD: '$',
  BND: '$',
  BOB: '$b',
  BRL: 'R$',
  BSD: '$',
  BTC: '₿',
  BTN: 'Nu.',
  BWP: 'P',
  BYN: 'Br',
  BZD: 'BZ$',
  CDF: 'FC',
  CLF: 'UF',
  CLP: '$',
  CNY: '¥',
  COP: '$',
  CRC: '₡'
};

const flags = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  JPY: '🇯🇵',
  CHF: '🇨🇭',
  CAD: '🇨🇦',
  AUD: '🇦🇺',
  PKR: '🇵🇰',
  AFN: '🇦🇫',
  ALL: '🇦🇱',
  AMD: '🇦🇲',
  ANG: '🇳🇱',
  AOA: '🇦🇴',
  ARS: '🇦🇷',
  AWG: '🇦🇼',
  AZN: '🇦🇿',
  BAM: '🇧🇦',
  BBD: '🇧🇧',
  BDT: '🇧🇩',
  BGN: '🇧🇬',
  BHD: '🇧🇭',
  BIF: '🇧🇮',
  BMD: '🇧🇲',
  BND: '🇧🇳',
  BOB: '🇧🇴',
  BRL: '🇧🇷',
  BSD: '🇧🇸',
  BTC: '₿',
  BTN: '🇧🇹',
  BWP: '🇧🇼',
  BYN: '🇧🇾',
  BZD: '🇧🇿',
  CDF: '🇨🇩',
  CLF: '🇨🇱',
  CLP: '🇨🇱',
  CNY: '🇨🇳',
  COP: '🇨🇴',
  CRC: '🇨🇷'
};

const currencyNames = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound Sterling',
  JPY: 'Japanese Yen',
  CHF: 'Swiss Franc',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  PKR: 'Pakistani Rupee',
  AFN: 'Afghan Afghani',
  ALL: 'Albanian Lek',
  AMD: 'Armenian Dram',
  ANG: 'Netherlands Antillean Guilder',
  AOA: 'Angolan Kwanza',
  ARS: 'Argentine Peso',
  AWG: 'Aruban Florin',
  AZN: 'Azerbaijani Manat',
  BAM: 'Bosnia-Herzegovina Convertible Mark',
  BBD: 'Barbadian Dollar',
  BDT: 'Bangladeshi Taka',
  BGN: 'Bulgarian Lev',
  BHD: 'Bahraini Dinar',
  BIF: 'Burundian Franc',
  BMD: 'Bermudan Dollar',
  BND: 'Brunei Dollar',
  BOB: 'Bolivian Boliviano',
  BRL: 'Brazilian Real',
  BSD: 'Bahamian Dollar',
  BTC: 'Bitcoin',
  BTN: 'Bhutanese Ngultrum',
  BWP: 'Botswanan Pula',
  BYN: 'Belarusian Ruble',
  BZD: 'Belize Dollar',
  CDF: 'Congolese Franc',
  CLF: 'Chilean Unit of Account (UF)',
  CLP: 'Chilean Peso',
  CNY: 'Chinese Yuan',
  COP: 'Colombian Peso',
  CRC: 'Costa Rican Colón'
};

const ExchangeRateChartPopUp = ({ 
  onClose,
  appName = "Exchange Rate",
  tags = [],
  baseCurrency = "PKR",
  exchangeCurrencies = ["AUD", "AFN"],
  spread = "",
  headerText = "Exchange Rate",
  showEachCurrencyFor = 5,
  headerTextColor = "",
  textFont = "Arial",
  fontColor = "",
  backgroundColor = "",
  backgroundImage = null,
  backgroundGradient = false,
  disableAnimations = false,
  language = "en",
  currencyLabels = {}
}) => {
  const [rates, setRates] = useState([]);
  const [activeCurrencyIndex, setActiveCurrencyIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Dummy exchange rate data with chart points
  const dummyRates = {
    AUD: { 
      rate: 224.932, 
      trend: 'up', 
      variation: '+0.5%',
      chartData: [220, 222, 225, 224, 228, 224.932]
    },
    AFN: { 
      rate: 4.149, 
      trend: 'down', 
      variation: '-0.3%',
      chartData: [4.2, 4.18, 4.15, 4.16, 4.14, 4.149]
    },
    EUR: { 
      rate: 310.25, 
      trend: 'up', 
      variation: '+1.2%',
      chartData: [308, 309, 311, 310, 312, 310.25]
    },
    USD: { 
      rate: 278.50, 
      trend: 'up', 
      variation: '+0.8%',
      chartData: [276, 277, 279, 278, 280, 278.50]
    },
    GBP: { 
      rate: 352.75, 
      trend: 'down', 
      variation: '-0.4%',
      chartData: [355, 354, 351, 353, 350, 352.75]
    }
  };

  useEffect(() => {
    // Generate rates data
    const newRates = exchangeCurrencies.map((curr, index) => {
      const rateData = dummyRates[curr] || { 
        rate: Math.random() * 100 + 50, 
        trend: Math.random() > 0.5 ? 'up' : 'down',
        variation: Math.random() > 0.5 ? '+0.5%' : '-0.3%',
        chartData: Array.from({length: 6}, () => Math.random() * 100 + 50)
      };
      
      return {
        currency: curr,
        rate: rateData.rate,
        trend: rateData.trend,
        variation: rateData.variation,
        chartData: rateData.chartData,
        isActive: index === 0
      };
    });

    setRates(newRates);
  }, [exchangeCurrencies]);

  // Auto-switch currencies every X seconds
  useEffect(() => {
    if (disableAnimations || rates.length <= 1) return;

    const interval = setInterval(() => {
      setActiveCurrencyIndex(prev => {
        const next = (prev + 1) % rates.length;
        setAnimationKey(prev => prev + 1);
        return next;
      });
    }, (showEachCurrencyFor || 5) * 1000);

    return () => clearInterval(interval);
  }, [rates.length, showEachCurrencyFor, disableAnimations]);

  // Single currency animation
  useEffect(() => {
    if (rates.length === 1 && !disableAnimations) {
      const interval = setInterval(() => {
        setAnimationKey(prev => prev + 1);
      }, (showEachCurrencyFor || 5) * 1000);

      return () => clearInterval(interval);
    }
  }, [rates.length, showEachCurrencyFor, disableAnimations]);

  const popupStyle = {
    backgroundColor: backgroundColor || "#f5f5f5",
    color: fontColor || "#333",
    fontFamily: textFont || "Arial",
    backgroundImage: backgroundGradient ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
                    (backgroundImage ? `url(${backgroundImage})` : "none"),
    backgroundSize: backgroundImage ? "cover" : "auto",
  };

  const activeCurrency = rates[activeCurrencyIndex];

  if (!rates.length) {
    return (
      <div style={styles.overlay}>
        <div style={{...styles.popup, ...popupStyle}}>
          <div style={styles.topBar}>
            <button onClick={onClose} style={styles.closeBtn}>
              <IoMdClose />
            </button>
          </div>
          <div style={styles.content}>
            <p>No exchange currencies selected</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <div style={{...styles.popup, ...popupStyle}}>
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>
        
        <div style={styles.content}>
          <div style={{
            ...styles.header,
            color: headerTextColor || fontColor || "#2196F3"
          }}>
            {headerText || "Exchange Rate"}
          </div>

          <div style={styles.baseCurrencyHeader}>
            <span style={styles.baseFlag}>{flags[baseCurrency] || '🏳️'}</span>
            <span style={styles.baseText}>
              {baseCurrency} {currencyNames[baseCurrency] || 'Currency'}
            </span>
            <span style={styles.baseRate}>
              {activeCurrency ? activeCurrency.rate.toFixed(3) : '0.000'}
            </span>
          </div>

          <div style={styles.mainContainer}>
            {/* Left Portion - Currency List */}
            <div style={styles.leftPortion}>
              {rates.map((item, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.currencyTile,
                    ...(index === activeCurrencyIndex ? styles.activeTile : {}),
                    backgroundColor: index === activeCurrencyIndex ? "#E3F2FD" : "white"
                  }}
                  onClick={() => setActiveCurrencyIndex(index)}
                >
                  <div style={styles.currencyLeft}>
                    <span style={styles.flag}>{flags[item.currency] || '🏳️'}</span>
                    <div style={styles.currencyInfo}>
                      <div style={styles.currencyAmount}>1 {item.currency}</div>
                      <div style={styles.currencyName}>
                        {currencyLabels[item.currency] || currencyNames[item.currency] || item.currency}
                      </div>
                    </div>
                  </div>
                  
                  <div style={styles.currencyRight}>
                    <div style={{
                      ...styles.rateValue,
                      color: item.trend === 'up' ? '#4CAF50' : '#F44336'
                    }}>
                      {item.trend === 'up' ? '▲' : '▼'} {currencySymbols[baseCurrency] || ''}{item.rate.toFixed(3)}...
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Portion - Chart */}
            <div style={styles.rightPortion}>
              {activeCurrency && (
                <div 
                  key={animationKey}
                  style={{
                    ...styles.chartContainer,
                    animation: !disableAnimations ? 'slideInFromLeft 0.8s ease-out' : 'none'
                  }}
                >
                  <div style={styles.chartHeader}>
                    <span style={styles.chartFlag}>{flags[activeCurrency.currency] || '🏳️'}</span>
                    <span style={styles.chartTitle}>
                      {activeCurrency.currency} Exchange Rate
                    </span>
                  </div>
                  
                  <div style={styles.chart}>
                    <svg width="100%" height="200" style={styles.svg}>
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{stopColor: activeCurrency.trend === 'up' ? '#4CAF50' : '#F44336', stopOpacity: 0.3}} />
                          <stop offset="100%" style={{stopColor: activeCurrency.trend === 'up' ? '#4CAF50' : '#F44336', stopOpacity: 0.05}} />
                        </linearGradient>
                      </defs>
                      
                      {/* Chart Line */}
                      <polyline
                        points={activeCurrency.chartData.map((point, i) => 
                          `${(i * 80) + 20},${180 - (point / Math.max(...activeCurrency.chartData)) * 120}`
                        ).join(' ')}
                        fill="none"
                        stroke={activeCurrency.trend === 'up' ? '#4CAF50' : '#F44336'}
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      
                      {/* Chart Area */}
                      <polygon
                        points={`20,180 ${activeCurrency.chartData.map((point, i) => 
                          `${(i * 80) + 20},${180 - (point / Math.max(...activeCurrency.chartData)) * 120}`
                        ).join(' ')} 420,180`}
                        fill="url(#gradient)"
                      />
                      
                      {/* Data Points */}
                      {activeCurrency.chartData.map((point, i) => (
                        <circle
                          key={i}
                          cx={(i * 80) + 20}
                          cy={180 - (point / Math.max(...activeCurrency.chartData)) * 120}
                          r="4"
                          fill={activeCurrency.trend === 'up' ? '#4CAF50' : '#F44336'}
                        />
                      ))}
                    </svg>
                  </div>
                  
                  <div style={styles.chartStats}>
                    <div style={styles.currentRate}>
                      Current Rate: {currencySymbols[baseCurrency] || ''}{activeCurrency.rate.toFixed(3)}
                    </div>
                    <div style={{
                      ...styles.variation,
                      color: activeCurrency.trend === 'up' ? '#4CAF50' : '#F44336'
                    }}>
                      {activeCurrency.variation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add keyframes for animation */}
        <style>
          {`
            @keyframes slideInFromLeft {
              0% {
                opacity: 0;
                transform: translateX(-100px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}
        </style>
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
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    background: "#f1f1f1",
    padding: "8px 15px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
  },
  content: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  baseCurrencyHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 20px",
    backgroundColor: "white",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  baseFlag: {
    fontSize: "24px",
    marginRight: "10px",
  },
  baseText: {
    fontSize: "16px",
    fontWeight: "500",
    flex: 1,
  },
  baseRate: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#666",
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    gap: "20px",
    overflow: "hidden",
  },
  leftPortion: {
    flex: "0 0 45%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    paddingRight: "10px",
  },
  rightPortion: {
    flex: "0 0 55%",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  currencyTile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  activeTile: {
    border: "2px solid #2196F3",
    transform: "scale(1.02)",
  },
  currencyLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  flag: {
    fontSize: "24px",
  },
  currencyInfo: {
    display: "flex",
    flexDirection: "column",
  },
  currencyAmount: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  currencyName: {
    fontSize: "12px",
    color: "#666",
    marginTop: "2px",
  },
  currencyRight: {
    textAlign: "right",
  },
  rateValue: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  chartContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  chartHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "5px",
    paddingBottom: "15px",
    borderBottom: "2px solid #E3F2FD",
  },
  chartFlag: {
    fontSize: "28px",
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  chart: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5px",
  },
  svg: {
    maxWidth: "100%",
    height: "200px",
  },
  chartStats: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderTop: "1px solid #eee",
  },
  currentRate: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  variation: {
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default ExchangeRateChartPopUp;