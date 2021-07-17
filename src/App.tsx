import React from "react";
import "./App.css";
import AppLayout from "./presentation/layouts/app-layout";
import { observer } from "mobx-react-lite";

function App() {
  return (
    <div className="App">
      <AppLayout />
    </div>
  );
}

export default observer(App);
