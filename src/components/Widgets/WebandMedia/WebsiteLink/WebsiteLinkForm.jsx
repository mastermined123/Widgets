// import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import WebsiteLinkPopUp from "./WebsiteLinkPopUp";

// function WebsiteLinkForm({ onClose }) {
//   const [activeTab, setActiveTab] = useState("General");
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentTag, setCurrentTag] = useState("");
//   const [errors, setErrors] = useState({});

//   // Configuration state
//   const [appName, setAppName] = useState("");
//   const [tags, setTags] = useState([]);
//   const [pageUrl, setPageUrl] = useState("");
//   const [transparentBackground, setTransparentBackground] = useState(false);
//   const [displayMode, setDisplayMode] = useState("Default for platform");
//   const [fullPageZoom, setFullPageZoom] = useState(100);
//   const [allowInsecureHttps, setAllowInsecureHttps] = useState(false);
//   const [allowUserInteraction, setAllowUserInteraction] = useState(false);
//   const [enableAutocomplete, setEnableAutocomplete] = useState(false);
//   const [allowCameraAccess, setAllowCameraAccess] = useState(false);
//   const [allowMicrophoneAccess, setAllowMicrophoneAccess] = useState(false);
//   const [restrictPageNavigation, setRestrictPageNavigation] = useState(false);
//   const [allowedNavigationUrls, setAllowedNavigationUrls] = useState("");

