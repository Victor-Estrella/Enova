import Image from "next/image";
import Link from "next/link";
import Problema from "../../public/img/imagem-problema.svg";

export default function NotFound() {
  return (
    <section className='flex flex-col items-center'>
      <h2 className='font-bold text-2xl lg:text-3xl mx-10 mt-10'>Ops! Conteúdo não localizado!</h2>
      <Image src={Problema} alt="Página não localizada" className='lg:w-2/5 xl:w-1/5 my-12' />
      <Link className='font-semibold bg-green-500 text-center text-sm md:text-lg w-11/12 md:w-6/12 lg:w-4/12 p-6 rounded-2xl text-white' href="/">Clique aqui para voltar para o ínicio</Link>
    </section>
  )
}
