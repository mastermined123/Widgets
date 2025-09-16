/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const getMockExchangeRate = () => {
  return {
    value: (Math.random() * 2 + 1).toFixed(2), // 1.00 - 3.00
    change: (Math.random() * 2 - 1).toFixed(2), // -1.00% to +1.00%
  };
};

function SingleExchangeRateChartPopUp({
  onClose,
  appName,
  tags,
  baseCurrency,
  exchangeCurrency,
  language,
  theme,
  customFontColor,
  customBackgroundColor,
  customBackgroundImage,
  currencyOptions,
}) {
  const [rateData, setRateData] = useState({ value: "0.00", change: "0.00" });

  // Load mock exchange rate for selected currency
  useEffect(() => {
    if (exchangeCurrency) {
      setRateData(getMockExchangeRate());
    }
  }, [exchangeCurrency]);

  const getCurrencySign = (code) => {
    const currency = currencyOptions?.find((c) => c.code === code);
    return currency ? currency.sign : code;
  };

  if (!exchangeCurrency || !baseCurrency) {
    return (
      <div style={styles.overlay}>
        <div style={styles.popup}>
          <button style={styles.closeBtn} onClick={onClose}>
            <IoMdClose size={20} />
          </button>
          <p>Please select both base and exchange currency</p>
        </div>
      </div>
    );
  }

  const isPositive = parseFloat(rateData.change) >= 0;

  return (
    <div style={styles.overlay}>
      <div
        style={{
          ...styles.popup,
          color: customFontColor || "#000",
          backgroundColor: customBackgroundColor || "#fff",
          backgroundImage: customBackgroundImage
            ? `url(${customBackgroundImage})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Close Button */}
        <button style={styles.closeBtn} onClick={onClose}>
          <IoMdClose size={20} />
        </button>

        {/* Top-left Section */}
        <div style={styles.topLeft}>
          <span style={styles.label}>Exchange Rate</span>
          <span style={styles.currencyCode}>{exchangeCurrency}</span>
          <span
            style={{
              ...styles.change,
              color: isPositive ? "limegreen" : "red",
            }}
          >
            {isPositive ? "▲" : "▼"} {rateData.change} %
          </span>
        </div>

        {/* Bottom-right Section */}
        <div style={styles.bottomRight}>
          <span style={styles.value}>
            {getCurrencySign(baseCurrency)} {rateData.value}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  popup: {
    position: "relative",
    width: "100%",
    height: "90%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  topLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "15px",
  },
  bottomRight: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
  },
  label: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#888",
  },
  currencyCode: {
    fontSize: "90px",
    fontWeight: "bold",
  },
  change: {
    fontSize: "45px",
    fontWeight: "bold",
  },
  value: {
    fontSize: "90px",
    fontWeight: "bold",
  },
};

export default SingleExchangeRateChartPopUp;
