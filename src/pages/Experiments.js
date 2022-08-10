import React from "react";
import Table from "./../Components/Table/Table";
import Layout from "../Components/Layout/Layout";
const Experiments = (props) => {
  return (
    <Layout>
      <h1>Experiments</h1>
      <Table columns={["hello", "hi", "guten tag"]}></Table>
    </Layout>
    //todo: List of games
    //make the list myself using a good old table?
  );
};
export default Experiments;
