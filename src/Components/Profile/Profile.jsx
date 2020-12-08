import React from "react";
import "./Profile.scss";
import ava from "./../../images/ava.png";

const Profile = ({
  user_ava = "https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-8.png",
}) => {
  function TellPIPI(a) {
    alert("sdjJKSGFJDILKGf");
  }
  return (
    <div id="global_profile_container">
      <div className="row">
        <div className="col-6">
          <img src={user_ava} alt="profile_avatar" className="profile_avatar" />
          <div
            onClick={() => {
              TellPIPI(6);
            }}
          >
            Name Surname
          </div>
        </div>
        <R funR={TellPIPI} />
        <div className="col-6">
          <div>ewdf</div>
        </div>
      </div>
    </div>
  );
};

const R = ({ funR }) => {
  return (
    <div
      onClick={() => {
        funR();
      }}
    >
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
    </div>
  );
};

export default Profile;
