"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { PythonDados } from "@/type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const apiPython = process.env.NEXT_PUBLIC_API_PYTHON || "http://localhost:5000";

export default function SolarReport() {

  const [dados, setDados] = useState<PythonDados | null>(null);

  useEffect(() => {
    // Busca os dados da API Flask
    fetch(`${apiPython}/solar`)
      .then((response) => response.json())
      .then((data) => setDados(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  if (!dados) {
    return <p>Carregando dados...</p>;
  }

  // Função para gerar descrições automáticas
  const gerarRelatorio = (dados: PythonDados) => {
    const totalProducao = dados.producoes.reduce((a, b) => a + b, 0);
    const totalConsumo = dados.consumos.reduce((a, b) => a + b, 0);
    const mediaEficiencia = (
      dados.eficiencia.reduce((a, b) => a + b, 0) / dados.eficiencia.length
    ).toFixed(2);

    return {
      producao: `A produção total de energia solar no período foi de ${totalProducao} kWh, com um aumento gradual, atingindo o pico de ${Math.max(
        ...dados.producoes
      )} kWh em ${
        dados.datas[dados.producoes.indexOf(Math.max(...dados.producoes))]
      }.`,
      consumo: `O consumo total de energia no mesmo período foi de ${totalConsumo} kWh. Observa-se que o consumo é consistentemente menor que a produção, garantindo um excedente energético.`,
      eficiencia: `A eficiência média do sistema solar foi de ${mediaEficiencia}%, com uma melhoria ao longo do período, alcançando o valor máximo de ${Math.max(
        ...dados.eficiencia
      )}% em ${
        dados.datas[dados.eficiencia.indexOf(Math.max(...dados.eficiencia))]
      }.`,
    };
  };

  const relatorio = gerarRelatorio(dados);

  // Configuração dos gráficos
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Gráfico de Energia Solar" },
    },
  };

  const dataProducao = {
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

  const dataConsumo = {
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

  const dataEficiencia = {
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

  return (
    <>
      <Header />
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>Análise de Energia Solar</h1>

        <h2 style={{ textAlign: "center" }}>Produção de Energia Solar</h2>
        <Line options={options} data={dataProducao} />

        <h2 style={{ textAlign: "center" }}>Consumo de Energia</h2>
        <Line options={options} data={dataConsumo} />

        <h2 style={{ textAlign: "center" }}>Eficiência do Sistema Solar</h2>
        <Line options={options} data={dataEficiencia} />

        <div
          style={{
            background: "#f9f9f9",
            border: "1px solid #ddd",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Relatório Explicativo</h3>
          <p>{relatorio.producao}</p>
          <p>{relatorio.consumo}</p>
          <p>{relatorio.eficiencia}</p>
        </div>
      </div>
    </>
  );
}
