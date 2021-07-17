import React, {ReactElement} from 'react';
import { IAppProviderProps } from './app-provider.d';
import { observer, useLocalStore } from 'mobx-react-lite';
import {
  createAppProviderStore,
  IAppProviderStore,
} from './app-provider.store';

const storeContext = React.createContext<{ root: IAppProviderStore } | null>(null);

export const AppProvider = observer(({ children }): ReactElement<IAppProviderProps> => {
  const store = useLocalStore(() => createAppProviderStore());
  return <storeContext.Provider value={{ root: store }}>{children}</storeContext.Provider>;
});

export const useAppStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useAppStore must be used within a AppProvider.');
  }
  return store;
};
