'use client'

import { ReleaseProps } from "../types/Releases";
import { filterByProp, totalByProp } from "../utils/lists";

export function useRelease(releases: ReleaseProps[]) {
  const revenues = filterByProp(releases, 'type', 'in');
  const totalRevenues = totalByProp(revenues, 'value');

  const expenses = filterByProp(releases, 'type', 'out');
  const totalExpenses = totalByProp(expenses, 'value');

  return {
    revenues,
    totalRevenues,
    expenses,
    totalExpenses,
  };
}