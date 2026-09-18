# Desafio Técnico Fullstack - Spring + Angular (Pleno/Sênior)

## Contexto

Você foi contratado para desenvolver uma micro aplicação para alimentação de uma
base de dados de Servidores públicos municipais lotados em Secretarias.

A aplicação deve permitir: listar, cadastrar, editar e excluir Servidores e Secretarias.

- Cada Servidor possui um nome, e-mail e data de nascimento e Secretaria.
- Cada Secretaria possui um nome e sigla.

## Requisitos Funcionais

### Backend (Spring Boot)

- Criar API REST com os seguintes endpoints:
- GET /servidores: lista todos os servidores
- POST /servidores: cria um novo servidor
- PUT /servidores: atualiza dados de um servidor
- DELETE /servidores/{id}: remove um servidor pelo ID
- GET /secretarias: lista todos as secretarias
- POST /secretarias: cria uma nova secretaria
- PUT /secretarias: atualiza dados de uma secretaria
- DELETE /secretarias/{id}: remove uma secretaria pelo ID
- Validações:
  - E-mail deve ser válido
  - Nome obrigatório
  - Secretaria obrigatória
  - Data de nascimento válida (de 18 à 75 anos)
- Persistência em banco de dados
- CORS habilitado para acesso do frontend

### Frontend (Angular)

- Tela com:
- Formulário Reativo para cadastrar e editar Servidores e Secretarias
- Tabela com listagem de servidores (nome, e-mail, data de nascimento, nome e sigla da
  secretaria)
- Botão para editar servidor
- Botão para excluir servidor
- Tabela com listagem de secretarias (nome e sigla)
- Botão para editar secretaria
- Botão para excluir secretaria
- Comunicação via HTTP/HTTPS com a API
- Mensagens de erro e sucesso corretamente mapeadas
- Validação no formulário

## Requisitos Técnicos

Backend:

- Java 11+
- Spring Boot 2.7+
- Spring Web, Spring Data JPA
- Padrão RESTful
- Arquitetura simples com Controller e Service

Frontend:

- Angular 13+
- Angular Reactive Forms
- Modularização básica

### Entregáveis

- Arquivo contendo as pastas:
- /backend: código Spring Boot
- /frontend: código Angular

### Diferenciais

- Exportar os dados da listagem para CSV ou XLS.
- Uso de framework para estilizar o sistema (ex: Materialize, Primeng, etc..)
- UI com experiência agradável (ex: feedbacks, loading, etc…)
- Deploy funcional
