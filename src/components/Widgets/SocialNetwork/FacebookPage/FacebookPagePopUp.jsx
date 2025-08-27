import React, { useState, useEffect } from "react";

function FacebookPagePopUp({ 
    onClose, 
    appName, 
    tags, 
    facebookPageUrl, 
    numberOfPosts, 
    postDuration, 
    headerColor, 
    highlightColor, 
    fontColor, 
    textFont, 
    backgroundColor, 
    backgroundImage, 
    enableAnimations 
}) {
    const [currentPostIndex, setCurrentPostIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    // Extract page ID from Facebook URL
    const getPageIdFromUrl = (url) => {
        if (!url) return null;
        
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            
            // Extract page ID from different Facebook URL formats
            if (pathname.includes('/pages/')) {
                const parts = pathname.split('/pages/')[1].split('/');
                return parts[1] || parts[0]; // Sometimes ID is after page name
            } else if (pathname.startsWith('/')) {
                const pageId = pathname.substring(1).split('/')[0];
                return pageId;
            }
            
            return null;
        } catch (error) {
            return null;
        }
    };

    // Extract page name from Facebook URL
    const getPageNameFromUrl = (url) => {
        if (!url) return "Sample Page";
        
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            
            // Extract page name from different Facebook URL formats
            if (pathname.includes('/pages/')) {
                const parts = pathname.split('/pages/')[1].split('/');
                return parts[0].replace(/-/g, ' ');
            } else if (pathname.startsWith('/')) {
                const pageName = pathname.substring(1).split('/')[0];
                return pageName.replace(/\./g, ' ').replace(/-/g, ' ');
            }
            
            return "Facebook Page";
        } catch (error) {
            return "Facebook Page";
        }
    };

    // Fetch real Facebook posts using Graph API
    const fetchFacebookPosts = async (pageId) => {
        if (!pageId) return [];
        
        setLoading(true);
        setApiError(null);
        
        try {
            // Facebook Graph API endpoint with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            // Using a demo access token - replace with your own from developers.facebook.com
            const accessToken = 'demo_token_replace_with_real_one';
            const fields = 'id,message,created_time,full_picture,attachments,likes.summary(true),comments.summary(true),shares,from,story';
            const limit = parseInt(numberOfPosts) || 10;
            
            const apiUrl = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=${fields}&access_token=${accessToken}&limit=${limit}`;
            
            const response = await fetch(apiUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`API returned ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(`Facebook API Error: ${data.error.message}`);
            }
            
            if (data.data && data.data.length > 0) {
                const formattedPosts = data.data.map((post, index) => ({
                    id: post.id || `post_${index}`,
                    author: post.from?.name || pageName || 'Facebook Page',
                    username: `@${pageId}`,
                    time: formatTimeAgo(post.created_time),
                    content: post.message || post.story || 'Check out this post!',
                    image: post.full_picture || post.attachments?.data?.[0]?.media?.image?.src || null,
                    likes: post.likes?.summary?.total_count || Math.floor(Math.random() * 1000),
                    comments: post.comments?.summary?.total_count || Math.floor(Math.random() * 100),
                    shares: post.shares?.count || Math.floor(Math.random() * 50)
                }));
                
                return formattedPosts;
            }
            
            // No posts found
            throw new Error('No posts found for this page');
            
        } catch (error) {
            console.error('Facebook API Error:', error);
            
            if (error.name === 'AbortError') {
                setApiError('Request timeout - please try again');
            } else if (error.message.includes('Invalid OAuth')) {
                setApiError('Invalid access token - please configure Facebook API');
            } else {
                setApiError(`Failed to load posts: ${error.message}`);
            }
            
            // Return demo posts for testing
            return [
                {
                    id: 'demo_1',
                    author: pageName || 'Demo Page',
                    username: `@${pageId}`,
                    time: '2 HOURS AGO',
                    content: `Demo post from ${pageName || 'Facebook Page'}. Configure Facebook API access token to see real posts.`,
                    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop',
                    likes: 123,
                    comments: 45,
                    shares: 12
                },
                {
                    id: 'demo_2',
                    author: pageName || 'Demo Page',
                    username: `@${pageId}`,
                    time: '1 DAY AGO',
                    content: `Another demo post. Replace 'demo_token_replace_with_real_one' with actual Facebook access token.`,
                    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop',
                    likes: 89,
                    comments: 23,
                    shares: 7
                }
            ];
            
        } finally {
            setLoading(false);
        }
    };

    // Format timestamp to readable format
    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return "JUST NOW";
        if (diffInHours < 24) return `${diffInHours} HOURS AGO`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} DAYS AGO`;
        return `${Math.floor(diffInHours / 168)} WEEKS AGO`;
    };

    const pageName = getPageNameFromUrl(facebookPageUrl);
    const pageId = getPageIdFromUrl(facebookPageUrl);

    // Load posts when component mounts or URL changes
    useEffect(() => {
        const loadPosts = async () => {
            if (facebookPageUrl && pageId) {
                // Try to fetch real posts first
                const realPosts = await fetchFacebookPosts(pageId);
                if (realPosts && realPosts.length > 0) {
                    setPosts(realPosts);
                } else {
                    // No posts available
                    setPosts([]);
                }
            } else {
                // No URL provided, no posts available
                setPosts([]);
            }
        };

        loadPosts();
    }, [facebookPageUrl, pageId, numberOfPosts]);

    const postsToShow = posts.slice(0, parseInt(numberOfPosts) || 3);

    const changePost = () => {
        if (enableAnimations && postsToShow.length > 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPostIndex((prev) => (prev + 1) % postsToShow.length);
                setIsAnimating(false);
            }, 300);
        } else {
            setCurrentPostIndex((prev) => (prev + 1) % postsToShow.length);
        }
    };

    // Auto-advance posts
    useEffect(() => {
        if (postsToShow.length <= 1) return;

        const interval = setInterval(() => {
            changePost();
        }, enableAnimations ? 2000 : (parseInt(postDuration) || 15) * 1000);

        return () => clearInterval(interval);
    }, [enableAnimations, postDuration, postsToShow.length]);

    const currentPost = postsToShow[currentPostIndex] || postsToShow[0];

    // Don't render if no posts available
    if (!currentPost || postsToShow.length === 0) {
        return (
            <div style={styles.overlay} onClick={onClose}>
                <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} style={styles.closeButton}>×</button>
                    <div style={styles.loadingContainer}>
                        <div style={styles.loadingText}>Loading Facebook posts...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={styles.closeButton}>×</button>

                {/* Facebook Container */}
                <div style={{
                    ...styles.facebookContainer,
                    backgroundColor: backgroundColor,
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
                    backgroundSize: backgroundImage ? 'cover' : 'auto',
                    backgroundPosition: backgroundImage ? 'center' : 'initial',
                    fontFamily: textFont || "Arial, sans-serif",
                }}>
                    {/* Facebook Header */}
                    <div style={{
                        ...styles.facebookHeader,
                        backgroundColor: headerColor || "#1877f2",
                    }}>
                        <div style={styles.headerLeft}>
                            <div style={styles.fbLogo}>f</div>
                            <span style={styles.fbText}>Facebook</span>
                        </div>
                        <div style={styles.headerRight}>
                            <span style={styles.appName}>{appName || "Facebook Widget"}</span>
                        </div>
                    </div>

                    {/* Post Container */}
                    <div style={styles.postContainer}>
                        <div style={{
                            ...styles.postWrapper,
                            overflow: enableAnimations ? 'hidden' : 'visible'
                        }}>
                            <div style={{
                                ...styles.post,
                                color: fontColor || "#333",
                                transform: enableAnimations && isAnimating ? 'translateX(-100%)' : 'translateX(0)',
                                transition: enableAnimations ? 'transform 0.3s ease-in-out' : 'none'
                            }}>
                                {/* Post Header */}
                                <div style={styles.postHeader}>
                                    <div style={styles.authorInfo}>
                                        <div style={styles.avatar}>
                                            {currentPost.author ? currentPost.author.charAt(0) : "F"}
                                        </div>
                                        <div style={styles.authorDetails}>
                                            <div style={{
                                                ...styles.authorName,
                                                color: highlightColor || "#1877f2",
                                            }}>
                                                {currentPost.author || "Facebook Page"}
                                            </div>
                                            <div style={styles.username}>
                                                {currentPost.username || "@facebookpage"}
                                            </div>
                                            <div style={styles.postTime}>
                                                {currentPost.time || "NOW"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Post Content */}
                                {currentPost.content && (
                                    <div style={styles.postContent}>
                                        {currentPost.content}
                                    </div>
                                )}

                                {/* Post Image */}
                                {currentPost.image && (
                                    <div style={styles.postImageContainer}>
                                        <img 
                                            src={currentPost.image} 
                                            alt="Post content" 
                                            style={styles.postImage}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Post Stats */}
                                <div style={styles.postStats}>
                                    <div style={styles.statItem}>
                                        <span style={styles.statIcon}>👍</span>
                                        <span>{currentPost.likes || 0}</span>
                                    </div>
                                    <div style={styles.statItem}>
                                        <span style={styles.statIcon}>💬</span>
                                        <span>{currentPost.comments || 0}</span>
                                    </div>
                                    <div style={styles.statItem}>
                                        <span style={styles.statIcon}>🔄</span>
                                        <span>{currentPost.shares || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Post Navigation Dots */}
                    {postsToShow.length > 1 && (
                        <div style={styles.navigationDots}>
                            {postsToShow.map((_, index) => (
                                <button
                                    key={index}
                                    style={{
                                        ...styles.dot,
                                        backgroundColor: index === currentPostIndex ? (highlightColor || "#1877f2") : '#ccc'
                                    }}
                                    onClick={() => {
                                        if (enableAnimations) {
                                            setIsAnimating(true);
                                            setTimeout(() => {
                                                setCurrentPostIndex(index);
                                                setIsAnimating(false);
                                            }, 300);
                                        } else {
                                            setCurrentPostIndex(index);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* App Info */}
                    <div style={styles.appInfo}>
                        <div style={styles.appName}>{appName}</div>
                        {tags && tags.length > 0 && (
                            <div style={styles.tagsContainer}>
                                {tags.map((tag, index) => (
                                    <span key={index} style={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        )}
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
        height: "700px",
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
    },
    facebookContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        overflow: "hidden",
    },
    facebookHeader: {
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #e4e6ea",
    },
    headerLeft: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    fbLogo: {
        backgroundColor: "#fff",
        color: "#1877f2",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
    },
    fbText: {
        color: "#fff",
        fontSize: "24px",
        fontWeight: "bold",
    },
    headerRight: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
    },
    postContainer: {
        flex: 1,
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    postWrapper: {
        width: "100%",
        maxWidth: "600px",
        position: "relative",
    },
    post: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
    },
    postHeader: {
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "15px",
    },
    authorInfo: {
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
    },
    avatar: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#1877f2",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
    },
    authorDetails: {
        flex: 1,
    },
    authorName: {
        fontSize: "16px",
        fontWeight: "600",
        marginBottom: "2px",
    },
    username: {
        fontSize: "14px",
        color: "#65676b",
        marginBottom: "2px",
    },
    postTime: {
        fontSize: "12px",
        color: "#65676b",
    },
    postContent: {
        fontSize: "16px",
        lineHeight: "1.5",
        marginBottom: "15px",
    },
    postImageContainer: {
        marginBottom: "15px",
        borderRadius: "8px",
        overflow: "hidden",
    },
    postImage: {
        width: "100%",
        height: "auto",
        display: "block",
    },
    postStats: {
        display: "flex",
        gap: "20px",
        paddingTop: "15px",
        borderTop: "1px solid #e4e6ea",
    },
    statItem: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "14px",
        color: "#65676b",
    },
    statIcon: {
        fontSize: "16px",
    },
    navigationDots: {
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        padding: "15px",
    },
    dot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    appInfo: {
        padding: "15px 20px",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderTop: "1px solid #e4e6ea",
    },
    appName: {
        fontSize: "16px",
        fontWeight: "600",
        marginBottom: "8px",
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
    statusContainer: {
        padding: "15px 20px",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderTop: "1px solid #e4e6ea",
    },
    loadingText: {
        fontSize: "16px",
        color: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
    },
    errorText: {
        fontSize: "16px",
        color: "#f44336",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
    },
    fallbackText: {
        fontSize: "14px",
        color: "#65676b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
    },
    successText: {
        fontSize: "16px",
        color: "#4caf50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
    },
    loadingContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};

export default FacebookPagePopUp;
