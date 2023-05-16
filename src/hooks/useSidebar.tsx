import {
  useContext,
  useCallback,
} from 'react';

import { SideCtx } from '../context/SideCtx';

export default function useSidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SideCtx);

  const toggleSidebar = useCallback((): void => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen, setIsSidebarOpen]);

  const closeSidebar = useCallback((): void => {
    setIsSidebarOpen(false);
  }, [setIsSidebarOpen]);

  const openSidebar = useCallback((): void => {
    setIsSidebarOpen(true);
  }, [setIsSidebarOpen]);

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };
}