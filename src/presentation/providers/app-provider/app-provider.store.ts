import { IMenuOption } from "./app-provider.d";
import { flow } from "mobx";
import { getProductsApi } from "../../../api";

export function createAppProviderStore() {
  return {
    menuOption: null as unknown as IMenuOption,
    products: null as unknown as Record<number, unknown>,
    setMenuOption(option: IMenuOption) {
      this.menuOption = option;
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
