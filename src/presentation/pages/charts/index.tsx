import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";
import "./index.scss";
import Charts from "../../complex/charts";
import Spinner from "../../commons/spinner";

const ChartsPage = observer(() => {
  const appStore = useAppStore().root;
  const revenuesPerProdCatData = appStore.charts.revenuesPerProdCat.data;
  const cumulativeInvoicesMonthly =
    appStore.charts.cumulativeInvoices.data.monthly;
  const cumulativeInvoicesWeekly =
    appStore.charts.cumulativeInvoices.data.weekly;
  const isMonthlyPeriod = appStore.getFiltersActiveName("period") === "monthly";

  useEffect(() => {
    if (!revenuesPerProdCatData) appStore.getProductsCategoriesWithRevenues();
  }, [revenuesPerProdCatData]);

  useEffect(() => {
    if (!cumulativeInvoicesMonthly && isMonthlyPeriod) {
      appStore.getRevenuesByPeriod("monthly");
    }

    if (!cumulativeInvoicesWeekly && !isMonthlyPeriod) {
      appStore.getRevenuesByPeriod("weekly");
    }
  }, [
    cumulativeInvoicesMonthly,
    cumulativeInvoicesWeekly,
    appStore.getFiltersActiveName("period"),
  ]);

  return (
    <div className={"chartsPage"}>
      {revenuesPerProdCatData ? (
        <>
          <Charts
            chartType={"bar"}
            label={appStore.getChartsRevenuesPerProdCatLabel()}
            data={appStore.getChartsRevenuesPerProdCatProcessed()}
          />
          {
            <Charts
              chartType={"line"}
              label={appStore.getChartsCumulativeInvoicesLabel()}
              data={
                isMonthlyPeriod
                  ? appStore.getCumulativeInvoicesMonthlyProcessed()
                  : appStore.getCumulativeInvoicesWeeklyProcessed()
              }
            />
          }
        </>
      ) : (
        <div className={"spinnerWrapper"}>
          <Spinner />
        </div>
      )}
    </div>
  );
});

export default ChartsPage;
