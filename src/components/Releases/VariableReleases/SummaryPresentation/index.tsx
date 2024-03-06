'use client';

import { useContext } from "react";

import { useRelease } from "@/src/hooks/useRelease";
import { VariableReleasesContext } from "@/src/providers/VariableReleasesProvider";
import { ReleaseVisualBalance } from "../../ReleaseVisualBalance";
import { DateProps } from "@/src/types/Releases";
import { Typography } from "../../../shared/Typography";
import { Button } from "../../../shared/Button";
import { GeneralVariableReleasesTable } from "./GeneralVariableReleasesTable";
import { EditableVariableReleasesTable } from "./EditableVariableReleasesTable";

type Props = {
  date: DateProps;
}

export function SummaryPresentation({ date }: Props) {
  const {
    fixedReleases,
    variableReleases,
    editFixedRelease,
    confirmFixedRelease,
    removeVariableRelease
  } = useContext(VariableReleasesContext);

  const { totalRevenues, totalExpenses } = useRelease(variableReleases);

  return (
    <div>
      <ReleaseVisualBalance revenues={totalRevenues} expenses={totalExpenses} />
      <br /><br />

      <section className="flex flex-col gap-4">
        <Typography.Subtitle>Lançamentos em aberto</Typography.Subtitle>
        <EditableVariableReleasesTable
          date={date}
          fixedReleases={fixedReleases}
          variableReleases={variableReleases}
          editFixedRelease={editFixedRelease}
          confirmFixedRelease={confirmFixedRelease}
        />
      </section>

      <br /><br />

      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Typography.Subtitle>Lançamentos variáveis mensais</Typography.Subtitle>
          <Button className="">Add lançamento</Button>
        </div>

        <GeneralVariableReleasesTable
          variableReleases={variableReleases}
          removeVariableRelease={removeVariableRelease} />
      </section>
    </div>
  )
}