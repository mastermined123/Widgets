import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const QRCodePopUp = ({
  onClose,
  appName = "QR Code Generator",
  tags = [],
  textToEncode = "",
  qrCodeColor = "#000000",
  backgroundColor = "#ffffff",
  backgroundImage = "",
  transparentBackground = false,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (textToEncode) {
      generateQRCode();
    }
  }, [textToEncode, qrCodeColor, backgroundColor, transparentBackground, backgroundImage]);

  const generateQRCode = () => {
    // Using QR Server API as fallback since qrcode package isn't installed
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(textToEncode)}&color=${qrCodeColor.replace('#', '')}&bgcolor=${transparentBackground ? 'transparent' : backgroundColor.replace('#', '')}`;
    
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 300;
      canvas.height = 300;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set background if not transparent
      if (!transparentBackground) {
        if (backgroundImage) {
          // Load and draw background image
          const bgImg = new Image();
          bgImg.onload = () => {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
            loadQRCode(qrUrl, ctx);
          };
          bgImg.src = backgroundImage;
          return;
        } else {
          // Solid background color
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      loadQRCode(qrUrl, ctx);
    }
  };

  const loadQRCode = (qrUrl, ctx) => {
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.onload = () => {
      ctx.drawImage(qrImg, 0, 0, 300, 300);
    };
    qrImg.onerror = () => {
      // Fallback: Draw a placeholder
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(50, 50, 200, 200);
      ctx.fillStyle = '#333';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('QR Code Preview', 150, 140);
      ctx.fillText('(Install qrcode package', 150, 160);
      ctx.fillText('for full functionality)', 150, 180);
    };
    qrImg.src = qrUrl;
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Content */}
        <div style={styles.content}>
          <h2 style={styles.title}>{appName}</h2>
          
          {/* QR Code Canvas */}
          <div style={styles.qrContainer}>
            <canvas 
              ref={canvasRef}
              style={styles.qrCanvas}
            />
          </div>

          {/* Text being encoded */}
          <div style={styles.textInfo}>
            <strong>Encoded Text:</strong>
            <div style={styles.encodedText}>{textToEncode}</div>
          </div>

          {/* Tags (below QR code) */}
          {tags?.length > 0 && (
            <div style={styles.tagsContainer}>
              <strong>Tags:</strong>
              <div style={styles.tagsWrapper}>
                {tags.map((tag, i) => (
                  <span key={i} style={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div style={styles.instructions}>
            <p>Scan this QR code with your device to view the encoded text.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    width: "500px",
    maxHeight: "80vh",
    padding: "30px",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "rgba(0,0,0,0.1)",
    fontSize: "18px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  qrContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    border: "2px solid #eee",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  qrCanvas: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "4px",
  },
  textInfo: {
    width: "100%",
    textAlign: "center",
  },
  encodedText: {
    marginTop: "8px",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "14px",
    wordBreak: "break-word",
    maxHeight: "100px",
    overflowY: "auto",
  },
  tagsContainer: {
    width: "100%",
    textAlign: "center",
  },
  tagsWrapper: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "8px",
  },
  tag: {
    padding: "4px 12px",
    backgroundColor: "#e0e0e0",
    borderRadius: "12px",
    fontSize: "12px",
    color: "#333",
  },
  instructions: {
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
    fontStyle: "italic",
  },
};

export default QRCodePopUp;