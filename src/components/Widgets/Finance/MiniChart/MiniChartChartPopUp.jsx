/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const MiniChartPopUp = ({ 
  onClose,
  appName = "Mini Chart",
  tags = [],
  symbol = "FX:EURUSD",
  dateRange = "1 Day",
  theme = "Light",
  transparentBackground = false,
  priceLineColor = "#2962FF",
  underLineAreaTopColor = "#2962FF",
  underLineAreaBottomColor = "#E3F2FD",
  locale = "en"
}) => {
  const [chartData, setChartData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [timeLabels, setTimeLabels] = useState([]);

  // Generate realistic chart data based on date range
  const generateChartData = () => {
    let dataPoints = [];
    let labels = [];
    let basePrice = 0.093; // Starting price
    let numPoints = 0;
    
    // Determine number of data points and time format based on date range
    switch(dateRange) {
      case "1 Day":
        numPoints = 24; // Hourly data
        for(let i = 0; i < numPoints; i++) {
          const hour = 17 + (i * 6 / numPoints); // From 17:00 to 23:00
          labels.push(`${Math.floor(hour)}:${(hour % 1 * 60).toFixed(0).padStart(2, '0')}`);
        }
        break;
      case "1 Month":
        numPoints = 30; // Daily data
        for(let i = 0; i < numPoints; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (numPoints - i));
          labels.push(`${date.getDate()}/${date.getMonth() + 1}`);
        }
        break;
      case "1 Year":
        { numPoints = 12; // Monthly data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for(let i = 0; i < numPoints; i++) {
          labels.push(months[i]);
        }
        break; }
      case "5 years":
        { numPoints = 5; // Yearly data
        const currentYear = new Date().getFullYear();
        for(let i = 0; i < numPoints; i++) {
          labels.push((currentYear - numPoints + i + 1).toString());
        }
        break; }
      case "All":
        numPoints = 20; // Sample long-term data
        for(let i = 0; i < numPoints; i++) {
          const year = 2004 + i;
          labels.push(year.toString());
        }
        break;
      default:
        numPoints = 24;
    }
    
    // Generate price data with realistic fluctuations
    let currentVal = basePrice;
    for(let i = 0; i < numPoints; i++) {
      // Add some realistic price movement
      const change = (Math.random() - 0.5) * 0.002; // Small price changes
      currentVal += change;
      currentVal = Math.max(0.08, Math.min(0.11, currentVal)); // Keep within reasonable bounds
      dataPoints.push(currentVal);
    }
    
    // Calculate price changes
    const startPrice = dataPoints[0];
    const endPrice = dataPoints[dataPoints.length - 1];
    const change = endPrice - startPrice;
    const percentChg = (change / startPrice) * 100;
    
    setChartData(dataPoints);
    setTimeLabels(labels);
    setCurrentPrice(endPrice);
    setPriceChange(change);
    setPercentChange(percentChg);
  };

  useEffect(() => {
    generateChartData();
  }, [dateRange, symbol]);

  const popupStyle = {
    backgroundColor: transparentBackground ? "transparent" : (theme === "Dark" ? "#1e222d" : "#ffffff"),
    color: theme === "Dark" ? "#d1d4dc" : "#131722",
    width: "100%",
    height: "100%"
  };

  const formatPrice = (price) => {
    return price.toFixed(3);
  };

  const formatChange = (change, percent) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}% (${sign}${change.toFixed(3)})`;
  };

  // Generate SVG path for the chart
  const generatePath = () => {
    if (chartData.length === 0) return "";
    
    const width = 800;
    const height = 300;
    const padding = 40;
    
    const minPrice = Math.min(...chartData);
    const maxPrice = Math.max(...chartData);
    const priceRange = maxPrice - minPrice || 0.001; // Avoid division by zero
    
    let path = "";
    chartData.forEach((price, index) => {
      const x = padding + (index * (width - 2 * padding)) / (chartData.length - 1);
      const y = height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding);
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };

  // Generate area path for under-line fill
  const generateAreaPath = () => {
    if (chartData.length === 0) return "";
    
    const width = 800;
    const height = 300;
    const padding = 40;
    
    const minPrice = Math.min(...chartData);
    const maxPrice = Math.max(...chartData);
    const priceRange = maxPrice - minPrice || 0.001;
    
    let path = "";
    
    // Start from bottom-left
    const startX = padding;
    const startY = height - padding;
    path += `M ${startX} ${startY}`;
    
    // Draw line following the data
    chartData.forEach((price, index) => {
      const x = padding + (index * (width - 2 * padding)) / (chartData.length - 1);
      const y = height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding);
      path += ` L ${x} ${y}`;
    });
    
    // Close the path to bottom-right
    const endX = padding + (width - 2 * padding);
    path += ` L ${endX} ${startY} Z`;
    
    return path;
  };

  return (
    <div style={styles.overlay}>
      <div style={{...styles.popup, ...popupStyle}}>
        <div style={{
          ...styles.topBar,
          backgroundColor: theme === "Dark" ? "#2a2e39" : "#f1f3f6"
        }}>
          <button onClick={onClose} style={{
            ...styles.closeBtn,
            color: theme === "Dark" ? "#d1d4dc" : "#131722"
          }}>
            <IoMdClose />
          </button>
        </div>
        
        <div style={styles.content}>
          {/* Symbol and Company Info */}
          <div style={styles.symbolInfo}>
            <div style={styles.symbolHeader}>
              <span style={styles.symbolCode}>{symbol.split(':')[1] || symbol}</span>
              <span style={styles.symbolBadge}>D</span>
            </div>
            <div style={styles.companyName}>
              {symbol === "FX:EURUSD" ? "EUROPEAN LITHIUM LIMITED" : 
               symbol.includes("EUR") ? "Euro Exchange Rate" : 
               "Financial Instrument"}
            </div>
          </div>

          {/* Price Info */}
          <div style={styles.priceInfo}>
            <span style={styles.currentPrice}>{formatPrice(currentPrice)}</span>
            <span style={{
              ...styles.priceChange,
              color: priceChange >= 0 ? '#4caf50' : '#f44336'
            }}>
              {formatChange(priceChange, percentChange)}
            </span>
          </div>

          {/* Chart Container */}
          <div style={styles.chartContainer}>
            <svg width="100%" height="400" style={styles.svg}>
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{
                    stopColor: underLineAreaTopColor || priceLineColor || '#2962FF', 
                    stopOpacity: 0.3
                  }} />
                  <stop offset="100%" style={{
                    stopColor: underLineAreaBottomColor || '#E3F2FD', 
                    stopOpacity: 0.1
                  }} />
                </linearGradient>
              </defs>
              
              {/* Chart Area Fill */}
              <path
                d={generateAreaPath()}
                fill="url(#areaGradient)"
              />
              
              {/* Chart Line */}
              <path
                d={generatePath()}
                fill="none"
                stroke={priceLineColor || '#2962FF'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Time Labels */}
          <div style={styles.timeLabels}>
            {timeLabels.map((label, index) => {
              // Show only some labels to avoid crowding
              const shouldShow = index === 0 || 
                               index === Math.floor(timeLabels.length / 4) ||
                               index === Math.floor(timeLabels.length / 2) ||
                               index === Math.floor(3 * timeLabels.length / 4) ||
                               index === timeLabels.length - 1;
              
              return shouldShow ? (
                <span key={index} style={styles.timeLabel}>
                  {label}
                </span>
              ) : null;
            })}
          </div>

          {/* Attribution */}
          <div style={styles.attribution}>
            <span style={styles.attributionText}>
              {symbol.split(':')[1] || symbol} Rates 
            </span>
            <span style={styles.attributionBy}>by TradingView</span>
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
    padding: "8px 15px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid #e0e3eb",
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
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },
  symbolInfo: {
    marginBottom: "1px",
  },
  symbolHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "5px",
  },
  symbolCode: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#131722",
  },
  symbolBadge: {
    backgroundColor: "#ff9800",
    color: "white",
    padding: "2px 6px",
    borderRadius: "3px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  companyName: {
    fontSize: "14px",
    color: "#787b86",
    marginBottom: "10px",
  },
  priceInfo: {
    display: "flex",
    alignItems: "baseline",
    gap: "15px",
    marginBottom: "2px",
  },
  currentPrice: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#131722",
  },
  priceChange: {
    fontSize: "16px",
    fontWeight: "500",
  },
  chartContainer: {
flex: "0 0 auto",       
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "5px",    
  height: "340px",      },
  svg: {
    maxWidth: "100%",
    height: "100%",
  },
  timeLabels: {
  display: "flex",
  justifyContent: "space-between",
  padding: "0 20px",      
  marginBottom: "10px",    
  flex: "0 0 auto",      },
  timeLabel: {
    fontSize: "12px",
    color: "#787b86",
  },
  attribution: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    marginTop: "0px",
  },
  attributionText: {
    fontSize: "14px",
    color: "#2962FF",
    fontWeight: "500",
  },
  attributionBy: {
    fontSize: "14px",
    color: "#787b86",
  },
};

export default MiniChartPopUp;