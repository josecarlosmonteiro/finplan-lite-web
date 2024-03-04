"use client";

import { CategoryProps, useRelease } from "@/src/hooks/useRelease";
import { DashboardContext } from "@/src/providers/DashboardProvider";
import { useContext } from "react";
import { ColumnDef, Table } from "../../shared/Table";
import { currency } from "@/src/utils/formats";
import { Typography } from "../../shared/Typography";
import { filterByProp } from "@/src/utils/lists";

const columns: ColumnDef<CategoryProps>[] = [
  { accessKey: "category", header: "Categoria", cellStyle: "text-center" },
  {
    accessKey: "total",
    header: "Total ($)",
    cell: (info) => (
      <div
        className={`text-center ${
          info.type === "in" ? "text-emerald-500" : "text-red-500"
        }`}
      >
        {currency(info.total)}
      </div>
    ),
  },
];

export function FixedReleasesSummary() {
  const { fixedReleases } = useContext(DashboardContext);
  const { totalsByCategories } = useRelease(fixedReleases);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Typography.Subtitle>Receitas fixas por categoria</Typography.Subtitle>
        <Table
          columns={columns}
          data={filterByProp(totalsByCategories, "type", "in") || []}
        />
      </section>
      <section className="flex flex-col gap-3">
        <Typography.Subtitle>Despesas fixas por categoria</Typography.Subtitle>
        <Table
          columns={columns}
          data={filterByProp(totalsByCategories, "type", "out") || []}
        />
      </section>
    </div>
  );
}
