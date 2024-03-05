import { DateNavigator } from "@/src/components/Releases/VariableReleases/DateNavigator";
import { Typography } from "@/src/components/shared/Typography";

export default function VariableReleasesPage() {
  return (
    <main className="flex justify-center">
      <div className="w-[75vw] m-8 p-4 bg-gray-100 rounded">
        <Typography.Title>Lançamentos Variáveis</Typography.Title>
        <DateNavigator />
      </div>
    </main>
  )
}