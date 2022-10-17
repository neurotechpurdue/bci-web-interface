import React, { useRef, useState, useEffect } from "react";

import vid from "./video.mp4";

const Video = (props) => {
  const [displayPlay, setDisplayPlay] = useState(true);

  useEffect(() => {
    console.log("displayPlay:" + displayPlay);
  }, [displayPlay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayPlay(!displayPlay); // <- Why is displayPlay always true??? Is this a scope issue?
      console.log("interval keeps on doing its thing");
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const videoRef = useRef();
  const handlePlay = () => {
    console.log("play");
    videoRef.current.play();
  };
  const handlePause = () => {
    videoRef.current.pause();
    console.log("pause");
  };

  return (
    <>
      <video width="560" height="315" ref={videoRef}>
        <source src={vid} type="video/mp4"></source>
      </video>

      <button onClick={handlePlay}> Play </button>
      <button onClick={handlePause}> Pause </button>
    </>
  );
};
export default Video;
