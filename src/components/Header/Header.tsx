import Image from "next/image"
import Logo from "../../../public/img/logo.svg"
import styles from './header.module.css'
import Link from "next/link"
export default function Header() {
  return (
    <header>
        <nav className="flex justify-between items-center py-4 px-8 bg-[#0B9586]">
            <div className="flex items-center lg:space-x-3">
                <Image src={Logo} alt="Logo da Enova" className="hidden md:block"/>
                <h1 className={`text-2xl font-bold text-white hidden lg:block font-kan ${styles.sombra}`}>Enova</h1>
            </div>
            <div>
                <ul className="flex space-x-4 lg:space-x-8">
                    <li><a href="/" className="text-white hover:text-gray-400 outline-none text-base lg:text-lg">Home</a></li>
                    <li><Link href="/sistema" className="text-white hover:text-gray-400 outline-none text-base lg:text-lg">Sistema</Link></li>
                    <li><Link href="/cadastro" className="text-white bg-[#126e63fa] p-2 rounded-xl border-2 border-[#052c28fa] hover:text-gray-400 outline-none text-base text-nowrap lg:text-lg">Cadastre-se</Link></li>
                </ul>
            </div>
        </nav>
    </header>
  )
}