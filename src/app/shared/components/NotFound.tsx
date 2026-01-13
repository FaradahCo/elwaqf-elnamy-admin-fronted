import React from "react";
import { Link } from "react-router";

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: "#AA1826", textDecoration: "underline" }}>
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
