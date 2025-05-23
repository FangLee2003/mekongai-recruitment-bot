// import React from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface RadarChartProps {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        fill?: boolean;
        backgroundColor?: string;
        borderColor?: string;
        pointBackgroundColor?: string;
        pointBorderColor?: string;
        pointHoverBackgroundColor?: string;
        pointHoverBorderColor?: string;
    }>;
}

export default function RadarChart({ labels, datasets }: RadarChartProps) {
    // Chuẩn hóa màu nếu dataset nào thiếu màu
    const preparedDatasets = datasets.map((ds) => ({
        fill: ds.fill ?? true,
        backgroundColor: ds.backgroundColor ?? `rgba(54, 162, 235, 0.2)`,
        borderColor: ds.borderColor ?? `rgb(54, 162, 235)`,
        pointBackgroundColor: ds.pointBackgroundColor ?? `rgb(54, 162, 235)`,
        pointBorderColor: ds.pointBorderColor ?? "#fff",
        pointHoverBackgroundColor: ds.pointHoverBackgroundColor ?? "#fff",
        pointHoverBorderColor: ds.pointHoverBorderColor ?? `rgb(54, 162, 235)`,
        label: ds.label,
        data: ds.data,
    }));

    const chartData = {
        labels,
        datasets: preparedDatasets,
    };

    const chartOptions: ChartOptions<"radar"> = {
        responsive: true,
        scales: {
            r: {
                angleLines: { display: true },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 10,
                    color: "#374151",
                },
                pointLabels: {
                    font: { size: 12 },
                    color: "#1f2937",
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#111827",
                    font: { size: 14, weight: 600 },
                },
            },
            tooltip: { enabled: true },
        },
    };


    return <Radar data={chartData} options={chartOptions} />;
}
