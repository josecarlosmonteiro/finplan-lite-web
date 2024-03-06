'use client';

import { useContext, useState } from "react";
import { BsArrowDown, BsArrowUp, BsXCircle } from 'react-icons/bs';

import { ColumnDef, Table } from "../../shared/Table";
import { Typography } from "../../shared/Typography";
import { Button } from "../../shared/Button";
import { Modal } from "../../shared/Modal";
import { AddReleaseForm } from "../AddReleaseForm";
import { ReleaseProps } from "@/src/types/Releases";
import { FixedReleasesContext } from "@/src/providers/FixedReleasesProvider";
import { filterByProp } from "@/src/utils/lists";
import { ReleaseVisualBalance } from "../ReleaseVisualBalance";
import { useRelease } from "@/src/hooks/useRelease";
import { currency } from "@/src/utils/formats";

export function ReleasesTablePresentations({ type }: { type: 'in' | 'out' }) {
  const { releases, addItem, removeItem } = useContext(FixedReleasesContext);
  const { totalRevenues, totalExpenses } = useRelease(releases);

  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const dataByType = () => {
    let data = {
      title: "",
      bgColor: "",
    };

    if (type === 'in') {
      data.title = 'Receitas';
      data.bgColor = 'bg-emerald-500';
    } else {
      data.title = 'Despesas';
      data.bgColor = 'bg-red-500';
    }

    return data;
  }

  const { title, bgColor } = dataByType();

  const columns: ColumnDef<ReleaseProps>[] = [
    { accessKey: 'title', header: 'Lançamento' },
    { accessKey: 'category', header: 'Categoria' },
    { accessKey: 'value', header: 'Valor (R$)', formatFn: currency, cellStyle: type === 'in' ? 'text-emerald-500' : 'text-red-500' },
    {
      accessKey: 'id', header: '', cell: info => (
        <Button
          className="text-gray-400 hover:text-red-500"
          onClick={() => removeItem(info.id)}>
          <BsXCircle size={20} />
        </Button>
      )
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <Typography.Subtitle>{title}</Typography.Subtitle>
        <Button className={`flex gap-2 items-center text-white ${bgColor}`}
          onClick={() => setModalStatus(true)}>
          {type === 'in' ? <BsArrowUp size={20} /> : <BsArrowDown size={20} />}
          Add {type === 'in' ? 'receita' : 'despesa'}
        </Button>
      </div>
      <br />

      <div className="text-center">
        <Table
          columns={columns}
          data={filterByProp(releases, 'type', type) || []} />
      </div>

      <Modal.Root
        title={`Planejar ${title} Fixas Mensais`}
        isOpen={modalStatus}
        closeModal={() => setModalStatus(false)}>
        <Modal.Content>
          <div className="flex flex-col gap-6">
            <ReleaseVisualBalance revenues={totalRevenues} expenses={totalExpenses} />
            <AddReleaseForm
              type={type}
              submitFn={addItem}
            />
          </div>
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}