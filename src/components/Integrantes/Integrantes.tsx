import Image from "next/image";
import Github from "../../../public/img/github.svg";
import Linkedin from "../../../public/img/linkedin.svg";
import Leticia from "../../../public/img/leticia.jpg";
import Henrique from "../../../public/img/henrique.png";
import Andre from '../../../public/img/andre.jpg';

export default function Integrantes() {
  return (
    <section className="flex flex-col items-center justify-center my-12 min-h-screen">
        <h2 className="mt-12 mb-5 text-[#101828] font-bold text-3xl md:text-4xl lg:text-5xl">Integrantes</h2>
        <h6 className="mb-12 text-sm text-center text-[#475467] md:text-sm lg:text-base">Profissionais dedicados e apaixonados pela energia verde, unidos para transformar o futuro com inovação e sustentabilidade.</h6>
        <div className="flex flex-col lg:flex-row items-center gap-5 lg:justify-evenly w-full">
            <div className="bg-[#3CAB90] bg-opacity-5 flex flex-col items-center border-[#3CAB90] border-2 rounded-xl gap-4 p-4 w-11/12 md:w-6/12 lg:w-1/4">
                <Image src={Henrique} alt="Victor Henrique Estrella Carracci" className="w-7/12 rounded-lg"/>
                <h6 className="text-[#101828] font-semibold text-base lg:text-xl">Victor Henrique Estrella Carracci</h6>
                <p className="text-[#475467]">RM: 556206</p>
                <p className="text-[#475467]">Turma: 1TDSPH - FIAP</p>
                <div className="flex gap-5">
                    <a href="https://www.linkedin.com/in/victor-carracci-29ba67296/" target="_blank"><Image src={Linkedin} alt="Ícone Linkedin"/></a>
                    <a href="https://github.com/Victor-Estrella" target="_blank"><Image src={Github} alt="Ícone Github"/></a>             
                </div>
            </div>

            <div className="bg-[#3CAB90] bg-opacity-5 flex flex-col items-center border-[#3CAB90] border-2 rounded-xl gap-4 p-4 w-11/12 md:w-6/12 lg:w-1/4">
                <Image src={Leticia} alt="Leticia Cristina dos Santos Passos" className="w-8/12 rounded-lg"/>
                <h6 className="text-[#101828] font-semibold text-base lg:text-xl">Leticia Cristina dos Santos Passos</h6>
                <p className="text-[#475467]">RM: 555241</p>
                <p className="text-[#475467]">Turma: 1TDSPH - FIAP</p>
                <div className="flex gap-5">
                    <a href="https://www.linkedin.com/in/leticia-cristina-dos-santos-passos-a1a988233/" target="_blank"><Image src={Linkedin} alt="Ícone Linkedin"/></a>
                    <a href="https://github.com/lecristina" target="_blank"><Image src={Github} alt="Ícone Github"/></a>             
                </div>
            </div>

            <div className="bg-[#3CAB90] bg-opacity-5 flex flex-col items-center border-[#3CAB90] border-2 rounded-xl gap-4 p-4 w-11/12 md:w-6/12 lg:w-1/4">
                <Image src={Andre} alt="André Rogério Vieira Pavanela Altobelli Antunes" className="w-8/12 rounded-lg"/>
                <h6 className="text-[#101828] font-semibold text-base lg:text-xl">André Rogério Vieira Pavanela Altobelli Antunes</h6>
                <p className="text-[#475467]">RM: 554764</p>
                <p className="text-[#475467]">Turma: 1TDSPH - FIAP</p>
                <div className="flex gap-5">
                    <a href="https://www.linkedin.com/in/andré-altobelli-antunes-99377425b/" target="_blank"><Image src={Linkedin} alt="Ícone Linkedin"/></a>
                    <a href="https://github.com/andrealtobelli" target="_blank" ><Image src={Github} alt="Ícone Github"/></a>             
                </div>
            </div>
        </div>
        
    </section>
  )
}
