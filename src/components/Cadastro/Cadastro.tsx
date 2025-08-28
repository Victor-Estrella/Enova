"use client"
import Image from "next/image";
import CasaSustentavel from "../../../public/img/imagem-login-cadastro.svg";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<{ nome?: string; email?: string; senha?: string; geral?: string }>({});

  const router = useRouter();

  const validarRegistro = (): boolean => {
    const errors: { nome?: string; email?: string; senha?: string } = {};

    if (!nome.trim()) errors.nome = "Nome é obrigatório";
    if (!email.trim()) errors.email = "Email é obrigatório";
    if (!senha.trim()) errors.senha = "Senha é obrigatória";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) errors.email = "Email inválido";

    setErro(errors);
    return Object.keys(errors).length === 0;
  };

  const cadastrar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validarRegistro()) {
      try {
  const response = await fetch("http://0.0.0.0:8080/usuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nmUsuario: nome,
            txEmail: email,
            txSenha: senha,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro ao cadastrar:", errorData);
          throw new Error(`Erro ao cadastrar: ${errorData.message || response.statusText}`);
        }

        const responseText = await response.text();
        if (responseText) {
          const data = JSON.parse(responseText);
          console.log("Usuário cadastrado com sucesso:", data);
        }

        router.push("/login");
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        setErro({ geral: "Erro ao cadastrar, tente novamente" });
      }
    }
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row justify-center items-center gap-24 md:flex-col min-h-screen bg-[#E0E0E0]">
      <div className="md:w-1/2 lg:inline-block lg:w-auto hidden">
        <Image src={CasaSustentavel} alt="Imagem de uma casa sustentável" />
      </div>
      <form className="w-10/12 lg:w-4/12 flex flex-col bg-white p-6 rounded-2xl" onSubmit={cadastrar}>
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#101828] text-center mb-12">Cadastro</h3>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="text-black font-semibold">Nome completo:</label>
            <input type="text" id="nome" name="nome" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full border border-gray-400 rounded-md p-2" />
            {erro.nome && <span className="text-red-500">{erro.nome}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-black font-semibold">Email:</label>
            <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-400 rounded-md p-2" />
            {erro.email && <span className="text-red-500">{erro.email}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha" className="text-black font-semibold">Senha:</label>
            <input type="password" id="senha" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full border border-gray-400 rounded-md p-2" />
            {erro.senha && <span className="text-red-500">{erro.senha}</span>}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" className="text-white py-2 px-4 rounded-xl text-xl bg-green-500">Cadastrar</button>
        </div>
        {erro.geral && <span className="text-center text-red-500 mt-4">{erro.geral}</span>}
        <p className="text-center mt-6 text-[#313131] font-semibold text-lg">Já possui uma conta? <Link href="/login" className="text-black">Faça Login</Link></p>
      </form>
    </section>
  );
}