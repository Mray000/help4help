import React from "react";
import { useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 480,
  height: 220,
  facingMode: "user",
};

const Video = () => {
  const webcamRef = React.useRef(null);
  // window.p = webcamRef;
  // const v = React.useRef(null);
  // const capture = React.useCallback(() => {
  // }, [webcamRef]);
  // const capture = setInterval(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   console.log(imageSrc);
  // }, 10000);
  // useEffect(() => {
  //   webcamRef.current.video.onloadedmetadata = (e) => {
  //     console.log(e);
  //   };
  // }, []);

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        mirrored={true}
        // onUserMedia={(e) => console.log(e)}
        videoConstraints={videoConstraints}
      />
      {/* <button onClick={capture}>Capture photo</button> */}
    </>
  );
};

export default Video;
