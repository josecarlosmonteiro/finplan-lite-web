"use client";

import { ReleaseProps } from "../types/Releases";
import { filterByProp, totalByProp, uniquesByProp } from "../utils/lists";

export function useRelease(releases: ReleaseProps[]) {
  const revenues = filterByProp(releases, "type", "in");
  const totalRevenues = totalByProp(revenues, "value");

  const expenses = filterByProp(releases, "type", "out");
  const totalExpenses = totalByProp(expenses, "value");

  const categories: string[] = uniquesByProp(releases, "category");

  const totalsByCategories = categories.map((cat) => ({
    category: cat,
    total: totalByProp(filterByProp(releases, "category", cat), "value"),
  }));

  return {
    revenues,
    totalRevenues,
    expenses,
    totalExpenses,
    totalsByCategories,
  };
}
