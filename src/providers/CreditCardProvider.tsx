'use client';

import { ReactNode, createContext, useState } from "react";
import { CreditCardRelease } from "../types/CreditCardReleases";
import { creditCardService } from "../services/creditCardReleses";

type CreditCardProviderProps = {
  creditCardReleases: CreditCardRelease[];
  addItem: (newItem: Omit<CreditCardRelease, 'id'>) => void;
}

export const CreditCardContext = createContext({} as CreditCardProviderProps);

type Props = {
  initialData?: CreditCardRelease[];
  children?: ReactNode;
}

export function creditCardProvider({ initialData, children }: Props) {
  const [creditCardReleases, setCreditCardReleases] = useState<CreditCardRelease[]>(initialData ?? []);

  const addItem = async (newItem: Omit<CreditCardRelease, 'id'>) => {
    const response = await creditCardService.create(newItem);

    if (!response) {
      alert("Erro ao adicionar lançamento de cartão de crédito...");
      return;
    }

    setCreditCardReleases(state => [...state, response.data]);
  }

  const context = {
    creditCardReleases,
    addItem,
  };

  return (
    <CreditCardContext.Provider value={context}>
      {children}
    </CreditCardContext.Provider>
  )
}