import React from "react";
import "./Profile.scss";
import ava from "./../../images/ava.png";

const Profile = ({
  user_ava = "https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-8.png",
}) => {
  return (
    <div id="global_profile_container">
      <div className="row">
        <div className="col-6">
          <img src={user_ava} alt="profile_avatar" className="profile_avatar" />
          <div>Name Surname</div>
        </div>
        <div className="col-6">{/* <div>ewdf</div> */}</div>
      </div>
    </div>
  );
};

export default Profile;
