"use client";
import { TipoAvaliacao } from "@/type";
import { useEffect, useState } from "react";

export default function Avaliacao() {
  const [lista, setLista] = useState<TipoAvaliacao[]>([]);
  const [nmUsuario, setNmUsuario] = useState("");
  const [txEmail, setTxEmail] = useState("");
  const [nrAvaliacao, setNrAvaliacao] = useState(1);
  const [txMensagem, setTxMensagem] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/avaliacao");
        const result = await response.json();
        setLista(result);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderStars = (avaliacao: number) => {
    return Array.from({ length: avaliacao }, (_, i) => (
      <svg key={i} className="w-5 md:w-6 h-5 md:h-6 mr-1 md:mr-2 lg:mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" fill="none">
        <path d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="#01A1FC" />
      </svg>
    ));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newAvaliacao = {
      idAvaliacao: Date.now(),
      nmUsuario,
      txEmail,
      nrAvaliacao,
      txMensagem,
    };

    try {
      if (editandoId !== null) {
        await fetch(`http://localhost:8080/avaliacao/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAvaliacao),
        });
        setLista(
          lista.map((item) =>
            item.idAvaliacao === editandoId
              ? { ...item, nmUsuario, txEmail, nrAvaliacao, txMensagem }
              : item
          )
        );
      } else {
        const response = await fetch("http://localhost:8080/avaliacao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAvaliacao),
        });
        const savedAvaliacao = await response.json();
        setLista([...lista, savedAvaliacao]);
      }
      resetForm();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  const handleEdit = (avaliacao: TipoAvaliacao) => {
    setNmUsuario(avaliacao.nmUsuario);
    setTxEmail(avaliacao.txEmail);
    setNrAvaliacao(avaliacao.nrAvaliacao);
    setTxMensagem(avaliacao.txMensagem);
    setEditandoId(avaliacao.idAvaliacao);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/avaliacao/${id}`, {
        method: "DELETE",
      });
      setLista(lista.filter(avaliacao => avaliacao.idAvaliacao !== id));
    } catch (error) {
      console.error("Erro ao excluir depoimento:", error);
    }
  };

  const resetForm = () => {
    setNmUsuario("");
    setTxEmail("");
    setNrAvaliacao(1);
    setTxMensagem("");
    setEditandoId(null);
  };

  const next = () => {
    setCurrentIndex((prevIndex) => {
      const lastIndex = isMobileView ? lista.length - 1 : Math.ceil(lista.length / 2) - 1;
      return prevIndex === lastIndex ? 0 : prevIndex + 1;
    });
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => {
      const lastIndex = isMobileView ? lista.length - 1 : Math.ceil(lista.length / 2) - 1;
      return prevIndex === 0 ? lastIndex : prevIndex - 1;
    });
  };
  

    
}