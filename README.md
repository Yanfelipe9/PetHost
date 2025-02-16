# PetHost

Bem-vindo ao **PetHost**! Este projeto utiliza **Next.js**, **Prisma** e **NextAuth** para gerenciamento de autenticação e banco de dados.

## 🚀 Como iniciar o projeto

### 1️⃣ **Pré-requisitos**
Certifique-se de ter instalado os seguintes itens:
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (recomendado: **18+**)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

### 2️⃣ **Subir o banco de dados**
Antes de tudo, é necessário rodar o banco de dados com Docker:

```sh
docker-compose up -d
```

Isso iniciará o banco de dados em segundo plano.

### 3️⃣ **Instalar as dependências**
Execute o seguinte comando para instalar as dependências do projeto:

```sh
yarn install
# ou
npm install
```

### 4️⃣ **Rodar as migrações do Prisma**
Depois que o banco estiver rodando, aplique as migrações do **Prisma** e gere o client:

```sh
yarn prisma:migrate
# ou
npm run prisma:migrate
```

Gerar o cliente Prisma:

```sh
yarn prisma:generate
# ou
npm run prisma:generate
```

### 6️⃣ **Rodar o projeto em modo desenvolvimento**
Agora, inicie o servidor Next.js:

```sh
yarn dev
# ou
npm run dev
```

O projeto estará disponível em **`http://localhost:3000`**.

---

## 🛠 **Comandos úteis**

### 🔹 **Criar uma nova migração**
```sh
yarn prisma:migrate --name nome_da_migracao
# ou
npm run prisma:migrate --name nome_da_migracao
```

### 🔹 **Rodar a aplicação em produção**
```sh
yarn build && yarn start
# ou
npm run build && npm run start
```

---

## 📝 **Configuração do ambiente**
Antes de rodar o projeto, crie um arquivo **`.env`** na raiz do projeto e configure as variáveis de ambiente:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/code_connect"
NEXTAUTH_SECRET="sua_chave_secreta"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 📌 **Dicas**
- Certifique-se de que o **Docker** está rodando antes de iniciar o banco.
- Caso o banco já esteja rodando e você precise reiniciar as migrações, use:
  ```sh
  yarn prisma migrate reset
  # ou
  npm run prisma migrate reset
  ```
- Se houver erros de conexão com o banco, verifique se o contêiner está ativo com:
  ```sh
  docker ps
  ```

---

## 🎯 **Sobre o projeto**
Este projeto foi desenvolvido utilizando **Next.js 14**, **Prisma ORM**, **NextAuth** para autenticação e **Docker** para facilitar a execução do banco de dados.

Se tiver dúvidas ou precisar de suporte, entre em contato! 🚀

