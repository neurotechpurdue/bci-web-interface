import axios from "axios";

//todo: remove hardcoded process.env.local url
console.log(`${process.env.REACT_APP_BACKEND_URL}/api`);
const connection = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});
console.log(connection);

//experiment functions
const getExperimentById = (experiment_id) =>
  connection.get(`/experiment/${experiment_id}`);
const createExperiment = (payload) =>
  connection.post(`/experiment/new`, payload);
const getExperiments = (req) => connection.get("/experiments/", req);

//recording functions
// const getRecordingsByExperimentId =
// const getRecordingById =
// const startRecording =
// const saveRecording =
// const deleteRecording =

let api = {
  getExperimentById,
  createExperiment,
  getExperiments,
};

export default api;
