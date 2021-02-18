import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetError } from "../../Redux/Reducer/AppReducer";

const Video = () => {
  let video = useRef(null);
  let canvas;
  let ctx;
  let localMediaStream;
  const dispatch = useDispatch();
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  useEffect(() => {
    return () => {
      video.current.stop();
      clearInterval(cameraInterval);
    };
  }, []);
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL;
  navigator.getUserMedia(
    { video: true },
    (stream) => {
      video.current.srcObject = stream;
      video.current.play();
      localMediaStream = stream;
    },
    () => dispatch(SetError("Camera did not work :("))
  );
  let cameraInterval = setInterval(() => snapshot(), 1);
  const snapshot = () => localMediaStream && ctx.drawImage(video.current, 0, 0);
  return <video autoplay ref={video}></video>;
};

export default Video;
