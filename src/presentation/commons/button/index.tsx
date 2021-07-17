import React from "react";
import { IButtonProps } from "./index.d";
import "./index.scss";

export const Button = ({
  className,
  value,
  onClick,
  dimension,
  color,
}: IButtonProps): JSX.Element => (
  <button
    className={`button ${dimension ? "dimension-" + dimension : ""} ${
      color ? color : ""
    } ${className}`}
    onClick={onClick}
  >
    {value}
  </button>
);
