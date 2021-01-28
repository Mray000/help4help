import React from "react";
import preloader from "../images/preloader.svg";

const Preloader = () => (
  <div style={{ textAlign: "center", marginTop: "10%" }}>
    <img className="loader" src={preloader} alt="" style={{ width: "20%" }} />
  </div>
);

export default Preloader;
