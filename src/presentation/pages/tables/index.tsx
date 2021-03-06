import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../providers/app-provider/app-provider";
import "./index.scss";

import Tables from "../../complex/tables";
import Spinner from "../../commons/spinner";

const TablesPage = observer(() => {
  const appStore = useAppStore().root;

  useEffect(() => {
    if (!appStore.tables.invoices.data) appStore.getInvoices();
    if (!appStore.tables.bestCustomers.data) appStore.getBestCustomers();
  }, [appStore.tables.invoices.data, appStore.tables.bestCustomers.data]);

  return (
    <div className={"tablesPage"}>
      {appStore.tables.invoices?.data && appStore.tables.bestCustomers?.data ? (
        <>
          <Tables
            dataset={appStore.getInvoicesTablesProcessed()}
            caption={appStore.tables.invoices.label}
          />
          <Tables
            dataset={appStore.getBestCustomersTablesProcessed()}
            caption={appStore.tables.bestCustomers.label}
          />
        </>
      ) : (
        <div className={"spinnerWrapper"}>
          <Spinner />
        </div>
      )}
    </div>
  );
});

export default TablesPage;
