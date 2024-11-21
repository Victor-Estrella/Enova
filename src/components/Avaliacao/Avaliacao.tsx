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

  
}