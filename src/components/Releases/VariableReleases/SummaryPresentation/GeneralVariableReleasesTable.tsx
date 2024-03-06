import { BsXCircle } from "react-icons/bs";

import { Button } from "@/src/components/shared/Button";
import { ColumnDef, Table } from "@/src/components/shared/Table";
import { VariableReleaseProps } from "@/src/types/Releases";
import { currency } from "@/src/utils/formats";

type Props = {
  variableReleases: VariableReleaseProps[];
  removeVariableRelease: (id: string) => void;
}

export function GeneralVariableReleasesTable({ variableReleases, removeVariableRelease }: Props) {
  const variableReleasesColumns: ColumnDef<VariableReleaseProps>[] = [
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
          <Button className="text-gray-500 hover:text-red-500">
            <BsXCircle size={20} onClick={() => removeVariableRelease(info.id)} />
          </Button>
        </div>
      )
    },
  ];

  return <Table columns={variableReleasesColumns} data={variableReleases} />
}