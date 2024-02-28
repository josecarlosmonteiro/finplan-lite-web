'use client';

import { useContext, useState } from "react";

import { ReleaseProps } from "@/app/types/Releases";
import { ColumnDef, Table } from "../../shared/Table";
import { filterByProp } from "@/app/utils/lists";
import { FixedReleasesContext } from "@/app/providers/FixedReleasesProvider";
import { Typography } from "../../shared/Typography";
import { Button } from "../../shared/Button";
import { Modal } from "../../shared/Modal";
import { AddReleaseForm } from "../AddReleaseForm";

const columns: ColumnDef<ReleaseProps>[] = [
  { accessKey: 'title', header: 'Lançamento' },
  { accessKey: 'category', header: 'Categoria' },
  { accessKey: 'value', header: 'Valor (R$)' },
];

export function ReleasesTablePresentations({ type }: { type: 'in' | 'out' }) {
  const { releases } = useContext(FixedReleasesContext);

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

  return (
    <div>
      <div className="flex justify-between items-center">
        <Typography.Subtitle>{title}</Typography.Subtitle>
        <Button
          className={`text-white py-1 ${bgColor}`}
          onClick={() => setModalStatus(true)}>
          planejar
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
          <AddReleaseForm type={type} />
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}