import { DateNavigator } from "@/src/components/Releases/VariableReleases/DateNavigator";
import { Typography } from "@/src/components/shared/Typography";
import { VariableReleasesProvider } from "@/src/providers/VariableReleasesProvider";
import { fetchFixedReleases, fetchVariableReleases } from "@/src/services/server";

type DateProps = {
  month: string;
  year: number;
}

const fetchInitialData = async (month: string, year: number) => {
  const data = await Promise.all([
    fetchFixedReleases(),
    fetchVariableReleases(month, year)
  ]);

  return data;
}

export default async function VariableReleasesPage({ params }: { params: DateProps }) {
  const [fixedInitialData, variableInitialData] = await fetchInitialData(params.month, params.year);

  return (
    <VariableReleasesProvider
      initialFixedReleases={[]}
      initialVariableReleases={[]}
    >
      <main className="flex justify-center">
        <div className="w-[75vw] m-8 p-4 bg-gray-100 rounded">
          <Typography.Title>Lançamentos Variáveis - {params.month}/{params.year}</Typography.Title>
          <br />
          <DateNavigator initialDate={params} />
          <br />

          <section>
            <pre>
              {JSON.stringify({ fixedInitialData, variableInitialData }, null, 2)}
            </pre>
          </section>
        </div>
      </main>
    </VariableReleasesProvider>
  )
}