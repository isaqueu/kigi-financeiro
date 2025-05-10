// Interface que representa um usuário do sistema
export interface Usuario {
  idUsuario: number;
  nome: string;
  login: string;
  nivel: Nivel;
  papeis: Papel[];
  email: string;
  perfil: string;
}

// Interface que representa o nível de acesso do usuário
export interface Nivel {
  idNivel: number;
  descricao: string;
}

// Interface que representa um papel/função do usuário no sistema
export interface Papel {
  idPapel: number;
  nome: string;
}