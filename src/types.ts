export interface LoginRequest {
  usuarioLogin: string;
  senhaHash: string;
  nomeAplicacao: string;
}

export interface Nivel {
  idNivel: number;
  dsNivel: string;
}

export interface Papel {
  idPapel: number;
  dsPapel: string;
}

export interface UsuarioLogado {
  idUsuario: number;
  nome: string;
  login: string;
  niveis: Nivel[];
  papeis: Papel[];
}

export interface Produto {
  idKigProduto?: number;
  nmProduto: string;
  qrcode?: string;
  classificacao?: string;
  unidade?: string;
}
