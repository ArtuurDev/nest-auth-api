# NestJS Auth API

Este é um projeto de API de autenticação e gerenciamento de usuários desenvolvido com o framework **NestJS**. A API implementa autenticação baseada em tokens JWT, controle de acesso baseado em funções (RBAC) e controle de acesso baseado em atributos (ABAC).

---

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js escaláveis e eficientes.
- **Prisma**: ORM para manipulação do banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **JWT (JSON Web Token)**: Para autenticação e autorização.
- **Zod**: Biblioteca para validação de esquemas e tipos.
- **Swagger**: Para documentação da API.
- **Docker**: Para containerização do banco de dados.
- **bcrypt**: Para hashing de senhas.

---

## Funcionalidades

- **Autenticação**:
  - Login com geração de token JWT.
  - Proteção de rotas com `AuthGuard`.
- **Gerenciamento de Usuários**:
  - Criação, atualização, exclusão e listagem de usuários.
  - Recuperação de perfil de usuário.
- **Controle de Acesso**:
  - **RBAC (Role-Based Access Control)**: Controle de acesso baseado em funções (`Admin`, `User`).
  - **ABAC (Attribute-Based Access Control)**: Controle de acesso baseado em atributos (e.g., usuários só podem acessar seus próprios dados).

---

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database>
JWT_SECRET=seu-segredo-jwt
PORT=3000