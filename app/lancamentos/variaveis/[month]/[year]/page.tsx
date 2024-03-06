import { DateNavigator } from "@/src/components/Releases/VariableReleases/DateNavigator";
import { SummaryPresentation } from "@/src/components/Releases/VariableReleases/SummaryPresentation";
import { Typography } from "@/src/components/shared/Typography";
import { VariableReleasesProvider } from "@/src/providers/VariableReleasesProvider";
import { fetchFixedReleases, fetchVariableReleases } from "@/src/services/server";
import { DateProps } from "@/src/types/Releases";

const fetchInitialData = async (month: string, year: number) => {
  const data = await Promise.all([
    fetchFixedReleases(),
    fetchVariableReleases(month, year)
  ]);

  return data;
}

export default async function VariableReleasesPage({ params }: { params: DateProps }) {
  const month = decodeURIComponent(params.month);

  const [fixedInitialData, variableInitialData] = await fetchInitialData(month, params.year);

  return (
    <VariableReleasesProvider
      initialFixedReleases={fixedInitialData || []}
      initialVariableReleases={variableInitialData || []}
    >
      <main className="flex justify-center">
        <div className="w-[75vw] m-8 p-4 bg-gray-100 rounded">
          <div className="flex justify-between items-center">
            <Typography.Title>Lançamentos Variáveis - {month}/{params.year}</Typography.Title>
            <DateNavigator initialDate={{ ...params, month }} />
          </div>
          <br />

          <SummaryPresentation date={{ ...params, month }} />
        </div>
      </main>
    </VariableReleasesProvider>
  )
}