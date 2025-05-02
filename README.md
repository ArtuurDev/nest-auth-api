# NestJS Auth API

Este é um projeto de API de autenticação e gerenciamento de usuários desenvolvido com o framework **NestJS**. A API implementa autenticação baseada em tokens JWT, controle de acesso baseado em funções (RBAC) e controle de acesso baseado em atributos (ABAC).

---

## 🚀 Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js escaláveis e eficientes.
- **Prisma**: ORM para manipulação do banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **JWT (JSON Web Token)**: Para autenticação e autorização.
- **Zod**: Biblioteca para validação de esquemas e tipos.
- **Swagger**: Para documentação interativa da API.
- **Docker**: Para containerização do banco de dados.
- **bcrypt**: Para hashing de senhas.

---

## ⚙️ Funcionalidades

### 1. **Autenticação**
- **Login com JWT**: O usuário pode se autenticar utilizando credenciais e receber um token JWT para acessar as rotas protegidas.
- **Proteção de rotas**: Utiliza o `AuthGuard` para proteger rotas e garantir que o usuário tenha um token válido.

### 2. **Gerenciamento de Usuários**
- **Cadastro de Usuários**: Criação de usuários com validação de dados utilizando o Zod.
- **Atualização e Exclusão de Usuários**: O administrador pode gerenciar os dados dos usuários.
- **Listagem de Usuários**: Visualização de todos os usuários cadastrados.
- **Recuperação de Perfil**: Usuários podem acessar seus dados pessoais.

### 3. **Controle de Acesso**
- **RBAC (Role-Based Access Control)**: Controle de acesso baseado em funções como `Admin` e `User`.
- **ABAC (Attribute-Based Access Control)**: Controle de acesso baseado em atributos, onde os usuários só podem acessar dados relativos a eles mesmos.

---

## 🛠️ Configuração do Ambiente

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/nest-auth-api.git
cd nest-auth-api

2. Instale as Dependências:
npm install
3. Configure o Banco de Dados
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database>
JWT_SECRET=seu-segredo-jwt
PORT=3000
docker-compose up -d

5. Execute as Migrações do Prisma
Para configurar o banco de dados e as tabelas necessárias, execute as migrações do Prisma:
npx prisma migrate dev

📚 Documentação Swagger
A API está documentada com Swagger para fácil visualização e interação. Para acessar a documentação interativa, inicie a aplicação e acesse a seguinte URL:

URL: http://localhost:3000/api/docs
