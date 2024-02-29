'use client';

import { useContext } from "react";

import { Typography } from "../../shared/Typography";
import { ReleaseVisualBalance } from "../ReleaseVisualBalance";
import { FixedReleasesContext } from "@/src/providers/FixedReleasesProvider";
import { useRelease } from "@/src/hooks/useRelease";
import { currency } from "@/src/utils/formats";

export function TotalReleases() {
  const { releases } = useContext(FixedReleasesContext);
  const { totalRevenues, totalExpenses } = useRelease(releases);

  return (
    <>
      <div className="flex gap-8">
        <span className="p-4 w-full flex items-center justify-between bg-white text-emerald-500 rounded shadow">
          <Typography.Subtitle>Receitas</Typography.Subtitle>
          <Typography.Subtitle>{currency(totalRevenues)}</Typography.Subtitle>
        </span>
        <span className="p-4 w-full flex items-center justify-between bg-white text-red-500 rounded shadow">
          <Typography.Subtitle>Despesas</Typography.Subtitle>
          <Typography.Subtitle>{currency(totalExpenses)}</Typography.Subtitle>
        </span>
      </div>

      <br />

      <ReleaseVisualBalance
        revenues={totalRevenues}
        expenses={totalExpenses}
      />
    </>
  )
}