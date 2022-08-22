import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Table from "../../Components/Table/Table";
import Layout from "./../../Components/Layout/Layout";
var axios = require("axios");
const Experiment = (props) => {
  const { experiment_id } = useParams();

  //TODO: Get experiment name
  //TODO: Get recordings by experiment_id

  useEffect(() => {
    getRecordingsByExperimentId();
  }, []);

  const getRecordingsByExperimentId = () => {
    var data = JSON.stringify({ experimentId: "1" });
    var url = `http://localhost:3001/api/experiment/${experiment_id}/recordings`;
    console.log(url);
    var config = {
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        formatData(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formatData = (data) => {
    // "Id",
    //   "Configuration",
    //   "Sample rate",
    //   "Trials",
    //   "Subject",
    //   "Author",
    var objs = [];
    data.map((recording) => {
      var obj = {
        id: {
          text: recording._id,
        },
        subject: {
          text: recording.subject,
        },
        author: {
          text: recording.author,
        },
      };
      objs.push(obj);
    });

    //TODO: continue once recordings without authors and all that have been deleted
    // const formattedData = [
    //   {
    //     id: { text: "1", link: null },
    //     name: { text: "Motor Imagery", link: "/experiments" },
    //     game: { text: "left/right", link: "/experiments" },
    //   },
    //   {
    //     id: { text: "2", link: null },
    //     name: { text: "idm", link: "/streaming" },
    //     game: { text: "left/right", link: "/streaming" },
    //   },
    // ];
  };

  return (
    //todo: Experiment page with id, name, game, author and all recordings associated w experiment in a table
    <Layout>
      <h1> Experiment {experiment_id} </h1>
      <p> id, name, game</p>
      {/* recordings table */}
      <Table
        columns={[
          "Id",
          "Configuration",
          "Sample rate",
          "Trials",
          "Subject",
          "Author",
        ]}
        data={null}
      ></Table>
    </Layout>
  );
};

export default Experiment;
