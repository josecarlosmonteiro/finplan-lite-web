import { ReactNode } from "react";

export interface ColumnDef<T> {
  accessKey: keyof T;
  header?: string;
  formatFn?: (data: any) => string | number;
  cell?: (info: T) => ReactNode;
  cellStyle?: string;
}

interface Props<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export function Table<T>({ columns, data }: Props<T>) {
  return (
    <table className="w-full">
      <thead className="bg-gray-200">
        <tr>
          {
            columns.map(({ header }, index) => (
              <th
                key={`col_${index}`}
                className="p-1">
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
                    className={`p-1 border-b ${col.cellStyle}`}>
                    {
                      col.cell
                        ? col.cell(row)
                        : <>
                          {col.formatFn
                            ? col.formatFn(row[col.accessKey])
                            : row[col.accessKey]
                          }
                        </>
                    }
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