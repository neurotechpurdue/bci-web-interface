import React, { useRef, useState, useEffect } from "react";

import vid from "./video.mp4";

const Video = (props) => {
  const [displayPlay, setDisplayPlay] = useState(true);
  const [trialsLeft, setTrialsLeft] = useState(null);
  const [timeStamps, setTimeStamps] = useState([]);
  const [arr, setArr] = useState([]); //array of random "pause and play instructions"
  var spacebar = 32; //javascript space bar keycode

  useEffect(() => {
    var recordingParameters = JSON.parse(
      localStorage.getItem("recordingParameters")
    );
    setTrialsLeft(recordingParameters.trials);
    initializeGame();
  }, []);

  function initializeGame() {
    for (var i = 0; i < trialsLeft; i++) {
      var n = Math.random() * 10;
      if (n > 5) {
        setArr((arr) => [...arr, "play"]);

        // arr.push("left");
      } else {
        setArr((arr) => [...arr, "pause"]);

        // arr.push("right");
      }
    }
  }

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
    setTrialsLeft(trialsLeft - 1);
    videoRef.current.play();
  };
  const handlePause = () => {
    setTrialsLeft(trialsLeft - 1);
    videoRef.current.pause();
    console.log("pause");
  };

  return (
    <>
      <p>Trials left: {trialsLeft}</p>

      <video width="560" height="315" ref={videoRef}>
        <source src={vid} type="video/mp4"></source>
      </video>
      <button onClick={handlePlay}> Play </button>
      <button onClick={handlePause}> Pause </button>
    </>
  );
};
export default Video;
