import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import wave from "./../../../../images/wave.svg";
import "./../../Messanger.scss";

const AudioMessage = ({ src, date = null, last = false }) => {
  const [playing, setPlaying] = useState(false);
  let audio_message = useRef();
  let progress_bar = useRef();

  const handlePlay = (e) => {
    e.stopPropagation();
    if (progress_bar.current.style.width === "100%") {
      progress_bar.current.style.width = "0%";
      setTimeout(() => {
        audio_message.current.play();
        setPlaying(!playing);
      }, 800);
    } else {
      audio_message.current.play();
      setPlaying(!playing);
    }
  };
  const handlePause = (e) => {
    e.stopPropagation();
    audio_message.current.pause();
    setPlaying(!playing);
  };
  const handleProgress = () => {
    let currentTime = audio_message.current.currentTime;
    let duration = audio_message.current.duration;
    let percent = (10 / duration) * currentTime * 10;
    // console.log(duration);
    progress_bar.current.style.width = percent + "%";
  };
  return (
    <div className="message_audio_container">
      <div className="message_audio">
        <audio
          className="display_none"
          ref={audio_message}
          onEnded={handlePause}
          onTimeUpdate={handleProgress}
          // onDurationChange={handleProgress}
        >
          <source src={src} type="audio/mpeg" />
        </audio>
        <div
          onClick={playing ? handlePause : handlePlay}
          style={{ zIndex: 2, marginRight: "4px", marginLeft: "4px" }}
        >
          {playing ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </div>
        <div>
          <img src={wave} alt="" />
        </div>
        {date && (
          <span className="message_date" style={{ marginRight: "2px" }}>
            {date[date.length - 5] +
              date[date.length - 4] +
              date[date.length - 3] +
              date[date.length - 2] +
              date[date.length - 1]}
          </span>
        )}
      </div>
      <div
        className="message_audio_progress_bar"
        ref={progress_bar}
        style={{ borderRadius: last ? "4px 4px 4px 0px" : "4px" }}
      ></div>
    </div>
  );
};

export default AudioMessage;
