'use client';

import { useContext, useState } from "react";
import { BsXCircle } from 'react-icons/bs';

import { Modal } from "../../shared/Modal";
import { AddVariableReleaseForm } from "./AddVariableReleaseForm";
import { Button } from "../../shared/Button";
import { ColumnDef, Table } from "../../shared/Table";
import { Typography } from "../../shared/Typography";
import { DateProps, VariableReleaseProps } from "@/src/types/Releases";
import { currency } from "@/src/utils/formats";
import { filterByProp } from "@/src/utils/lists";
import { VariableReleasesContext } from "@/src/providers/VariableReleasesProvider";
import { useRelease } from "@/src/hooks/useRelease";

type Props = {
  title: string;
  type: VariableReleaseProps['type'];
  dateProps: DateProps
}

export function VariableReleaseTablePresentation({ title, dateProps, type }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { variableReleases, addVariableRelease, removeVariableRelease } = useContext(VariableReleasesContext);
  const { totalRevenues, totalExpenses } = useRelease(variableReleases);

  const bgColor = type === 'in' ? 'bg-emerald-500' : 'bg-red-500';

  const columns: ColumnDef<VariableReleaseProps>[] = [
    { accessKey: 'title', header: 'Lançamento' },
    { accessKey: 'category', header: 'Categoria', cellStyle: 'text-center' },
    { accessKey: 'releaseDate', header: 'Data do lançamento', cellStyle: 'text-center', formatFn: (data: Date) => new Date(data).toLocaleDateString('pt-br') },
    { accessKey: 'value', header: 'Valor(R$)', formatFn: currency, cellStyle: `text-center ${type === 'in' ? 'text-emerald-500' : 'text-red-500'}` },
    {
      accessKey: 'id', cell: info => (
        <button className="p-2 text-gray-500" onClick={() => removeVariableRelease(info.id)}>
          <BsXCircle size={18} />
        </button>
      )
    }
  ];

  const totalTitle = currency(type === 'in' ? totalRevenues : totalExpenses);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Typography.Subtitle>
          {title} - <span className={type === 'in' ? 'text-emerald-500' : 'text-red-500'}>{totalTitle}</span>
        </Typography.Subtitle>
        <Button
          className={`text-sm text-white ${bgColor}`}
          onClick={() => setIsOpen(true)}>
          Add lançamento
        </Button>
      </div>
      <br />

      <Table
        columns={columns}
        data={filterByProp(variableReleases, 'type', type) || []} />

      <Modal.Root
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        title={`Adicionar ${type === 'in' ? 'receita' : 'despesa'} ao mês`}
      >
        <Modal.Content>
          <AddVariableReleaseForm submitFn={data => addVariableRelease({ ...data, ...dateProps })} type={type} />
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}