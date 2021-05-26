import React, { useEffect, useState } from "react";
import "./Header.scss";
import help4help from "./../../images/logo.png";
import ava from "./../../images/ava.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyId, getIsAuth } from "../../Redux/Selectors/AuthSelectors";
import { ResetData, SetRedirect } from "../../Redux/Reducer/AppReducer";
import { getDialogsList } from "../../Redux/Selectors/MessengerSelector";
import { GetProfile } from "../../Redux/Reducer/ProfileReducer";
import { ProfileAPI } from "../../axios/axios";

const Header = ({ mobile }) => {
  const my_id = useSelector(getMyId);
  const dialogs = useSelector(getDialogsList);
  const [user_ava, setUserAva] = useState("");
  const message_link = dialogs ? (dialogs.length ? dialogs[0].self.id : 0) : 0;
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();
  const Logout = () => {
    localStorage.setItem("token", "");
    navigator.sendBeacon(
      "http://localhost:3010/disconnect",
      JSON.stringify({ id: my_id })
    );
    dispatch(ResetData());
    dispatch(SetRedirect("/login"));
  };
  useEffect(() => {
    (async () => {
      if (my_id) setUserAva(await ProfileAPI.getProfile(my_id).ava);
    })();
  }, [my_id]);
  if (isAuth)
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        id={`global_header_${mobile ? "mobile_" : ""}container`}
      >
        <img src={help4help} alt="Наша ава!" id="help4help_header_img" />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/lesson" className="nav-link">
                Lesson
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/messenger?self=" + message_link}
                className="nav-link"
              >
                Messenger
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={user_ava || ava} alt="" id="user_avatar_img" />
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink to={`/profile/${my_id}`} className="dropdown-item">
                  Profile
                </NavLink>
                <div className="dropdown-item" onClick={Logout}>
                  Logout
                </div>
                <span className="dropdown-item">Another action</span>
                <span className="dropdown-item">Something else here</span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  else return null;
};

export default Header;
