'use client';

import { useContext, useState } from "react";
import { Modal } from "../../shared/Modal";
import { AddVariableReleaseForm } from "./AddVariableReleaseForm";
import { Button } from "../../shared/Button";
import { VariableReleaseProps } from "@/src/types/Releases";
import { ColumnDef, Table } from "../../shared/Table";
import { currency } from "@/src/utils/formats";
import { VariableReleasesContext } from "@/src/providers/VariableReleasesProvider";
import { filterByProp } from "@/src/utils/lists";
import { Typography } from "../../shared/Typography";

type Props = {
  title: string;
  type: VariableReleaseProps['type'];
}


export function VariableReleaseTablePresentation({ title, type }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { variableReleases } = useContext(VariableReleasesContext)

  const bgColor = type === 'in' ? 'bg-emerald-500' : 'bg-red-500';

  const columns: ColumnDef<VariableReleaseProps>[] = [
    { accessKey: 'title', header: 'Lançamento' },
    { accessKey: 'category', header: 'Categoria', cellStyle: 'text-center' },
    { accessKey: 'releaseDate', header: 'Data do lançamento', cellStyle: 'text-center', formatFn: (data: Date) => new Date(data).toLocaleDateString('pt-br') },
    { accessKey: 'value', header: 'Valor(R$)', formatFn: currency, cellStyle: `text-center ${type === 'in' ? 'text-emerald-500' : 'text-red-500'}` }
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Typography.Subtitle>{title}</Typography.Subtitle>
        <Button
          className={`text-sm text-white ${bgColor}`}
          onClick={() => setIsOpen(true)}>
          Add lançamento
        </Button>
      </div>
      <br />

      <Table columns={columns} data={filterByProp(variableReleases, 'type', type) || []} />

      <Modal.Root
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        title={`Adicionar ${type === 'in' ? 'receita' : 'despesa'} ao mês`}
      >
        <Modal.Content>
          <AddVariableReleaseForm submitFn={data => alert(JSON.stringify(data))} type={type} />
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}