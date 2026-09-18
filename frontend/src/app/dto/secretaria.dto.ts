export interface SecretariaRequest {
  nome: string;
  sigla: string;
}

export interface SecretariaResponse extends SecretariaRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
}