//   const addTag = () => {
//     if (currentTag.trim() && !tags.includes(currentTag.trim())) {
//       setTags([...tags, currentTag.trim()]);
//       setCurrentTag("");
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!appName.trim()) {
//       newErrors.appName = "App name is required";
//     }
//     if (!pageUrl.trim()) {
//       newErrors.pageUrl = "Page URL is required";
//     } else if (!isValidUrl(pageUrl)) {
//       newErrors.pageUrl = "Please enter a valid URL";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isValidUrl = (string) => {
//     try {
//       new URL(string);
//       return true;
//     } catch (_) {
//       return false;
//     }
//   };

//   const handleSave = () => {
//     if (validateForm()) {
//       alert("Website Link widget saved successfully!");
//       onClose();
//     }
//   };

//   const handlePreview = () => {
//     if (validateForm()) {
//       setShowPopup(true);
//     }
//   };

//   const renderGeneralTab = () => (
//     <div>
//       <div style={styles.field}>
//         <label>App name *</label>
//         <input
//           type="text"
//           placeholder="Enter a name for this app"
//           value={appName}
//           onChange={(e) => setAppName(e.target.value)}
//           style={styles.input}
//         />
//         {errors.appName && (
//           <div style={styles.errorMessage}>
//             <span style={styles.errorIcon}>⚠</span>
//             {errors.appName}
//           </div>
//         )}
//       </div>

//       <div style={styles.field}>
//         <label>Tags (optional)</label>
//         <div style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
//           <input
//             type="text"
//             placeholder="Select a tag or enter a new one"
//             value={currentTag}
//             onChange={(e) => setCurrentTag(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && addTag()}
//             style={{ ...styles.input, flex: 1 }}
//           />
//           <button
//             onClick={addTag}
//             style={{
//               padding: "5px 10px",
//               backgroundColor: "#007acc",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Add
//           </button>
//         </div>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
//           {tags.map((tag, index) => (
//             <span key={index} style={styles.tag}>
//               {tag}
//               <button
//                 onClick={() => removeTag(tag)}
//                 style={styles.removeTag}
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       <div style={styles.field}>
//         <label>Page URL *</label>
//         <input
//           type="text"
//           placeholder="URL of the page to be displayed"
//           value={pageUrl}
//           onChange={(e) => setPageUrl(e.target.value)}
//           style={styles.input}
//         />
//         {errors.pageUrl && (
//           <div style={styles.errorMessage}>
//             <span style={styles.errorIcon}>⚠</span>
//             {errors.pageUrl}
//           </div>
//         )}
//         <div style={styles.helperText}>
//           URL of the page to be displayed. Some websites might not be displayed on SSSP devices or during preview due to their security settings.
//         </div>
//       </div>
//     </div>
//   );

//   const renderDisplayTab = () => (
//     <div>
//       <h4 style={styles.sectionHeader}>Display Settings</h4>
      
//       <div style={styles.field}>
//         <label style={styles.checkboxLabel}>
//           <input
//             type="checkbox"
//             checked={transparentBackground}
//             onChange={(e) => setTransparentBackground(e.target.checked)}
//             style={styles.checkbox}
//           />
//           Transparent Background
//         </label>
//         <div style={styles.helperText}>
//           Enables page background transparency. Requires Player Version 10.2 or above.
//         </div>
//       </div>

//       <div style={styles.field}>
//         <label>Display Mode</label>
//         <select
//           value={displayMode}
//           onChange={(e) => setDisplayMode(e.target.value)}
//           style={styles.input}
//         >
//           <option value="Default for platform">Default for platform</option>
//           <option value="Mobile">Mobile</option>
//           <option value="Desktop">Desktop</option>
//         </select>
//         <div style={styles.helperText}>
//           Forces the display of the website in mobile or desktop mode.
//         </div>
//       </div>

//       <div style={styles.field}>
//         <label>Full Page Zoom (optional)</label>
//         <input
//           type="number"
//           min="25"
//           max="500"
//           value={fullPageZoom}
//           onChange={(e) => setFullPageZoom(parseInt(e.target.value) || 100)}
//           style={styles.input}
//         />
//         <div style={styles.helperText}>
//           Sets the page zoom level, from 25 to 500, in percentage.
//         </div>
//       </div>
//     </div>
//   );

//   const renderSecurityTab = () => (
//     <div>
//       <h4 style={styles.sectionHeader}>Security Settings</h4>
      
//       <div style={styles.field}>
//         <label style={styles.checkboxLabel}>
//           <input
//             type="checkbox"
//             checked={allowInsecureHttps}
//             onChange={(e) => setAllowInsecureHttps(e.target.checked)}
//             style={styles.checkbox}
//           />
//           Allow insecure HTTPS connection
//         </label>
//         <div style={styles.helperText}>
//           Allows the player to connect to HTTPS pages without checking whether the certificate is valid.
//         </div>
//       </div>

//       <div style={styles.field}>
//         <label style={styles.checkboxLabel}>
//           <input
//             type="checkbox"
//             checked={allowUserInteraction}
//             onChange={(e) => setAllowUserInteraction(e.target.checked)}
//             style={styles.checkbox}
//           />
//           Allow user interaction
//         </label>
//         <div style={styles.helperText}>
//           Allows users to interact with the website through clicks, touches or keyboard input.
//         </div>
//       </div>

//       <div style={styles.field}>
//         <label style={styles.checkboxLabel}>
//           <input
//             type="checkbox"
//             checked={enableAutocomplete}
//             onChange={(e) => setEnableAutocomplete(e.target.checked)}
//             style={styles.checkbox}
//           />
//           Enable Autocomplete on Page
//         </label>
//         <div style={styles.helperText}>
//           Enables support for autocompleting forms in the page.
//         </div>
//       </div>

//       <div style={styles.field}>
//         <label style={styles.checkboxLabel}>
//           <input
//             type="checkbox"
//             checked={allowCameraAccess}
//             onChange={(e) => setAllowCameraAccess(e.target.checked)}
//             style={styles.checkbox}
//           />
//           Allow Access to Camera
//         </label>
//         <div style={styles.helperText}>
//           Allows the webpage access to the device camera. Requires Android Player 10.2.14 or above.
//         </div>
//       </div>

//       <div style={styles.field}>
//         <label style={styles.checkboxLabel}>
//           <input
//             type="checkbox"
//             checked={allowMicrophoneAccess}
//             onChange={(e) => setAllowMicrophoneAccess(e.target.checked)}
//             style={styles.checkbox}
//           />
//           Allow Access to Microphone
//         </label>
//         <div style={styles.helperText}>
//           Allows the webpage access to the device microphone. Requires Android Player 10.2.14 or above.
//         </div>
//       </div>

//       <div style={styles.field}>
//         <label style={styles.checkboxLabel}>
//           <input
//             type="checkbox"
//             checked={restrictPageNavigation}
//             onChange={(e) => setRestrictPageNavigation(e.target.checked)}
//             style={styles.checkbox}
//           />
//           Restrict Page Navigation
//         </label>
//         <div style={styles.helperText}>
//           By default it is possible to click links and navigate to pages other than the one configured above. When this option is enabled navigation is only allowed to the URLs specified below. Requires Android Player 10.2.16 or above.
//         </div>
//       </div>

//       {restrictPageNavigation && (
//         <div style={styles.field}>
//           <label>Allowed Navigation URLs (optional)</label>
//           <textarea
//             rows="4"
//             placeholder="https://*.google.com*&#10;https://bing.com/*"
//             value={allowedNavigationUrls}
//             onChange={(e) => setAllowedNavigationUrls(e.target.value)}
//             style={{ ...styles.input, resize: "vertical" }}
//           />
//           <div style={styles.helperText}>
//             List of URLs that are allowed to be loaded in the app, one per line. You must specify the complete URL but you can use a '*' character as a placeholder. For instance, to allow navigation to Google and Bing enter:
//           </div>
//           <div style={{ marginTop: "5px", padding: "8px", backgroundColor: "#f5f5f5", borderRadius: "4px", fontFamily: "monospace", fontSize: "12px" }}>
//             https://*.google.com*<br />
//             https://bing.com/*
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "General":
//         return renderGeneralTab();
//       case "Display":
//         return renderDisplayTab();
//       case "Security":
//         return renderSecurityTab();
//       default:
//         return renderGeneralTab();
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.left}>
//         <img
//           src="https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Website+Link"
//           alt="Website Link Widget"
//           style={styles.image}
//         />
//         <div style={styles.tabs}>
//           {["General", "Display", "Security"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               style={activeTab === tab ? styles.activeTab : styles.tab}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div style={styles.right}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
//           <h3 style={{ margin: 0 }}>Website Link Settings</h3>
//           <IoMdClose
//             onClick={onClose}
//             style={{ cursor: "pointer", fontSize: "20px" }}
//           />
//         </div>

