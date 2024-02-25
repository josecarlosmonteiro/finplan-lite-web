import { TotalReleases } from "@/app/components/FixedReleases/TotalReleases";
import { Typography } from "@/app/components/shared/Typography";

export default async function FixedReleases() {
  return (
    <main className="flex justify-center">
      <div className="m-8 w-[90vw]">
        <Typography.Title>Lançamentos Fixos</Typography.Title>
        <br />

        <div className="p-4 bg-gray-50 rounded">
          <div className="w-3/4 mx-auto">
            <TotalReleases />
          </div>
          <div className="flex gap-6">
            <section className="w-full">
            </section>
            <section className="w-full"></section>
          </div>
        </div>
      </div>
    </main>
  )
}