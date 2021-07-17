import React from "react";
import { IToggleProps } from "./index.d";
import "./index.scss";

const Toggle = ({ options, onChange }: IToggleProps) => {
  return (
    <div className={"toggle"}>
      {options?.map(({ name, active }) => (
        <div
          key={name}
          className={"toggleOption"}
          data-active-toggle={active}
          onClick={() => onChange(name)}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default Toggle;
