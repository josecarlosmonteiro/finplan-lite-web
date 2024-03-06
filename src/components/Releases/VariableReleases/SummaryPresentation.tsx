'use client';

import { useContext, useState } from "react";
import { BsXCircle, BsPencil, BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

import { useRelease } from "@/src/hooks/useRelease";
import { VariableReleasesContext } from "@/src/providers/VariableReleasesProvider";
import { ReleaseVisualBalance } from "../ReleaseVisualBalance";
import { DateProps, EditableReleaseProps, ReleaseProps, VariableReleaseProps } from "@/src/types/Releases";
import { Typography } from "../../shared/Typography";
import { ColumnDef, Table } from "../../shared/Table";
import { currency } from "@/src/utils/formats";
import { Button } from "../../shared/Button";

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

  const [newReleaseValue, setNewReleaseValue] = useState<number | undefined>();

  const consolidateRelease = (release: ReleaseProps) => {
    confirmFixedRelease({ ...release, ...date, year: Number(date.year) });
  }

  const openedColumns: ColumnDef<EditableReleaseProps>[] = [
    { accessKey: 'id', header: 'ID', cellStyle: 'text-center' },
    { accessKey: 'title', header: 'Lançamento' },
    { accessKey: 'category', header: 'Categoria', cellStyle: 'text-center' },
    {
      accessKey: 'value', header: 'Valor(R$)', cell: info => (
        <div className={`text-center ${info.type === 'in' ? 'text-emerald-500' : 'text-red-500'}`}>
          {
            info.editable
              ? <input
                className="w-24"
                value={newReleaseValue}
                onChange={({ target }) => setNewReleaseValue(Number(target.value))} />
              : currency(info.value)
          }
        </div>
      )
    },
    {
      accessKey: 'id', cell: info => (
        <div className="flex justify-center items-center gap-2">
          {
            !info.editable &&
            <Button
              className="!p-1.5 flex gap-2 items-center bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white rounded-full duration-200"
              onClick={() => consolidateRelease(info)}>
              <BsCheckCircle size={20} />
              Registrar
            </Button>
          }

          {
            !info.editable &&
            <Button
              className="!p-1.5 bg-transparent hover:bg-orange-500  text-orange-500 hover:text-white rounded-full duration-200"
              onClick={() => {
                editFixedRelease({ ...info, editable: true });
                setNewReleaseValue(info.value);
              }}
            >
              <BsPencil size={20} />
            </Button>
          }

          {
            info.editable &&
            <Button className="text-blue-400" onClick={() => {
              editFixedRelease({ ...info, value: Number(newReleaseValue), editable: false });
              setNewReleaseValue(undefined);
            }}>
              <BsCheckCircleFill size={20} />
            </Button>
          }
        </div>
      )
    }
  ];

  const variableReleasesColumns: ColumnDef<VariableReleaseProps>[] = [
    { accessKey: 'id', header: 'ID' },
    { accessKey: 'title', header: 'Título' },
    { accessKey: 'category', header: 'Categoria', cellStyle: 'text-center' },
    {
      accessKey: 'value', header: 'Valor(R$)', cell: info => (
        <div className={`text-center ${info.type === 'in' ? 'text-emerald-500' : 'text-red-500'}`}>
          {currency(Number(info.value))}
        </div>
      )
    },
    {
      accessKey: 'id', header: '', cell: info => (
        <div className="flex items-center justify-center gap-2">
          <Button className="text-gray-500">
            <BsXCircle size={20} onClick={() => removeVariableRelease(info.id)} />
          </Button>
        </div>
      )
    },
  ];

  return (
    <div>
      <ReleaseVisualBalance revenues={totalRevenues} expenses={totalExpenses} />
      <br /><br />

      <section className="flex flex-col gap-4">
        <Typography.Subtitle>Lançamentos em aberto</Typography.Subtitle>
        <Table
          columns={openedColumns}
          data={fixedReleases.filter(
            fixedRel =>
              !variableReleases
                .map(el => el.id)
                .includes(fixedRel.id))
          } />
      </section>

      <br /><br />

      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Typography.Subtitle>Lançamentos variáveis mensais</Typography.Subtitle>
          <Button className="">Add lançamento</Button>
        </div>
        <Table columns={variableReleasesColumns} data={variableReleases} />
      </section>
    </div>
  )
}