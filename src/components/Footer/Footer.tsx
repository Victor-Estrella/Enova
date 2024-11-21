import Image from "next/image";
import Logo from "../../../public/img/logo.svg";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center py-10 bg-[#1A2B41] text-[#D1E8FF] border-t border-gray-600">
            <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 mb-6">
                <Image src={Logo} alt="Logo da Enova" />
                <h1 className="text-white font-bold text-2xl sm:text-4xl">Enova</h1>
            </div>
            <div>
                <ul className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 lg:space-x-8 mb-6">
                    <li><a href="#hero" className="text-[#D1E8FF] hover:text-[#AFCBFF] text-base lg:text-lg">Hero</a></li>
                    <li><a href="#fontes" className="text-[#D1E8FF] hover:text-[#AFCBFF] text-base lg:text-lg">Fontes de Energia</a></li>
                    <li><a href="#problema" className="text-[#D1E8FF] hover:text-[#AFCBFF] text-base lg:text-lg">Problema</a></li>
                    <li><a href="#solucao" className="text-[#D1E8FF] hover:text-[#AFCBFF] text-base lg:text-lg">Solução</a></li>
                    <li><a href="#integrantes" className="text-[#D1E8FF] hover:text-[#AFCBFF] text-base lg:text-lg">Integrantes</a></li>
                    <li><a href="#avaliacao" className="text-[#D1E8FF] hover:text-[#AFCBFF] text-base lg:text-lg">Avaliacao</a></li>
                </ul>
            </div>
            <div>
                <ul className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 lg:space-x-6 text-sm opacity-70 mb-4">
                    <li><a href="#" className="hover:text-[#AFCBFF]">Termos & Condições</a></li>
                    <li><a href="#" className="hover:text-[#AFCBFF]">Política de Privacidade</a></li>
                    <li><a href="#" className="hover:text-[#AFCBFF]">Acessibilidade</a></li>
                </ul>
            </div>
            <div className="text-xs text-gray-400 mt-4 text-center">
                © {new Date().getFullYear()} Enova. Todos os direitos reservados.
            </div>
        </footer>
    );
}
