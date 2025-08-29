import React, { useState, useEffect } from "react";

function HolidayClockPopUp({ 
    onClose, 
    appName, 
    tags, 
    backgroundColor,
    transparentBackground
}) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Calculate angles for clock hands
    const hourAngle = (hours * 30) + (minutes * 0.5);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    const containerStyle = {
        ...styles.container,
        backgroundColor: transparentBackground ? "transparent" : (backgroundColor || "#ffffff"),
    };

    const renderRomanNumerals = () => {
        const numerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
        return numerals.map((numeral, index) => {
            const angle = index * 30;
            const radian = (angle - 90) * (Math.PI / 180);
            const x = 120 + 90 * Math.cos(radian);
            const y = 120 + 90 * Math.sin(radian);
            
            return (
                <text
                    key={index}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={styles.numeral}
                >
                    {numeral}
                </text>
            );
        });
    };

    const renderHourMarks = () => {
        return Array.from({ length: 12 }, (_, i) => {
            const angle = i * 30;
            const radian = (angle - 90) * (Math.PI / 180);
            const x1 = 120 + 100 * Math.cos(radian);
            const y1 = 120 + 100 * Math.sin(radian);
            const x2 = 120 + 85 * Math.cos(radian);
            const y2 = 120 + 85 * Math.sin(radian);
            
            return (
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#000"
                    strokeWidth="2"
                />
            );
        });
    };

    const renderHollyLeaves = () => {
        return (
            <>
                {/* Left holly leaf */}
                <path
                    d="M 60 80 Q 40 60 20 80 Q 30 100 50 90 Q 60 95 60 80"
                    fill="#228B22"
                    stroke="#1F5F1F"
                    strokeWidth="1"
                />
                
                {/* Right holly leaf */}
                <path
                    d="M 180 80 Q 200 60 220 80 Q 210 100 190 90 Q 180 95 180 80"
                    fill="#228B22"
                    stroke="#1F5F1F"
                    strokeWidth="1"
                />
                
                {/* Bottom left holly leaf */}
                <path
                    d="M 80 200 Q 60 220 80 240 Q 100 230 90 210 Q 95 200 80 200"
                    fill="#228B22"
                    stroke="#1F5F1F"
                    strokeWidth="1"
                />
                
                {/* Bottom right holly leaf */}
                <path
                    d="M 160 200 Q 180 220 160 240 Q 140 230 150 210 Q 145 200 160 200"
                    fill="#228B22"
                    stroke="#1F5F1F"
                    strokeWidth="1"
                />
            </>
        );
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={{
                ...styles.popup,
                width: "1200px",
                maxWidth: "95vw",
                height: "800px",
                maxHeight: "95vh",
            }} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={{
                    ...styles.closeButton,
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    zIndex: 1001,
                }}>×</button>

                {/* Holiday Clock Container */}
                <div style={containerStyle}>
                    <svg width="400" height="400" viewBox="0 0 240 240" style={styles.clockSvg}>
                        {/* Holly leaves decoration */}
                        {renderHollyLeaves()}
                        
                        {/* Ornament top cap */}
                        <rect x="115" y="10" width="10" height="15" fill="#FFD700" rx="2" />
                        <circle cx="120" cy="8" r="4" fill="#FFD700" />
                        
                        {/* Ornament ring */}
                        <ellipse cx="120" cy="25" rx="12" ry="4" fill="#B8860B" />
                        
                        {/* Main clock circle (ornament body) */}
                        <circle
                            cx="120"
                            cy="120"
                            r="105"
                            fill="#DC143C"
                            stroke="#B22222"
                            strokeWidth="3"
                        />
                        
                        {/* Inner clock face */}
                        <circle
                            cx="120"
                            cy="120"
                            r="95"
                            fill="#F5F5F5"
                            stroke="#DDD"
                            strokeWidth="2"
                        />
                        
                        {/* Hour marks */}
                        {renderHourMarks()}
                        
                        {/* Roman numerals */}
                        {renderRomanNumerals()}
                        
                        {/* Clock hands */}
                        {/* Hour hand */}
                        <line
                            x1="120"
                            y1="120"
                            x2={120 + 50 * Math.cos((hourAngle - 90) * Math.PI / 180)}
                            y2={120 + 50 * Math.sin((hourAngle - 90) * Math.PI / 180)}
                            stroke="#FFD700"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                        
                        {/* Minute hand */}
                        <line
                            x1="120"
                            y1="120"
                            x2={120 + 70 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
                            y2={120 + 70 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
                            stroke="#FFD700"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                        
                        {/* Second hand */}
                        <line
                            x1="120"
                            y1="120"
                            x2={120 + 80 * Math.cos((secondAngle - 90) * Math.PI / 180)}
                            y2={120 + 80 * Math.sin((secondAngle - 90) * Math.PI / 180)}
                            stroke="#DC143C"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        
                        {/* Center dot */}
                        <circle cx="120" cy="120" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
                    </svg>
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
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    popup: {
        backgroundColor: "transparent",
        borderRadius: "12px",
        width: "1000px",
        maxWidth: "95vw",
        height: "1200px",
        maxHeight: "95vh",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        position: "relative",
    },
    closeButton: {
        background: "rgba(0, 0, 0, 0.7)",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        color: "#fff",
        padding: "8px",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 1001,
        fontWeight: "bold",
    },
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
    },
    clockSvg: {
        filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
    },
    numeral: {
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "serif",
        fill: "#000",
    },
};

export default HolidayClockPopUp;