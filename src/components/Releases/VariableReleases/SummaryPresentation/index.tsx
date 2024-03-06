'use client';

import { useContext, useState } from "react";

import { useRelease } from "@/src/hooks/useRelease";
import { VariableReleasesContext } from "@/src/providers/VariableReleasesProvider";
import { ReleaseVisualBalance } from "../../ReleaseVisualBalance";
import { DateProps, VariableReleaseProps } from "@/src/types/Releases";
import { Typography } from "../../../shared/Typography";
import { Button } from "../../../shared/Button";
import { GeneralVariableReleasesTable } from "./GeneralVariableReleasesTable";
import { EditableVariableReleasesTable } from "./EditableVariableReleasesTable";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { Modal } from "@/src/components/shared/Modal";
import { AddVariableReleaseForm } from "../AddVariableReleaseForm";

type Props = {
  date: DateProps;
}

const MODAL_MAP = {
  CLOSED: 0,
  REVENUE: 1,
  EXPENSE: 2,
}

export function SummaryPresentation({ date }: Props) {
  const [modalControl, setModalControl] = useState(MODAL_MAP.CLOSED);

  const {
    addVariableRelease,
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

          <div className="flex gap-2 justify-end">
            <Button className="flex gap-2 items-center text-white bg-emerald-500"
              onClick={() => setModalControl(MODAL_MAP.REVENUE)}>
              <BsArrowUp size={20} />
              Add receita
            </Button>

            <Button className="flex gap-2 items-center text-white bg-red-500"
              onClick={() => setModalControl(MODAL_MAP.EXPENSE)}>
              <BsArrowDown size={20} />
              Add despesa
            </Button>
          </div>
        </div>

        <GeneralVariableReleasesTable
          variableReleases={variableReleases}
          removeVariableRelease={removeVariableRelease} />
      </section>

      <Modal.Root
        title="Adicionar receita"
        isOpen={modalControl === MODAL_MAP.REVENUE}
        closeModal={() => setModalControl(MODAL_MAP.CLOSED)}>
        <Modal.Content>
          <AddVariableReleaseForm
            type={"in"}
            submitFn={data => addVariableRelease({ ...data, type: 'in', ...date })} />
        </Modal.Content>
      </Modal.Root>

      <Modal.Root
        title="Adicionar despesa"
        isOpen={modalControl === MODAL_MAP.EXPENSE}
        closeModal={() => setModalControl(MODAL_MAP.CLOSED)}>
        <Modal.Content>
          <AddVariableReleaseForm
            type={"out"}
            submitFn={data => addVariableRelease({ ...data, type: 'out', ...date })} />
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}