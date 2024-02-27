import { ReleasesTablePresentations } from "@/app/components/Releases/FixedReleases/ReleasesTablePresentations";
import { TotalReleases } from "@/app/components/Releases/FixedReleases/TotalReleases";
import { Button } from "@/app/components/shared/Button";
import { Typography } from "@/app/components/shared/Typography";
import { FixedReleasesProvider } from "@/app/providers/FixedReleasesProvider";

import { FIXED_RELEASES_MOCK } from '@/app/utils/mocks/RELEASES';

export default async function FixedReleases() {
  return (
    <FixedReleasesProvider initialData={FIXED_RELEASES_MOCK}>
      <main className="flex justify-center">
        <div className="m-8 w-[75vw]">
          <Typography.Title>Lançamentos Fixos</Typography.Title>
          <br />

          <div className="p-4 bg-gray-50 rounded">
            <div className="mx-auto">
              <TotalReleases />
            </div>
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