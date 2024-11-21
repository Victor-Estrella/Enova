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

