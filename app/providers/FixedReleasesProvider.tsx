'use client';

import { ReactNode, createContext, useState } from "react";
import { ReleaseProps } from "../types/Releases";

type FixedReleaseProps = {
  releases: ReleaseProps[];
}

type Props = {
  initialData: ReleaseProps[];
  children: ReactNode;
}

export const FixedReleasesContext = createContext({} as FixedReleaseProps);


export function FixedReleasesProvider({ initialData, children }: Props) {
  const [releases, setReleases] = useState<ReleaseProps[]>(initialData);

  const context: FixedReleaseProps = { releases };

  return (
    <FixedReleasesContext.Provider value={context}>
      {children}
    </FixedReleasesContext.Provider>
  )
}