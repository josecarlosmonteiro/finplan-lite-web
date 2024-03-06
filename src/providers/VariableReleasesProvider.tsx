'use client';

import { ReactNode, createContext, useState } from "react";
import { EditableReleaseProps, ReleaseProps, VariableReleaseProps } from "../types/Releases";
import { variableReleasesService } from "../services/variableReleases";

export type Props = {
  initialFixedReleases: EditableReleaseProps[];
  initialVariableReleases: VariableReleaseProps[];
  children: ReactNode;
};

export type VariableReleasesContextProps = {
  fixedReleases: EditableReleaseProps[];
  variableReleases: VariableReleaseProps[];
  addVariableRelease: (payload: VariableReleaseProps) => void;
  editFixedRelease: (release: EditableReleaseProps) => void;
  confirmFixedRelease: (release: VariableReleaseProps) => void;
  removeVariableRelease: (id: string) => void;
};


export const VariableReleasesContext = createContext({} as VariableReleasesContextProps);

export function VariableReleasesProvider({ initialFixedReleases, initialVariableReleases, children }: Props) {
  const [fixedReleases, setFixedReleases] = useState<EditableReleaseProps[]>(initialFixedReleases || []);
  const [variableReleases, setVariableReleases] = useState<VariableReleaseProps[]>(initialVariableReleases || []);

  const addVariableRelease = async (payload: VariableReleaseProps) => {
    const response = await variableReleasesService.create(payload);
    setVariableReleases(state => [...state, response]);
  }

  const editFixedRelease = (newRelease: EditableReleaseProps) => {
    setFixedReleases(state => state.map(el => el.id === newRelease.id ? newRelease : el))
  }

  const confirmFixedRelease = async (release: VariableReleaseProps) => {
    await addVariableRelease(release);
  }

  const removeVariableRelease = async (id: string) => {
    const response = await variableReleasesService.remove(id);
    if (response) setVariableReleases(state => state.filter(el => el.id !== id));
  }

  const context: VariableReleasesContextProps = {
    fixedReleases,
    variableReleases,
    addVariableRelease,
    editFixedRelease,
    confirmFixedRelease,
    removeVariableRelease,
  };

  return (
    <VariableReleasesContext.Provider value={context}>
      {children}
    </VariableReleasesContext.Provider>
  )
}