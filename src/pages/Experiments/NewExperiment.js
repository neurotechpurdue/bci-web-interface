import React, { useState, useEffect } from "react";
import Table from "../../Components/Table/Table";
import Layout from "../../Components/Layout/Layout";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const NewExperiment = (props) => {
    const [game, setGame] = useState("")
    const [games, setGames] = useState([])


    useEffect(()=>{
        getGames();
    }, [])

    useEffect(()=> {

    }, [games])
    const getGames = () => {

    }

  return (
    <Layout>
      <h1>New Experiment</h1>
      <input type="text" placeholder="experiment66"></input>
      Select Game
            {/* <select value={experiment} onChange={selectExperiment}>
              {experiments.map((exp) => (
                <option value={exp._id}>{exp.name}</option>
              ))}
            </select> */}
    </Layout>
    //todo: List of games
    //make the list myself using a good old table?
  );
};
export default NewExperiment;
