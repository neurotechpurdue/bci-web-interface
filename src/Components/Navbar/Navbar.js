import React from "react";
import "./Navbar.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Icon = require("../../images/icon.png");
const Navbar = () => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  //   const { name, email } = user;
  return (
    <div className="navbar">
      <b>BCI WEB INTERFACE</b>

      <div class="group">
        <Link class="link" to="/experiments">
          <b>EXPERIMENTS</b>
        </Link>
        {/* <div class="bg"></div> */}
        <Link class="link" to="/games">
          {" "}
          <b>GAMES </b>
        </Link>
      </div>
      {!isAuthenticated && (
        <button onClick={loginWithRedirect} style={{ margin: "0 10px" }}>
          <b>LOG IN</b>
        </button>
      )}
      {isAuthenticated && (
        <>
          <button
            onClick={() => {
              logout({ returnTo: window.location.origin });
            }}
            style={{ margin: "0 10px" }}
          >
            <b>LOG OUT</b>{" "}
          </button>
          <p>
            <img src={Icon} height={20} width={20}></img>
            {user?.name}
          </p>
        </>
      )}
    </div>
  );
};
export default Navbar;
