import React, { useState, useEffect } from "react";
import WeatherrPopUp from "./WeatherrPopUp";

function WeatherrLanguageForm({ card, onSwitchToSettings, appName, forecastLocation, backgroundColor, textColor, backgroundImage, textFont, language, setLanguage, languageLabels, setLanguageLabels }) {
    // Language-specific fields only - now using shared state
    const [showPopup, setShowPopup] = useState(false);
    
    // App Labels for weather terms - using shared state
    const [nowLabel, setNowLabel] = useState(languageLabels.now);
    const [informationNotAvailableLabel, setInformationNotAvailableLabel] = useState(languageLabels.informationNotAvailable);
    const [mondayLabel, setMondayLabel] = useState(languageLabels.monday);
    const [tuesdayLabel, setTuesdayLabel] = useState(languageLabels.tuesday);
    const [wednesdayLabel, setWednesdayLabel] = useState(languageLabels.wednesday);
    const [thursdayLabel, setThursdayLabel] = useState(languageLabels.thursday);
    const [fridayLabel, setFridayLabel] = useState(languageLabels.friday);
    const [saturdayLabel, setSaturdayLabel] = useState(languageLabels.saturday);
    const [sundayLabel, setSundayLabel] = useState(languageLabels.sunday);
    const [todayLabel, setTodayLabel] = useState(languageLabels.today);
    const [tomorrowLabel, setTomorrowLabel] = useState(languageLabels.tomorrow);
    const [highLabel, setHighLabel] = useState(languageLabels.high);
    const [lowLabel, setLowLabel] = useState(languageLabels.low);
    const [feelsLikeLabel, setFeelsLikeLabel] = useState(languageLabels.feelsLike);
    const [humidityLabel, setHumidityLabel] = useState(languageLabels.humidity);
    const [windLabel, setWindLabel] = useState(languageLabels.wind);
    const [pressureLabel, setPressureLabel] = useState(languageLabels.pressure);
    const [visibilityLabel, setVisibilityLabel] = useState(languageLabels.visibility);
    const [uvIndexLabel, setUvIndexLabel] = useState(languageLabels.uvIndex);

    // Sync local state with shared language labels
    useEffect(() => {
        setNowLabel(languageLabels.now);
        setInformationNotAvailableLabel(languageLabels.informationNotAvailable);
        setMondayLabel(languageLabels.monday);
        setTuesdayLabel(languageLabels.tuesday);
        setWednesdayLabel(languageLabels.wednesday);
        setThursdayLabel(languageLabels.thursday);
        setFridayLabel(languageLabels.friday);
        setSaturdayLabel(languageLabels.saturday);
        setSundayLabel(languageLabels.sunday);
        setTodayLabel(languageLabels.today);
        setTomorrowLabel(languageLabels.tomorrow);
        setHighLabel(languageLabels.high);
        setLowLabel(languageLabels.low);
        setFeelsLikeLabel(languageLabels.feelsLike);
        setHumidityLabel(languageLabels.humidity);
        setWindLabel(languageLabels.wind);
        setPressureLabel(languageLabels.pressure);
        setVisibilityLabel(languageLabels.visibility);
        setUvIndexLabel(languageLabels.uvIndex);
    }, [languageLabels]);

    // Language options
    const languageOptions = [
        "English",
        "Spanish", 
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Russian",
        "Chinese",
        "Japanese",
        "Korean",
        "Arabic",
        "Hindi"
    ];

    // Handle language change and auto-translate labels
    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        
        // Auto-translate labels based on selected language
        if (selectedLanguage === "Chinese") {
            setLanguageLabels({
                now: "现在",
                informationNotAvailable: "信息不可用",
                monday: "周一",
                tuesday: "周二",
                wednesday: "周三",
                thursday: "周四",
                friday: "周五",
                saturday: "周六",
                sunday: "周日",
                today: "今天",
                tomorrow: "明天",
                high: "高温",
                low: "低温",
                feelsLike: "体感",
                humidity: "湿度",
                wind: "风速",
                pressure: "气压",
                visibility: "能见度",
                uvIndex: "紫外线指数"
            });
        } else if (selectedLanguage === "Spanish") {
            setLanguageLabels({
                now: "ahora",
                informationNotAvailable: "Información no disponible",
                monday: "Lun",
                tuesday: "Mar",
                wednesday: "Mié",
                thursday: "Jue",
                friday: "Vie",
                saturday: "Sáb",
                sunday: "Dom",
                today: "Hoy",
                tomorrow: "Mañana",
                high: "Máx",
                low: "Mín",
                feelsLike: "Sensación",
                humidity: "Humedad",
                wind: "Viento",
                pressure: "Presión",
                visibility: "Visibilidad",
                uvIndex: "Índice UV"
            });
        } else {
            // Reset to English defaults
            setLanguageLabels({
                now: "now",
                informationNotAvailable: "Information not available.",
                monday: "Mon",
                tuesday: "Tue",
                wednesday: "Wed",
                thursday: "Thu",
                friday: "Fri",
                saturday: "Sat",
                sunday: "Sun",
                today: "Today",
                tomorrow: "Tomorrow",
                high: "High",
                low: "Low",
                feelsLike: "Feels like",
                humidity: "Humidity",
                wind: "Wind",
                pressure: "Pressure",
                visibility: "Visibility",
                uvIndex: "UV Index"
            });
        }
    };

    const handlePreview = () => {
        // Validate required fields from settings
        if (!appName.trim()) {
            alert("Please enter an app name in Settings first.");
            return;
        }
        if (!forecastLocation.trim()) {
            alert("Please enter a forecast location in Settings first.");
            return;
        }
        setShowPopup(true);
    };

    const handleSave = () => {
        console.log({
            appName,
            forecastLocation,
            language,
            labels: {
                now: nowLabel,
                informationNotAvailable: informationNotAvailableLabel,
                monday: mondayLabel,
                tuesday: tuesdayLabel,
                wednesday: wednesdayLabel,
                thursday: thursdayLabel,
                friday: fridayLabel,
                saturday: saturdayLabel,
                sunday: sundayLabel,
                today: todayLabel,
                tomorrow: tomorrowLabel,
                high: highLabel,
                low: lowLabel,
                feelsLike: feelsLikeLabel,
                humidity: humidityLabel,
                wind: windLabel,
                pressure: pressureLabel,
                visibility: visibilityLabel,
                uvIndex: uvIndexLabel
            }
        });
        alert("Language settings saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Modern Weather Forecast"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Modern Weather Forecast"} style={styles.image} />}
                <p>Configure language settings and customize weather-related labels for the forecast widget.</p>
            </div>

            {/* Right Portion */}
            <div style={styles.right}>
                <div style={styles.topButtons}>
                    <button
                        style={styles.settingsButton}
                        onClick={() => onSwitchToSettings()}
                    >
                        Settings
                    </button>
                    <button
                        style={styles.languageButton}
                    >
                        Language
                    </button>
                </div>

                <div style={styles.tabContent}>
                    <div>
                        {/* Language Selection */}
                        <div style={styles.field}>
                            <label>Language</label>
                            <select
                                value={language}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                                style={styles.input}
                            >
                                {languageOptions.map((lang, index) => (
                                    <option key={index} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                            <p style={styles.helpText}>
                                Changing the language will affect any text displayed on the app as well as 
                                how dates and numbers are formatted.
                            </p>
                        </div>

                        {/* App Labels Section */}
                        <div style={styles.sectionHeader}>
                            <h3>App Labels</h3>
                            <p style={styles.helpText}>
                                These labels will be displayed in the app. You can choose to override them if 
                                the default translation shown below does not fit your needs.
                            </p>
                        </div>

                        {/* Now Label */}
                        <div style={styles.field}>
                            <label style={styles.labelWithDefault}>now</label>
                            <input
                                type="text"
                                value={nowLabel}
                                onChange={(e) => setNowLabel(e.target.value)}
                                placeholder="now"
                                style={styles.input} />
                        </div>

                        {/* Information not available */}
                        <div style={styles.field}>
                            <label style={styles.labelWithDefault}>Information not available.</label>
                            <input
                                type="text"
                                value={informationNotAvailableLabel}
                                onChange={(e) => setInformationNotAvailableLabel(e.target.value)}
                                placeholder="Information not available."
                                style={styles.input} />
                        </div>

                        {/* Day Labels */}
                        <div style={styles.field}>
                            <label style={styles.labelWithDefault}>Mon</label>
                            <input
                                type="text"
                                value={mondayLabel}
                                onChange={(e) => setMondayLabel(e.target.value)}
                                placeholder="Mon"
                                style={styles.input} />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.labelWithDefault}>Tue</label>
                            <input
                                type="text"
                                value={tuesdayLabel}
                                onChange={(e) => setTuesdayLabel(e.target.value)}
                                placeholder="Tue"
                                style={styles.input} />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.labelWithDefault}>Wed</label>
                            <input
                                type="text"
                                value={wednesdayLabel}
                                onChange={(e) => setWednesdayLabel(e.target.value)}
                                placeholder="Wed"
                                style={styles.input} />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.labelWithDefault}>Thu</label>
                            <input
                                type="text"
                                value={thursdayLabel}
                                onChange={(e) => setThursdayLabel(e.target.value)}
                                placeholder="Thu"
                                style={styles.input} />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.labelWithDefault}>Fri</label>
                            <input
                                type="text"
                                value={fridayLabel}
                                onChange={(e) => setFridayLabel(e.target.value)}
                                placeholder="Fri"
                                style={styles.input} />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.labelWithDefault}>Sat</label>
                            <input
                                type="text"
                                value={saturdayLabel}
                                onChange={(e) => setSaturdayLabel(e.target.value)}
                                placeholder="Sat"
                                style={styles.input} />
                        </div>

                    

                        
                    </div>
                </div>

                {/* Buttons at bottom */}
                <div style={styles.bottomButtons}>
                    <button onClick={handlePreview} style={styles.previewBtn}>Preview</button>
                    <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                </div>

                {/* Preview Popup */}
                {showPopup && (
                    <WeatherrPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        forecastLocation={forecastLocation}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        backgroundImage={backgroundImage}
                        textFont={textFont}
                        language={language}
                        labels={{
                            now: nowLabel,
                            informationNotAvailable: informationNotAvailableLabel,
                            monday: mondayLabel,
                            tuesday: tuesdayLabel,
                            wednesday: wednesdayLabel,
                            thursday: thursdayLabel,
                            friday: fridayLabel,
                            saturday: saturdayLabel,
                            sunday: sundayLabel,
                            
                        }} />
                )}
            </div>
        </div>
    );
}

