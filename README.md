# Gerenciamento de Dados - API com MongoDB

Este projeto é uma API desenvolvida para gerenciar dados utilizando MongoDB como banco de dados. Ele foi construído com Node.js e inclui configurações para fácil inicialização usando Docker.

## Pré-requisitos

- **Node.js** (v16 ou superior, para execução manual)
- **Docker** (para rodar o projeto completo via contêineres)
- **npm** (para gerenciar dependências em execução manual)

## Configuração

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
     PORT=3000
     MONGO_URI=mongodb://mongo:27017/seu_banco_de_dados
     ```

## Execução do Projeto

### Usando Docker (Recomendado)

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

### Executando Manualmente

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

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
- **Dockerfile**: Configuração para criar uma imagem Docker da aplicação.
- **docker-compose.yml**: Configuração para subir a aplicação e o MongoDB como contêineres.
- **.env.example**: Exemplo de arquivo de variáveis de ambiente.
