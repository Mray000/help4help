import React, { useState } from "react";
import "./Profile.scss";
import ava from "./../../images/ava.png";
import { ReactMic } from "react-mic";

const Profile = ({ user_ava = ava }) => {
  return (
    <div id="global_profile_container">
      <div className="row">
        <div className="col-6">
          <img src={user_ava} alt="your avatar" className="avatar" />
        </div>
        <div className="col-6">
          <Example />
        </div>
      </div>
    </div>
  );
};

const Example = () => {
  const [record, setRecord] = useState(false);

  const changeRecord = () => {
    setRecord(!record);
  };

  // onData(recordedBlob) {
  //   console.log('chunk of real-time data is: ', recordedBlob);
  // }

  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
  };

  return (
    <div style={{ width: "100%", height: "100% !important" }}>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        // onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
        width="400"
        height="100"
        // style={{ width: "1000%" }}
      />
      <button onClick={changeRecord} type="button">
        Record!
      </button>
    </div>
  );
};

export default Profile;
