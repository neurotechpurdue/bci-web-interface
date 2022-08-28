import React from "react";
import { Link } from "react-router-dom";
import "./VerticalNavbar.scss";
const VerticalNavbar = (props) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        backgroundColor: "grey",
        width: "200px",
      }}
    >
      <div class="vertical-navbar-links">
        <li>
          <Link class="link" to="/experiments">
            Experiments
          </Link>
        </li>
        <li>
          <Link class="link" to="/games">
            {" "}
            Games{" "}
          </Link>
        </li>
      </div>
    </div>
  );
};

export default VerticalNavbar;
