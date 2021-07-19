import React from "react";
import "./index.scss";

const ArrowMenuButton = ({
  isOpened,
  onClick,
}: {
  isOpened: boolean;
  onClick: () => void;
}) => (
  <div
    className={`menuButtonWrapper ${isOpened ? "open" : ""}`}
    onClick={onClick}
  >
    <div className={`menuButton`} />
  </div>
);

export default ArrowMenuButton;
