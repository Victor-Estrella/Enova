"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function EnergiaSolar() {
    const [dados, setDados] = useState({ datas: [], producoes: [], consumos: [], eficiencia: [] });
    const [relatorio, setRelatorio] = useState({
        producao: "",
        consumo: "",
        eficiencia: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/eolica");
                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.statusText}`);
                }
    
                const result = await response.json();
    
                // Verifica se as propriedades esperadas existem
                if (
                    result.datas &&
                    result.consumos &&
                    result.eficiencia &&
                    result.producoes &&
                    Array.isArray(result.datas) &&
                    Array.isArray(result.consumos) &&
                    Array.isArray(result.eficiencia) &&
                    Array.isArray(result.producoes)
                ) {
                    const { datas, consumos, eficiencia, producoes } = result;
    
                    setDados({ datas, producoes, consumos, eficiencia });
    
                    const totalProducao = producoes.reduce((a: number, b: number) => a + b, 0);
                    const totalConsumo = consumos.reduce((a: number, b: number) => a + b, 0);
                    const mediaEficiencia = (eficiencia.reduce((a: number, b: number) => a + b, 0) / eficiencia.length).toFixed(2);
    
                    setRelatorio({
                        producao: `A produção total de energia solar no período foi de ${totalProducao.toFixed(
                            2
                        )} kWh, com o pico de ${Math.max(
                            ...producoes
                        ).toFixed(2)} kWh registrado em ${datas[producoes.indexOf(Math.max(...producoes))]}.`,
                        consumo: `O consumo total de energia no período foi de ${totalConsumo.toFixed(
                            2
                        )} kWh, mantendo-se inferior à produção, o que garante energia excedente para outras aplicações.`,
                        eficiencia: `A eficiência média do sistema solar foi de ${mediaEficiencia}%, com a maior eficiência de ${Math.max(
                            ...eficiencia
                        ).toFixed(2)}% registrada em ${datas[eficiencia.indexOf(Math.max(...eficiencia))]}.`,
                    });
                } else {
                    throw new Error("Formato inesperado de dados na API.");
                }
            } catch (error) {
                console.error("Erro ao buscar os dados da API:", error);
            }
        };
    
        fetchData();
    }, []);
    

    const producaoData = {
        labels: dados.datas,
        datasets: [
            {
                label: "Produção Solar (kWh)",
                data: dados.producoes,
                borderColor: "green",
                backgroundColor: "rgba(0, 128, 0, 0.1)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const consumoData = {
        labels: dados.datas,
        datasets: [
            {
                label: "Consumo de Energia (kWh)",
                data: dados.consumos,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const eficienciaData = {
        labels: dados.datas,
        datasets: [
            {
                label: "Eficiência (%)",
                data: dados.eficiencia,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Data" } },
            y: { title: { display: true, text: "Valores" } },
        },
    };

    return (
        <>
            <Header />
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h1 style={{ textAlign: "center" }}>Análise de Energia Solar</h1>

                <h2 style={{ textAlign: "center" }}>Produção de Energia Solar</h2>
                <Line data={producaoData} options={options} />

                <h2 style={{ textAlign: "center" }}>Consumo de Energia</h2>
                <Line data={consumoData} options={options} />

                <h2 style={{ textAlign: "center" }}>Eficiência do Sistema Solar</h2>
                <Line data={eficienciaData} options={options} />

                <div
                    style={{
                        background: "#f9f9f9",
                        border: "1px solid #ddd",
                        padding: "15px",
                        marginTop: "20px",
                        borderRadius: "5px",
                    }}
                >
                    <h3>Relatório Explicativo</h3>
                    <p>{relatorio.producao}</p>
                    <p>{relatorio.consumo}</p>
                    <p>{relatorio.eficiencia}</p>
                </div>
            </div>
        </>
    );
}
