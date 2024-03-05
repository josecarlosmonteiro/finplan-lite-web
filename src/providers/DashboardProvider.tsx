'use client';

import { ReactNode, createContext, useState } from "react";
import { ReleaseProps } from "../types/Releases";

export type DashboardDataProps = {
  fixedReleases: ReleaseProps[];
}

export type DashboardContextProps = {
  fixedReleases: ReleaseProps[];
}

export const DashboardContext = createContext({} as DashboardContextProps);

export function DashboardProvider({ initialData, children }: { initialData: DashboardDataProps; children: ReactNode }) {
  const [fixedReleases, setFixedReleases] = useState(initialData.fixedReleases || []);
  
  const context: DashboardContextProps = {
    fixedReleases,
  };

  return (
    <DashboardContext.Provider value={context}>
      {children}
    </DashboardContext.Provider>
  )
}