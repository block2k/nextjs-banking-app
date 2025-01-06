"use client";

import { ArcElement, Chart, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((account) => account.name);
  const balances = accounts.map((account) => account.currentBalance);

  return (
    <Doughnut
      data={{
        datasets: [
          {
            label: "Banks",
            data: balances,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
        labels: accountNames,
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
