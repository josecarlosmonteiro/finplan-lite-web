'use client';

import { Button } from "@/src/components/shared/Button";
import { ColumnDef, Table } from "@/src/components/shared/Table";
import { DateProps, EditableReleaseProps, ReleaseProps, VariableReleaseProps } from "@/src/types/Releases";
import { currency } from "@/src/utils/formats";
import { useState } from "react";
import { BsCheckCircle, BsCheckCircleFill, BsPencil } from "react-icons/bs";

type Props = {
  date: DateProps;
  fixedReleases: EditableReleaseProps[];
  variableReleases: VariableReleaseProps[];
  confirmFixedRelease: (release: VariableReleaseProps) => void;
  editFixedRelease: (release: EditableReleaseProps) => void;
}

export function EditableVariableReleasesTable({ date, fixedReleases, variableReleases, confirmFixedRelease, editFixedRelease }: Props) {
  const [newReleaseValue, setNewReleaseValue] = useState<number | undefined>();

  const consolidateRelease = (release: ReleaseProps) => {
    confirmFixedRelease({ ...release, ...date, year: Number(date.year) });
  }

  const openedColumns: ColumnDef<EditableReleaseProps>[] = [
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

  return (
    <Table
      columns={openedColumns}
      data={fixedReleases.filter(
        fixedRel =>
          !variableReleases
            .map(el => el.id)
            .includes(fixedRel.id))
      } />
  )
}