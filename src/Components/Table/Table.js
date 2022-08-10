import React from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
  const headers = props.columns.forEach((col) => {
    return <th scope="col">{col}</th>;
  });

  // same with the body
  return (
    <table>
      <thead>
        {/* for games */}
        {headers}
        <th scope="col">id</th>
        <th scope="col">Name</th>
        <th scope="col">Play demo</th>
      </thead>

      <tbody>
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
