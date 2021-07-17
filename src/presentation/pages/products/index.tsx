import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";

const Products = observer(() => {
  const appStore = useAppStore().root;

  useEffect(() => {
    if (!appStore.products) appStore.getProducts();
  }, []);

  return (
    <div className={"productsPage"}>
      {appStore.products
        ? JSON.stringify(appStore.products, null, 2)
        : "Loading..."}
    </div>
  );
});

export default Products;
