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
      name: { text: "Motor Imagery", link: "https://google.com" },
      game: { text: "left/right", link: "..../games/:game_id" },
      author: { text: user?.name, link: null },
    },
  ]; */
  const data = props.data.map((row, i) => {
    var tr = [];
    console.log(row);
    for (const rowEl of Object.entries(row)) {
      console.log(rowEl);
      console.log(rowEl[1].text);
      // if (rowEl.link != null) {
      //   tr += (
      //     <td>
      //       <Link to={row.link}>{row.text}</Link>
      //     </td>
      //   );
      // } else {
      tr.push(<td>{rowEl[1].text}</td>);
      console.log(tr);
      // }
    }
    tr = <tr> {tr}</tr>;
    console.log(tr);
    return tr;
    //must create row too
  });
  console.log(data);

  // same with the body
  return (
    <table>
      <thead>
        {/* for games */}
        {headers}
      </thead>

      <tbody>
        {data}
        <tr>
          <td>1</td>
          <td>Left/right</td>
          <td>
            <Link to="/streaming">Demo</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
