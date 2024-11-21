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

    const frequenciaData = {
        labels: dados.datas,
        datasets: [
            {
                label: "Frequência de Manutenção",
                data: dados.frequencias,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Período" } },
            y: { title: { display: true, text: "Valores" } },
        },
    };

    return (
        <>
            <Header/>
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h1 style={{ textAlign: "center" }}>Análise de Manutenção</h1>

                <h2 style={{ textAlign: "center" }}>Manutenções Realizadas</h2>
                <Bar data={manutencoesData} options={options} />

                <h2 style={{ textAlign: "center" }}>Custo Total de Manutenção</h2>
                <Line data={custoData} options={options} />

                <h2 style={{ textAlign: "center" }}>Frequência de Manutenção</h2>
                <Line data={frequenciaData} options={options} />

                <div style={{ background: "#f9f9f9", border: "1px solid #ddd", padding: "15px", marginTop: "20px", borderRadius: "5px" }}>
                    <h3>Relatório Explicativo</h3>
                    <p>{relatorio.manutencoes}</p>
                    <p>{relatorio.custo}</p>
                    <p>{relatorio.frequencia}</p>
                </div>
            </div>
        </>
    );
}

