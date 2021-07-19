import React, { useState } from "react";
import "./index.scss";
import { Button } from "../../commons/button";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";
import { IMenuOption } from "../../providers/app-provider/app-provider.d";
import Logo from "../../commons/logo";
import ArrowMenuButton from "../../commons/arrow-menu-button";

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
    <aside className={`sideBar ${appStore.menuOpen ? "open" : ""}`}>
      <div data-testid={"menuButton"} className={"menuIconWrapper"}>
        <ArrowMenuButton
          isOpened={appStore.menuOpen}
          onClick={appStore.toggleMenuOpen}
        />
      </div>
      <div className={"sidebarContent"}>
        <Logo />
        {buttons.map((btn) => (
          <Button
            key={btn.name}
            className={appStore.menuOption === btn.option ? "chosen" : ""}
            value={btn.name}
            dimension={"l"}
            color={"white"}
            onClick={() => {
              appStore.setMenuOption(btn.option as IMenuOption);
              appStore.toggleMenuOpen();
            }}
          />
        ))}
      </div>
    </aside>
  );
});

export default Sidebar;
