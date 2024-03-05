"use client";

import { useContext } from "react";

import { CategoryProps, useRelease } from "@/src/hooks/useRelease";
import { DashboardContext } from "@/src/providers/DashboardProvider";
import { currency } from "@/src/utils/formats";
import { filterByProp } from "@/src/utils/lists";

import { ColumnDef, Table } from "../../shared/Table";
import { Typography } from "../../shared/Typography";
import { ChartComponent } from "../../shared/ChartComponent";

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

  const revenuesCategories = filterByProp(totalsByCategories, "type", "in");
  const expensesCategories = filterByProp(totalsByCategories, "type", "out");

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Typography.Subtitle>Receitas fixas por categoria</Typography.Subtitle>
        <div className="flex gap-4 items-start">
          <Table columns={columns} data={revenuesCategories || []} />

          <div className="w-1/2 h-[25vh]">
            <ChartComponent
              type="bar"
              labels={revenuesCategories.map((el) => el.category)}
              datasets={[
                {
                  label: "Receitas por categoria",
                  data: revenuesCategories.map((el) => el.total),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <br />

      <section className="flex flex-col gap-3">
        <Typography.Subtitle>Despesas fixas por categoria</Typography.Subtitle>
        <div className="flex gap-8 justify-center items-start">
          <Table columns={columns} data={expensesCategories || []} />
          <div className="w-1/2 h-[35vh]">
            <ChartComponent
              type="doughnut"
              labels={expensesCategories.map((el) => el.category)}
              datasets={[
                {
                  label: "Despesas por categoria",
                  data: expensesCategories.map((el) => el.total),
                  borderWidth: 2,
                },
              ]}
              labelPosition="right"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
