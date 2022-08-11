import React from "react";
import Table from "./../Components/Table/Table";
import Layout from "../Components/Layout/Layout";
import { useAuth0 } from "@auth0/auth0-react";

const Experiments = (props) => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  const data = [
    {
      id: { text: "1", link: null },
      name: { text: "Motor Imagery", link: "https://google.com" },
      game: { text: "left/right", link: "..../games/:game_id" },
      author: { text: user?.name, link: null },
    },
    {
      id: { text: "2", link: null },
      name: { text: "idm", link: "https://google.com" },
      game: { text: "left/right", link: "..../games/:game_id" },
      author: { text: user?.name, link: null },
    },
  ];
  return (
    <Layout>
      <h1>Experiments</h1>
      <Table columns={["id", "name", "game", "authors"]} data={data}></Table>
    </Layout>
    //todo: List of games
    //make the list myself using a good old table?
  );
};
export default Experiments;
