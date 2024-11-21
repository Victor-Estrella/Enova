import Avaliacao from "@/components/Avaliacao/Avaliacao";
import FonteEnergia from "@/components/FonteEnergia/FonteEnergia";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Integrantes from "@/components/Integrantes/Integrantes";
import Problema from "@/components/Problema/Problema";
import Solucao from "@/components/Solucao/Solucao";

export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <FonteEnergia/>
      <Problema/>
      <Solucao/>
      <Integrantes/>
      <Avaliacao/>
      <Footer/>
    </>
  );
}
