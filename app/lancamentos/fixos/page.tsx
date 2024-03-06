import Link from "next/link";

import { ReleasesTablePresentations } from "@/src/components/Releases/FixedReleases/ReleasesTablePresentations";
import { TotalReleases } from "@/src/components/Releases/FixedReleases/TotalReleases";
import { Typography } from "@/src/components/shared/Typography";
import { FixedReleasesProvider } from "@/src/providers/FixedReleasesProvider";
import { fetchFixedReleases } from "@/src/services/server";

export default async function FixedReleases() {
  const response = await fetchFixedReleases();

  return (
    <FixedReleasesProvider initialData={response || []}>
      <main className="flex justify-center">
        <div className="m-8 w-[75vw]">
          <Typography.Title>Lançamentos Fixos</Typography.Title>
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