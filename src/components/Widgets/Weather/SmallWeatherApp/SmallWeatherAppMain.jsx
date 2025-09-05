import React, { useState } from "react";
import SmallWeatherAppForm from "./SmallWeatherAppForm";
import SmallWeatherAppLanguageForm from "./SmallWeatherAppLanguageForm";

function SmallWeatherApp({ card }) {
    const [currentView, setCurrentView] = useState("settings"); // "settings" or "language"
    
    // Shared state between forms
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [forecastLocation, setForecastLocation] = useState("");
    const [locationName, setLocationName] = useState("");
    const [usePlayerLocation, setUsePlayerLocation] = useState(false);
    const [temperatureScale, setTemperatureScale] = useState("Fahrenheit");
    const [transitionInterval, setTransitionInterval] = useState("5");
    
    // Shared styling state
    const [textFont, setTextFont] = useState("");
    const [textColor, setTextColor] = useState("#ffffff");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [backgroundImage, setBackgroundImage] = useState("");
    
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
                <SmallWeatherAppForm 
                    card={card} 
                    onSwitchToLanguage={switchToLanguage}
                    appName={appName}
                    setAppName={setAppName}
                    tags={tags}
                    setTags={setTags}
                    forecastLocation={forecastLocation}
                    setForecastLocation={setForecastLocation}
                    locationName={locationName}
                    setLocationName={setLocationName}
                    usePlayerLocation={usePlayerLocation}
                    setUsePlayerLocation={setUsePlayerLocation}
                    temperatureScale={temperatureScale}
                    setTemperatureScale={setTemperatureScale}
                    transitionInterval={transitionInterval}
                    setTransitionInterval={setTransitionInterval}
                    textFont={textFont}
                    setTextFont={setTextFont}
                    textColor={textColor}
                    setTextColor={setTextColor}
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColor}
                    backgroundImage={backgroundImage}
                    setBackgroundImage={setBackgroundImage}
                    language={language}
                    setLanguage={setLanguage}
                    languageLabels={languageLabels}
                    setLanguageLabels={setLanguageLabels}
                />
            ) : (
                <SmallWeatherAppLanguageForm 
                    card={card} 
                    onSwitchToSettings={switchToSettings}
                    appName={appName}
                    forecastLocation={forecastLocation}
                    locationName={locationName}
                    temperatureScale={temperatureScale}
                    textFont={textFont}
                    textColor={textColor}
                    backgroundColor={backgroundColor}
                    backgroundImage={backgroundImage}
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

export default SmallWeatherApp;