import { currency } from "@/app/utils/formats";
import { Typography } from "../shared/Typography";

export function TotalReleases() {
  return (
    <div className="flex gap-8">
      <span className="p-4 w-full flex items-center justify-between bg-white text-emerald-500 rounded shadow">
        <Typography.Subtitle>Receitas</Typography.Subtitle>
        <Typography.Subtitle>{currency(2500)}</Typography.Subtitle>
      </span>
      <span className="p-4 w-full flex items-center justify-between bg-white text-red-500 rounded shadow">
        <Typography.Subtitle>Despesas</Typography.Subtitle>
        <Typography.Subtitle>{currency(1500)}</Typography.Subtitle>
      </span>
    </div>
  )
}