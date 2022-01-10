import { useEffect, useState } from 'react';

export const useCollapsed = (): [
  collapsed: boolean,
  toggleCollapsed: () => void
] => {
  const [collapsed, setCollapsed] = useState(false);

  const storeCollapsed = (isCollapsed: boolean) => {
    window.localStorage.setItem('collapsed', String(isCollapsed));
    setCollapsed(isCollapsed);
  };

  const toggleCollapsed = () => {
    storeCollapsed(!collapsed);
  };

  useEffect(() => {
    const localCollapsed = window.localStorage.getItem('collapsed');

    if (localCollapsed) {
      setCollapsed(localCollapsed === 'true');
    } else {
      storeCollapsed(false);
    }
  }, []);

  return [collapsed, toggleCollapsed];
};
