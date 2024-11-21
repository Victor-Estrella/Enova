import styles from './hero.module.css'

export default function Hero() {
  return (
    <section className={`relative h-screen bg-cover bg-center ${styles.heroSection}`}>
      <div className="relative z-10 text-white justify-center h-screen p-8 flex flex-col md:ml-10 lg:ml-24 lg:w-1/2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Energizando o Futuro Sustentável</h1>
        <p className="text-base md:text-lg lg:text-2xl w-11/12 font-semibold my-12">A Enova é uma empresa visionária que promove o uso de energias renováveis, transformando o mundo com soluções solares e eólicas para um amanhã mais verde.</p>
        <button className="bg-[#3CAB90] cursor-pointer text-white text-lg py-2 px-4 rounded-3xl w-3/4 md:w-1/3 lg:w-3/12">Fale com a gente</button>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </section>
  )
}