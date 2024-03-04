"use client";

import { useRelease } from "@/src/hooks/useRelease";
import { DashboardContext } from "@/src/providers/DashboardProvider";
import { useContext } from "react";
import { ColumnDef, Table } from "../../shared/Table";
import { currency } from "@/src/utils/formats";

type CategoryProps = {
  category: string;
  total: number;
};

const columns: ColumnDef<CategoryProps>[] = [
  { accessKey: "category", header: "Categoria" },
  { accessKey: "total", header: "Total ($)", formatFn: currency },
];

export function FixedReleasesSummary() {
  const { fixedReleases } = useContext(DashboardContext);
  const { totalsByCategories } = useRelease(fixedReleases);

  return (
    <div>
      <Table columns={columns} data={totalsByCategories || []} />
    </div>
  );
}
