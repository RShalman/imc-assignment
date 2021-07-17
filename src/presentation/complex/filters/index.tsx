import React from "react";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";
import Toggle from "../../commons/toggle";
import { IFilterTypes } from "../../providers/app-provider/app-provider.d";

const Filters = observer(() => {
  const appStore = useAppStore().root;
  const filterNames = Object.keys(appStore.filters) as IFilterTypes[];

  return (
    <div className={"filters"}>
      {filterNames?.map((type) => (
        <div className={"toggleWrapper"}>
          <p className={"toggleLabel"}>{appStore.filters[type].label}</p>
          <Toggle
            key={type as string}
            options={appStore.filters[type]?.options}
            onChange={(value) => appStore.setActiveFilter(type, value)}
          />
        </div>
      ))}
    </div>
  );
});

export default Filters;
