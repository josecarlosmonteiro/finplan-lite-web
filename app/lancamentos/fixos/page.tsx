import { ReleasesTablePresentations } from "@/src/components/Releases/FixedReleases/ReleasesTablePresentations";
import { TotalReleases } from "@/src/components/Releases/FixedReleases/TotalReleases";
import { Typography } from "@/src/components/shared/Typography";
import { FixedReleasesProvider } from "@/src/providers/FixedReleasesProvider";
import Link from "next/link";

const fetchInitialData = async () => {
  try {
    const response = await fetch('http://localhost:7001/fixed-releases', {
      cache: 'no-cache',
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("ERROR");
    console.log(error.message);

    return [];
  }
}

export default async function FixedReleases() {
  const response = await fetchInitialData();

  return (
    <FixedReleasesProvider initialData={response || []}>
      <main className="flex justify-center">
        <div className="m-8 w-[75vw]">
          <Typography.Title>Lançamentos Fixos</Typography.Title>
          <Link href={'/'}>Voltar ao início</Link>
          <br /><br />

          <div className="p-4 bg-gray-50 rounded">
            <TotalReleases />

            <br /><br />

            <div className="flex flex-col gap-6">
              <section className="w-full">
                <ReleasesTablePresentations type="in" />
              </section>
              <section className="w-full">
                <ReleasesTablePresentations type="out" />
              </section>
            </div>
          </div>
        </div>
      </main>
    </FixedReleasesProvider>
  )
}