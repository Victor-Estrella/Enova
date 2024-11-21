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

    // Gera o relatório com base nos dados
    useEffect(() => {
        const totalManutencoes = dados.manutencoes.reduce((a, b) => a + b, 0);
        const custoTotal = dados.custos.reduce((a, b) => a + b, 0);
        const frequenciaMedia = (dados.frequencias.reduce((a, b) => a + b, 0) / dados.frequencias.length).toFixed(2);

        setRelatorio({
            manutencoes: `Um total de ${totalManutencoes} manutenções foram realizadas no período, com o maior número (${Math.max(
                ...dados.manutencoes
            )}) em ${dados.datas[dados.manutencoes.indexOf(Math.max(...dados.manutencoes))]}.`,
            custo: `O custo total de manutenção foi de R$ ${custoTotal.toLocaleString()}, com o maior gasto de R$ ${Math.max(
                ...dados.custos
            ).toLocaleString()} em ${dados.datas[dados.custos.indexOf(Math.max(...dados.custos))]}.`,
            frequencia: `A frequência média de manutenções foi de ${frequenciaMedia} por mês, com o pico de ${Math.max(
                ...dados.frequencias
            )} manutenções/mês em ${dados.datas[dados.frequencias.indexOf(Math.max(...dados.frequencias))]}.`,
        });
    }, []);

    // Configurações dos gráficos
    const manutencoesData = {
        labels: dados.datas,
        datasets: [
            {
                label: "Manutenções Realizadas",
                data: dados.manutencoes,
                backgroundColor: "rgba(0, 123, 255, 0.7)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const custoData = {
        labels: dados.datas,
        datasets: [
            {
                label: "Custo de Manutenção (R$)",
                data: dados.custos,
                borderColor: "green",
                backgroundColor: "rgba(0, 128, 0, 0.1)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

