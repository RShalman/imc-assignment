import React from "react";
import "./index.scss";
import { Button } from "../../commons/button";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";
import { IMenuOption } from "../../providers/app-provider/app-provider.d";

const buttons = [
  {
    name: "Tables",
    option: "tables",
  },
  {
    name: "Charts",
    option: "charts",
  },
];

const Sidebar = observer(() => {
  const appStore = useAppStore().root;

  return (
    <aside className={"sideBar"}>
      {buttons.map((btn) => (
        <Button
          key={btn.name}
          className={appStore.menuOption === btn.option ? "chosen" : ""}
          value={btn.name}
          dimension={"l"}
          color={"white"}
          onClick={() => appStore.setMenuOption(btn.option as IMenuOption)}
        />
      ))}
    </aside>
  );
});

export default Sidebar;
