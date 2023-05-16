import {
  createContext,
  useState,
} from 'react';

interface SidebarState {
  isSidebarOpen: boolean,
  setIsSidebarOpen: (value: boolean) => void,
}

interface SidebarProviderProps {
  children: React.ReactNode,
}

export const SideCtx = createContext<SidebarState>({} as SidebarState);

export function SideProvider({
  children,
}: SidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SideCtx.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SideCtx.Provider>
  )
}
