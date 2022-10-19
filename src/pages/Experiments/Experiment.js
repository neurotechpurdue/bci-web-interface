import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table/Table";
import Layout from "./../../Components/Layout/Layout";

var JSZip = require("jszip");
var axios = require("axios");
const Experiment = (props) => {
  const { experiment_id } = useParams();
  let recordingZip = experiment_id;
  let navigate = useNavigate();
  const [data, setData] = useState(null);
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    getRecordingsByExperimentId();
  }, []);

  useEffect(() => {}, [recordings]);

  const getRecordingsByExperimentId = () => {
    console.log(experiment_id);
    // var data = JSON.stringify({ experimentId: experiment_id });
    var url = `${process.env.REACT_APP_BACKEND_URL}/api/experiment/${experiment_id}/recordings`;
    console.log(url);
    var config = {
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      // data: data,
    };

    axios(config)
      .then(function (response) {
        setRecordings(response.data);
        formatData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formatData = (data) => {
    var objs = [];
    // "Id",
    //   "Configuration",
    //   "Sample rate",
    //   "Trials",
    //   "Subject",
    //   "Author",
    data.map((recording) => {
      var obj = {
        id: {
          text: recording._id,
          link: null,
        },
        configuration: {
          text: recording.configuration,
          link: null,
        },
        sample_rate: {
          text: recording.sample_rate,
          link: null,
        },
        trials: {
          text: recording.trials,
          link: null,
        },

        subject: {
          text: recording.subject,
          link: null,
        },
        author: {
          text: recording.author,
          link: null,
        },
        data: {
          text: recording.data,
          link: recording.data,
        },
      };
      objs.push(obj);
    });
    setData(objs);
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

  const handleDownloadAll = () => {
    //1. Ensure recordings API call was successful
    console.assert(recordings != null);
    console.log(recordings);
    recordings.map((recording) => {
      downloadFileFromS3(recording._id);
    });
    //2. pass these recordings to be individually downloaded  and stored in zip
    // await downloadFileFromS3();
  };

  const downloadFileFromS3 = () => {};

  return (
    //todo: Experiment page with id, name, game, author and all recordings associated w experiment in a table
    <Layout>
      <h1> Experiment {experiment_id} </h1>
      <button onClick={handleDownloadAll}> Download all recordings </button>
      {/* recordings table */}
      {console.log(`/experiment/${experiment_id}/recording/new`)}
      <button
        onClick={() => navigate(`/experiment/${experiment_id}/recording/new`)}
      >
        Create recording
      </button>
      <Table
        columns={[
          "Id",
          "Configuration",
          "Sample rate",
          "Trials",
          "Subject",
          "Author",
          "Download",
        ]}
        data={data}
      ></Table>
    </Layout>
  );
};

export default Experiment;
