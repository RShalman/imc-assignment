import React from "react";
import { IAppLayoutProps } from "./index.d";
import "./index.scss";
import { IMenuOption } from "../../providers/app-provider/app-provider.d";
import Sidebar from "../../complex/sidebar";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";
import Tables from "../../pages/tables";
import Charts from "../../pages/charts";
import Filters from "../../complex/filters";

const pagesConfig = (page: IMenuOption) => {
  const config: { [key: string]: any } = {
    tables: Tables,
    charts: Charts,
  };

  return config[page];
};

const AppLayout = observer(({ children }: IAppLayoutProps): JSX.Element => {
  const appStore = useAppStore().root;
  const PageComponent = pagesConfig(appStore.menuOption ?? "");

  return (
    <div className={"appLayout"}>
      <Sidebar />
      <main>
        <Filters />
        <div className={"page"}>
          {PageComponent ? <PageComponent /> : <></>}
        </div>
      </main>
    </div>
  );
});

export default AppLayout;
