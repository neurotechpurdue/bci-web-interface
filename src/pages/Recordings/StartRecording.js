import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";

const StartRecording = (props) => {
  const [experiment, setExperiment] = useState(null);

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

  const selectExperiment = (e) => {
    setExperiment(e.target.value);
  };

  const openTab = (tabId) => {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(tabId).style.display = "block";
  };

  return (
    <Layout>
      This page is a work in progress.
      {/* I know, i know, inline styling is bad. But good css practices isn't my priority rn */}
      {/* Tabs source code: https://www.w3schools.com/howto/howto_js_tabs.asp */}
      <div class="tab" style={{ overflow: "hidden", border: "1px solid #ccc" }}>
        <button class="tablinks" onClick={() => openTab("t1")}>
          Select experiment
        </button>
        <button class="tablinks" onClick={() => openTab("t2")}>
          Specify recording parameters
        </button>
        <button class="tablinks" onClick={() => openTab("t3")}>
          Start recording
        </button>
        <div id="t1" class="tabcontent" style={{ display: "block" }}>
          Select Experiment
          <select value={experiment} onChange={selectExperiment}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          <button> Next </button>
        </div>
        <div id="t2" class="tabcontent" style={{ display: "none" }}>
          Sampling frequency <input type="text"></input>
          Subject <input type="text"></input>
          Configuration <input type="text"></input>
          Notes <input type="text"></input>
          Game <input type="text"></input>
          Number of iterations <input type="text"></input>
          Created at 12:26 8:30 AM Author David
          <button> Next </button>
        </div>
        <div id="t3" class="tabcontent" style={{ display: "none" }}>
          Start recording (Display streaming graph) Start game
        </div>
      </div>
    </Layout>
  );
};

export default StartRecording;
