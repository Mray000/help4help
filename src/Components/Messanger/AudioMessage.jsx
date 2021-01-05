import {
  faArrowCircleRight,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { ReactMic } from "react-mic";
import { useDispatch } from "react-redux";
import { AddMessage } from "../../Redux/Reducer/DialogsReducer";
import "./Messanger.scss";

const AudioMessage = ({ setDisplay, display_none, message_dirty, submit }) => {
  const [record, setRecord] = useState(false);
  const changeRecording = () => {
    setDisplay(!record);
    setRecord(!record);
  };
  const dispatch = useDispatch();

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };
  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
    dispatch(AddMessage(null, null, recordedBlob));
  };
  const display_audio_none = !record;
  const icon_add_message = useRef(null);
  const icon_audio = useRef(null);
  useEffect(() => {
    if (message_dirty && icon_audio.current && icon_add_message.current) {
      icon_audio.current.style.animation = "scale0 0.1s 1";
      setTimeout(() => {
        if (icon_audio && icon_add_message) {
          icon_audio.current.style.display = "none";
          icon_add_message.current.style.display = "block";
          icon_add_message.current.style.animation = "scale1 0.1s 1";
        }
      }, 50);
    } else if (icon_audio.current && icon_add_message.current) {
      icon_add_message.current.style.animation = "scale0 0.1s 1";
      setTimeout(() => {
        if (icon_audio.current && icon_add_message.current) {
          icon_add_message.current.style.display = "none";
          icon_audio.current.style.display = "block";
          icon_audio.current.style.animation = "scale1 0.1s 1";
        }
      }, 50);
    }
  }, [message_dirty]);
  return (
    <div
      className={`audio_message_in_global_container${
        !display_audio_none ? "_active" : null
      }`}
    >
      <div
        className={`audio_message_in_container ${
          display_audio_none && "display_none"
        }`}
      >
        <ReactMic
          record={record}
          // visualSetting="sinewave"
          visualSetting="frequencyBars"
          className="audio_message_in"
          onStop={onStop}
          onData={onData}
          strokeColor="#fff"
          backgroundColor="#17212B"
        />
      </div>
      <div className="icons_a_m_container">
        <div className="icon_add_message_container" ref={icon_add_message}>
          <div onClick={submit} className="icon_add_message">
            <FontAwesomeIcon icon={faPaperPlane} color="white" size={"md"} />
          </div>
        </div>
        <div className="audio_icon_in_container" ref={icon_audio}>
          <div onClick={changeRecording} className="audio_icon_in">
            <FontAwesomeIcon icon="microphone" color="white" size={"lg"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioMessage;
