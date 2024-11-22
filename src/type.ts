export type TipoEnergia = {
    idEnergia?: number;
    txTipo: string;
    txLocalizacao: string;
    nrCapacidade: number;
    dtInstalacao: string;
    stSistema: string;
}

export type TipoAvaliacao = {
    idAvaliacao: number;
    nmUsuario: string;
    txEmail: string;
    nrAvaliacao: number;
    txMensagem: string;
}

export type TipoEficiencia = {
    idAnalise: number;
    idEnergia: number;
    dtAnalise: string;
    nrProducaoEnergia: number;
    nrConsumoEnergia: number;
    nrEficiencia: number;
}

export type TipoManutencao = {
    idManutencao: number;
    idEnergia: number;
    dtManutencao: string;
    tpManutencao: string;
    dsManutencao: string;
}

export type TipoDados = {
    datas: string[];
    producoes: number[];
    consumos: number[];
    eficiencia: number[];
};

export type Props = {
    idEnergia: number;
};

export interface PythonDados {
    producoes: number[];
    consumos: number[];
    eficiencia: number[];
    datas: string[];
}