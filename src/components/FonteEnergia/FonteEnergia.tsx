import Image from "next/image";
import Eolica from "../../../public/img/eolica.svg";
import Hidreletrica from "../../../public/img/hidreletrica.svg";
import Solar from '../../../public/img/solar.svg';
import Biomassa from '../../../public/img/biomassa.jpg';
import Geotermica from '../../../public/img/geotermica.webp';

export default function FonteEnergia() {
  return (
    <section className="flex flex-col items-center my-12 mb-24 min-h-screen">
        <h2 className="mt-12 mb-5 text-[#101828] text-center font-bold text-3xl md:text-4xl lg:text-5xl">Fontes de energia renováveis</h2>
        <h3 className="mb-12 text-xs text-center text-[#475467] md:text-sm lg:text-base">Principais Tipos de Fontes de Energia Renováveis e O que são</h3>
        <div className="flex flex-wrap flex-col lg:flex-row items-center gap-5 lg:justify-evenly w-full">
            <div className="bg-[#3CAB90] bg-opacity-5 flex flex-col border-[#3CAB90] border-2 rounded-xl gap-4 p-4 w-11/12 md:w-6/12 lg:w-1/4">
                <Image src={Eolica} alt="Turbinas Eólicas" className="w-8/12 rounded-lg"/>
                <h6 className="text-[#101828] font-semibold text-base lg:text-xl">Energia Eólica</h6>
                <p className="text-[#475467]">A energia eólica é gerada pelo vento. Turbinas eólicas capturam a energia cinética do vento, fazendo suas lâminas girarem, o que aciona um gerador que converte o movimento em eletricidade.</p>
            </div>

            <div className="bg-[#3CAB90] bg-opacity-5 flex flex-col border-[#3CAB90] border-2 rounded-xl gap-4 p-4 w-11/12 md:w-6/12 lg:w-1/4">
                <Image src={Solar} alt="Painéis Solares" className="w-9/12 rounded-lg"/>
                <h6 className="text-[#101828] font-semibold text-base lg:text-xl">Energia Solar</h6>
                <p className="text-[#475467]">A energia solar vem do Sol e é captada por painéis solares que convertem a luz solar em eletricidade (energia fotovoltaica) ou por coletor solar térmico, que aquece água.</p>
            </div>

            <div className="bg-[#3CAB90] bg-opacity-5 flex flex-col border-[#3CAB90] border-2 rounded-xl gap-4 p-4 w-11/12 md:w-6/12 lg:w-1/4">
                <Image src={Hidreletrica} alt="Represa" className="w-9/12 rounded-lg"/>
                <h6 className="text-[#101828] font-semibold text-base lg:text-xl">Energia Hidrelétrica</h6>
                <p className="text-[#475467]">A energia hidrelétrica vem da energia potencial da água armazenada em represas ou rios. Quando a água é liberada, ela movimenta turbinas, gerando eletricidade.</p>
            </div>

            <div className="bg-[#3CAB90] bg-opacity-5 flex flex-col border-[#3CAB90] border-2 rounded-xl gap-4 p-4 w-11/12 lg:mt-12 md:w-6/12 lg:w-1/4">
                <Image src={Biomassa} alt=" Usinas Geotérmicas" className="w-9/12 rounded-lg"/>
                <h6 className="text-[#101828] font-semibold text-base lg:text-xl">Energia Biomassa</h6>
                <p className="text-[#475467]">A energia da biomassa é gerada a partir de matéria orgânica como madeira, resíduos agrícolas e lixo orgânico. Essa biomassa é queimada, gaseificada ou fermentada para gerar calor ou eletricidade.</p>
            </div>

            <div className="bg-[#3CAB90] bg-opacity-5 flex flex-col border-[#3CAB90] border-2 rounded-xl gap-4 p-4 lg:mt-12 w-11/12 md:w-6/12 lg:w-1/4">
                <Image src={Geotermica} alt="Caldeiras Industriais" className="w-9/12 rounded-lg"/>
                <h6 className="text-[#101828] font-semibold text-base lg:text-xl">Energia Geotermica</h6>
                <p className="text-[#475467]">A energia geotérmica aproveita o calor interno da Terra, vindo de reservatórios subterrâneos de água ou vapor quente. Esse calor é utilizado para gerar eletricidade ou para aquecer ambientes.</p>
            </div>

        </div>
        
    </section>
  )
}
