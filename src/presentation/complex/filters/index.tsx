import React, { useCallback, useState } from "react";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";
import Toggle from "../../commons/toggle";
import { IFilterTypes } from "../../providers/app-provider/app-provider.d";
import { BiFilterAlt } from "react-icons/all";

const Filters = observer(() => {
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(true);
  const appStore = useAppStore().root;
  const filterNames = Object.keys(appStore.filters).filter((filter) =>
    appStore.menuOption === "tables" ? filter !== "period" : true
  ) as IFilterTypes[];

  const handleIconClick = useCallback(
    () => setIsFiltersVisible((prev) => !prev),
    []
  );

  return (
    <div className={"filters"}>
      <div className={`filtersWrapper ${isFiltersVisible ? "open" : "closed"}`}>
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
      <div className={"filterIcon"} onClick={handleIconClick}>
        <BiFilterAlt color={"black"} size={30} />
      </div>
    </div>
  );
});

export default Filters;
