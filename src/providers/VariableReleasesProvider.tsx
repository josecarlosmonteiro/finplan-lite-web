'use client';

import { ReactNode, createContext, useState } from "react";
import { ReleaseProps, VariableReleaseProps } from "../types/Releases";

export type Props = {
  initialFixedReleases: ReleaseProps[];
  initialVariableReleases: VariableReleaseProps[];
  children: ReactNode;
};

export type VariableReleasesContextProps = {
  fixedReleases: ReleaseProps[];
  variableReleases: VariableReleaseProps[];
};


export const VariableReleasesContext = createContext({} as VariableReleasesContextProps);

export function VariableReleasesProvider({ initialFixedReleases, initialVariableReleases, children }: Props) {
  const [fixedReleases] = useState<ReleaseProps[]>(initialFixedReleases || []);
  const [variableReleases] = useState<VariableReleaseProps[]>(initialVariableReleases || []);

  const context: VariableReleasesContextProps = {
    fixedReleases,
    variableReleases,
  };

  return (
    <VariableReleasesContext.Provider value={context}>
      {children}
    </VariableReleasesContext.Provider>
  )
}