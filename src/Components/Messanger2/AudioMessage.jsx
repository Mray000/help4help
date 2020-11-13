import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { useDispatch } from "react-redux";
import { AddMessage } from "../../Redux/Reducer/DialogsReducer";
import "./Messanger.scss";

const AudioMessage = ({ setDisplay, display_none }) => {
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
      {/* <div
        className={`add_message_gif_container ${
          display_audio_none && "display_none"
        }`}
      >
        <img
          src="https://thumbs.gfycat.com/CapitalHarshEmeraldtreeskink-size_restricted.gif"
          className="add_message_gif"
        />
      </div> */}
      <div onClick={changeRecording} className="audio_icon_in">
        <FontAwesomeIcon icon="microphone" color="white" size={"lg"} />
      </div>
    </div>
  );
};

export default AudioMessage;
