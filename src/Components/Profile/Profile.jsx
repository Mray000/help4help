import { faArrowAltCircleUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/Selectors/ProfileSelectors";
import { withAuthRedirect } from "../../utils/WithAuthRedirect";
import Preloader from "../../mini-components/Preloader";
import { GetProfile } from "../../Redux/Reducer/ProfileReducer";
import { useRouteMatch } from "react-router-dom";

const Profile = ({
  user_ava = "https://mir-avatarok.3dn.ru/_si/0/84829236.jpg",
}) => {
  const dispatch = useDispatch();
  let match = useRouteMatch();
  const profile = useSelector(getProfile);
  console.log(match);
  useEffect(() => {
    dispatch(GetProfile(match.params.id));
  }, []);
  const [show, setShow] = useState(false);
  const photo = "https://mir-avatarok.3dn.ru/_si/0/84829236.jpg";
  if (!profile) return <Preloader />;

  return (
    <div className="global_profile_container">
      <div className="profile_avatar_edit col-md-4 col-sm-12">
        <div className="avatar_container">
          <img
            src={user_ava}
            alt="📷"
            className="avatar"
            onClick={(e) => {
              e.stopPropagation();
              setShow(true);
            }}
          />
          <div className="down" onClick={() => setShow(true)}>
            <div className="photo_delete_icon">
              <FontAwesomeIcon icon={faTimes} size="1x" />
            </div>
            <label htmlFor="update_photo">
              <div>
                <FontAwesomeIcon
                  icon={faArrowAltCircleUp}
                  size="1x"
                  style={{ marginRight: "10px" }}
                />
                <span>Edit photo</span>
              </div>
            </label>
            <input
              id="update_photo"
              type="file"
              name="update_photo"
              onChange={(e) => console.log(e)}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-8 col-md-12">
        <div className="user_info">
          <div className="name">Profile</div>
        </div>
        <div className="name_user_form">
          <div className="name_surname">
            <div className="user_form">
              <div className="name_form_title">First name</div>
              <div className="name_form_value"> {profile.name}</div>
            </div>
            <div className="user_form">
              <div className="name_form_title">Last name</div>
              <div className="name_form_value">{profile.surname}</div>
            </div>
          </div>
          <div className="full_user_form">
            <div className="full_user_title">Country</div>
            <div className="full_user_value">Russia</div>
          </div>
          <div className="full_user_form">
            <div className="full_user_title">Email</div>
            <div className="full_user_value">{profile.email}</div>
          </div>
        </div>
      </div>
      <ProfileAvaPreview show={show} setShow={setShow} photo={photo} />
    </div>
  );
};

const ProfileAvaPreview = ({ show, setShow, photo }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <div className="prt">
        <img src={photo} alt="" />
      </div>
    </Modal>
  );
};

export default withAuthRedirect(Profile);
