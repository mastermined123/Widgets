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
  AED: 'د.إ',
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
  EGP: '£'
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
  AED: '🇦🇪',
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
  EGP: '🇪🇬'
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
  AED: 'United Arab Emirates Dirham',
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
  EGP: 'Egyptian Pound'
};

const SingleExchangeRateChartOriginalPopUp = ({ 
  onClose,
  appName = "Exchange Rate KSK",
  tags = [],
  baseCurrency = "AED",
  exchangeCurrency = "EGP",
  spread = "",
  headerText = "Exchange Rate KSK",
  headerTextColor = "",
  textFont = "Arial",
  fontColor = "",
  backgroundColor = "",
  backgroundImage = null,
  backgroundGradient = false,
  disableAnimations = false,
  language = "en",
  appLabels = {}
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Dummy exchange rate data
  const dummyRate = 0.078;
  const dailyVariation = { value: 0, trend: 'down' };
  const weeklyVariation = { value: 0.79, trend: 'up' };

  const popupStyle = {
    backgroundColor: backgroundColor || "#f0f2f5",
    color: fontColor || "#333",
    fontFamily: textFont || "Arial",
    backgroundImage: backgroundGradient ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
                    (backgroundImage ? `url(${backgroundImage})` : "none"),
    backgroundSize: backgroundImage ? "cover" : "auto",
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!exchangeCurrency) {
    return (
      <div style={styles.overlay}>
        <div style={{...styles.popup, ...popupStyle}}>
          <div style={styles.topBar}>
            <button onClick={onClose} style={styles.closeBtn}>
              <IoMdClose />
            </button>
          </div>
          <div style={styles.content}>
            <p style={styles.noDataMessage}>
              {appLabels.noDataAvailable || "No data available"}
            </p>
            <p style={styles.noDataMessage}>
              {appLabels.checkInternetConnection || "Check internet connection"}
            </p>
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
          {/* Header */}
          <div style={{
            ...styles.header,
            color: headerTextColor || fontColor || "#4a5568"
          }}>
            {headerText || appName}
          </div>

          {/* Main Exchange Rate Card */}
          <div style={styles.mainCard}>
            {/* Top Currency Info */}
            <div style={styles.topCurrencySection}>
              <div style={styles.currencyRow}>
                <span style={styles.flag}>{flags[baseCurrency] || '🏳️'}</span>
                <span style={styles.currencyText}>
                  {baseCurrency} ({appLabels[baseCurrency] || currencyNames[baseCurrency] || baseCurrency})
                </span>
              </div>
              
              {/* Rate Display Boxes */}
              <div style={styles.rateBoxes}>
                <div style={styles.rateBox}>0.078</div>
                <div style={styles.rateBox}>0.078</div>
              </div>
            </div>

            {/* Exchange Currency Section */}
            <div style={styles.exchangeCurrencySection}>
              <div style={styles.currencyRow}>
                <span style={styles.flag}>{flags[exchangeCurrency] || '🏳️'}</span>
                <span style={styles.mainExchangeText}>
                  1 {exchangeCurrency} ({appLabels[exchangeCurrency] || currencyNames[exchangeCurrency] || exchangeCurrency})
                </span>
              </div>
            </div>

            {/* Main Rate Display */}
            <div style={styles.mainRateSection}>
              <span style={styles.mainRate}>0.078</span>
              <span style={styles.rateUnit}>1.↓</span>
              <span style={styles.exchangeSymbol}>{baseCurrency}</span>
              <span style={styles.trendArrow}>🔻</span>
            </div>

            {/* Time Display */}
            <div style={styles.timeDisplay}>
              {formatTime(currentTime)} - {formatDate(currentTime)}
            </div>

            {/* Chart Area */}
            <div style={styles.chartArea}>
              {/* Simple chart representation */}
              <div style={styles.chartContainer}>
                <div style={styles.chartLine}>
                  <div style={styles.chartPoint1}>0.077</div>
                  <div style={styles.chartPoint2}>0.077</div>
                </div>
              </div>
              
              {/* Flag indicator */}
              <div style={styles.chartFlag}>
                <div style={styles.flagContainer}>
                  <div style={styles.flagRed}></div>
                  <div style={styles.flagBlack}></div>
                </div>
              </div>
            </div>

            {/* Variation Section */}
            <div style={styles.variationSection}>
              <div style={styles.variationItem}>
                <div style={styles.variationLabel}>
                  {appLabels.dailyVariation || "Daily Variation"}
                </div>
                <div style={styles.variationValue}>
                  <span style={styles.downArrow}>🔻</span>
                  <span style={styles.variationPercent}>-0%</span>
                </div>
              </div>
              
              <div style={styles.variationItem}>
                <div style={styles.variationLabel}>
                  {appLabels.weeklyVariation || "Weekly Variation"}
                </div>
                <div style={styles.variationValue}>
                  <span style={styles.upArrow}>🔺</span>
                  <span style={styles.variationPercent}>0.79%</span>
                </div>
              </div>
            </div>
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
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "400px",
  },
  mainCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    position: "relative",
  },
  topCurrencySection: {
    marginBottom: "20px",
  },
  currencyRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  flag: {
    fontSize: "20px",
    marginRight: "8px",
  },
  currencyText: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
  },
  rateBoxes: {
    position: "absolute",
    top: "25px",
    right: "25px",
    display: "flex",
    gap: "10px",
  },
  rateBox: {
    backgroundColor: "#f5f5f5",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    border: "1px solid #ddd",
  },
  exchangeCurrencySection: {
    marginBottom: "15px",
  },
  mainExchangeText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
  },
  mainRateSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    gap: "8px",
  },
  mainRate: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#333",
  },
  rateUnit: {
    fontSize: "24px",
    color: "#666",
    fontWeight: "500",
  },
  exchangeSymbol: {
    fontSize: "24px",
    color: "#666",
    fontWeight: "500",
  },
  trendArrow: {
    fontSize: "20px",
    marginLeft: "5px",
  },
  timeDisplay: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "20px",
  },
  chartArea: {
    position: "relative",
    height: "100px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer: {
    position: "relative",
    width: "80%",
    height: "60px",
  },
  chartLine: {
    position: "relative",
    width: "100%",
    height: "2px",
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartPoint1: {
    position: "absolute",
    left: "20%",
    top: "-15px",
    backgroundColor: "#f5f5f5",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    border: "1px solid #ddd",
  },
  chartPoint2: {
    position: "absolute",
    right: "20%",
    top: "-15px",
    backgroundColor: "#f5f5f5",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    border: "1px solid #ddd",
  },
  chartFlag: {
    position: "absolute",
    bottom: "10px",
    right: "20px",
  },
  flagContainer: {
    width: "30px",
    height: "20px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "2px",
    overflow: "hidden",
    border: "1px solid #ddd",
  },
  flagRed: {
    backgroundColor: "#ff0000",
    flex: 1,
  },
  flagBlack: {
    backgroundColor: "#000000",
    flex: 1,
  },
  variationSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  variationItem: {
    flex: 1,
  },
  variationLabel: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "5px",
    fontWeight: "500",
  },
  variationValue: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  downArrow: {
    color: "#ff4444",
    fontSize: "12px",
  },
  upArrow: {
    color: "#00aa44",
    fontSize: "12px",
  },
  variationPercent: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  noDataMessage: {
    fontSize: "18px",
    color: "#666",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default SingleExchangeRateChartOriginalPopUp;