export type IAppProviderProps = {
  [key: string]: any;
};

export type IMenuOption = 'tables' | 'charts'

export type IFilterOption = {
  name: string,
  active: boolean
}
export type IFilter = {
  label: string;
  options: IFilterOption[];
}
export type IFilters = Record<IFilterTypes, IFilter>
export type IFilterTypes = "period" | "type"

export type ITableTypes = 'invoices' | 'bestCustomers'
export type ITable = {
  label: string;
  data: Record<string, any>[]
}
export type ITables = Record<ITableTypes, ITable>

export type IChartTypes = 'revenuesPerProdCat' | 'cumulativeInvoices'
export type IChart = {
  label: string;
  data: Record<string, any>[] & {
    monthly: Record<string, any>[],
    weekly: Record<string, any>[]
  }
}

export type ITables = Record<IChartTypes, IChart>