import React from "react";
import { observer } from "mobx-react-lite";
import { Bar, Line } from "react-chartjs-2";

import "./index.scss";
import { IChartsProps } from "./index.d";
import Spinner from "../../commons/spinner";

const config = (type: IChartsProps["chartType"]) =>
  ({ bar: Bar, line: Line }[type]);

const Charts = observer(({ chartType, label, data }: IChartsProps) => {
  const ChartComponent = config(chartType);

  return (
    <div className={"charts"}>
      <p className={"label"}>{label}</p>
      {ChartComponent &&
        (data ? (
          <ChartComponent
            type={chartType}
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        ) : (
          <Spinner />
        ))}
    </div>
  );
});

export default Charts;
