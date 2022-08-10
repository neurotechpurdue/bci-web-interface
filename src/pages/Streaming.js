import React, { useEffect, useState } from "react";
// import Stream from "../Components/Stream";
// import Train from "../Components/Train";
// import Test from "../Components/Test";
import io from "socket.io-client";
import { Line, Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import StreamingPlugin from "chartjs-plugin-streaming";
const axios = require("axios");
Chart.register(StreamingPlugin);
// const socket = io.connect("http://localhost:8000");
// Class
const socket = io.connect("http://localhost:3001");

const Streaming = (props) => {
  // useEffect(() => {
  //   socket.on("connect", () => console.log(socket.id));
  //   socket.on("tweet", function (tweet) {
  //     // todo: add the tweet as a DOM node

  //     console.log("tweet from", tweet.user);
  //     console.log("contents:", tweet.text);
  //   });
  // }, []);

  const [click, setClick] = useState("");
  const [stream, setStream] = useState(false);
  const [buttonText, setButtonText] = useState("Start datastream");
  const [start, setStart] = useState(false);
  //   const [component, setComponent] = useState(<Stream />);

  const [data, setData] = useState("stream 1");

  // useEffect(() => {
  //   if (start) {
  //     socket.on("openbci", function (d) {
  //       // todo: add the tweet as a DOM node
  //       console.log(d);
  //       setData((data) => [...data, d[0]]);
  //     });
  //   }
  // }, [start]);
  function handleClick() {
    console.log("handling click!");
    setStream(!stream);
    if (stream == false) {
      console.log("start streaming!");
      // start datastream
      var data = JSON.stringify({ startTime: Date.now() });

      var config = {
        method: "post",
        url: "http://localhost:3001/api/recordings/start",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log("finished axios req");
      setStart(!start);
      setButtonText("Stop datastream");
    } else if (stream == true) {
      //stream == true

      var config = {
        method: "post",
        url: "http://localhost:3001/api/recordings",
        headers: {
          "Content-Type": "application/json",
        },
        subject: "the subject",
        experimentId: "69",
        author: "yo mama",
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

      socket.disconnect();
      setButtonText("start datastream");
    }
  }

  //   function handleStream() {
  //     setComponent(<Stream />);
  //   }

  //   function handleTrain() {
  //     setComponent(<Train data={data} name="adi" component={<Test />} />);
  //   }

  //   function handleTest() {
  //     setComponent(<Test />);
  //   }
  function sendTestRoute() {
    axios.get("http://localhost:8000/").then((response) => {
      console.log(response);
    });
  }
  const config = {
    type: "line",
    data: {
      datasets: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
    },
  };
  return (
    <>
      {/* {socket ? <p>SOCKET!!</p> : <p> not connected :(</p>} */}
      <h1>Streaming</h1>
      <button onClick={handleClick}>{buttonText}</button>
      {/* <button onClick={handleStream}>Stream</button>
      <button onClick={handleTrain}>Train</button>
      <button onClick={handleTest}>Test</button> */}
      <button onClick={sendTestRoute}>Send test route</button>
      {/* {component} */}
      <Line
        data={{
          datasets: [
            {
              label: "Dataset 1",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgb(255, 99, 132)",
              borderDash: [8, 4],
              fill: true,
              data: [],
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: "realtime",
              realtime: {
                delay: 2000,
                onRefresh: (chart) => {
                  chart.data.datasets.forEach((dataset) => {
                    dataset.data.push({
                      x: Date.now(),
                      y: data,
                    });
                  });
                },
              },
            },
          },
        }}
      />
      {/* <Stream/> */}
      {/* <Train/>
        <Test/> */}
      {stream ? (
        <p> Data stream in progress...</p>
      ) : (
        <p> Data stream stopped</p>
      )}
      <p>{click}</p>
      <p class="text-orange-700"> HELLO?</p>
    </>
  );
};
export default Streaming;
