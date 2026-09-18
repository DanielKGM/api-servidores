export interface ServidorRequest {
  nome: string;
  email: string;
  dataNascimento: string;
  secretariaId: string;
}

export interface ServidorResponse extends ServidorRequest {
  id: string;
  secretariaNome: string;
  secretariaSigla: string;
  createdAt: string;
  updatedAt: string;
}
