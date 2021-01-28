import React, { useRef } from "react";
import { useEffect } from "react";

const Video = () => {
  let video = useRef(null);
  let canvas;
  let ctx;
  let localMediaStream;
  useEffect(() => {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    return () => {
      video.current.stop();
      clearInterval(cameraInterval);
    };
  }, []);
  const onCameraFail = function (e) {
    console.log("Camera did not work.", e); // Исключение на случай, если камера не работает
  };
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL;
  navigator.getUserMedia(
    { video: true },
    function (stream) {
      video.current.srcObject = stream;
      video.current.play();
      localMediaStream = stream;
    },
    onCameraFail
  );
  let cameraInterval = setInterval(function () {
    snapshot();
  }, 1);
  function snapshot() {
    if (localMediaStream) {
      // canvas.width = video.current.naturalHeight;
      // canvas.height = video.current.naturalHeight;
      ctx.drawImage(video.current, 0, 0);
      console.log(canvas.toDataURL("image/webp", 0.001));
    }
  }
  return (
    <>
      <video autoplay ref={video}></video>
      {/* <canvas
        ref={canvas}
        width="640"
        height="480"
        style={{ border: "1px solid #d3d3d3" }}
      ></canvas> */}
      <br />
    </>
  );
};

export default Video;
