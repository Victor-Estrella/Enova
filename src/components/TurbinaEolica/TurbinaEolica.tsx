"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function EnergiaEolica() {
    const [relatorio, setRelatorio] = useState({
        producao: "",
        consumo: "",
        eficiencia: "",
    });

    const dados = {
        datas: ["2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04", "2024-11-05"],
        producoes: [200, 250, 230, 280, 300],
        consumos: [180, 190, 200, 220, 230],
        eficiencia: [90, 95, 87, 93, 96],
    };

    // Gera o relatório baseado nos dados
    useEffect(() => {
        const totalProducao = dados.producoes.reduce((a, b) => a + b, 0);
        const totalConsumo = dados.consumos.reduce((a, b) => a + b, 0);
        const mediaEficiencia = (dados.eficiencia.reduce((a, b) => a + b, 0) / dados.eficiencia.length).toFixed(2);

        setRelatorio({
            producao: `A produção total de energia eólica no período foi de ${totalProducao} kWh, com o pico de ${Math.max(
                ...dados.producoes
            )} kWh registrado em ${dados.datas[dados.producoes.indexOf(Math.max(...dados.producoes))]}.`,
            consumo: `O consumo total de energia no período foi de ${totalConsumo} kWh, mantendo-se inferior à produção, o que garante energia excedente para outras aplicações.`,
            eficiencia: `A eficiência média do sistema eólico foi de ${mediaEficiencia}%, com a maior eficiência de ${Math.max(
                ...dados.eficiencia
            )}% registrada em ${dados.datas[dados.eficiencia.indexOf(Math.max(...dados.eficiencia))]}.`,
        });
    }, []);

