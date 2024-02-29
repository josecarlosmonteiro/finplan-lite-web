'use client';

import { ReactNode, createContext, useState } from "react";
import { ReleaseProps } from "../types/Releases";
import { fixedReleaseService } from "../services/fixedReleases";

type FixedReleaseProps = {
  releases: ReleaseProps[];
  addItem: (payload: Omit<ReleaseProps, 'id'>) => void;
}

type Props = {
  initialData: ReleaseProps[];
  children: ReactNode;
}

export const FixedReleasesContext = createContext({} as FixedReleaseProps);


export function FixedReleasesProvider({ initialData, children }: Props) {
  const [releases, setReleases] = useState<ReleaseProps[]>(initialData);

  const addItem = async (payload: Omit<ReleaseProps, 'id'>) => {
    const response = await fixedReleaseService.create(payload);

    if (response) {
      setReleases(state => [...state, response]);
    }
  }

  const context: FixedReleaseProps = {
    releases,
    addItem,
  };

  return (
    <FixedReleasesContext.Provider value={context}>
      {children}
    </FixedReleasesContext.Provider>
  )
}