type Props = {
  revenues: number;
  expenses: number;
}

export function ReleaseVisualBalance({ revenues, expenses }: Props) {
  const amount = revenues + expenses;

  const revenuesPercentual = Math.floor((revenues / amount) * 100);
  const expensesPercentual = 100 - revenuesPercentual;

  return (
    <div className="w-full h-4 flex rounded-full shadow-md text-white">
      <div
        style={{ width: `${revenuesPercentual}%` }}
        className="flex items-center justify-center text-xs font-semibold bg-emerald-500 rounded-l-full text-center duration-500">
        {revenuesPercentual}%
      </div>
      <div
        style={{ width: `${expensesPercentual}%` }}
        className="flex items-center justify-center text-xs font-semibold bg-red-500 rounded-r-full text-center duration-500">
        {expensesPercentual}%
      </div>
    </div>
  )
}