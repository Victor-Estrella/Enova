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

  const apiJava = process.env.NEXT_PUBLIC_API_JAVA || "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiJava}/avaliacao`);
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
        const response = await fetch(`${apiJava}/avaliacao/${editandoId}`, {
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
        const response = await fetch(`${apiJava}/avaliacao`, {
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
      await fetch(`${apiJava}/avaliacao/${id}`, {
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
  

    return (
        <section className="flex flex-col items-center min-h-screen" id="avaliacao">
            <h2 className="mt-12 mb-5 text-[#101828] font-semibold text-3xl md:text-4xl lg:text-5xl">Avalie-nos</h2>
            <h3 className="mb-12 text-xs text-center text-[#475467] md:text-sm lg:text-base lg:w-1/2">Quer avaliar nossos serviços ou compartilhar sua opinião sobre a ENOVA? Sua experiência é fundamental para nós! Preencha o formulário abaixo e nos ajude a aprimorar nossas soluções de energia verde, construindo um futuro mais sustentável.</h3>
            
            <div className="relative w-full overflow-hidden">
                <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {(isMobileView ? lista.concat(lista) : lista).map((avaliacao, index) => (
                        <div key={`${avaliacao.idAvaliacao}-${index}`} className="flex-shrink-0 w-full md:w-1/2 p-2">
                        <ul className="flex flex-col bg-[#DADADA] p-4 rounded-lg mb-6 lg:mx-16">
                            <div className="flex justify-between items-center">
                              <li className="text-[#001D5C] font-bold text-lg md:text-xl lg:text-2xl">{avaliacao.nmUsuario}</li>
                              <li className="flex">{renderStars(avaliacao.nrAvaliacao)}</li>
                            </div>
                            <li className="text-center text-base md:text-lg my-4">{avaliacao.txMensagem}</li>
                            <div className="w-full flex justify-between">
                              <button onClick={() => handleEdit(avaliacao)} className="text-blue-500 mr-2">Editar</button>
                              <button onClick={() => handleDelete(avaliacao.idAvaliacao)} className="text-red-500">Excluir</button>
                            </div>
                        </ul>
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-between mt-4">
                <button onClick={prev} className="bg-white p-2 rounded ml-4">Anterior</button>
                <button onClick={next} className="bg-white p-2 rounded mr-4">Próximo</button>
                </div>
            </div>
            
            
            <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-4 bg-[#6C8F9E] rounded-2xl">
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1">
                        <input type="text" id="nome" name="nome" placeholder="Nome:" required value={nmUsuario} onChange={(e) => setNmUsuario(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex-1 mt-2 md:mt-0">
                        <input type="email" id="email" name="email" placeholder="Email:" required value={txEmail} onChange={(e) => setTxEmail(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                    </div>
                </div>
                <div>
                  <select id="avaliacao" name="avaliacao" required value={nrAvaliacao} onChange={(e) => setNrAvaliacao(Number(e.target.value))} className="w-full border border-gray-300 rounded-md p-2">
                    <option value="" disabled>Selecione</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>
                    <textarea name="mensagem" id="mensagem" placeholder="Mensagem:" value={txMensagem} onChange={(e) => setTxMensagem(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" cols={30} rows={5} required></textarea>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="text-black py-1 px-6 rounded-xl bg-white">Enviar</button>
                </div>
            </form>
        </section>
    )
}