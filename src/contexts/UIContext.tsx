import { createContext, ReactNode, useContext } from 'react';

import { useCollapsed } from 'src/hooks';

type UIContextType = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

type UIProviderProps = {
  children: ReactNode;
};

const UIContext = createContext<Partial<UIContextType>>({});

function UIProvider({ children }: UIProviderProps) {
  const [collapsed, toggleCollapsed] = useCollapsed();

  return (
    <UIContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUIContext = () => useContext(UIContext);

export default UIProvider;
