"use client";

import { REVENUES_CATEGORIES } from "../constants/CATEGORIES";
import { ReleaseProps } from "../types/Releases";
import { filterByProp, totalByProp, uniquesByProp } from "../utils/lists";

export type CategoryProps = {
  category: string;
  type: "in" | "out";
  total: number;
};

export function useRelease(releases: ReleaseProps[]) {
  const revenues = filterByProp(releases, "type", "in");
  const totalRevenues = totalByProp(revenues, "value");

  const expenses = filterByProp(releases, "type", "out");
  const totalExpenses = totalByProp(expenses, "value");

  const categories: string[] = uniquesByProp(releases, "category");

  const totalsByCategories: CategoryProps[] = categories.map((cat) => ({
    category: cat,
    type: REVENUES_CATEGORIES.includes(cat) ? "in" : "out",
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
