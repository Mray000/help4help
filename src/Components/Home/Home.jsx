import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import { SetRedirect } from "../../Redux/Reducer/AppReducer";
import { getMyId } from "../../Redux/Selectors/AuthSelectors";
const Home = () => {
  const dispatch = useDispatch();
  const my_id = useSelector(getMyId);
  if (my_id) dispatch(SetRedirect("/profile/" + my_id));
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="col-6">
        <img src={logo} alt="logo" style={{ width: "100%" }} />
      </div>
      <h1 className="col-6">
        Help4Help it is a website that allows you to find the right people tp
        learn.
        <br />
        <NavLink
          to="/registration"
          style={{ color: "#4169E1", cursor: "pointer" }}
        >
          Registration
        </NavLink>
        &nbsp; &nbsp;
        <NavLink to="/login " style={{ color: "#4169E1", cursor: "pointer" }}>
          Login
        </NavLink>
      </h1>
    </div>
  );
};

export default Home;
