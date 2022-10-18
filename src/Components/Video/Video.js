import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import vid from "./video.mp4";
import { CSVLink, CSVDownload } from "react-csv";

const Video = (props) => {
  const [displayPlay, setDisplayPlay] = useState(null);
  const [trialsLeft, setTrialsLeft] = useState(null);
  const [timeStamps, setTimeStamps] = useState([]);
  const [arr, setArr] = useState([]); //array of random "pause and play instructions"
  var spacebar = 32; //javascript space bar keycode
  const [input, setInput] = useState([]);
  const [play, setPlay] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentVideoState, setCurrentVideoState] = useState("pause");

  const [EEGData, setEEGData] = useState("");
  const [EEGUrl, setEEGUrl] = useState("");

  var currentIndex = 0;
  useEffect(() => {
    var recordingParameters = JSON.parse(
      localStorage.getItem("recordingParameters")
    );
    console.log(recordingParameters);
    setTrialsLeft(recordingParameters.trials);
    console.log("game has been initialized");
  }, []);

  useEffect(() => {
    var recordingParameters = JSON.parse(
      localStorage.getItem("recordingParameters")
    );
    if (trialsLeft == recordingParameters.trials) {
      initializeGame();
    }
  }, [trialsLeft]);

  //code taken from Game.js
  function initializeGame() {
    console.log("in initializeGame function");
    console.log(trialsLeft);
    for (var i = 0; i < trialsLeft; i++) {
      var n = Math.random() * 10;
      if (n > 5) {
        setArr((arr) => [...arr, "play"]);
      } else {
        setArr((arr) => [...arr, "pause"]);
      }
    }
    console.log(arr);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayPlay(!displayPlay); // <- Why is displayPlay always true??? Is this a scope issue?
      console.log("interval keeps on doing its thing");
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const videoRef = useRef();

  useEffect(() => {
    console.log("currentVideoState: " + currentVideoState);
    //At some point, setting the video state to arr[currentIndex] just stops updating the variable
  }, [currentVideoState]);

  const saveRecording = () => {
    var recordingParameters = JSON.parse(
      localStorage.getItem("recordingParameters")
    ); //TODO: Fetch items from local storage properly

    console.log(recordingParameters.experiment);
    var data = JSON.stringify({
      subject: recordingParameters.subject,
      experimentId: recordingParameters.experiment, // idk
      author: recordingParameters.author,
      configuration: recordingParameters.configuration,
      sampleRate: recordingParameters.sampleRate,
      trials: recordingParameters.trials,
    });

    localStorage.removeItem("recordingParameters");

    var url = `${process.env.REACT_APP_BACKEND_URL}/api/recordings`;

    var config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setEEGData(response.data);
        setEEGUrl(response.data);
        console.log(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePlay = () => {
    setCurrentVideoState(arr[index]);
    setIndex(index + 1);
    setPlay(true);
    setInput((input) => [...input, "play"]);
    var time = Date.now();
    setTimeStamps((timeStamps) => [...timeStamps, time]);
    setTrialsLeft(trialsLeft - 1);
    videoRef.current.play();
  };
  const handlePause = () => {
    setCurrentVideoState(arr[index]);
    setIndex(index + 1);
    setPlay(false);
    setTrialsLeft(trialsLeft - 1);
    var time = Date.now();
    setInput((input) => [...input, "pause"]);
    setTimeStamps((timeStamps) => [...timeStamps, time]);
    videoRef.current.pause();
    console.log("pause");
  };
  const csvData = [];
  input.forEach((item, i) => {
    var obj = { keypress: item, timestamp: timeStamps[i] };
    csvData.push(obj);
  });
  var headers = [
    { label: "Keypress", key: "keypress" },
    { label: "Timestamp", key: "timestamp" },
  ];
  console.log(csvData);

  return (
    <>
      <p>Trials left: {trialsLeft}</p>

      {trialsLeft == 0 && (
        <>
          <button>
            <CSVLink
              data={csvData}
              headers={headers}
              filename={"stim-video.csv"} // change file name
              style={{ textDecoration: "none", color: "white" }}
            >
              Download Stim channel CSV Data
            </CSVLink>
          </button>

          <button target="_blank" onClick={saveRecording}>
            {" "}
            Save recording to AWS and get File location
          </button>
        </>
      )}
      {trialsLeft > 0 && (
        <>
          {/* Current video state is not working */}
          <p>Press on: {currentVideoState}</p>
          <video width="560" height="315" ref={videoRef}>
            <source src={vid} type="video/mp4"></source>
          </video>
          <button onClick={handlePlay}> Play </button>
          <button onClick={handlePause}> Pause </button>
        </>
      )}
    </>
  );
};
export default Video;
