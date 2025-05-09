export interface Usuario {
  idUsuario: number;
  nome: string;
  login: string;
  nivel: Nivel;
  papeis: Papel[];
}

export interface Nivel {
  idNivel: number;
  descricao: string;
}

export interface Papel {
  idPapel: number;
  nome: string;
}