"use client";
import { useState } from "react";

interface EficienciaProps {
  idEnergia: number;
}

export default function Eficiencia({ idEnergia }: EficienciaProps) {
  const [producao, setProducao] = useState<number | "">("");
  const [consumo, setConsumo] = useState<number | "">("");
  const [mensagem, setMensagem] = useState("");

  const salvarEficiencia = async (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
  
    if (!producao || !consumo) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }
  
    const eficiencia = (Number(producao) / Number(consumo)) * 100;
  
    try {
      const response = await fetch("http://localhost:8080/analise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idEnergia,
          nrProducaoEnergia: producao,
          nrConsumoEnergia: consumo,
          nrEficiencia: eficiencia,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao salvar: ${errorText}`);
      }
  
      setMensagem("Dados salvos com sucesso!");
      setProducao("");
      setConsumo("");
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      setMensagem("Erro ao salvar os dados.");
    }
  };
 
  return (
    <form className="bg-white p-6 rounded-md shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Eficiência</h2>
      <div className="mb-4">
        <label htmlFor="producao" className="block text-sm font-medium text-gray-700">Produção de Energia (kWh)</label>
        <input type="number" id="producao" value={producao !== "" ? producao : ""} onChange={(e) => setProducao(e.target.value === "" ? "" : parseFloat(e.target.value))} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
      </div>
      <div className="mb-4">
        <label htmlFor="consumo" className="block text-sm font-medium text-gray-700">Consumo de Energia (kWh)</label>
        <input type="number" id="consumo" value={consumo !== "" ? consumo : ""} onChange={(e) => setConsumo(e.target.value === "" ? "" : parseFloat(e.target.value))} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
      </div>
      <button onClick={salvarEficiencia} className="bg-green-600 text-white py-2 px-4 rounded-md w-full">Salvar Eficiência
      </button>
      {mensagem && <p className={`mt-4 ${mensagem.includes("Erro") ? "text-red-500" : "text-green-500"}`}>{mensagem}</p>}
    </form>
  );
  
}