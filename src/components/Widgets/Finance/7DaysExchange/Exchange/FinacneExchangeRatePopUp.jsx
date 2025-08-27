import React, { useEffect, useState } from "react";
import { Stage, Layer, Text, Rect, Group, Line, Circle } from "react-konva";
import { IoMdClose } from "react-icons/io";

const UNSUPPORTED_CURRENCIES = ['PKR', 'SAR', 'BHD', 'KWD', 'QAR'];

const MOCK_BASE_RATES = {
  'USD_PKR': 284.68,
  'USD_SAR': 3.75,
  'USD_BHD': 0.38,
  'USD_KWD': 0.31,
  'USD_QAR': 3.64,
};

function getMockBaseRate(base, target) {
  const key = `${base}_${target}`;
  if (MOCK_BASE_RATES[key]) return MOCK_BASE_RATES[key];
  const revKey = `${target}_${base}`;
  if (MOCK_BASE_RATES[revKey]) return 1 / MOCK_BASE_RATES[revKey];
  return 100;
}

function generateMockFinanceData(base, target) {
  const baseRate = getMockBaseRate(base, target);
  const chartData = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: baseRate + Math.sin(i) * (Math.random() * 2) + Math.random() * 1.5
  }));
  const today = chartData[6].value;
  const yesterday = chartData[5].value;
  const weekAgo = chartData[0].value;
  const dailyVar = yesterday ? (((today - yesterday) / yesterday) * 100).toFixed(2) : "0.00";
  const weeklyVar = weekAgo ? (((today - weekAgo) / weekAgo) * 100).toFixed(2) : "0.00";
  return {
    rate: today,
    dailyVar,
    weeklyVar,
    chartData,
    base,
    target,
    time: new Date(),
    isMock: true
  };
}

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

