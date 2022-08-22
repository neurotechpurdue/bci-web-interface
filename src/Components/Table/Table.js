import React from "react";
import { Link } from "react-router-dom";
import "./Table.css";
const Table = (props) => {
  const headers = props.columns.map((col, i) => {
    return <th scope="col">{col}</th>;
  });
  console.log(headers);

  /* 
  const data = [
    {
      id: { text: "1", link: null },
      name: { text: "Motor Imagery", link: "" },
      game: { text: "left/right", link: "..../games/:game_id" },
      author: { text: user?.name, link: null },
    },
  ]; */
  var data = null;
  if (props.data) {
    data = props.data.map((row, i) => {
      var tr = [];
      console.log(row);
      for (const rowEl of Object.entries(row)) {
        console.log(rowEl);
        console.log(rowEl[1].text);
        if (rowEl[1].link != null) {
          console.log("link not null");
          tr.push(
            <td>
              <Link to={rowEl[1].link}>{rowEl[1].text}</Link>
            </td>
          );
        } else {
          tr.push(<td>{rowEl[1].text}</td>);
          console.log(tr);
        }
      }
      tr = <tr> {tr}</tr>;
      console.log(tr);
      return tr;
      //must create row too
    });
    console.log(data);
  }
  // same with the body
  return (
    <table>
      <thead>
        {/* for games */}
        {headers}
      </thead>
      <tbody>{data}</tbody>
    </table>
  );
};

export default Table;
