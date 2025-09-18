# Sistema de Gestão de Demandas - Teste Técnico BRN Networks

## 🎯 Objetivo

Este projeto é um sistema de gestão de demandas para uma consultoria de redes, desenvolvido como parte do teste técnico para a posição de Desenvolvedor Fullstack na BRN Networks. A aplicação permite o cadastro de provedores de internet (ISPs), o registro de demandas técnicas associadas a eles, e o acompanhamento das ações realizadas em cada demanda.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e robusta, com foco em escalabilidade e manutenibilidade.

* **Backend:** Node.js com TypeScript, Express.js
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma
* **Frontend:** React com TypeScript, Vite (ou Create React App)
* **Ambiente:** Docker e Docker Compose

## 🏛️ Arquitetura

A aplicação é dividida em três serviços principais, orquestrados pelo Docker Compose:

* **`frontend`**: Uma Single Page Application (SPA) em React responsável pela interface do usuário.
* **`backend`**: Uma API RESTful em Node.js que gerencia a lógica de negócio e a comunicação com o banco de dados.
* **`db`**: Uma instância do PostgreSQL para persistência dos dados.

## ▶️ Como Executar o Projeto

Siga os passos abaixo para executar a aplicação em seu ambiente local.

**Pré-requisitos:**
* Docker
* Docker Compose

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd nome-da-pasta-do-projeto
    ```

2.  **Crie o arquivo de ambiente:**
    Na raiz do projeto, crie uma cópia do arquivo `.env.example` e renomeie para `.env`.
    ```bash
    cp .env.example .env
    ```
    *(Nenhuma alteração é necessária se você mantiver as credenciais padrão.)*

3.  **Instale as dependências locais do backend:**
    *(Devido a particularidades do ambiente de desenvolvimento, este passo é necessário para garantir que os executáveis locais estejam disponíveis para o volume do Docker.)*
    ```bash
    cd backend
    npm install
    cd ..
    ```

4.  **Suba os contêineres Docker:**
    Na raiz do projeto, execute o comando para construir as imagens e iniciar os serviços.
    ```bash
    sudo docker-compose up --build
    ```

5.  **Acesse a aplicação:**
    * O **Frontend** estará disponível em: `http://localhost:3000`
    * A **API do Backend** estará disponível em: `http://localhost:3333`

6.  **Crie a estrutura do banco de dados (Primeira vez):**
    Para criar as tabelas no banco de dados, abra um **novo terminal** e execute:
    ```bash
    sudo docker-compose exec backend sh
    npx prisma migrate dev
    exit
    ```

## ✅ Funcionalidades Implementadas

-   [x] CRUD completo de Provedores via API.
-   [x] CRUD completo de Demandas via API, com relacionamento com Provedores.
-   [x] Criação e listagem de Ações Técnicas via API, com relacionamento com Demandas.
-   [x] Frontend em React para visualização de Provedores e Demandas.
-   [x] Formulário para criação de novas Demandas com atualização automática da lista.
-   [x] Filtros dinâmicos na lista de Demandas (por status e por provedor).
-   [x] Página de detalhes para cada Demanda, com histórico de ações.
-   [x] Formulário para adicionar novas Ações em uma Demanda, com atualização em tempo real.
-   [x] Funcionalidade para alterar o status da Demanda diretamente pela interface.

## 🚀 Possíveis Melhorias

-   Implementação de um sistema de autenticação (JWT).
-   Adicionar testes automatizados (unitários e de integração).
-   Melhorar a estilização e a experiência do usuário (UX).
-   Paginação nas listagens para lidar com grandes volumes de dados.