const FinacneExchangeRatePopUp = ({ 
  image, 
  onClose, 
  baseCurrency = "EUR", 
  exchangeCurrency = "USD",
  customBgColor = "",
  divisorColor = "",
  theme = "light",
  customFontColor = "",
  textFont = "Arial",
  appLabels = {
    exchangeRate: "Exchange rate",
    dailyVariation: "Daily Variation",
    weeklyVariation: "Weekly Variation"
  }
}) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgColor = customBgColor || (theme === "dark" ? "#333333" : "#e0f0e8");
  const fontColor = customFontColor || (theme === "dark" ? "#ffffff" : "#000000");
  const divColor = divisorColor || (theme === "dark" ? "#ffffff" : "#000000");
  const secondaryColor = theme === "dark" ? "#aaaaaa" : "#cccccc";
  const chartFillColor = "#a0d8e066"; // Light cyan fill to match image
  const chartLineColor = "#ffffff"; // White line to match image
  const chartPointColor = "#ffffff"; // White points

  // Fetch real-time and historical data
  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    setError(null);

    async function fetchData() {
      if (UNSUPPORTED_CURRENCIES.includes(baseCurrency) || UNSUPPORTED_CURRENCIES.includes(exchangeCurrency)) {
        const mock = generateMockFinanceData(baseCurrency, exchangeCurrency);
        if (!didCancel) {
          setApiData(mock);
          setLoading(false);
        }
        return;
      }

      try {
        // Fetch latest rate
        const latestRes = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}&to=${exchangeCurrency}`);
        const latestJson = await latestRes.json();
        
        if (!latestJson || !latestJson.rates || latestJson.rates[exchangeCurrency] === undefined) {
          throw new Error('Exchange rate data not available for selected currencies.');
        }

        const latestRate = latestJson.rates[exchangeCurrency];

        // Fetch last 7 days history
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 6);
        const startStr = start.toISOString().split('T')[0];
        const endStr = end.toISOString().split('T')[0];
        
        const histRes = await fetch(`https://api.frankfurter.app/${startStr}..${endStr}?from=${baseCurrency}&to=${exchangeCurrency}`);
        const histJson = await histRes.json();
        
        if (!histJson || !histJson.rates) {
          throw new Error('Exchange rate history not available for selected currencies.');
        }

        const rates = histJson.rates;
        const days = Object.keys(rates).sort();
        const today = rates[days[days.length - 1]] && rates[days[days.length - 1]][exchangeCurrency];
        const yesterday = rates[days[days.length - 2]] && rates[days[days.length - 2]][exchangeCurrency];
        const weekAgo = rates[days[0]] && rates[days[0]][exchangeCurrency];
        
        if (today === undefined) {
          throw new Error('No exchange rate data for today.');
        }

        const chartData = days.map(date => ({
          date,
          value: rates[date][exchangeCurrency],
        }));

        const dailyVar = yesterday ? (((today - yesterday) / yesterday) * 100).toFixed(2) : "0.00";
        const weeklyVar = weekAgo ? (((today - weekAgo) / weekAgo) * 100).toFixed(2) : "0.00";

        if (!didCancel) {
          setApiData({
            rate: today,
            dailyVar,
            weeklyVar,
            chartData,
            base: baseCurrency,
            target: exchangeCurrency,
            time: end,
          });
          setLoading(false);
        }
      } catch (e) {
        if (!didCancel) {
          setError(e.message || 'Failed to fetch exchange rates.');
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => { didCancel = true; };
  }, [baseCurrency, exchangeCurrency]);

  const renderExchangeRateWidget = () => {
    if (loading) {
      return (
        <Group>
          <Rect x={0} y={0} width={600} height={450} fill={bgColor} />
          <Text x={250} y={200} text="Loading..." fontSize={24} fill={fontColor} fontFamily={textFont} />
        </Group>
      );
    }

    if (error) {
      return (
        <Group>
          <Rect x={0} y={0} width={600} height={450} fill={bgColor} />
          <Text x={150} y={200} text={error} fontSize={18} fill={fontColor} fontFamily={textFont} width={300} align="center" />
        </Group>
      );
    }

    if (!apiData) return null;

    const data = apiData;
    const chartWidth = 250;
    const chartHeight = 230; // Full height to match image
    const chartX = 300; // Shifted further right for left text column
    const chartY = 160; // Started higher to span full height
    const numYLabels = 11; // More labels for finer grid to match image

    // Chart Y axis range
    const minY = Math.min(...data.chartData.map(d => d.value));
    const maxY = Math.max(...data.chartData.map(d => d.value));
    const yRange = maxY - minY || 1;
    const yStep = yRange / (numYLabels - 1);

    // Y labels from max to min
    const yLabels = Array.from({ length: numYLabels }, (_, i) => (maxY - i * yStep).toFixed(3));

    // Chart points
    const points = data.chartData.map((point, i) => {
      const x = chartX + (i * chartWidth / (data.chartData.length - 1));
      const y = chartY + chartHeight - ((point.value - minY) / yRange) * chartHeight;
      return { x, y, label: point.date, value: point.value };
    });

    // Date and time
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
    const dateString = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    const rateSymbol = data.target === "USD" ? "US$" : (currencySymbols[data.target] || data.target);
    const rateText = `${rateSymbol}${data.rate.toFixed(3)}`;

    const dailyVarColor = parseFloat(data.dailyVar) >= 0 ? '#27ae60' : '#e74c3c';
    const weeklyVarColor = parseFloat(data.weeklyVar) >= 0 ? '#27ae60' : '#e74c3c';

    return (
      <Group>
        <Rect x={0} y={0} width={600} height={450} fill={bgColor} />
        
        {/* Exchange Rate Label */}
        <Text x={20} y={10} text={appLabels.exchangeRate || "Exchange rate"} fontSize={16} fill={fontColor} fontFamily={textFont} />
        
        {/* Base Currency */}
        <Text x={20} y={30} text={data.base} fontSize={32} fill={fontColor} fontFamily={textFont} fontStyle="bold" />
        
        {/* Rate */}
        <Text x={20} y={60} text={rateText} fontSize={48} fill={fontColor} fontFamily={textFont} />
        
        {/* Divider Line */}
        <Line points={[0, 120, 600, 120]} stroke={divColor} strokeWidth={2} />
        
        {/* Variations */}
        <Text x={20} y={140} text={appLabels.dailyVariation || "Daily Variation"} fontSize={16} fill={fontColor} fontFamily={textFont} />
        <Text x={20} y={160} text={`${data.dailyVar}%`} fontSize={16} fill={dailyVarColor} fontFamily={textFont} />
        
        <Text x={20} y={190} text={appLabels.weeklyVariation || "Weekly Variation"} fontSize={16} fill={fontColor} fontFamily={textFont} />
        <Text x={20} y={210} text={`${data.weeklyVar}%`} fontSize={16} fill={weeklyVarColor} fontFamily={textFont} />
        
        {/* Time */}
        <Text x={20} y={250} text={timeString} fontSize={20} fill={fontColor} fontFamily={textFont} fontStyle="bold" />
        <Text x={20} y={275} text={dateString} fontSize={16} fill={fontColor} fontFamily={textFont} />
        
        {/* Chart legend */}
        <Rect x={chartX + chartWidth - 150} y={chartY - 20} width={12} height={12} fill={chartFillColor} />
        <Text x={chartX + chartWidth - 130} y={chartY - 20} text="Exchange rate - $" fontSize={12} fill={secondaryColor} fontFamily={textFont} />
        
        {/* Horizontal grid lines and Y axis labels (on right) */}
        {yLabels.map((yVal, i) => {
          const yPos = chartY + (i * chartHeight / (numYLabels - 1));
          return (
            <Group key={i}>
              <Line points={[chartX, yPos, chartX + chartWidth, yPos]} stroke={secondaryColor} strokeWidth={1} />
              <Text x={chartX + chartWidth + 5} y={yPos - 6} text={yVal} fontSize={10} fill={secondaryColor} align="left" fontFamily={textFont} />
            </Group>
          );
        })}
        
        {/* Vertical grid lines */}
        {points.map((pt, i) => (
          <Line key={i} points={[pt.x, chartY, pt.x, chartY + chartHeight]} stroke={secondaryColor} strokeWidth={1} />
        ))}
        
        {/* X axis labels */}
        {points.map((pt, i) => (
          <Text key={i} x={pt.x - 20} y={chartY + chartHeight + 5} text={new Date(pt.label).toLocaleString('en-US', { month: 'short', day: 'numeric' })} fontSize={10} fill={secondaryColor} fontFamily={textFont} />
        ))}
        
        {/* Chart area fill */}
        <Line points={[points[0].x, chartY + chartHeight, ...points.flatMap(pt => [pt.x, pt.y]), points[points.length - 1].x, chartY + chartHeight]} fill={chartFillColor} closed />
        
        {/* Chart line */}
        <Line points={points.flatMap(pt => [pt.x, pt.y])} stroke={chartLineColor} strokeWidth={2} lineJoin="round" tension={0.3} />
        
        {/* Chart points */}
        {points.map((pt, i) => (
          <Circle key={i} x={pt.x} y={pt.y} radius={3} fill={chartPointColor} />
        ))}
        
        {/* Mock data indicator */}
        {data.isMock && (
          <Text x={chartX + chartWidth - 80} y={chartY + chartHeight - 20} text="Mock Data" fontSize={12} fill="#e67e22" fontFamily={textFont} />
        )}
      </Group>
    );
  };

  if (!image) return null;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.popup, width: "600px" }}>
        {/* Top bar like browser tab */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Konva stage for exchange rate visualization */}
        <div style={styles.stageContainer}>
          <Stage width={600} height={450}>
            <Layer>
              {renderExchangeRateWidget()}
            </Layer>
          </Stage>
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
    width: "600px",
    background: "#fff",
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
  stageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
};

export default FinacneExchangeRatePopUp;