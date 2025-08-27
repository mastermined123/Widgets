import React from "react";

function YouTubePopUp({ onClose, appName, tags, videoUrl, videoQuality, subtitle }) {
    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    // Extract playlist ID from URL
    const getYouTubePlaylistId = (url) => {
        const regex = /[?&]list=([^#\&\?]*)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const videoId = getYouTubeVideoId(videoUrl);
    const playlistId = getYouTubePlaylistId(videoUrl);

    // Build embed URL with parameters
    const buildEmbedUrl = () => {
        let embedUrl = '';
        
        if (playlistId) {
            embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
        } else if (videoId) {
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else {
            return null;
        }

        const params = new URLSearchParams();
        
        // Add quality parameter if not Auto
        if (videoQuality !== 'Auto') {
            params.append('vq', videoQuality.replace('p', ''));
        }
        
        // Add subtitle parameter if not Default
        if (subtitle !== 'Default' && subtitle !== 'None') {
            params.append('cc_lang_pref', subtitle.toLowerCase());
            params.append('cc_load_policy', '1');
        } else if (subtitle === 'None') {
            params.append('cc_load_policy', '0');
        }

        // Add other YouTube embed parameters
        params.append('autoplay', '0');
        params.append('rel', '0');
        params.append('modestbranding', '1');

        const paramString = params.toString();
        return paramString ? `${embedUrl}?${paramString}` : embedUrl;
    };

    const embedUrl = buildEmbedUrl();

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={styles.closeButton}>×</button>

                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.title}>{appName}</h2>
                    {tags && tags.length > 0 && (
                        <div style={styles.tagsContainer}>
                            {tags.map((tag, index) => (
                                <span key={index} style={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Video Container */}
                <div style={styles.videoContainer}>
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            style={styles.iframe}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={appName}
                        />
                    ) : (
                        <div style={styles.errorContainer}>
                            <div style={styles.errorIcon}>⚠️</div>
                            <div style={styles.errorText}>
                                Invalid YouTube URL. Please check the URL format.
                            </div>
                        </div>
                    )}
                </div>

                {/* Video Info */}
                <div style={styles.videoInfo}>
                    <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>Quality:</span>
                        <span style={styles.infoValue}>{videoQuality}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>Subtitles:</span>
                        <span style={styles.infoValue}>{subtitle}</span>
                    </div>
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
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    popup: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        width: "900px",
        maxWidth: "95vw",
        height: "600px",
        maxHeight: "95vh",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    closeButton: {
        position: "absolute",
        top: "15px",
        right: "15px",
        background: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        transition: "background-color 0.2s",
    },
    header: {
        padding: "20px 20px 10px 20px",
        borderBottom: "1px solid #eee",
    },
    title: {
        margin: "0 0 10px 0",
        fontSize: "24px",
        fontWeight: "600",
        color: "#333",
    },
    tagsContainer: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
    },
    tag: {
        padding: "4px 8px",
        backgroundColor: "#f0f0f0",
        borderRadius: "12px",
        fontSize: "12px",
        color: "#666",
    },
    videoContainer: {
        flex: 1,
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    },
    iframe: {
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        minHeight: "400px",
    },
    errorContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        padding: "40px",
    },
    errorIcon: {
        fontSize: "48px",
        marginBottom: "16px",
    },
    errorText: {
        fontSize: "18px",
        lineHeight: "1.5",
    },
    videoInfo: {
        padding: "15px 20px",
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #eee",
        display: "flex",
        gap: "30px",
    },
    infoRow: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    infoLabel: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#666",
    },
    infoValue: {
        fontSize: "14px",
        color: "#333",
        padding: "2px 8px",
        backgroundColor: "#fff",
        borderRadius: "4px",
        border: "1px solid #ddd",
    },
};

export default YouTubePopUp;