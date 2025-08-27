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
      
      // Set canvas size - larger preview area
      canvas.width = 800;
      canvas.height = 600;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set background for entire canvas if not transparent
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
          // Solid background color for entire canvas
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
      // Center the QR code (300x300) in the larger canvas (800x600)
      const qrSize = 300;
      const xOffset = (800 - qrSize) / 2;
      const yOffset = (600 - qrSize) / 2;
      ctx.drawImage(qrImg, xOffset, yOffset, qrSize, qrSize);
    };
    qrImg.onerror = () => {
      // Fallback: Draw a centered placeholder
      const qrSize = 300;
      const xOffset = (800 - qrSize) / 2;
      const yOffset = (600 - qrSize) / 2;
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(xOffset + 50, yOffset + 50, 200, 200);
      ctx.fillStyle = '#333';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('QR Code Preview', 400, 300);
      ctx.fillText('(Install qrcode package', 400, 320);
      ctx.fillText('for full functionality)', 400, 340);
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
          {/* QR Code Canvas */}
          <div style={styles.qrContainer}>
            <canvas 
              ref={canvasRef}
              style={styles.qrCanvas}
            />
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
    backgroundColor: "transparent",
    borderRadius: "0px",
    boxShadow: "none",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    width: "800px",
    padding: "0px",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "rgba(255,255,255,0.8)",
    fontSize: "18px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    color: "#000",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0px",
    backgroundColor: "transparent",
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
    padding: "0px",
    backgroundColor: "transparent",
  },
  qrCanvas: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "0px",
    display: "block",
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