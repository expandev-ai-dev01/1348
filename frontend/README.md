# Sistema de Provas de Geografia - 6º Ano

## Descrição

Sistema completo para aplicação de provas de geografia para alunos do sexto ano do ensino fundamental 2. Plataforma integrada que engloba todo o ciclo de avaliação, desde a criação e aplicação de provas até a correção e análise de resultados.

## Tecnologias

- **React 18.3.1** - Framework frontend
- **TypeScript 5.6.3** - Tipagem estática
- **Vite 5.4.11** - Build tool e dev server
- **React Router DOM 6.26.2** - Roteamento
- **TanStack Query 5.59.20** - Gerenciamento de estado do servidor
- **Tailwind CSS 3.4.14** - Framework CSS
- **Axios 1.7.7** - Cliente HTTP
- **React Hook Form 7.53.1** - Gerenciamento de formulários
- **Zod 3.23.8** - Validação de schemas

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   └── router.tsx         # Configuração de rotas
├── assets/                # Recursos estáticos
│   └── styles/           # Estilos globais
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes genéricos
│   ├── constants/        # Constantes globais
│   ├── lib/             # Configurações de bibliotecas
│   ├── types/           # Tipos TypeScript globais
│   └── utils/           # Funções utilitárias
├── domain/               # Domínios de negócio (a serem implementados)
└── pages/                # Páginas da aplicação
    ├── layouts/         # Layouts compartilhados
    ├── Home/           # Página inicial
    └── NotFound/       # Página 404
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no arquivo .env
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:4000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Funcionalidades Principais

### Plataforma Integrada de Avaliação

- Criação de provas com banco de questões
- Aplicação online com recursos multimídia
- Correção automática e manual
- Análise de resultados e relatórios de desempenho
- Interface simplificada e intuitiva

## Padrões de Desenvolvimento

### Componentes

- Estrutura modular com separação de responsabilidades
- Tipagem forte com TypeScript
- Documentação JSDoc completa
- Uso de Tailwind CSS para estilização

### Estado

- TanStack Query para estado do servidor
- Zustand para estado global (quando necessário)
- React Hook Form para formulários

### API

- Cliente HTTP configurado com Axios
- Separação entre endpoints públicos e autenticados
- Interceptors para autenticação e tratamento de erros

## Próximos Passos

1. Implementar autenticação de usuários
2. Criar módulo de gerenciamento de provas
3. Desenvolver banco de questões
4. Implementar sistema de aplicação de provas
5. Criar módulo de correção e análise

## Licença

Proprietary - Todos os direitos reservados