import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const StartRecording = (props) => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  //get author
  var author = user?.name;
  const [experiment, setExperiment] = useState(null);

  const [subject, setSubject] = useState("Unknown");
  const [trials, setTrials] = useState(-1);
  const [notes, setNotes] = useState("no notes");
  const [configuration, setConfiguration] = useState("undefined");
  const [sampleRate, setsampleRate] = useState(-1);

  const [experiments, setExperiments] = useState([]);
  const options = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pineapple",
      value: "pineapple",
    },
  ];

  useEffect(() => {
    getExperiments();
  }, []);

  useEffect(() => {
    console.log(experiments);
  }, [experiments]);

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
    var obj = {
      subject: subject,
      experiment: experiment._id,
      author,
      configuration,
      sampleRate,
      trials,
    };
    localStorage.setItem("recordingParameters", JSON.stringify(obj));

    console.log(localStorage.getItem("recordingParameters"));
    // TODO: Axios call to startRecording API endpoint
  };

  return (
    <Layout>
      This page is a work in progress.
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
          Select experiment
        </button>
        <button class="tablinks" onClick={(e) => openTab(e, "t2")}>
          Specify recording parameters
        </button>
        <button class="tablinks" onClick={(e) => openTab(e, "t3")}>
          Start recording
        </button>
        <div style={{ padding: "20px" }}>
          <div id="t1" class="tabcontent" style={{ display: "block" }}>
            Select Experiment
            <select value={experiment} onChange={selectExperiment}>
              {experiments.map((exp) => (
                <option value={exp._id}>{exp.name}</option>
              ))}
            </select>
            <div>
              {" "}
              <button onClick={(e) => openTab(e, "t2")}> Next </button>
            </div>
          </div>
          <div id="t2" class="tabcontent" style={{ display: "none" }}>
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
            <div>Created at 12:26 8:30 AM</div>
            <div>Author David</div>
            <div>
              <button onClick={(e) => openTab(e, "t3")}> Next </button>
            </div>
          </div>

          <div id="t3" class="tabcontent" style={{ display: "none" }}>
            <div>
              <button onSubmit={handleSubmit}> Start recording </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StartRecording;
