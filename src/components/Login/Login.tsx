"use client";
import Image from "next/image";
import CasaSustentavel from "../../../public/img/imagem-login-cadastro.svg";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
  const router = useRouter();

  const validateLogin = (): boolean => {
    const errors: { email?: string; senha?: string } = {};
    if (!email) errors.email = "Email é obrigatório";
    if (!senha) errors.senha = "Senha é obrigatória";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateLogin()) {
      try {
        const response = await fetch("http://localhost:8080/usuario");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }

        const users = await response.json();

        // Modificando a busca para usar as propriedades corretas: txEmail e txSenha
        const usuarioEncontrado = users.find(
          (user: { txEmail: string; txSenha: string }) =>
            user.txEmail === email && user.txSenha === senha
        );

        if (usuarioEncontrado) {
          // Redireciona para a página funcionalidade se o login for bem-sucedido
          router.push("/");
        } else {
          // Se email ou senha não forem encontrados, mostre mensagem de erro
          setErrors({
            email: "Email ou senha incorretos",
            senha: "Email ou senha incorretos",
          });
        }
      } catch (error) {
        console.error("Erro ao realizar o login:", error);
      }
    }
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row justify-center items-center gap-24 md:flex-col min-h-screen bg-[#E0E0E0]">
      <div className="md:w-1/2 lg:inline-block lg:w-auto hidden">
        <Image
          src={CasaSustentavel}
          alt="Imagem de um cara sustentável"
        />
      </div>
      <form
        className="w-10/12 lg:w-4/12 flex flex-col bg-white p-6 rounded-2xl"
        onSubmit={handleLoginSubmit}
      >
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#101828] text-center mb-12">
          Login
        </h3>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-black font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-400 rounded-md p-2"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="senha" className="text-black font-semibold">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full border border-gray-400 rounded-md p-2"
            />
            {errors.senha && (
              <span className="text-red-500 text-sm">{errors.senha}</span>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="text-white py-2 px-4 rounded-xl text-xl bg-green-500"
          >
            Entrar
          </button>
        </div>
        <p className="text-center mt-6 text-[#313131] font-semibold text-lg">
          Não possui uma conta?
          <Link href="/cadastro" className="text-black">
            {" "}
            Cadastre-se
          </Link>
        </p>
      </form>
    </section>
  );
}
