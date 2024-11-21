import Image from "next/image";
import Link from "next/link";
import PainelSolar from "../../../public/img/a.jpg";
import TurbinaEolica from "../../../public/img/aa.jpg";
import Manutencao from "../../../public/img/aaa.jpg";

export default function Solucao() {
    return (
        <div className="bg-[#E3FCEC] min-h-screen text-gray-800">
            <section id="solutions" className="py-16 px-4 bg-[#E3FCEC]">
                <h3 className="text-3xl font-bold text-center text-[#2E7D32] mb-12">Nossas Soluções</h3>
                <div className="flex flex-col space-y-8 md:space-y-10 justify-center">

                    <div className="flex flex-col md:flex-row md:space-x-10 space-y-8 md:space-y-0 justify-center">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <Image src={PainelSolar} alt="Painéis solares" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h4 className="text-2xl font-semibold text-[#2E7D32] mb-2">Monitoramento de Painéis Solares</h4>
                                <p className="text-gray-700">
                                    Análise detalhada e relatórios para otimizar a performance e reduzir custos.
                                </p>
                                <Link href="/painelsolar">
                                    <button className="mt-4 px-4 py-2 bg-[#2E7D32] text-white rounded-md hover:bg-[#1E5A22] transition-colors mx-auto block">
                                        Clique aqui
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <Image src={TurbinaEolica} alt="Turbinas eólicas" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h4 className="text-2xl font-semibold text-[#2E7D32] mb-2">Gestão de Turbinas Eólicas</h4>
                                <p className="text-gray-700">
                                    Sugestões de manutenção preventiva e alertas automáticos para garantir a eficiência.
                                </p>
                                <Link href="/turbinaeolica">
                                    <button className="mt-4 px-4 py-2 bg-[#2E7D32] text-white rounded-md hover:bg-[#1E5A22] transition-colors mx-auto block">
                                        Clique aqui
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow max-w-md">
                            <Image src={Manutencao} alt="Manutenção preventiva" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h4 className="text-2xl font-semibold text-[#2E7D32] mb-2">Sistema de Manutenção Preventiva</h4>
                                <p className="text-gray-700">
                                    Emissão de alertas automáticos e acesso ao histórico de manutenção para reduzir paradas inesperadas e prolongar a vida útil dos equipamentos.
                                </p>
                                <Link href="/manutencao">
                                    <button className="mt-4 px-4 py-2 bg-[#2E7D32] text-white rounded-md hover:bg-[#1E5A22] transition-colors mx-auto block">
                                        Clique aqui
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
