import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessengerAPI } from "../../axios/axios";
import { SetError } from "../../Redux/Reducer/AppReducer";
import { GetSocket } from "../../Redux/Reducer/MessengerReducer";
import { getImage } from "../../utils/GetImage";

const Lesson = () => {
  let video = useRef(null);
  let canvas, ctx;
  let ctx2;
  let localMediaStream;
  const dispatch = useDispatch();
  const socket = GetSocket();
  socket.on("video", async ({ img }) => {
    let image = await getImage(img);
    ctx2.drawImage(image, 0, 0);
  });
  canvas = document.createElement("canvas");
  canvas.width = "1000";
  canvas.height = "500";
  ctx = canvas.getContext("2d");
  let canvas2 = useRef();
  useEffect(() => {
    ctx2 = canvas2.current.getContext("2d");
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
  const snapshot = () => {
    if (localMediaStream) {
      ctx.drawImage(video.current, 0, 0);
      MessengerAPI.video(canvas.toDataURL(), "602a0c082feee465de355eb8");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video autoPlay ref={video}></video>
      <canvas width="0" height="0" ref={canvas2} />
    </div>
  );
};

export default Lesson;
