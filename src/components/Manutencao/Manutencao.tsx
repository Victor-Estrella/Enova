"use client";

import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function AnaliseManutencao() {
    const [relatorio, setRelatorio] = useState({
        manutencoes: "",
        custo: "",
        frequencia: "",
    });

    const dados = {
        datas: ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05"],
        manutencoes: [10, 12, 8, 15, 13],
        custos: [1500, 1800, 1200, 2000, 1700],
        frequencias: [2, 3, 2, 4, 3],
    };

 