const styles = {
  container: {
    display: "flex",
    width: "96%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "1px",
    position: "relative",
  },
  left: {
    flex: 0.35,
    borderRight: "3px solid #ddd",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    overflowY: "auto",
  },
  right: {
    flex: 0.65,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  tabContent: { flex: 1, overflowY: "auto" },
  field: { display: "flex", flexDirection: "column", marginBottom: "15px" },
  input: { 
    padding: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc",
    fontSize: "14px",
    marginTop: "5px"
  },
  optional: {
    color: "#666",
    fontWeight: "normal",
    fontSize: "14px"
  },
  helpText: {
    color: "#666",
    fontSize: "12px",
    marginTop: "5px",
    lineHeight: "1.4"
  },
  sectionHeader: {
    marginBottom: "20px",
    marginTop: "20px"
  },
  labelWithDefault: {
    backgroundColor: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: "3px",
    fontSize: "12px",
    fontFamily: "monospace",
    color: "#333",
    marginBottom: "5px",
    display: "inline-block"
  },
  bottomButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "1px solid #eee",
  },
  saveBtn: {
    padding: "8px 16px",
    backgroundColor: "#ff8c00",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
  previewBtn: {
    padding: "8px 16px",
    backgroundColor: "#007acc",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
  tag: {
    padding: "2px 5px",
    backgroundColor: "#ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  removeTag: {
    marginLeft: "5px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    cursor: "pointer",
    lineHeight: "16px",
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#ff0000",
    fontSize: "12px",
    marginTop: "5px",
    padding: "5px 8px",
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeaa7",
    borderRadius: "4px",
  },
  errorIcon: {
    color: "#ff6b35",
    fontWeight: "bold",
  },
  backButton: {
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    marginBottom: "15px"
  },
  topButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ddd"
  },
  settingsButton: {
    padding: "8px 16px",
    backgroundColor: "#ddd",
    color: "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
  languageButton: {
    padding: "8px 16px",
    backgroundColor: "#007acc",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default WeatherrLanguageForm;