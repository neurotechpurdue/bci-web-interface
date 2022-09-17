import { React, useEffect, useCallback, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Character = require("./character.png");
const Game = (props) => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const [arr, setArr] = useState([]);
  const [input, setInput] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);
  const [EEGData, setEEGData] = useState("");
  const [start, setStart] = useState(false);
  const [EEGUrl, setEEGUrl] = useState("");
  var nTrials = 100;
  var left = 37;
  var right = 39;
  const [trialsLeft, setTrialsLeft] = useState(nTrials);

  const [padding, setPadding] = useState(100);
  const [currentDirection, setCurrentDirection] = useState("left");
  const [index, setIndex] = useState(0);
  //https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks
  const handleUserKeyPress = useCallback((event) => {
    if (start) {
      if (trialsLeft >= 1) {
        setTrialsLeft(trialsLeft - 1);
      }
      const { key, keyCode } = event;
      console.log("keypress! index:", arr[index], index);
      setCurrentDirection(arr[index]);
      setIndex(index + 1);
      var time = Date.now();
      console.log("keyCode: " + keyCode);
      if (keyCode === 37) {
        move(left);
        setInput((input) => [...input, "left"]);
        setTimeStamps((timeStamps) => [...timeStamps, time]);
      } //left arrow
      else if (keyCode === 39) {
        move(right);
        setInput((input) => [...input, "right"]);
        setTimeStamps((timeStamps) => [...timeStamps, time]);
      } else if (keyCode === 33) {
        setInput((input) => [...input, "start"]);
        // input.push("start");
        setTimeStamps((timeStamps) => [...timeStamps, time]);
      }
    }
  });

  const move = (direction) => {
    console.log("move");
    if (direction == left) {
      console.log("left");
      setPadding(padding - 20);
    } else {
      //right
      console.log("right");
      setPadding(padding + 20);
    }
  };
  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    console.log(EEGUrl);
    if (EEGUrl.length != 0) {
      console.log("EEGUrl not null");
      axios({
        url: EEGUrl, //your url
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        console.log(response.data);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "eeg.csv"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
      // fetch(EEGUrl, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "text/csv;charset=UTF-8",
      //   },
      // })
      //   .then((response) => response.blob())
      //   .then((blob) => {
      //     // Create blob link to download
      //     const url = window.URL.createObjectURL(new Blob([blob]));
      //     const link = document.createElement("a");
      //     link.href = url;
      //     link.setAttribute("download", `FileName.pdf`);

      //     // Append to html link element page
      //     document.body.appendChild(link);

      //     // Start download
      //     link.click();

      //     // Clean up and remove the link
      //     link.parentNode.removeChild(link);
      //   });
    }
  }, [EEGUrl]);

  useEffect(() => {
    console.log(input);
    console.log(timeStamps);
  }, [input]);

  const startRecording = () => {
    //
  };

  function initializeGame() {
    for (var i = 0; i < nTrials; i++) {
      var n = Math.random() * 10;
      if (n > 5) {
        setArr((arr) => [...arr, "left"]);

        // arr.push("left");
      } else {
        setArr((arr) => [...arr, "right"]);

        // arr.push("right");
      }
    }
    console.log("arr: " + arr);

    //display and wait for a keypress
    //record keypress
  }
  useEffect(() => {
    console.log(trialsLeft);
  }, [trialsLeft]);

  function StartAndStopRecording() {
    if (!start) {
      var url = `${process.env.REACT_APP_BACKEND_URL}/api/recordings/start`;
      console.log(url);
      var config = {
        method: "post",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios(config)
        .then(function (response) {
          // console.log(JSON.Parse(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      //create new file
    } else if (start) {
      console.log(input);
      console.log(timeStamps);
      //save
    }

    setStart(!start);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const saveRecording = () => {
    var data = JSON.stringify({
      subject: "the subject",
      experimentId: "69", // idk
      author: "Me!",
      configuration: "Cyton + Daisy",
      sampleRate: "200 Hz",
      trials: "30",
    });
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

  const downloadEEG = () => {
    var data = JSON.stringify({
      subject: "the subject",
      experimentId: "69",
      author: "yo mama",
    });
    var url = `${process.env.REACT_APP_BACKEND_URL}/api/recordings/start`;

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
        console.log("Data Location: " + response.data);
        setEEGData(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const csvData = [];
  input.forEach((item, i) => {
    var obj = { direction: item, timestamp: timeStamps[i] };
    csvData.push(obj);
  });
  var headers = [
    { label: "Direction", key: "direction" },
    { label: "Timestamp", key: "timestamp" },
  ];
  return (
    <>
      <p>Trials left: {trialsLeft}</p>

      {trialsLeft == 0 && (
        <>
          <button>
            <CSVLink
              data={csvData}
              headers={headers}
              filename={"stimChannel.csv"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Download Stim channel CSV Data
            </CSVLink>
          </button>
          <button target="_blank" onClick={saveRecording}>
            {" "}
            Save recording to AWS and get File location
          </button>
          {/* <CSVLink
            data={EEGData}
            headers={headers}
            filename={"EEG.csv"}
            onClick={downloadEEG}
          >
            Download OpenBCI Data
          </CSVLink> */}
        </>
      )}
      {trialsLeft > 0 && (
        <button
          onClick={() => {
            StartAndStopRecording();
          }}
        >
          {!start ? "Start" : "Stop"} game and recording
        </button>
      )}
      <h1>Go {currentDirection}</h1>
      <img
        src={Character}
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          left: padding + 200,
          top: 400,
        }}
      ></img>
    </>
  );
};

export default Game;