//         <div style={styles.tabContent}>
//           {renderTabContent()}
//         </div>

//         <div style={styles.bottomButtons}>
//           <button onClick={handleSave} style={styles.saveBtn}>
//             Save
//           </button>
//           <button onClick={handlePreview} style={styles.previewBtn}>
//             Preview
//           </button>
//         </div>

//         {showPopup && (
//           <WebsiteLinkPopUp
//             onClose={() => setShowPopup(false)}
//             appName={appName}
//             pageUrl={pageUrl}
//             transparentBackground={transparentBackground}
//             displayMode={displayMode}
//             fullPageZoom={fullPageZoom}
//             allowInsecureHttps={allowInsecureHttps}
//             allowUserInteraction={allowUserInteraction}
//             enableAutocomplete={enableAutocomplete}
//             allowCameraAccess={allowCameraAccess}
//             allowMicrophoneAccess={allowMicrophoneAccess}
//             restrictPageNavigation={restrictPageNavigation}
//             allowedNavigationUrls={allowedNavigationUrls}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     width: "96%",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     overflow: "hidden",
//     marginTop: "1px",
//     position: "relative",
//   },
//   left: {
//     flex: 0.35,
//     borderRight: "3px solid #ddd",
//     backgroundColor: "#f5f5f5",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "10px",
//     overflowY: "auto",
//   },
//   right: {
//     flex: 0.65,
//     padding: "15px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   image: {
//     width: "100%",
//     height: "200px",
//     objectFit: "cover",
//     borderRadius: "8px",
//     marginBottom: "10px",
//   },
//   tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
//   tab: {
//     padding: "5px 15px",
//     cursor: "pointer",
//     backgroundColor: "#eee",
//     border: "none",
//     borderRadius: "4px",
//   },
//   activeTab: {
//     padding: "5px 15px",
//     cursor: "pointer",
//     backgroundColor: "#005481",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//   },
//   tabContent: { flex: 1, overflowY: "auto" },
//   field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
//   input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
//   sectionHeader: {
//     marginTop: "20px",
//     marginBottom: "10px",
//     paddingBottom: "5px",
//     borderBottom: "2px solid #005481",
//   },
//   checkboxLabel: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     cursor: "pointer",
//   },
//   checkbox: {
//     margin: "0",
//   },
//   helperText: {
//     color: "#666",
//     fontSize: "12px",
//     marginTop: "4px",
//     lineHeight: "1.3",
//   },
//   bottomButtons: {
//     display: "flex",
//     justifyContent: "flex-end",
//     gap: "10px",
//     marginTop: "20px",
//     paddingTop: "15px",
//     borderTop: "1px solid #eee",
//   },
//   saveBtn: {
//     padding: "8px 16px",
//     backgroundColor: "#ff8c00",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontWeight: "500",
//   },
//   previewBtn: {
//     padding: "8px 16px",
//     backgroundColor: "#007acc",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontWeight: "500",
//   },
//   tag: {
//     padding: "2px 5px",
//     backgroundColor: "#ccc",
//     borderRadius: "4px",
//     display: "flex",
//     alignItems: "center",
//     gap: "4px",
//   },
//   removeTag: {
//     marginLeft: "5px",
//     backgroundColor: "red",
//     color: "#fff",
//     border: "none",
//     borderRadius: "50%",
//     width: "16px",
//     height: "16px",
//     cursor: "pointer",
//     lineHeight: "16px",
//   },
//   errorMessage: {
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//     color: "#ff0000",
//     fontSize: "12px",
//     marginTop: "5px",
//     padding: "5px 8px",
//     backgroundColor: "#fff3cd",
//     border: "1px solid #ffeaa7",
//     borderRadius: "4px",
//   },
//   errorIcon: {
//     color: "#ff6b35",
//     fontWeight: "bold",
//   },
// };

// export default WebsiteLinkForm;