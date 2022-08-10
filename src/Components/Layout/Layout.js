import React from "react";
import VerticalNavbar from "./../VerticalNavbar/VerticalNavbar";
import Navbar from "./../Navbar/Navbar";
import Game from "../Game/Game";

const Layout = (props) => {
  return (
    <div style={{ height: "100%" }}>
      <Navbar></Navbar>
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <VerticalNavbar></VerticalNavbar>
        <div style={{ height: "100%", width: "100%", overflowY: "scroll" }}>
          {props.children}
        </div>
        {/* <div style={{ overflowY: "scroll", width: "90%", margin: "0px auto" }}>
         */}
      </div>
    </div>
  );
};
export default Layout;
