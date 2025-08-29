import React, { useState } from "react";
import MultiDayWeatherForm from "./MultiDayWeatherForm";
import MultiDayWeatherLanguageForm from "./MultiDayWeatherLanguageForm";

function MultiDayWeatherMain({ card }) {
    const [currentView, setCurrentView] = useState("settings");
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [forecastLocation, setForecastLocation] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#87CEEB");
    const [textColor, setTextColor] = useState("#ffffff");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [textFont, setTextFont] = useState("");
    const [language, setLanguage] = useState("en");
    const [languageLabels, setLanguageLabels] = useState({});

    const handleSwitchToLanguage = () => {
        setCurrentView("language");
    };

    const handleSwitchToSettings = () => {
        setCurrentView("settings");
    };

    return (
        <div>
            {currentView === "settings" ? (
                <MultiDayWeatherForm
                    card={card}
                    onSwitchToLanguage={handleSwitchToLanguage}
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
                <MultiDayWeatherLanguageForm
                    card={card}
                    onSwitchToSettings={handleSwitchToSettings}
                    language={language}
                    setLanguage={setLanguage}
                    languageLabels={languageLabels}
                    setLanguageLabels={setLanguageLabels}
                />
            )}
        </div>
    );
}

export default MultiDayWeatherMain;
