import { FixedReleasesSummary } from "@/src/components/Releases/Dashboard/FixedReleasesSummary";
import { AnualSummaryCharts } from "@/src/components/Releases/VariableReleases/AnualResumeCharts";
import { Typography } from "@/src/components/shared/Typography";
import { DashboardProvider } from "@/src/providers/DashboardProvider";
import { fetchAllVariableReleases, fetchFixedReleases } from "@/src/services/server";
import { ReleaseProps, VariableReleaseProps } from "@/src/types/Releases";
import { allMonthNames } from "@/src/utils/dates";
import { filterByProp } from "@/src/utils/lists";

const fetchInitialData = async (): Promise<[ReleaseProps[], VariableReleaseProps[]]> => {
  const data = await Promise.all([
    fetchFixedReleases(),
    fetchAllVariableReleases(),
  ]);

  return data;
}

export default async function Home() {
  const [fixedReleases, variableReleases] = await fetchInitialData();

  const currentYearReleases = filterByProp(variableReleases, 'year', 2024)
  const currentYearRevenues = filterByProp(currentYearReleases, 'type', 'in');
  const currentYearExpenses = filterByProp(currentYearReleases, 'type', 'out');

  return (
    <DashboardProvider initialData={{
      fixedReleases,
    }}>
      <main className="p-4">
        <div className="w-[80vw] mx-auto mt-4 p-4 rounded bg-gray-100">
          <div className="flex flex-col gap-6">
            <section>
              <Typography.Title>Resumo anual</Typography.Title>
              <br />
              <AnualSummaryCharts
                anualRevenues={currentYearRevenues}
                anualExpenses={currentYearExpenses} />
            </section>

            <section>
              <Typography.Title>Lançamentos Fixos</Typography.Title>
              <br />

              <FixedReleasesSummary />
            </section>
          </div>

        </div>
      </main>
    </DashboardProvider>
  );
}
