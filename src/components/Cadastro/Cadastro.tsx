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
        const response = await fetch("http://localhost:8080/usuario", {
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

  
}