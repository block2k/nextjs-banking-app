"use client";

import { ArcElement, Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            label: "Banks",
            data: [1250, 2300, 250],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
        labels: ["Bank 1", "Bank 2", "Bank 3"],
      }}
      options={{
        cutout: "80%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
