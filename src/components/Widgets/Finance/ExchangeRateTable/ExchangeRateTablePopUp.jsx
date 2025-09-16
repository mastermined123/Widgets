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
  CRC: '₡',
  KSK: 'KSK'
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
  CRC: '🇨🇷',
  KSK: '🏳️'
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
  CRC: 'Costa Rican Colón',
  KSK: 'Custom Currency'
};

const ExchangeRateTablePopUp = ({ 
  onClose,
  appName = "Exchange Rate Table",
  tags = [],
  baseCurrency = "KSK",
  exchangeCurrencies = ["AFN", "ARS", "AUD", "AWG", "DZD", "EUR"],
  headerText = "Exchange Rate KSK",
  logoImage = null,
  transition = "Transition from left",
  headerColor = "#FF6347",
  tableColor = "#87CEEB",
  textFont = "Arial",
  textColor = "#333",
  backgroundColor = "#f5f5f5",
  backgroundImage = null,
  animateBackgroundImage = false,
  language = "en",
  currencyLabels = {}
}) => {
  const [rates, setRates] = useState([]);
  const [visibleRows, setVisibleRows] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);

  // Dummy exchange rate data
  const dummyRates = {
    AFN: { rate: 0.01, trend: 'down', variation: '-0.3%' },
    ARS: { rate: 0.00, trend: 'down', variation: '-0.1%' },
    AUD: { rate: 0.66, trend: 'down', variation: '-0.5%' },
    AWG: { rate: 0.55, trend: 'neutral', variation: '0.00%' },
    DZD: { rate: 0.01, trend: 'up', variation: '+0.2%' },
    EUR: { rate: 1.17, trend: 'down', variation: '-0.8%' },
    USD: { rate: 1.25, trend: 'up', variation: '+0.4%' },
    GBP: { rate: 1.42, trend: 'down', variation: '-0.6%' },
    JPY: { rate: 0.008, trend: 'up', variation: '+0.3%' },
    CHF: { rate: 1.38, trend: 'down', variation: '-0.2%' }
  };

  useEffect(() => {
    // Generate rates data
    const newRates = exchangeCurrencies.map((curr, index) => {
      const rateData = dummyRates[curr] || { 
        rate: Math.random() * 2, 
        trend: ['up', 'down', 'neutral'][Math.floor(Math.random() * 3)],
        variation: Math.random() > 0.5 ? '+0.5%' : '-0.3%'
      };
      
      return {
        currency: curr,
        name: currencyLabels[curr] || currencyNames[curr] || curr,
        rate: rateData.rate,
        trend: rateData.trend,
        variation: rateData.variation,
        flag: flags[curr] || '🏳️'
      };
    });

    setRates(newRates);
    
    // Reset animation
    setVisibleRows([]);
    setAnimationKey(prev => prev + 1);
    
    // Animate rows in sequence based on transition type
    if (transition !== "No Animation") {
      newRates.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRows(prev => [...prev, index]);
        }, index * 200); // 200ms delay between each row
      });
    } else {
      setVisibleRows(newRates.map((_, index) => index));
    }
  }, [exchangeCurrencies, transition, currencyLabels]);

  const getTransitionClass = (index) => {
    if (transition === "No Animation" || visibleRows.includes(index)) {
      return styles.visible;
    }
    
    switch (transition) {
      case "Transition from left":
        return styles.slideFromLeft;
      case "Slide from Right":
        return styles.slideFromRight;
      case "Slide from Top":
        return styles.slideFromTop;
      case "Slide from Bottom":
        return styles.slideFromBottom;
      case "Fade":
        return styles.fadeIn;
      default:
        return styles.slideFromLeft;
    }
  };

  const popupStyle = {
    backgroundColor: backgroundColor || "#f5f5f5",
    color: textColor || "#333",
    fontFamily: textFont || "Arial",
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    backgroundSize: backgroundImage ? "cover" : "auto",
    animation: animateBackgroundImage && backgroundImage ? "backgroundMove 20s linear infinite" : "none"
  };

  const headerStyle = {
    backgroundColor: headerColor || "#FF6347",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    fontSize: "28px",
    fontWeight: "bold",
    fontFamily: textFont || "Arial"
  };

  return (
    <div style={styles.overlay}>
      <div style={{...styles.popup, ...popupStyle}}>
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>
        
        {/* Header */}
        <div style={headerStyle}>
          {logoImage && (
            <img 
              src={logoImage} 
              alt="Logo" 
              style={styles.logo}
            />
          )}
          {headerText || "Exchange Rate KSK"}
        </div>

        {/* Table Container */}
        <div style={styles.tableContainer}>
          {rates.map((item, index) => (
            <div 
              key={`${item.currency}-${animationKey}`}
              style={{
                ...styles.tableRow,
                backgroundColor: tableColor || "#87CEEB",
                ...getTransitionClass(index),
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div style={styles.currencyInfo}>
                <span style={styles.flag}>{item.flag}</span>
                <span style={styles.currencyName}>{item.name}</span>
              </div>
              
              <div style={styles.rateInfo}>
                <span style={styles.rateValue}>
                  {item.rate.toFixed(2)}
                </span>
                {item.trend !== 'neutral' && (
                  <span style={{
                    ...styles.trendIcon,
                    color: item.trend === 'up' ? '#22c55e' : '#ef4444'
                  }}>
                    {item.trend === 'up' ? '▲' : '▼'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CSS Animations */}
        <style>
          {`
            @keyframes slideFromLeft {
              0% {
                opacity: 0;
                transform: translateX(-100px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes slideFromRight {
              0% {
                opacity: 0;
                transform: translateX(100px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes slideFromTop {
              0% {
                opacity: 0;
                transform: translateY(-50px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes slideFromBottom {
              0% {
                opacity: 0;
                transform: translateY(50px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
            
            @keyframes backgroundMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
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
    color: "#666"
  },
  logo: {
    height: "40px",
    marginRight: "15px",
    verticalAlign: "middle"
  },
  tableContainer: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto"
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    borderRadius: "8px",
    minHeight: "70px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    opacity: 0,
    transform: "translateX(-100px)"
  },
  visible: {
    opacity: 1,
    transform: "translateX(0)",
    transition: "all 0.6s ease-out"
  },
  slideFromLeft: {
    animation: "slideFromLeft 0.6s ease-out forwards"
  },
  slideFromRight: {
    animation: "slideFromRight 0.6s ease-out forwards"
  },
  slideFromTop: {
    animation: "slideFromTop 0.6s ease-out forwards"
  },
  slideFromBottom: {
    animation: "slideFromBottom 0.6s ease-out forwards"
  },
  fadeIn: {
    animation: "fadeIn 0.6s ease-out forwards"
  },
  currencyInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flex: 1
  },
  flag: {
    fontSize: "24px",
    minWidth: "30px"
  },
  currencyName: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#333"
  },
  rateInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  rateValue: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333"
  },
  trendIcon: {
    fontSize: "16px",
    fontWeight: "bold"
  }
};

export default ExchangeRateTablePopUp;