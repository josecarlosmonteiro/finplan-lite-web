'use client'

import { useState } from "react";
import { BsCheck2 } from 'react-icons/bs';

import { allMonthNames } from "@/src/utils/dates"
import { ChartComponent } from "../../shared/ChartComponent"
import { Typography } from "../../shared/Typography"
import { Button } from "../../shared/Button";
import { VariableReleaseProps } from "@/src/types/Releases";
import { filterByProp, totalByProp } from "@/src/utils/lists";

type Props = {
  anualRevenues: VariableReleaseProps[];
  anualExpenses: VariableReleaseProps[];
}

export function AnualSummaryCharts({ anualRevenues, anualExpenses }: Props) {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const months = allMonthNames();

  return (
    <div>
      <div className="h-80 flex gap-4">
        <div className="w-3/4 p-2 bg-gray-50 shadow">
          <ChartComponent
            type={chartType}
            labels={months}
            datasets={[
              {
                data: months.map(el => ({ x: el, y: totalByProp(filterByProp(anualRevenues, 'month', el), 'value') })),
                label: 'receitas'
              },
              {
                data: months.map(el => ({ x: el, y: totalByProp(filterByProp(anualExpenses, 'month', el), 'value') })),
                label: 'despesas'
              },
            ]} />
        </div>

        <div className="w-1/3 flex flex-col gap-4 items-center">
          <Typography.Subtitle>Tipos de Gráficos</Typography.Subtitle>
          <Button
            className={`w-full flex justify-center items-center gap-2 ${chartType === 'bar' ? 'bg-blue-400 text-white' : 'text-blue-400 border-2 border-blue-400'}`}
            onClick={() => setChartType('bar')}
          >
            {chartType === 'bar' && <BsCheck2 size={22} />}
            barras
          </Button>
          <Button
            className={`w-full flex justify-center items-center gap-2 ${chartType === 'line' ? 'bg-blue-400 text-white' : 'text-blue-400 border-2 border-blue-400'}`}
            onClick={() => setChartType('line')}
          >
            {chartType === 'line' && <BsCheck2 size={22} />}
            Linhas
          </Button>
        </div>
      </div>
    </div>
  )
}