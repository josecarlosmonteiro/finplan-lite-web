import { FixedReleasesSummary } from "@/src/components/Releases/Dashboard/FixedReleasesSummary";
import { Typography } from "@/src/components/shared/Typography";
import { DashboardDataProps, DashboardProvider } from "@/src/providers/DashboardProvider";

const fetchInitialData = async () => {
  try {
    const response = await fetch('http://localhost:7001/fixed-releases', {
      cache: 'no-cache'
    });

    if (!response.ok) throw new Error('Erro ao buscar dados iniciais');

    const fixedReleases = await response.json();

    const initialData = {
      fixedReleases,
    }

    return initialData;
  } catch (error) {
    console.log(error);

    return {
      fixedReleases: [],
    }
  }
}

export default async function Home() {
  const initialData: DashboardDataProps = await fetchInitialData();

  return (
    <DashboardProvider initialData={initialData}>
      <main className="p-4">
        <div className="w-[80vw] mx-auto mt-4 p-4 rounded bg-gray-100">
          <Typography.Title>Lançamentos Fixos</Typography.Title>
          <br />

          <FixedReleasesSummary />
        </div>
      </main>
    </DashboardProvider>
  );
}
