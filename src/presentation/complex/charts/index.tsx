import React from "react";
import { observer } from "mobx-react-lite";
import { Bar } from "react-chartjs-2";

import "./index.scss";
import { IChartsProps } from "./index.d";

const Charts = observer(({ chartType, label, data }: IChartsProps) => {
  return (
    <div className={"charts"}>
      <p className={"label"}>{label}</p>
      <Bar
        type={"bar"}
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
});

export default Charts;
