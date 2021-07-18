import React from "react";
import { observer } from "mobx-react-lite";
import "./index.scss";
import { ITablesProps } from "./index.d";

const Tables = observer(({ dataset, caption }: ITablesProps) => {
  const headers = Object.keys(dataset[0]);
  return (
    <table className={"tables"}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header.replace(/_/g, " ")}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataset.map((data, idx) => (
          <tr key={idx}>
            {headers.map((td, id) => (
              <td key={id}>{data[td]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default Tables;
