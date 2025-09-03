/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

function TodayDatePopUp({
    onClose,
    appName = "Today Date",
    tags = [],
    dateFormat = "Numeric",
    centralBgColor = "#506172",
    borderBgColor = "#2c353f",
    textFont = "Roboto Bold",
    fontColor = "#ffffff"
}) {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // Update date every minute to keep it current
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date, format) => {
        const options = {};
        
        switch (format) {
            case "Numeric":
                return date.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                });
            case "Short":
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            case "Long":
                return date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
            default:
                return date.toLocaleDateString();
        }
    };

    const getFontFamily = (font) => {
        switch (font) {
            case "Roboto Bold":
                return "'Roboto', sans-serif";
            case "Roboto Bold Italic":
                return "'Roboto', sans-serif";
            case "Roboto Condensed Normal":
                return "'Roboto Condensed', sans-serif";
            case "Roboto Condensed Italic":
                return "'Roboto Condensed', sans-serif";
            case "Roboto Condensed Bold":
                return "'Roboto Condensed', sans-serif";
            case "Roboto Condensed Bold Italic":
                return "'Roboto Condensed', sans-serif";
            case "Roboto Mono Normal":
                return "'Roboto Mono', monospace";
            case "Roboto Mono Italic":
                return "'Roboto Mono', monospace";
            default:
                return font;
        }
    };

    const getFontWeight = (font) => {
        if (font.includes("Bold")) return "bold";
        return "normal";
    };

    const getFontStyle = (font) => {
        if (font.includes("Italic")) return "italic";
        return "normal";
    };

    const containerStyle = {
        ...styles.container,
        background: `radial-gradient(circle, ${centralBgColor} 0%, ${borderBgColor} 100%)`,
    };

    const dateTextStyle = {
        ...styles.dateText,
        color: fontColor,
        fontFamily: getFontFamily(textFont),
        fontWeight: getFontWeight(textFont),
        fontStyle: getFontStyle(textFont),
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={styles.closeButton}>×</button>

                {/* Date Display */}
                <div style={styles.content}>
                    <div style={dateTextStyle}>
                        {formatDate(currentDate, dateFormat)}
                    </div>
                </div>

                {/* Tags Display */}
                {/* {tags?.length > 0 && (
                    <div style={styles.tagsContainer}>
                        {tags.map((tag, i) => (
                            <span key={i} style={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    container: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
    closeButton: {
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "rgba(0, 0, 0, 0.7)",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "#fff",
        padding: "10px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1001,
        fontWeight: "bold",
    },
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
        textAlign: "center",
    },
    dateText: {
        fontSize: "clamp(3rem, 8vw, 12rem)",
        fontWeight: "bold",
        textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        letterSpacing: "2px",
        lineHeight: 1.2,
        userSelect: "none",
        maxWidth: "90%",
        wordBreak: "break-word",
    },
    tagsContainer: {
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: "80%",
    },
    tag: {
        padding: "8px 16px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        fontSize: "14px",
        color: "#fff",
        fontWeight: "500",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
    },
};

export default TodayDatePopUp;