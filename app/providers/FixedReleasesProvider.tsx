'use client';

import { ReactNode, createContext, useState } from "react";
import { ReleaseProps } from "../types/Releases";

type FixedReleaseProps = {
  releases: ReleaseProps[];
}

export const FixedReleasesContext = createContext({} as FixedReleaseProps);

// MOCK INITIAL RELEASES
const data: ReleaseProps[] = [
  { title: 'salário', type: 'in', category: 'emprego', value: 2000, },
  { title: 'aluguel', type: 'out', category: 'moradia', value: 700, },
  { title: 'energia', type: 'out', category: 'moradia', value: 200, },
  { title: 'internet', type: 'out', category: 'moradia', value: 70, },
];

export function FixedReleasesProvider({ children }: { children: ReactNode }) {
  const [releases, setReleases] = useState<ReleaseProps[]>(data);

  const context: FixedReleaseProps = { releases };

  return (
    <FixedReleasesContext.Provider value={context}>
      {children}
    </FixedReleasesContext.Provider>
  )
}