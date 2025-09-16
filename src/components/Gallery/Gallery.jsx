import React from "react";
import { FaVideo, FaImage } from "react-icons/fa";

const media = [
  { id: 1, title: "Europe Landscape", src: "https://cdn.pixabay.com/photo/2025/08/04/09/58/europe-9753774_640.jpg", type: "image" },
  { id: 2, title: "Disco Party", src: "https://cdn.pixabay.com/photo/2020/10/17/22/07/disco-5663393_640.jpg", type: "image" },
  { id: 3, title: "Tiny Plane Video", src: "https://cdn.pixabay.com/video/2025/01/10/251873_tiny.mp4", type: "video" },
  { id: 4, title: "Building Skyline", src: "https://cdn.pixabay.com/photo/2025/08/08/00/34/building-9761776_640.jpg", type: "image" },
  { id: 5, title: "Reindeer in Forest", src: "https://cdn.pixabay.com/photo/2025/07/28/17/07/reindeer-9740970_640.jpg", type: "image" },
  { id: 6, title: "Jet F-35", src: "https://cdn.pixabay.com/photo/2025/07/24/15/33/f-35-9733096_640.jpg", type: "image" },
  { id: 7, title: "Vancouver City", src: "https://cdn.pixabay.com/photo/2022/09/05/17/15/vancouver-7434702_640.jpg", type: "image" },
  { id: 8, title: "Vietnam Scenery", src: "https://cdn.pixabay.com/photo/2025/08/06/03/18/vietnam-9757895_640.png", type: "image" },
  { id: 9, title: "Butterfly Macro", src: "https://cdn.pixabay.com/photo/2022/07/18/21/47/butterfly-7330875_640.jpg", type: "image" },
  { id: 10, title: "Foggy Morning", src: "https://cdn.pixabay.com/photo/2022/11/17/09/49/fog-7597710_640.jpg", type: "image" },
  { id: 11, title: "Python Coding", src: "https://cdn.pixabay.com/photo/2025/07/24/01/52/python-9731648_640.jpg", type: "image" },
  { id: 12, title: "Egypt Desert", src: "https://cdn.pixabay.com/photo/2025/07/31/05/40/egypt-9746119_640.jpg", type: "image" },
  { id: 13, title: "Cute Cat", src: "https://cdn.pixabay.com/photo/2025/08/02/02/01/cat-9749782_640.jpg", type: "image" },
  { id: 14, title: "Traffic Video", src: "https://cdn.pixabay.com/video/2023/10/21/185947-876963225_tiny.mp4", type: "video" },
  { id: 15, title: "River Flow", src: "https://cdn.pixabay.com/video/2025/07/22/292827_tiny.mp4", type: "video" },
  { id: 16, title: "Waterfall Clip", src: "https://cdn.pixabay.com/video/2025/06/01/282995_tiny.mp4", type: "video" },
  { id: 17, title: "Ocean Waves", src: "https://cdn.pixabay.com/video/2025/06/17/286278_tiny.mp4", type: "video" },
  { id: 18, title: "Drone Flight", src: "https://cdn.pixabay.com/video/2025/05/04/276624_tiny.mp4", type: "video" },
//   { id: 19, title: "Mountain Hike", src: "https://cdn.pixabay.com/video/2025/05/01/276047_tiny.mp4", type: "video" },
//   { id: 20, title: "Sunset Clip", src: "https://cdn.pixabay.com/video/2025/06/09/284568_tiny.mp4", type: "video" },
];



export default function Galley() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "10px",
        padding: "6px 10px",
      }}
    >
      {media.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            textAlign: "center",
            padding: "8px",
          }}
        >
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={item.title}
                crossOrigin="anonymous"

              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
          ) : (
            <video
              src={item.src}
              controls
                crossOrigin="anonymous"

              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "8px" }}>
            {item.type === "image" ? <FaImage /> : <FaVideo />}
            <span>{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
