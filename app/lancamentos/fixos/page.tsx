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
          <div className="flex justify-between items-center">
            <Typography.Title>Lançamentos Fixos</Typography.Title>

            <div className="flex gap-4">
              <Button className="text-white bg-emerald-500">receitas</Button>
              <Button className="text-white bg-red-500">despesas</Button>
            </div>
          </div>
          <br />

          <div className="p-4 bg-gray-50 rounded">
            <div className="mx-auto">
              <TotalReleases />
            </div>
            <br /><br />

            <div className="flex flex-col gap-6">
              <section className="w-full">
                <span className="text-emerald-600">
                  <Typography.Subtitle>Receitas</Typography.Subtitle>
                </span>
                <br />

                <div className="text-center">
                  <ReleasesTablePresentations type="in" />
                </div>
              </section>

              <section className="w-full">
                <span className="text-red-600">
                  <Typography.Subtitle>Despesas</Typography.Subtitle>
                </span>
                <br />

                <div className="text-center">
                  <ReleasesTablePresentations type="out" />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </FixedReleasesProvider>
  )
}