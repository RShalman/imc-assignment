import React from "react";
import { IAppLayoutProps } from "./index.d";
import "./index.scss";
import Products from "../../pages/products";
import { IMenuOption } from "../../providers/app-provider/app-provider.d";
import Sidebar from "../../complex/sidebar";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";

const pagesConfig = (page: IMenuOption) => {
  const config: { [key: string]: any } = {
    products: Products,
  };

  return config[page];
};

const AppLayout = observer(({ children }: IAppLayoutProps): JSX.Element => {
  const appStore = useAppStore().root;
  const PageComponent = pagesConfig(appStore.menuOption ?? "");

  return (
    <div className={"appLayout"}>
      <Sidebar />
      <div className={"page"}>{PageComponent ? <PageComponent /> : <></>}</div>
    </div>
  );
});

export default AppLayout;
