'use client';

import { useState } from "react";
import { Modal } from "../../shared/Modal";
import { AddVariableReleaseForm } from "./AddVariableReleaseForm";
import { Button } from "../../shared/Button";
import { VariableReleaseProps } from "@/src/types/Releases";
import { ColumnDef, Table } from "../../shared/Table";
import { currency } from "@/src/utils/formats";

type Props = {
  type: VariableReleaseProps['type'];
}

const columns: ColumnDef<VariableReleaseProps>[] = [
  { accessKey: 'title', header: 'Lançamento' },
  { accessKey: 'category', header: 'Categoria' },
  { accessKey: 'releaseDate', header: 'Data do lançamento', formatFn: (data: Date) => data.toLocaleDateString('pt-br') },
  { accessKey: 'value', header: 'Valor(R$)', formatFn: currency }
];

export function VariableReleaseTablePresentation({ type }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const bgColor = type === 'in' ? 'bg-emerald-500' : 'bg-red-500';

  return (
    <div className="mt-2">
      <Button
        className={`text-sm text-white ${bgColor}`}
        onClick={() => setIsOpen(true)}>
        Add lançamento
      </Button>
      <br /><br />

      <Table columns={columns} data={[]} />

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