# API de Contatos - Port Louis

## 📄 Descrição

Esta aplicação é uma API REST para gerenciar contatos, construída com **Node.js**, **Express** e **TypeScript**.  
Ela possui documentação automática usando **Swagger (OpenAPI 3.0)** e validação de dados com schemas.

Endpoints principais:

- `/contacts` → CRUD de contatos
- `/health` → Health check da aplicação

A API é preparada para rodar via **Docker Compose** e permite configuração através de variáveis de ambiente.

---

## ⚙️ Tecnologias utilizadas

- Node.js
- Express
- TypeScript
- Swagger / swagger-jsdoc / swagger-ui-express
- Zod (validação de schemas)
- Docker / Docker Compose

---

## 🚀 Como rodar a aplicação

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_REPOSITORIO>
```

### 2. Configurar variáveis de ambiente

Execute o comando:

```bash
npm run setup-env
```

Assim as variáveis inicias para execução serão copiados para o arquivo .env e permitirão a execução do projeto.

### 3. Rodar com Docker Compose

O projeto inclui um docker-compose.yml para levantar a API e dependências (como banco de dados).

```bash
docker-compose up --build
```

- A API estará disponível em http://localhost:6789
- A documentação Swagger estará disponível em http://localhost:6789/docs

### 4. Rodar local sem Docker

Instale dependências:

```bash
npm install
```

Rodar em modo desenvolvimento com ts-node:

```bash
npm run dev
```

Rodar build e executar o JS compilado:

```bash
npm run build
npm start
```

### 📚 Documentação da API

Após iniciar a aplicação, acesse:

```bash
http://localhost:6789/docs
```

Lá você encontrará todos os endpoints documentados com exemplos de request e response.

### 🗂 Estrutura do projeto

```
src/
 ├─ config/         → Configurações gerais da aplicação
 ├─ controllers/    → Ponto de entrada da lógica da aplicação
 ├─ database/       → Estrutura de configuração do banco com migrações, e pools
 ├─ middlewares/    → Lógicas entre requisições, ex: Validações e tratamento de erros
 ├─ repositories/   → Repositórios de abstração de atualização e busca com o banco
 ├─ router/         → Rotas da aplicação
 ├─ schemas/        → Schemas de validação
 ├─ scripts         → Scripts para abstração de lógicas fora da execução padrão da aplicação. Ex: execução de migrações e iniciação via container
 ├─ usecases/       → Casos de uso da aplicação
 ├─ utils/          → Funções auxiliares
 └─ server.ts        → Ponto de entrada
dist/                → Código compilado
docker-compose.yml
.env.example
```
