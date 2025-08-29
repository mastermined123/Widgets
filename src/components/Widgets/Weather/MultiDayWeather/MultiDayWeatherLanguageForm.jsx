import React, { useState, useEffect } from "react";
import MultiDayWeatherPopUp from "./MultiDayWeatherPopUp";

function MultiDayWeatherLanguageForm({ card, onSwitchToSettings, appName, forecastLocation, backgroundColor, textColor, backgroundImage, textFont, language, setLanguage, languageLabels, setLanguageLabels }) {
    const [showPopup, setShowPopup] = useState(false);
    
    // App Labels for weather terms - using shared state
    const [nowLabel, setNowLabel] = useState(languageLabels.now || "now");
    const [mondayLabel, setMondayLabel] = useState(languageLabels.monday || "Mon");
    const [tuesdayLabel, setTuesdayLabel] = useState(languageLabels.tuesday || "Tue");
    const [wednesdayLabel, setWednesdayLabel] = useState(languageLabels.wednesday || "Wed");
    const [thursdayLabel, setThursdayLabel] = useState(languageLabels.thursday || "Thu");
    const [fridayLabel, setFridayLabel] = useState(languageLabels.friday || "Fri");
    const [saturdayLabel, setSaturdayLabel] = useState(languageLabels.saturday || "Sat");
    const [sundayLabel, setSundayLabel] = useState(languageLabels.sunday || "Sun");
    const [todayLabel, setTodayLabel] = useState(languageLabels.today || "Today");
    const [tomorrowLabel, setTomorrowLabel] = useState(languageLabels.tomorrow || "Tomorrow");

    // Sync local state with shared language labels
    useEffect(() => {
        setNowLabel(languageLabels.now || "now");
        setMondayLabel(languageLabels.monday || "Mon");
        setTuesdayLabel(languageLabels.tuesday || "Tue");
        setWednesdayLabel(languageLabels.wednesday || "Wed");
        setThursdayLabel(languageLabels.thursday || "Thu");
        setFridayLabel(languageLabels.friday || "Fri");
        setSaturdayLabel(languageLabels.saturday || "Sat");
        setSundayLabel(languageLabels.sunday || "Sun");
        setTodayLabel(languageLabels.today || "Today");
        setTomorrowLabel(languageLabels.tomorrow || "Tomorrow");
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
                monday: "周一",
                tuesday: "周二",
                wednesday: "周三",
                thursday: "周四",
                friday: "周五",
                saturday: "周六",
                sunday: "周日",
                today: "今天",
                tomorrow: "明天"
            });
        } else if (selectedLanguage === "Spanish") {
            setLanguageLabels({
                now: "ahora",
                monday: "Lun",
                tuesday: "Mar",
                wednesday: "Mié",
                thursday: "Jue",
                friday: "Vie",
                saturday: "Sáb",
                sunday: "Dom",
                today: "Hoy",
                tomorrow: "Mañana"
            });
        } else if (selectedLanguage === "French") {
            setLanguageLabels({
                now: "maintenant",
                monday: "Lun",
                tuesday: "Mar",
                wednesday: "Mer",
                thursday: "Jeu",
                friday: "Ven",
                saturday: "Sam",
                sunday: "Dim",
                today: "Aujourd'hui",
                tomorrow: "Demain"
            });
        } else if (selectedLanguage === "German") {
            setLanguageLabels({
                now: "jetzt",
                monday: "Mo",
                tuesday: "Di",
                wednesday: "Mi",
                thursday: "Do",
                friday: "Fr",
                saturday: "Sa",
                sunday: "So",
                today: "Heute",
                tomorrow: "Morgen"
            });
        } else if (selectedLanguage === "Italian") {
            setLanguageLabels({
                now: "ora",
                monday: "Lun",
                tuesday: "Mar",
                wednesday: "Mer",
                thursday: "Gio",
                friday: "Ven",
                saturday: "Sab",
                sunday: "Dom",
                today: "Oggi",
                tomorrow: "Domani"
            });
        } else {
            // Reset to English defaults
            setLanguageLabels({
                now: "now",
                monday: "Mon",
                tuesday: "Tue",
                wednesday: "Wed",
                thursday: "Thu",
                friday: "Fri",
                saturday: "Sat",
                sunday: "Sun",
                today: "Today",
                tomorrow: "Tomorrow"
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
        // Update the shared language labels with current local state
        setLanguageLabels({
            now: nowLabel,
            monday: mondayLabel,
            tuesday: tuesdayLabel,
            wednesday: wednesdayLabel,
            thursday: thursdayLabel,
            friday: fridayLabel,
            saturday: saturdayLabel,
            sunday: sundayLabel,
            today: todayLabel,
            tomorrow: tomorrowLabel
        });
        
        console.log({
            language,
            labels: {
                now: nowLabel,
                monday: mondayLabel,
                tuesday: tuesdayLabel,
                wednesday: wednesdayLabel,
                thursday: thursdayLabel,
                friday: fridayLabel,
                saturday: saturdayLabel,
                sunday: sundayLabel,
                today: todayLabel,
                tomorrow: tomorrowLabel
            }
        });
        alert("Language settings saved!");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Multi Day Weather"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Multi Day Weather"} style={styles.image} />}
                <p>Configure language settings and customize weather-related labels for the multi-day weather forecast widget.</p>
            </div>

            {/* Right Portion */}
            <div style={styles.right}>
                <div style={styles.topButtons}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
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
                </div>

                <div style={styles.tabContent}>
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

                    <div style={styles.field}>
                        <label style={styles.labelWithDefault}>Sun</label>
                        <input
                            type="text"
                            value={sundayLabel}
                            onChange={(e) => setSundayLabel(e.target.value)}
                            placeholder="Sun"
                            style={styles.input} />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.labelWithDefault}>Today</label>
                        <input
                            type="text"
                            value={todayLabel}
                            onChange={(e) => setTodayLabel(e.target.value)}
                            placeholder="Today"
                            style={styles.input} />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.labelWithDefault}>Tomorrow</label>
                        <input
                            type="text"
                            value={tomorrowLabel}
                            onChange={(e) => setTomorrowLabel(e.target.value)}
                            placeholder="Tomorrow"
                            style={styles.input} />
                    </div>
                </div>

                {/* Buttons at bottom */}
                <div style={styles.bottomButtons}>
                    {/* <button onClick={handlePreview} style={styles.previewBtn}>Preview</button> */}
                    <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                </div>

                {/* Preview Popup */}
                {showPopup && (
                    <MultiDayWeatherPopUp
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
                            monday: mondayLabel,
                            tuesday: tuesdayLabel,
                            wednesday: wednesdayLabel,
                            thursday: thursdayLabel,
                            friday: fridayLabel,
                            saturday: saturdayLabel,
                            sunday: sundayLabel,
                            today: todayLabel,
                            tomorrow: tomorrowLabel
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
    topButtons: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px"
    },
    settingsButton: {
        padding: "10px 20px",
        backgroundColor: "transparent",
        color: "#666",
        border: "1px solid #ddd",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "400",
        fontSize: "14px",
    },
    languageButton: {
        padding: "10px 20px",
        backgroundColor: "#007acc",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
    },
    tabContent: { 
        flex: 1, 
        overflowY: "auto" 
    },
    field: { 
        display: "flex", 
        flexDirection: "column", 
        marginBottom: "15px" 
    },
    input: { 
        padding: "8px", 
        borderRadius: "4px", 
        border: "1px solid #ccc",
        fontSize: "14px",
        marginTop: "5px"
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
};

export default MultiDayWeatherLanguageForm;
