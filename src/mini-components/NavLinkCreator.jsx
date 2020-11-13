import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./../Compinents/Bar/Bar.scss";
import { compose } from "redux";

const NavLinkCreator = ({ link, location }) => {
  return (
    <div id={link} className="center">
      <NavLink
        to={"/" + link}
        className={`${
          location.pathname.slice(1) === link ? `is_changed` : `center__text`
        } glitch is-glitching is-chanhed`}
        data-text={link}
      >
        {link}
      </NavLink>
    </div>
  );
};

export default compose(withRouter)(NavLinkCreator);
