import React, { useState, useEffect } from "react";
import Table from "../../Components/Table/Table";
import Layout from "../../Components/Layout/Layout";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Experiments = (props) => {
  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const [experiments, setExperiments] = useState(null);
  useEffect(() => {
    getExperiments();
  }, []);

  const getExperiments = () => {
    console.log("getting experiments");
    var url = `${process.env.REACT_APP_BACKEND_URL}/api/experiments/`;
    var config = {
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setExperiments(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (experiments != null) {
      formatExperiments();
    }
  }, [experiments]);

  const formatExperiments = () => {
    console.log("format experiments!");
    var data = [];
    experiments.forEach((experiment) => {
      let obj = {
        id: { text: experiment._id, link: `/experiment/${experiment._id}` },
        name: { text: experiment.name, link: null },
        //TODO: For now
        game: { text: experiment.game_id, link: null },
      };
      data.push(obj);
      setTableData(data);
      console.log(data);
      // {
      //   id: { text: "1", link: null },
      //   name: { text: "Motor Imagery", link: "/experiments" },
      //   game: { text: "left/right", link: "/experiments" },
      // },
    });
  };

  const getGameById = () => {
    //later, we don't have a Game model yet anyways
  };

  const data = [
    {
      id: { text: "1", link: null },
      name: { text: "Motor Imagery", link: "/experiment/1" },
      game: { text: "left/right", link: "..../games/:game_id" },
    },
    {
      id: { text: "2", link: null },
      name: { text: "idm", link: "/experiment/1" },
      game: { text: "left/right", link: "..../games/:game_id" },
    },
  ];
  return (
    <Layout>
      <h1>Experiments</h1>
      <button onClick={getExperiments}>Get experiments</button>
      <button onClick={() => navigate("/experiment/new")}>
        New experiment
      </button>
      {tableData && (
        <Table columns={["id", "name", "game"]} data={tableData}></Table>
      )}
    </Layout>
    //todo: List of games
    //make the list myself using a good old table?
  );
};
export default Experiments;
