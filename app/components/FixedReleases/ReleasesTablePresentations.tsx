'use client';

import { ReleaseProps } from "@/app/types/Releases";
import { ColumnDef, Table } from "../shared/Table";
import { filterByProp } from "@/app/utils/lists";
import { useContext } from "react";
import { FixedReleasesContext } from "@/app/providers/FixedReleasesProvider";

const columns: ColumnDef<ReleaseProps>[] = [
  { accessKey: 'title', header: 'Lançamento' },
  { accessKey: 'category', header: 'Categoria' },
  { accessKey: 'value', header: 'Valor (R$)' },
];

export function ReleasesTablePresentations({ type }: { type: 'in' | 'out' }) {
  const { releases } = useContext(FixedReleasesContext);

  return (
    <Table
      columns={columns}
      data={filterByProp(releases, 'type', type) || []} />
  )
}