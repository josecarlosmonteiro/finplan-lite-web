"use client";

import { useEffect, useRef } from "react";
import { Chart, ChartTypeRegistry } from "chart.js/auto";

type Props = {
  type: keyof ChartTypeRegistry;
  labels: string[];
  datasets: any[];
  labelPosition?: "left" | "top" | "right" | "bottom" | "center" | "chartArea";
};

export function ChartComponent({
  type,
  labels,
  datasets,
  labelPosition,
}: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");

    new Chart(canvas, {
      type,
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        layout: { autoPadding: false },
        plugins: {
          legend: {
            position: labelPosition || "top",
          },
        },
      },
    });

    const div = chartRef.current;

    if (div) {
      div.appendChild(canvas);
    }

    return () => canvas.remove();
  }, [datasets, labelPosition, labels, type]);

  return <div ref={chartRef} className="w-full h-full flex justify-center"></div>;
}
