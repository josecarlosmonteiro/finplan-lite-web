import { ReleasesTablePresentations } from "@/app/components/FixedReleases/ReleasesTablePresentations";
import { TotalReleases } from "@/app/components/FixedReleases/TotalReleases";
import { Typography } from "@/app/components/shared/Typography";
import { FixedReleasesProvider } from "@/app/providers/FixedReleasesProvider";

export default async function FixedReleases() {
  return (
    <FixedReleasesProvider>

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