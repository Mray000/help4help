import { faMicrophone, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { ReactMic } from "react-mic";
import { useDispatch } from "react-redux";
import { AddMessage } from "../../../../Redux/Reducer/DialogsReducer";
import "../../Messenger.scss";

const AudioMessageInput = ({
  setDisplay,
  display_none,
  message_dirty,
  submit,
}) => {
  const [record, setRecord] = useState(false);
  const changeRecording = () => {
    setDisplay(!record);
    setRecord(!record);
  };
  const dispatch = useDispatch();
  const onStop = (data) => {
    var reader = new FileReader();
    reader.readAsDataURL(data.blob);
    reader.onloadend = () =>
      dispatch(AddMessage(null, null, null, reader.result));
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
          visualSetting="frequencyBars"
          className="audio_message_in"
          onStop={onStop}
          strokeColor="#fff"
          backgroundColor="#242526"
        />
      </div>
      <div className="icons_a_m_container">
        <div
          onClick={submit}
          className="icon_add_message"
          ref={icon_add_message}
        >
          <FontAwesomeIcon icon={faPaperPlane} color="white" />
        </div>
        <div
          onClick={changeRecording}
          className="icon_in_audio"
          ref={icon_audio}
        >
          <FontAwesomeIcon icon={faMicrophone} color="white" size="lg" />
        </div>
      </div>
    </div>
  );
};

export default AudioMessageInput;
