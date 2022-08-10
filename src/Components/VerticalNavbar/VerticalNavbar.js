import React from "react";
import { Link } from "react-router-dom";
const VerticalNavbar = (props) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        backgroundColor: "pink",
        width: "200px",
      }}
    >
      <div>
        <li>
          <Link to="/experiments">Experiments</Link>
        </li>
      </div>
    </div>
  );
};

export default VerticalNavbar;
