import React from "react";
import Table from "./../Components/Table/Table";
import Layout from "../Components/Layout/Layout";
const Games = (props) => {
  return (
    <Layout>
      <h1>Games</h1>
      <Table columns={["id", "name", "Game"]}></Table>
    </Layout>
    //todo: List of games
    //make the list myself using a good old table?
  );
};
export default Games;
