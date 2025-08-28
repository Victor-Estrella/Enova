"use client"
import { TipoEnergia } from "@/type";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function SistemaEnergiaForm({ sistema }: { sistema?: TipoEnergia }) {
  const router = useRouter();

  const [formData, setFormData] = useState<TipoEnergia>({
    txTipo: '',
    txLocalizacao: '',
    nrCapacidade: 0,
    dtInstalacao: '',
    stSistema: ''
  });

  const [sistemas, setSistemas] = useState<TipoEnergia[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fetchSistema = async () => {
    try {
  const response = await fetch('http://enova-java:8080/sistema');
      if (!response.ok) throw new Error('Erro ao carregar os sistemas.');
      const data = await response.json();
      setSistemas(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSistema();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingIndex !== null) {
  const response = await fetch(`http://enova-java:8080/sistema/${formData.idEnergia}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Erro ao atualizar o sistema.');
      } else {
  const response = await fetch('http://enova-java:8080/sistema', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Erro ao adicionar o sistema.');
      }

      fetchSistema();
      setFormData({
        txTipo: '',
        txLocalizacao: '',
        nrCapacidade: 0,
        dtInstalacao: '',
        stSistema: ''
      });
      setEditingIndex(null);
    } catch (err) {
      console.error(err);
    }
  };

  const editarSistema = (index: number) => {
    const editaSistema = sistemas[index];
    setFormData({
      idEnergia: editaSistema.idEnergia,
      txTipo: editaSistema.txTipo,
      txLocalizacao: editaSistema.txLocalizacao,
      nrCapacidade: editaSistema.nrCapacidade,
      dtInstalacao: editaSistema.dtInstalacao,
      stSistema: editaSistema.stSistema
    });
    setEditingIndex(index);
  };

  const deletarSistema = async (index: number) => {
    const deletaSistema = sistemas[index];
    try {
  const response = await fetch(`http://enova-java:8080/sistema/${deletaSistema.idEnergia}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar o sistema.');

      fetchSistema();
    } catch (err) {
      console.error(err);
    }
  };

  // Função para navegar para a página de detalhes
  const verMais = (id: string) => {
    router.push(`/sistema/${id}`);
  };

  const ajustarDataParaLocal = (dataAtual: string) => {
    const data = new Date(dataAtual);
    return new Date(data.getTime() + data.getTimezoneOffset() * 60000);
  };
  return (
    <section className="flex flex-col items-center min-h-screen bg-[#E0E0E0]">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md w-11/12 mt-4">
        <h2 className="text-2xl font-bold text-center">Cadastrar Sistema de Energia</h2>

        <div>
          <label htmlFor="txTipo" className="block text-sm font-medium text-gray-700">Tipo</label>
          <select id="txTipo" name="txTipo" value={formData.txTipo} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
            <option value="" disabled>Selecione</option>
            <option value="Eólica">Eólica</option>
            <option value="Solar">Solar</option>
          </select>
        </div>

        <div>
          <label htmlFor="txLocalizacao" className="block text-sm font-medium text-gray-700">Localização</label>
          <input type="text" id="txLocalizacao" name="txLocalizacao" value={formData.txLocalizacao} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
        </div>

        <div>
          <label htmlFor="nrCapacidade" className="block text-sm font-medium text-gray-700">Capacidade de geração (em kW)</label>
          <input type="number" id="nrCapacidade" name="nrCapacidade" value={formData.nrCapacidade} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
        </div>

        <div>
          <label htmlFor="dtInstalacao" className="block text-sm font-medium text-gray-700">Data de Instalação</label>
          <input type="date" id="dtInstalacao" name="dtInstalacao" value={formData.dtInstalacao} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
        </div>

        <div>
          <label htmlFor="stSistema" className="block text-sm font-medium text-gray-700">Status do Sistema</label>
          <select id="stSistema" name="stSistema" value={formData.stSistema} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
            <option value="" disabled>Selecione</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Manutenção">Manutenção</option>
          </select>
        </div>

        <div className="text-center">
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md">
            {sistema ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>

      {/* Lista de Sistemas Cadastrados */}
      <div className="p-4">
        <h3 className="text-xl lg:text-3xl font-bold mb-4">Lista de Sistemas de Energia</h3>
        <ul className="space-y-4">
          {sistemas.map((sistema, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-md bg-gray-200">
              <h4 className="font-semibold text-xl lg:text-2xl">
                {sistema.txTipo} ({ajustarDataParaLocal(sistema.dtInstalacao).toLocaleDateString()})
              </h4>
              <p className="text-black text-base"><strong>Localização:</strong> {sistema.txLocalizacao}</p>
              <p className="text-black text-base"><strong>Capacidade:</strong> {sistema.nrCapacidade} kW</p>
              <p className="text-black text-base"><strong>Status:</strong> {sistema.stSistema}</p>
              <div className="mt-2 flex space-x-2">
                <button onClick={() => editarSistema(index)} className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600">Editar</button>
                <button onClick={() => deletarSistema(index)} className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Deletar</button>
                <button onClick={() => verMais(String(sistema.idEnergia))} className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600">Ver Mais</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
