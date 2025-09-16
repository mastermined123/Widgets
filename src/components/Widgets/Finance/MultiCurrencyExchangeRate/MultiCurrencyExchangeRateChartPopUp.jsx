/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const getMockExchangeRate = (currency) => {  return {
    value: (Math.random() * 5).toFixed(2),
    change: (Math.random() * 4 - 2).toFixed(2),
  };
};

function MultiCurrencyExchangeRateChartPopUp({
  onClose,
  appName,
  tags,
  baseCurrency,
  exchangeCurrencies = [],
  showEachCurrencyFor = 2,
  language,
  theme,
  customFontColor,
  customBackgroundColor,
  customBackgroundImage,
  currencyOptions,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rates, setRates] = useState({});

  // Load mock exchange data
  useEffect(() => {
    const newRates = {};
    exchangeCurrencies.forEach((cur) => {
      newRates[cur] = getMockExchangeRate(cur);
    });
    setRates(newRates);
  }, [exchangeCurrencies]);

  // Rotation effect
  useEffect(() => {
    if (!exchangeCurrencies.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % exchangeCurrencies.length);
    }, (showEachCurrencyFor || 2) * 1000);

    return () => clearInterval(interval);
  }, [exchangeCurrencies, showEachCurrencyFor]);

  const getCurrencySign = (code) => {
  const currency = currencyOptions.find((c) => c.code === code);
  return currency ? currency.sign : code;
};

  if (!exchangeCurrencies.length) {
    return (
      <div style={styles.overlay}>
        <div style={styles.popup}>
          <button style={styles.closeBtn} onClick={onClose}>
            <IoMdClose size={20} />
          </button>
          <p>No exchange currencies selected</p>
        </div>
      </div>
    );
  }

  const currentCurrency = exchangeCurrencies[currentIndex];
  const rateData = rates[currentCurrency] || { value: "0.00", change: "0.00" };
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
        <button style={styles.closeBtn} onClick={onClose}>
          <IoMdClose size={20} />
        </button>

        <div style={styles.content}>
          {/* Currency Code */}
          <span style={styles.currencyCode}>{currentCurrency}</span>


          {/* Value */}

<span style={styles.value}>
  <span style={{ fontSize: "42px", color: "#555" }}>
    {getCurrencySign(baseCurrency)}
  </span>{" "}
  {rateData.value}
</span>

          {/* % Change */}
          <span
            style={{
              ...styles.change,
              color: isPositive ? "limegreen" : "red",
            }}
          >
            {isPositive ? "▲" : "▼"} {rateData.change}%
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
    height:"90%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "180px",
  },
  currencyCode: {
    fontSize: "70px",
    fontWeight: "bold",
  },
  value: {
    fontSize: "70px",
    fontWeight: "bold",
  },
  change: {
    fontSize: "70px",
    fontWeight: "bold",
  },
};

export default MultiCurrencyExchangeRateChartPopUp;
