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