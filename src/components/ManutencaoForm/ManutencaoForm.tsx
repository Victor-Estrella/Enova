"use client";
import { Props } from "@/type";
import { useState } from "react";

export default function ManutencaoForm({ idEnergia }: Props) {
    const [ultimaManutencao, setUltimaManutencao] = useState<string>("");
    const [tipoManutencao, setTipoManutencao] = useState<string>("");
    const [mensagem, setMensagem] = useState<string | null>(null);

    const salvarManutencao = async () => {
      if (!ultimaManutencao || !tipoManutencao) {
          setMensagem("Por favor, preencha todos os campos.");
          return;
      }
  
      const dataManutencao = new Date(ultimaManutencao);
      const dataAtual = new Date();
  
      let alerta = "";
      const diferencaDias = Math.floor((dataAtual.getTime() - dataManutencao.getTime()) / (1000 * 60 * 60 * 24));
  
      if (diferencaDias > 180) {
          alerta = "A manutenção está atrasada. Realize o procedimento o mais rápido possível!";
      } else if (diferencaDias > 90) {
          alerta = "A manutenção está próxima do limite. Agende uma revisão.";
      } else {
          alerta = "Manutenção em dia. Parabéns!";
      }
  
      try {
          const response = await fetch("http://localhost:8080/manutencao", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  idEnergia,
                  dtManutencao: ultimaManutencao,
                  tpManutencao: tipoManutencao,
                  dsManutencao: alerta,
              }),
          });
  
          if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Erro ao salvar: ${errorText}`);
          }
  
          setMensagem("Manutenção salva com sucesso!");
      } catch (error) {
          console.error("Erro ao salvar manutenção:", error);
          setMensagem("Erro ao salvar manutenção.");
      }
  };
  

    return (
        <form className="bg-white p-6 rounded-md shadow-md w-full max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-2xl font-bold mb-4">Cadastrar Manutenção</h2>
            <div className="mb-4">
                <label htmlFor="ultimaManutencao" className="block text-sm font-medium text-gray-700">Última Manutenção</label>
                <input type="date" id="ultimaManutencao" value={ultimaManutencao} onChange={(e) => setUltimaManutencao(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
            </div>
            <div className="mb-4">
                <label htmlFor="tipoManutencao" className="block text-sm font-medium text-gray-700">Tipo de Manutenção</label>
                <select id="tipoManutencao" value={tipoManutencao} onChange={(e) => setTipoManutencao(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                    <option value="">Selecione o tipo</option>
                    <option value="Preventiva">Preventiva</option>
                    <option value="Corretiva">Corretiva</option>
                    <option value="Emergencial">Emergencial</option>
                </select>
            </div>
            <button onClick={salvarManutencao} className="bg-green-600 text-white py-2 px-4 rounded-md w-full">
                Salvar Manutenção
            </button>
            {mensagem && <p className={`mt-4 ${mensagem.includes("Erro") ? "text-red-500" : "text-green-500"}`}>{mensagem}</p>}
        </form>
    );
}
