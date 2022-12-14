import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import 'chartjs-adapter-luxon';
import { Auth0Provider } from "@auth0/auth0-react";

import { useEffect } from "react";

import Streaming from "./pages/Streaming";
import Main from "./pages/Main";
// import Train from "./Components/Train";
import Navbar from "./Components/Navbar/Navbar";
// import Recordings from "./pages/Recordings";
// import NewRecording from "./pages/NewRecording";
import Games from "./pages/Games";
import Experiments from "./pages/Experiments/Experiments";
import StartRecording from "./pages/Recordings/StartRecording";
import Recording from "./pages/Recordings/Recording";
import Experiment from "./pages/Experiments/Experiment";
import NewExperiment from "./pages/Experiments/NewExperiment";
import Game from "./Components/Game/Game";
import Video from "./Components/Video/Video";
function App() {
  // const JSDOM = require("jsdom").JSDOM;

  // Object.defineProperty(global.self, "crypto", {
  //   value: {
  //     getRandomValues: (arr) => crypto.randomBytes(arr.length),
  //   },
  // });
  // global.crypto.subtle = {}; // this gets around the 'auth0-spa-js must run on a secure origin' error

  // useEffect(() => {
  //   console.log(process.env.NODE_ENV);

  //   process.env.NODE_ENV == "development"
  //     // ? localStorage.setItem("api_url", "localhost:3001")
  //     // : localStorage.setItem("api_url", process.env.REACT_APP_BACKEND_URL);
  //   document.title = "NSP BCI Dashboard";
  // }, []);
  return (
    <>
      <Auth0Provider
        domain="dev-vqaan0om.us.auth0.com"
        clientId="lnDxRsrwTBBr74wzXuN9HOavolmNlyRn"
        redirectUri={window.location.origin}
      >
        <Router>
          <Routes>
            <Route path="/streaming" element={<Streaming />} />
            {/* <Route
              path="/train"
              element={<Train name="vssss" data="weeeee" />}
            />
            
            <Route path="/recordings/" element={<Recordings />}></Route> */}
            <Route path="/" element={<Main />} />
            <Route
              path="/recording/:recording_id"
              element={<Recording />}
            ></Route>
            <Route path="/games" element={<Games></Games>}></Route>
            <Route
              path="/experiment/:experiment_id/recording/new"
              element={<StartRecording></StartRecording>}
            ></Route>
            <Route path="/experiment/new" element={<NewExperiment />}></Route>
            <Route path="/games/left-right" element={<Game />}></Route>
            <Route
              path="/experiment/:experiment_id"
              element={<Experiment />}
            ></Route>
            <Route
              path="/experiments"
              element={<Experiments></Experiments>}
            ></Route>
            <Route path="/games/video" element={<Video></Video>}></Route>
          </Routes>
        </Router>
      </Auth0Provider>
    </>
  );
}

export default App;
