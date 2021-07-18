import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";
import "./index.scss";
import Charts from "../../complex/charts";

const ChartsPage = observer(() => {
  const appStore = useAppStore().root;

  useEffect(() => {
    if (!appStore.charts.revenuesPerProdCat.data)
      appStore.getProductsCategoriesWithRevenues();
  }, [appStore.charts.revenuesPerProdCat.data]);

  return (
    <div className={"chartsPage"}>
      {appStore.charts.revenuesPerProdCat?.data ? (
        <>
          <Charts
            chartType={"bar"}
            label={appStore.getChartsRevenuesPerProdCatLabel()}
            data={appStore.getChartsRevenuesPerProdCatProcessed()}
          />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
});

export default ChartsPage;
