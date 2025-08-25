import React from "react";
import { FaTimes } from "react-icons/fa";

const TopSearch = ({ onClose }) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Filter by name..."
        style={styles.searchInput}
      />

      <FaTimes
        size={20}
        style={styles.closeIcon}
        onClick={onClose}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
  },
  searchInput: {
    padding: "7px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "12px"
  },
  closeIcon: {
    cursor: "pointer",
    marginLeft: "10px",
    color: "#d32f2f"
  }
};

export default TopSearch;
