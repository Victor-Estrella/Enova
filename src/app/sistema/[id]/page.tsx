"use client";
import Header from "@/components/Header/Header";
import Eficiencia from "@/components/Eficiencia/Eficiencia";
import { TipoEnergia, TipoEficiencia, TipoManutencao } from "@/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ManutencaoForm from "@/components/ManutencaoForm/ManutencaoForm";

export default function SistemaDetalhes() {
    const { id } = useParams();
    const [sistema, setSistema] = useState<TipoEnergia | null>(null);
    const [eficiencia, setEficiencia] = useState<TipoEficiencia | null>(null);
    const [manutencoes, setManutencoes] = useState<TipoManutencao[]>([]);

    const apiJava = process.env.NEXT_PUBLIC_API_JAVA || "http://localhost:8080";

    // Função para buscar os detalhes do sistema
    const fetchSistemaDetalhes = async (id: string) => {
        try {
            const response = await fetch(`${apiJava}/sistema/${id}`);
            if (!response.ok) throw new Error("Erro ao carregar os detalhes do sistema.");
            const data = await response.json();
            setSistema(data);
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    // Função para buscar a eficiência
    const fetchEficiencia = async (idEnergia: string) => {
        try {
            const response = await fetch(`${apiJava}/analise/energia/${idEnergia}`);
            if (!response.ok) throw new Error("Erro ao carregar a eficiência.");
            const data = await response.json();
            setEficiencia(data[0]); // Define a eficiência mais recente
        } catch (error) {
            console.error("Erro ao buscar a eficiência:", error);
        }
    };

    // Função para buscar as manutenções
    const fetchManutencoes = async (idEnergia: string) => {
        try {
            const response = await fetch(`${apiJava}/manutencao/energia/${idEnergia}`);
            if (!response.ok) throw new Error("Erro ao carregar as manutenções.");
            const data = await response.json();
            setManutencoes(data); // Define as manutenções
        } catch (error) {
            console.error("Erro ao buscar as manutenções:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSistemaDetalhes(id as string);
            fetchEficiencia(id as string);
            fetchManutencoes(id as string);
        }
    }, [id, fetchSistemaDetalhes, fetchEficiencia, fetchManutencoes]);

    const ajustarDataParaLocal = (dataAtual: string) => {
        const data = new Date(dataAtual);
        return new Date(data.getTime() + data.getTimezoneOffset() * 60000);
    };
    

    return (
        <>
            <Header />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold">Detalhes do Sistema de Energia</h1>
                <p><strong>Tipo:</strong> {sistema?.txTipo}</p>
                <p><strong>Localização:</strong> {sistema?.txLocalizacao}</p>
                <p><strong>Capacidade:</strong> {sistema?.nrCapacidade} kW</p>
                <p><strong>Status:</strong> {sistema?.stSistema}</p>
                <p><strong>Data de Instalação:</strong> {sistema?.dtInstalacao ? new Date(sistema.dtInstalacao).toLocaleDateString() : "N/A"}</p>

                <h2 className="text-xl mt-6 font-semibold">Eficiência</h2>
                {eficiencia ? (
                    <div>
                        <p><strong>Data de Análise:</strong> {ajustarDataParaLocal(eficiencia.dtAnalise).toLocaleDateString()}</p>
                        <p><strong>Produção de Energia:</strong> {eficiencia.nrProducaoEnergia} kWh</p>
                        <p><strong>Consumo de Energia:</strong> {eficiencia.nrConsumoEnergia} kWh</p>
                        <p><strong>Eficiência:</strong> {eficiencia.nrEficiencia.toFixed(2)}%</p>
                    </div>
                ) : (
                    <p>Carregando eficiência...</p>
                )}

                {/* Formulário de eficiência */}
                <Eficiencia idEnergia={parseInt(id as string, 10)} />


                {manutencoes.length > 0 ? (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Histórico de Manutenções:</h3>
                        <ul className="list-disc pl-6">
                            {manutencoes.map((manutencao) => (
                                <li key={manutencao.idManutencao}>
                                    <p><strong>Data:</strong> {ajustarDataParaLocal(manutencao.dtManutencao).toLocaleDateString()}</p>
                                    <p><strong>Tipo:</strong> {manutencao.tpManutencao}</p>
                                    <p><strong>Descrição:</strong> {manutencao.dsManutencao}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Carregando manutenções...</p>
                )}

                {/* Formulário de manutenção */}
                <ManutencaoForm idEnergia={parseInt(id as string, 10)} />
            </div>
        </>
    );
}
