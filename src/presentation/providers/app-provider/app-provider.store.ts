import {
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
  getProductsApi,
} from "../../../api";
import moment from "moment";
import { financial } from "../../../utils";

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
    menuOption: null as unknown as IMenuOption,
    products: null as unknown as Record<number, unknown>,
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
        console.log("GET_PRODUCTS", e);
      }
    }),
    getBestCustomers: flow(function* (this: any) {
      try {
        const { data } = yield getBestCustomersApi();
        this.setTableData("bestCustomers", data);
      } catch (e) {
        console.log("GET_PRODUCTS", e);
      }
    }),
  };
}

export type IAppProviderStore = ReturnType<typeof createAppProviderStore>;
