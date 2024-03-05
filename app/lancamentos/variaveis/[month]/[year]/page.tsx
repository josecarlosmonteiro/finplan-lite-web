import { DateNavigator } from "@/src/components/Releases/VariableReleases/DateNavigator";
import { Typography } from "@/src/components/shared/Typography";

type DateProps = {
  month: string;
  year: number;
}

export default function VariableReleasesPage({ params }: { params: DateProps }) {
  return (
    <main className="flex justify-center">
      <div className="w-[75vw] m-8 p-4 bg-gray-100 rounded">
        <Typography.Title>Lançamentos Variáveis - {params.month}/{params.year}</Typography.Title>
        <br />
        <DateNavigator initialDate={params} />
      </div>
    </main>
  )
}