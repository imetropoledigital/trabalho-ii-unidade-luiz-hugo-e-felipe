# Gerenciamento de Dados - API com MongoDB  📂

Este projeto é uma API desenvolvida para gerenciar dados utilizando MongoDB como banco de dados. Ele foi construído com Node.js e inclui configurações para fácil inicialização usando Docker.

## Pré-requisitos ✅

- **Node.js** (v16 ou superior, para execução manual)
- **Docker** (para rodar o projeto completo via contêineres)
- **npm** (para gerenciar dependências em execução manual)

## Configuração ⚙️

1. **Clone o repositório**:

   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   ```

2. **Configure as variáveis de ambiente**:

   - Renomeie o arquivo `.env.example` para `.env`.

   - Edite o arquivo 

     ```
     .env
     ```

      para ajustar as variáveis conforme necessário:

     ```env
      MONGO_URI=mongodb://localhost:27017
      MONGO_DB_NAME=db
     ```

## Execução do Projeto 🚀

### Usando Docker (Recomendado) 🐳

1. Certifique-se de que o Docker esteja instalado e em execução.

2. Execute o projeto inteiro (API e MongoDB):

   ```bash
   docker-compose up -d
   ```

   Isso iniciará o MongoDB e a API simultaneamente. A API estará acessível em `http://localhost:3000` (ou na porta configurada no arquivo `.env`).

3. Para verificar os logs:

   ```bash
   docker-compose logs -f
   ```

4. Para parar os contêineres:

   ```bash
   docker-compose down
   ```

### Executando Manualmente 🛠️

1. **Inicie o MongoDB**:

   - Usando Docker:

     ```bash
     docker run -d --name mongo -p 27017:27017 -v mongodbdata:/data/db mongo
     ```

   - Ou, instale e inicie o MongoDB manualmente:

     ```bash
     mongod --dbpath <caminho-para-diretorio-de-dados>
     ```

2. **Instale as dependências da aplicação**:

   ```bash
   npm install
   ```

3. **Execute a aplicação em modo de desenvolvimento**:

   ```bash
   npm run dev
   ```

   A aplicação será iniciada em `http://localhost:3000` (ou na porta configurada no arquivo `.env`).

4. **Build para produção**:

   ```bash
   npm run build
   ```

   E então execute:

   ```bash
   npm start
   ```

## Endpoints da API 🔗

Abaixo estão listados os endpoints disponíveis na API e suas respectivas funcionalidades:

### 1. **Inserir documento em uma coleção**

- **Endpoint:** `POST /{collection_name}`
- **Descrição:** Insere um documento na coleção especificada.
- **Parâmetros:**
  - `collection_name` (URL param): Nome da coleção.
  - Corpo da requisição: JSON representando o documento a ser inserido.
- **Respostas:**
  - `201 Created`: Documento criado com sucesso.
  - `400 Bad Request`: Erro de validação no corpo da requisição.

### 2. **Buscar documentos de uma coleção**

- **Endpoint:** `GET /{collection_name}`
- **Descrição:** Busca documentos em uma coleção com suporte a filtros, projeção e paginação.
- **Parâmetros:**
  - `collection_name` (URL param): Nome da coleção.
  - `query` (query param): Filtros em formato JSON (opcional).
  - `fields` (query param): Campos a serem incluídos/excluídos na projeção (opcional).
  - `skip` (query param): Número de documentos a pular (opcional).
  - `limit` (query param): Número máximo de documentos a retornar (opcional).
- **Respostas:**
  - `200 OK`: Lista de documentos retornados.
  - `400 Bad Request`: Erro de validação nos parâmetros.

### 3. **Buscar documento por ID**

- **Endpoint:** `GET /{collection_name}/{id}`
- **Descrição:** Busca um documento específico por ID em uma coleção.
- **Parâmetros:**
  - `collection_name` (URL param): Nome da coleção.
  - `id` (URL param): ID do documento a ser buscado.
- **Respostas:**
  - `200 OK`: Documento encontrado.
  - `404 Not Found`: Documento não encontrado.

### 4. **Atualizar documento por ID**

- **Endpoint:** `PUT /{collection_name}/{id}`
- **Descrição:** Atualiza um documento específico por ID em uma coleção.
- **Parâmetros:**
  - `collection_name` (URL param): Nome da coleção.
  - `id` (URL param): ID do documento a ser atualizado.
  - Corpo da requisição: JSON representando os dados atualizados.
- **Respostas:**
  - `200 OK`: Documento atualizado com sucesso.
  - `400 Bad Request`: Erro de validação no corpo da requisição.
  - `404 Not Found`: Documento não encontrado.

## Estrutura do Projeto 🗂️

- **src/**: Contém o código-fonte da aplicação.
- **Dockerfile**: Configuração para criar uma imagem Docker da aplicação.
- **docker-compose.yml**: Configuração para subir a aplicação e o MongoDB como contêineres.
- **.env.example**: Exemplo de arquivo de variáveis de ambiente.
