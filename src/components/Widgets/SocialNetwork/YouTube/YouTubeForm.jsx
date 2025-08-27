import React, { useState } from "react";
import YouTubePopUp from "./YouTubePopUp";

function YouTubeForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    const [videoUrl, setVideoUrl] = useState("");
    const [videoQuality, setVideoQuality] = useState("Auto");
    const [subtitle, setSubtitle] = useState("Default");

    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");
    const [videoUrlError, setVideoUrlError] = useState("");

    // Tag handlers
    const addTag = () => {
        if (dataFeed.trim()) {
            setTags((prev) => [...prev, dataFeed.trim()]);
            setDataFeed("");
        }
    };

    const removeTag = (index) => {
        setTags((prev) => prev.filter((_, i) => i !== index));
    };

    // YouTube URL validation
    const validateYouTubeUrl = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|playlist\?list=)|youtu\.be\/)/;
        return youtubeRegex.test(url);
    };

    const handlePreview = () => {
        let hasError = false;

        if (!appName.trim()) {
            setAppNameError("Please fill out this field.");
            hasError = true;
        } else {
            setAppNameError("");
        }

        if (!videoUrl.trim()) {
            setVideoUrlError("Please enter a YouTube video URL.");
            hasError = true;
        } else if (!validateYouTubeUrl(videoUrl)) {
            setVideoUrlError("Please enter a valid YouTube URL.");
            hasError = true;
        } else {
            setVideoUrlError("");
        }

        if (!hasError) {
            setShowPopup(true);
        }
    };

    const handleSave = () => {
        console.log({
            appName,
            tags,
            videoUrl,
            videoQuality,
            subtitle,
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "YouTube Video"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "YouTube Video"} style={styles.image} />}
                <p>Embed YouTube videos with customizable quality and subtitle settings.</p>
            </div>

            {/* Right Portion */}
            <div style={styles.right}>
                <div style={styles.tabs}>
                    <button
                        style={activeTab === "settings" ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab("settings")}
                    >
                        Settings
                    </button>
                </div>

                <div style={styles.tabContent}>
                    {activeTab === "settings" && (
                        <div>
                            {/* App Name */}
                            <div style={styles.field}>
                                <label>App name</label>
                                <input
                                    type="text"
                                    value={appName}
                                    onChange={(e) => {
                                        setAppName(e.target.value);
                                        if (appNameError) setAppNameError("");
                                    }}
                                    placeholder="Enter a name for this app"
                                    style={{
                                        ...styles.input,
                                        borderColor: appNameError ? "#ff0000" : "#ccc"
                                    }} />
                                {appNameError && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.errorIcon}>⚠</span>
                                        {appNameError}
                                    </div>
                                )}
                            </div>

                            {/* Tags */}
                            <div style={styles.field}>
                                <label>Tags <span style={styles.optionalText}>(optional)</span></label>
                                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                    {tags?.map((tag, i) => (
                                        <span key={i} style={styles.tag}>
                                            {tag}
                                            <button onClick={() => removeTag(i)} style={styles.removeTag}>x</button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={dataFeed}
                                        onChange={(e) => setDataFeed(e.target.value)}
                                        placeholder="Select a tag or enter a new one"
                                        style={{ ...styles.input, flex: "1" }}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                                </div>
                            </div>

                            {/* YouTube Video URL */}
                            <div style={styles.field}>
                                <label>YouTube Video URL</label>
                                <input
                                    type="text"
                                    value={videoUrl}
                                    onChange={(e) => {
                                        setVideoUrl(e.target.value);
                                        if (videoUrlError) setVideoUrlError("");
                                    }}
                                    style={{
                                        ...styles.input,
                                        borderColor: videoUrlError ? "#ff0000" : "#ccc"
                                    }} />
                                {videoUrlError && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.errorIcon}>⚠</span>
                                        {videoUrlError}
                                    </div>
                                )}
                                <div style={styles.urlHelpText}>
                                    The specified URL must look like one of these:<br />
                                    "https://www.youtube.com/watch?v=9d8wWcJLnFI",<br />
                                    "https://www.youtube.com/playlist?list=PLivjPDlt6ApRnSNk_H90ufThcTOtKxXyM"
                                </div>
                            </div>

                            {/* Video Quality */}
                            <div style={styles.field}>
                                <label>Video Quality</label>
                                <select
                                    value={videoQuality}
                                    onChange={(e) => setVideoQuality(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="Auto">Auto</option>
                                    <option value="144p">144p</option>
                                    <option value="240p">240p</option>
                                    <option value="360p">360p</option>
                                    <option value="480p">480p</option>
                                    <option value="720p">720p</option>
                                    <option value="1080p">1080p</option>
                                </select>
                            </div>

                            {/* Subtitle */}
                            <div style={styles.field}>
                                <label>Subtitle (If available)</label>
                                <select
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="Default">Default</option>
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="None">None</option>
                                </select>
                                <div style={styles.subtitleHelpText}>
                                    If the selected subtitle is not available the publisher's default subtitle will be shown instead.
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Buttons at bottom */}
                <div style={styles.bottomButtons}>
                    <button onClick={handlePreview} style={styles.previewBtn}>Preview</button>
                    <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                </div>

                {/* Preview Popup */}
                {showPopup && (
                    <YouTubePopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        videoUrl={videoUrl}
                        videoQuality={videoQuality}
                        subtitle={subtitle} />
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
    tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
    tab: {
        padding: "5px 15px",
        cursor: "pointer",
        backgroundColor: "#eee",
        border: "none",
        borderRadius: "4px",
    },
    activeTab: {
        padding: "5px 15px",
        cursor: "pointer",
        backgroundColor: "#005481",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
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
    optionalText: {
        color: "#888",
        fontWeight: "normal",
        fontSize: "12px",
    },
    urlHelpText: {
        fontSize: "12px",
        color: "#666",
        marginTop: "5px",
        lineHeight: "1.4",
    },
    subtitleHelpText: {
        fontSize: "12px",
        color: "#666",
        marginTop: "5px",
        lineHeight: "1.4",
    },
};

export default YouTubeForm;