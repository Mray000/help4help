/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Header.scss";
// import help4help from "./../../images/лого2.png";
import help4help from "./../../images/лого3.png";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import lupa from "./../../images/magnifier.png";
import ava from "./../../images/ava.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, withRouter } from "react-router-dom";
// import { search } from "@fortawesome/free-solid-svg-icons";

const Header = ({ mobile, location }) => {
  // if (location.pathname === "/dialogs") return null;
  return (
    <nav
      className="navbar navbar-expand-xl navbar-light"
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
        <Search mobile={mobile} />
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              User
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Questions
            </a>
          </li>
          <li className="nav-item">
            <NavLink to="/dialogs" className="nav-link">
              Messenger
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={ava} alt="" id="user_avatar_img" />
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink to="/profile" className="dropdown-item">
                Profile
              </NavLink>
              <a className="dropdown-item">Another action</a>
              <a className="dropdown-item">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Search = ({ mobile }) => {
  return (
    <Formik onSubmit={console.log} initialValues={Object}>
      {({ handleSubmit, handleChange, touched, errors }) => (
        <Form
          onChange={handleSubmit}
          className={`search_in_${mobile ? "mobile_" : ""}group`}
        >
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text className="search_prepend_in">
                <FontAwesomeIcon
                  icon="search"
                  color="blue"
                  size={mobile ? "3x" : ""}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              required
              name="user"
              onChange={handleChange}
              placeholder="Search"
              className="search_in"
              type="search"
            />
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default withRouter(Header);
