'use client';

import { CreditCardRelease } from "@/src/types/CreditCardReleases";
import { ColumnDef, Table } from "../../shared/Table";
import { currency } from "@/src/utils/formats";
import { useContext } from "react";
import { CreditCardContext } from "@/src/providers/CreditCardProvider";

export function CreditCardPresentationTable() {
  const { creditCardReleases } = useContext(CreditCardContext);

  const columns: ColumnDef<CreditCardRelease>[] = [
    { accessKey: 'title', header: 'Lançamento', cellStyle: 'center', },
    {
      accessKey: 'numberOfInstallments',
      header: 'Qt. Parcelas',
      cellStyle: 'center',
      cell: info => (
        <div className="text-center">
          {info.numberOfInstallments}x
        </div>
      )
    },
    { accessKey: 'numberInstallmentsPayd', header: 'Parcelas pagas', cellStyle: 'center' },
    { accessKey: 'installmentValue', header: 'Valor da parcela ($)', cellStyle: 'center', formatFn: currency }
  ];

  return (
    <Table columns={columns} data={creditCardReleases} />
  )
}