import {
  IChart,
  IFilterOption,
  IFilterTypes,
  IMenuOption,
  ITable,
  ITableTypes,
} from "./app-provider.d";
import { flow } from "mobx";
import {
  getBestCustomersApi,
  getInvoicesApi,
  getProductsCategoriesWithRevenuesApi,
  getRevenuesByPeriodApi,
} from "../../../api";
import moment from "moment";
import { financial, isEmptyObject } from "../../../utils";

export function createAppProviderStore(this: any) {
  return {
    filters: {
      period: {
        label: "Choose period type",
        options: [
          { name: "weekly", active: true },
          { name: "monthly", active: false },
        ],
      },
      type: {
        label: "Choose measurement type",
        options: [
          { name: "revenues", active: true },
          { name: "margin", active: false },
        ],
      },
    },
    tables: {
      invoices: {
        label: "15 latest invoices by date",
        data: null as unknown as ITable["data"],
      },
      bestCustomers: {
        label: "Best customers",
        data: null as unknown as ITable["data"],
      },
    },
    charts: {
      revenuesPerProdCat: {
        label: "%type% per products categories",
        data: null as unknown as IChart["data"],
      },
      cumulativeInvoices: {
        label: "%period% cumulative invoices %type%",
        data: {
          monthly: null as unknown as IChart["data"]["monthly"],
          weekly: null as unknown as IChart["data"]["weekly"],
        },
      },
    },
    menuOpen: false,
    menuOption: null as unknown as IMenuOption,
    products: null as unknown as Record<number, unknown>,
    getFiltersActiveName(filterType: IFilterTypes) {
      return this.filters[filterType].options.find((p) => p.active)?.name;
    },
    getChartsRevenuesPerProdCatLabel() {
      const type = this.filters.type.options.find((t) => t.active)?.name;
      return this.charts.revenuesPerProdCat.label.replace(
        /%type%/gi,
        type ?? ""
      );
    },
    getChartsCumulativeInvoicesLabel() {
      const type = this.filters.type.options.find((t) => t.active)?.name;
      const period = this.filters.period.options.find((t) => t.active)?.name;
      return this.charts.cumulativeInvoices.label
        .replace(/%type%/gi, type ?? "")
        .replace(/%period%/gi, period ?? "");
    },
    getChartsRevenuesPerProdCatProcessed() {
      return this.charts.revenuesPerProdCat.data.reduce((acc, cur) => {
        const { total_revenue, total_margin, category_name } = cur;
        const isFilterMargin =
          this.filters.type.options.find((option) => option.active)?.name ===
          "margin";

        if (isEmptyObject(acc)) {
          acc = {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          };
        }

        acc.labels?.push(category_name);
        acc.datasets[0].data.push(
          isFilterMargin ? financial(total_margin) : financial(total_revenue)
        );

        return acc;
      }, {});
    },
    getInvoicesTablesProcessed() {
      return [...this.tables.invoices.data]
        .sort(
          (a, b) =>
            (a.date !== b.date && moment(a.date).isBefore(b.date) ? 1 : -1) || 0
        )
        .slice(0, 15)
        .map((dataObj) => {
          const { total_invoice, total_margin, ...restData } = dataObj;
          return this.filters.type.options.find((option) => option.active)
            ?.name === "margin"
            ? { ...restData, total_margin: financial(total_margin) }
            : { ...restData, total_invoice: financial(total_invoice) };
        });
    },
    getCumulativeInvoicesMonthlyProcessed() {
      return !this.charts.cumulativeInvoices.data.monthly
        ? {}
        : [...this.charts.cumulativeInvoices.data.monthly]
            .sort(
              (a, b) =>
                (a.month !== b.month && moment(a.month).isAfter(b.month)
                  ? 1
                  : -1) || 0
            )
            .reduce((acc, cur) => {
              const { total_revenue, total_margin, month } = cur;
              const isFilterMargin =
                this.filters.type.options.find((option) => option.active)
                  ?.name === "margin";

              if (isEmptyObject(acc)) {
                acc = {
                  labels: [],
                  datasets: [
                    {
                      data: [],
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      borderColor: "rgba(255, 99, 132, 1)",
                      borderWidth: 1,
                    },
                  ],
                };
              }

              acc.labels?.push(moment.months()[moment(month).month()]);
              acc.datasets[0].data.push(
                isFilterMargin
                  ? financial(total_margin)
                  : financial(total_revenue)
              );

              return acc;
            }, {});
    },
    getCumulativeInvoicesWeeklyProcessed() {
      return !this.charts.cumulativeInvoices.data.weekly
        ? {}
        : [...this.charts.cumulativeInvoices.data.weekly]
            .sort((a, b) => {
              const weekA = moment(a.week, "YYYY WW").week();
              const weekB = moment(b.week, "YYYY WW").week();
              return (weekA !== weekB && weekA > weekB ? 1 : -1) || 0;
            })
            .reduce((acc, cur) => {
              const { total_revenue, total_margin, week } = cur;
              const isFilterMargin =
                this.filters.type.options.find((option) => option.active)
                  ?.name === "margin";

              if (isEmptyObject(acc)) {
                acc = {
                  labels: [],
                  datasets: [
                    {
                      data: [],
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      borderColor: "rgba(255, 99, 132, 1)",
                      borderWidth: 1,
                    },
                  ],
                };
              }

              acc.labels?.push(week);
              acc.datasets[0].data.push(
                isFilterMargin
                  ? financial(total_margin)
                  : financial(total_revenue)
              );

              return acc;
            }, {});
    },
    getBestCustomersTablesProcessed() {
      return this.tables.bestCustomers.data.map((dataObj) => {
        const { total_revenue, total_margin, ...restData } = dataObj;
        return this.filters.type.options.find((option) => option.active)
          ?.name === "margin"
          ? { ...restData, total_margin: financial(total_margin) }
          : { ...restData, total_revenue: financial(total_revenue) };
      });
    },
    setMenuOption(option: IMenuOption) {
      this.menuOption = option;
    },
    toggleMenuOpen() {
      this.menuOpen = !this.menuOpen;
    },
    setActiveFilter(type: IFilterTypes, value: IFilterOption["name"]) {
      this.filters[type].options = this.filters[type].options.map((filter) => ({
        ...filter,
        active: filter.name === value,
      }));
    },
    setTableData(type: ITableTypes, data: ITable["data"]) {
      this.tables[type].data = data;
    },
    getInvoices: flow(function* (this: any) {
      try {
        const { data } = yield getInvoicesApi();
        const modifiedData = data.map((el: Record<string, any>) => {
          const { invoice_lines, ...restData } = el;
          return restData;
        });
        this.setTableData("invoices", modifiedData);
      } catch (e) {
        console.log("GET_INVOICES", e);
      }
    }),
    getBestCustomers: flow(function* (this: any) {
      try {
        const { data } = yield getBestCustomersApi();
        this.setTableData("bestCustomers", data);
      } catch (e) {
        console.log("GET_BEST_CUSTOMERS", e);
      }
    }),
    getProductsCategoriesWithRevenues: flow(function* (this: any) {
      try {
        const { data } = yield getProductsCategoriesWithRevenuesApi();
        this.charts.revenuesPerProdCat.data = data;
      } catch (e) {
        console.log("GET_PRODUCTS_CATS_WITH_REVENUES", e);
      }
    }),
    getRevenuesByPeriod: flow(function* (this: any, period) {
      try {
        const { data } = yield getRevenuesByPeriodApi(period);
        this.charts.cumulativeInvoices.data[period] = data;
      } catch (e) {
        console.log("GET_REVENUES_BY_PERIOD", e);
      }
    }),
  };
}

export type IAppProviderStore = ReturnType<typeof createAppProviderStore>;
