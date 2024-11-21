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
 

  
}