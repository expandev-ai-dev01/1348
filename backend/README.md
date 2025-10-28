# Sistema de Aplicação de Provas de Geografia - Backend API

Backend API para o Sistema de Aplicação de Provas de Geografia para alunos do 6º ano do ensino fundamental 2.

## Tecnologias

- **Runtime**: Node.js
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **Arquitetura**: REST API
- **Armazenamento**: In-memory (arrays e objetos)

## Estrutura do Projeto

```
src/
├── api/                    # API Controllers
│   └── v1/                 # API Version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   ├── v1/                 # Version 1 routes
│   └── index.ts            # Main router
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Testes
npm test
npm run test:watch
npm run test:coverage

# Linting
npm run lint
npm run lint:fix
```

## Configuração

Edite o arquivo `.env` com as configurações necessárias:

- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente de execução (development/production)
- `API_VERSION`: Versão da API (padrão: v1)
- `CORS_ORIGINS`: URLs permitidas para CORS

## API Endpoints

A API estará disponível em:

- **Desenvolvimento**: `http://localhost:3000/api/v1`
- **Produção**: `https://api.yourdomain.com/api/v1`

### Health Check

```
GET /health
```

Retorna o status de saúde da aplicação.

## Desenvolvimento

### Adicionando Novos Endpoints

1. Criar controller em `src/api/v1/internal/[feature]/controller.ts`
2. Criar service em `src/services/[feature]/[feature]Logic.ts`
3. Adicionar rotas em `src/routes/v1/internalRoutes.ts`
4. Criar testes colocados junto aos arquivos fonte

### Padrões de Código

- Use TypeScript strict mode
- Siga os padrões ESLint configurados
- Documente funções complexas com TSDoc
- Escreva testes para novas funcionalidades
- Use path aliases `@/` para imports

## Testes

Os testes devem ser colocados junto aos arquivos fonte:

- `*.test.ts` para testes unitários
- `*Integration.ts` para testes de integração
- Utilitários compartilhados em `src/tests/`

## Licença

ISC