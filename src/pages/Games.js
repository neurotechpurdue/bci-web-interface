import React from "react";
import Table from "./../Components/Table/Table";
import Layout from "../Components/Layout/Layout";
const Games = (props) => {
  const data = [
    {
      id: { text: "1", link: null },
      name: { text: "Motor Imagery", link: "/experiments" },
      game: { text: "left/right", link: "/experiments" },
    },
    {
      id: { text: "2", link: null },
      name: { text: "idm", link: "/streaming" },
      game: { text: "left/right", link: "/streaming" },
    },
  ];
  return (
    <Layout>
      <h1>Games</h1>
      <Table columns={["id", "name", "Game"]} data={data}></Table>
    </Layout>
    //todo: List of games
    //make the list myself using a good old table?
  );
};
export default Games;
