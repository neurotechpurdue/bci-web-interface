import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router";
import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

const StartRecording = (props) => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const { experiment_id } = useParams();
  let navigate = useNavigate();
  var author = user?.name;
  const [experiment, setExperiment] = useState(null);
  const [subject, setSubject] = useState("Unknown");
  const [trials, setTrials] = useState(-1);
  const [notes, setNotes] = useState("no notes");
  const [configuration, setConfiguration] = useState("undefined");
  const [sampleRate, setsampleRate] = useState(-1);
  const [isConnected, setIsConnected] = useState(false);
  const [experiments, setExperiments] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [gamePage, setGamePage] = useState("");
  useEffect(() => {
    getExperiments();
    socket.on("connect", () => console.log(socket.id));
    socket.on("openbci", function (openbci) {
      console.log("connected to server socket!");
      setIsConnected(true); // is that correct?
      if (openbci == null) {
        setIsStreaming(false);
        console.log("No streaming currently happening!\n");
      } else {
        setIsStreaming(true);
        console.log("streaming!");
      }
      socket.close();
      setIsStreaming(false);
      setIsConnected(false);
    });
  }, []);

  const getExperiments = () => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/experiments`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setExperiments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const selectExperiment = (e) => {
    setExperiment(e.target.value);
  };

  const openTab = (e, tabId) => {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabId).style.display = "block";
    e.currentTarget.className += " active";
  };

  const handleSubmit = (props) => {
    console.log("starting the game");
    var obj = {
      subject: subject,
      experiment: experiment_id,
      author: author ? author : "none",
      configuration,
      sampleRate,
      trials,
    };
    localStorage.setItem("recordingParameters", JSON.stringify(obj));

    console.log(localStorage.getItem("recordingParameters"));
    // navigate("/games/left_right");
    // start recording for video experiment

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/recordings/start`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    if (gamePage != null) {
      console.log("Game page selected is null");
      navigate(gamePage);
    }
  };

  function selectGame(event) {
    if (event.target.value == "left-right") {
      setGamePage("/games/left-right");
    } else if (event.target.value == "left-right") {
      setGamePage("/games/video");
    } else {
      console.log("Error: No game selected");
    }
  }

  return (
    <Layout>
      <h2>Experiment {experiment_id}</h2>
      <h3>New recording</h3>
      {/* I know, i know, inline styling is bad. But good css practices isn't my priority rn */}
      {/* Tabs source code: https://www.w3schools.com/howto/howto_js_tabs.asp */}
      <div
        class="tab"
        style={{
          overflow: "hidden",
          border: "1px solid #ccc",
          height: "300px",
          borderRadius: "10px",
          backgroundColor: "light-grey",
        }}
      >
        <button class="tablinks" onClick={(e) => openTab(e, "t1")}>
          OpenBCI GUI connection check
        </button>
        <button class="tablinks" onClick={(e) => openTab(e, "t2")}>
          Specify recording parameters
        </button>
        <button class="tablinks" onClick={(e) => openTab(e, "t3")}>
          Start recording
        </button>
        <div id="t1" class="tabcontent" style={{ display: "block" }}>
          <div>
            {isConnected
              ? "Frontend connected to backend socket ✅\n"
              : "Not connected to the backend socket. Verify that your backend is currently running\n"}
            {isStreaming
              ? "Backend socket is streaming openBCI GUI data! ✅\n"
              : "Backend socket not streaming\n"}
          </div>
        </div>
        {/* <div style={{ padding: "20px", display: "none" }}> */}
        <div id="t2" class="tabcontent">
          <div>
            Sampling frequency (in Hz){" "}
            <input
              type="text"
              onChange={(e) => setsampleRate(e.target.value)}
              placeholder="200"
            ></input>
          </div>
          <div>
            Subject{" "}
            <input
              type="text"
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Julian Kang"
            ></input>
          </div>
          <div>
            Configuration{" "}
            <input
              type="text"
              onChange={(e) => setConfiguration(e.target.value)}
              placeholder="OpenBCI Daisy + Cyton, 16 electrodes"
            ></input>
          </div>
          <div>
            Notes{" "}
            <input
              type="text"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Subject is lost in the sauce"
            ></input>
          </div>
          <div>
            Number of trials{" "}
            <input
              type="text"
              onChange={(e) => setTrials(e.target.value)}
              placeholder="20"
            ></input>
          </div>
          <div>
            <select>
              <option value="left-right" handleChange={selectGame}>
                Left Right
              </option>
              <option value="video" handleChange={selectGame}>
                Video
              </option>
            </select>
          </div>
          <div>Created at 12:26 8:30 AM</div>
          <div>Author {author ? author : "unknown"}</div>
          <div>
            <button onClick={(e) => openTab(e, "t3")}> Next </button>
          </div>
        </div>

        <div id="t3" class="tabcontent" style={{ display: "none" }}>
          <div>
            <button onClick={handleSubmit}> Start recording </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default StartRecording;
