import Image from "next/image"
import Turbina from "../../../public/img/turbina.svg"

export default function Problema() {
  return (
    <section className="flex flex-col-reverse lg:flex-row justify-center items-center gap-24 md:flex-col min-h-screen bg-[#E0E0E0]">
        <div className="w-10/12 lg:w-4/12 flex flex-col">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#101828]">O Desafio da Energia Renovável</h3>
            <p className="mt-6 text-[#475467] md:text-lg lg:text-xl">Usuários de energia solar e eólica enfrentam dificuldades em monitorar a produção, identificar perdas de eficiência e realizar manutenções preventivas. Isso leva a desperdício energético, falhas inesperadas e altos custos, comprometendo a sustentabilidade e aumentando a pegada de carbono.</p>
        </div>
        <div className="md:w-1/2 lg:inline-block lg:w-auto">
            <Image src={Turbina} alt="Turbina eólica"/>
        </div>
    </section>
)
}
