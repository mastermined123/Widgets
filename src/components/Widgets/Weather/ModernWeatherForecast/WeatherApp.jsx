import React, { useState } from "react";
import ModernWeatherForecastForm from "./ModernWeatherForecastForm";
import ModernWeatherForecastLanguageForm from "./ModernWeatherForecastLanguageForm";

function WeatherApp({ card }) {
    const [currentView, setCurrentView] = useState("settings"); // "settings" or "language"
    
    // Shared state between forms
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [forecastLocation, setForecastLocation] = useState("");
    
    // Shared styling state
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [textFont, setTextFont] = useState("");
    
    // Shared language state
    const [language, setLanguage] = useState("English");
    const [languageLabels, setLanguageLabels] = useState({
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

    const switchToLanguage = () => {
        setCurrentView("language");
    };

    const switchToSettings = () => {
        setCurrentView("settings");
    };

    return (
        <div style={styles.container}>
            {currentView === "settings" ? (
                <ModernWeatherForecastForm 
                    card={card} 
                    onSwitchToLanguage={switchToLanguage}
                    appName={appName}
                    setAppName={setAppName}
                    tags={tags}
                    setTags={setTags}
                    forecastLocation={forecastLocation}
                    setForecastLocation={setForecastLocation}
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColor}
                    textColor={textColor}
                    setTextColor={setTextColor}
                    backgroundImage={backgroundImage}
                    setBackgroundImage={setBackgroundImage}
                    textFont={textFont}
                    setTextFont={setTextFont}
                    language={language}
                    setLanguage={setLanguage}
                    languageLabels={languageLabels}
                    setLanguageLabels={setLanguageLabels}
                />
            ) : (
                <ModernWeatherForecastLanguageForm 
                    card={card} 
                    onSwitchToSettings={switchToSettings}
                    appName={appName}
                    forecastLocation={forecastLocation}
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    backgroundImage={backgroundImage}
                    textFont={textFont}
                    language={language}
                    setLanguage={setLanguage}
                    languageLabels={languageLabels}
                    setLanguageLabels={setLanguageLabels}
                />
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px"
    }
};

export default WeatherApp;
