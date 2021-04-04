import React from "react";
import preloader from "../images/preloader.svg";

const Preloader = ({ width = 40, height = 90 }) => {
  if (typeof width == "number" && typeof height == "number") {
    width += "%";
    height += "vh";
  }
  return (
    <div style={{ textAlign: "center" }}>
      <img
        className="loader"
        src={preloader}
        alt="♾️"
        style={{ width: width, height: height }}
      />
    </div>
  );
};

export default Preloader;
