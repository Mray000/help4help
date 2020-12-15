import {
  faArrowAltCircleUp,
  faClipboard,
  faEraser,
  faMoneyCheck,
  faTimes,
  faTimesCircle,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { Field } from "formik";
import React, { useState } from "react";
import LargePhotosPreview from "../Messanger/LargePhotosPreview";
import PhotoPreviewModal from "../Messanger/PhotoPreviewModal";
import "./Profile.scss";

const Profile = ({
  user_ava = "https://mir-avatarok.3dn.ru/_si/0/84829236.jpg",
}) => {
  const [show, setShow] = useState(false);
  const photo = "https://mir-avatarok.3dn.ru/_si/0/84829236.jpg";
  const [mouseOnChild, setMouseOnChild] = useState(false);

  return (
    <div id="global_profile_container">
      <div className="row">
        <div className="profile_avatar_edit col-4">
          <div className="avatar_container_g">
            <div className="avatar_container">
              <img
                src={user_ava}
                alt="profile_avatar"
                className="avatar"
                onClick={() => setShow(true)}
              />
              <div
                className="down"
                onClick={() => {
                  if (!mouseOnChild) {
                    setShow(true);
                  }
                }}
              >
                <div className="photo_delete_icon">
                  <FontAwesomeIcon
                    icon={faTimes}
                    size="1x"
                    // color="grey"
                    onMouseEnter={() => setMouseOnChild(true)}
                    onMouseLeave={() => setMouseOnChild(false)}
                  />
                </div>
                <label
                  htmlFor="update_photo"
                  onMouseEnter={() => setMouseOnChild(true)}
                  onMouseLeave={() => setMouseOnChild(false)}
                >
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
                  onChange={(e) => {
                    console.log(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div>ewdf</div>
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

export default Profile;
