import { IFilterOption, IFilterTypes, IMenuOption } from "./app-provider.d";
import { flow } from "mobx";
import { getProductsApi } from "../../../api";

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
    menuOption: null as unknown as IMenuOption,
    products: null as unknown as Record<number, unknown>,
    setMenuOption(option: IMenuOption) {
      this.menuOption = option;
    },
    setActiveFilter(type: IFilterTypes, value: IFilterOption["name"]) {
      this.filters[type].options = this.filters[type].options.map((filter) => ({
        ...filter,
        active: filter.name === value,
      }));
    },
    getProducts: flow(function* () {
      try {
        const response = yield getProductsApi();
        // @ts-ignore
        this.products = response;
      } catch (e) {
        console.log("GET_PRODUCTS", e);
      }
    }),
  };
}

export type IAppProviderStore = ReturnType<typeof createAppProviderStore>;
