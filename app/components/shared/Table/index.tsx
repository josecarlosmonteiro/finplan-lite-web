export interface ColumnDef<T> {
  accessKey: keyof T;
  header?: string;
}

interface Props<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export function Table<T>({ columns, data }: Props<T>) {
  return (
    <table className="w-full" border={1}>
      <thead className="bg-white">
        <tr>
          {
            columns.map(({ header }, index) => (
              <th
                key={`col_${index}`}
                className="p-2">
                {header}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          data?.map((row, indexRow) => (
            <tr key={`row_${indexRow}`}>
              {
                columns.map((col, indexCol) => (
                  <td
                    key={`data_${indexRow}_${indexCol}`}
                    className="p-1 border-b">
                    {row[col.accessKey] as string}
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}