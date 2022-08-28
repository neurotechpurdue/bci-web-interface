import React from "react";
import { useHistory, useParams } from "react-router";
import Layout from "../../Components/Layout/Layout";

const Recording = (props) => {
  const { recording_id } = useParams();
  return (
    <Layout>
      <h1>Recording {recording_id}</h1>
    </Layout>
  );
};

export default Recording;
