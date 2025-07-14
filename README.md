# API CRUD de Produtos

API RESTful para gerenciamento de produtos com autenticação por API key, desenvolvida em Node.js com TypeScript.

## Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Servidor HTTP
- **Prisma** - ORM para banco de dados
- **MySQL** - Banco de dados
- **Zod** - Validação de dados com DTOs
- **Swagger UI** - Documentação
- **Docker Compose** - Containerização do banco

## Início Rápido

### 1. Clonar e Instalar
```bash
git clone https://github.com/Vinicius-Costa14/desafio-sourei-VINCIUSEMANUELCOSTA
cd "desafio CRUD API"
npm install
```

### 2. Configurar Banco de Dados
```bash
# Iniciar MySQL com Docker
docker-compose up -d

# Executar migrações
npx prisma migrate dev
```

### 3. Iniciar Servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

**Acesse:** http://localhost:3005

**Documentação:** http://localhost:3005/api-docs

## Autenticação

### 1. Gerar API Key
```bash
curl -X POST http://localhost:3005/apikey/generate \
  -H "Content-Type: application/json" \
  -d '{"owner": "seu@email.com"}'
```

**Resposta:**
```json
{
  "apiKey": "abc123xyz789",
  "owner": "seu@email.com",
  "active": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### 2. Usar API Key
Adicione o header em todas as requisições protegidas:
```
X-API-Key: sua-api-key-aqui
```

## Endpoints

### **Públicos** (sem autenticação)
Método | Endpoint | Descrição 
`GET` | `/products` | Listar todos os produtos
`GET` | `/products/:id` | Obter produto por ID
`POST` | `/apikey/generate` | Gerar nova API key

### **Protegidos** (requer API key)
Método | Endpoint | Descrição
`POST` | `/products` | Criar produto
`PUT` | `/products/:id` | Atualizar produto
`DELETE` | `/products/:id` | Remover produto

## Exemplos de Uso

### Criar Produto
```bash
curl -X POST http://localhost:3005/products \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sua-api-key" \
  -d '{
    "name": "Smartphone",
    "price": 999.99,
    "quantity": 50
  }'
```

### Atualizar Produto
```bash
curl -X PUT http://localhost:3005/products/uuid-do-produto \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sua-api-key" \
  -d '{
    "name": "Smartphone Pro",
    "price": 1299.99,
    "quantity": 30
  }'
```

### Listar Produtos
```bash
curl -X GET http://localhost:3005/products
```

## Validação de Dados

A API utiliza **Zod** para validação:

### Produto
- **name**: string (2-100 caracteres, obrigatório)
- **price**: number (positivo, max 999.999,99, 2 casas decimais)
- **quantity**: integer (≥0, max 999.999, padrão: 0)

### API Key
- **owner**: email válido (opcional, max 255 chars)

**Exemplo de erro de validação:**
```json
{
  "erro": "Dados inválidos",
  "detalhes": [
    {
      "campo": "name",
      "mensagem": "Nome deve ter pelo menos 2 caracteres",
      "valorRecebido": "A"
    },
    {
      "campo": "price",
      "mensagem": "Preço deve ser um número positivo",
      "valorRecebido": -10
    }
  ]
}
```

## Arquitetura

O projeto segue **Clean Architecture** **DDD**:

```
src/
├── application/use-cases/     # Regras de negócio
├── domain/entities/           # Entidades do domínio
├── domain/repositories/       # Interfaces dos repositórios
├── infra/http/               # Controllers, rotas, middlewares
├── infra/database/           # Implementação Prisma
├── shared/dtos/              # DTOs com Zod
└── shared/middlewares/       # Middlewares de validação
```

## Segurança

- Autenticação por API key
- Middleware de proteção de rotas
- Tratamento de erros padronizado
- Headers de segurança

## Docker

### Criar e executar com Docker

#### 1. Apenas banco de dados (desenvolvimento):
```bash
docker-compose up mysql -d
```

#### 2. Aplicação completa (produção):
```bash
# Construir imagem da API
docker build -t desafio-crud-api .

# Subir todos os serviços
docker-compose up -d
```

# Rebuild da API
docker-compose up --build api
```

## Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Compilar TypeScript
npm start          # Servidor de produção
npm run generate   # Gerar cliente Prisma
```

## Variáveis de Ambiente

Crie um arquivo `.env`:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/produtos_db"
PORT=3005
```

## Documentação Completa

Acesse **http://localhost:3005/api-docs** :
- Interface Swagger
- Testar endpoints diretamente
- Gerar e usar API keys

---

## Próximos Passos

- [ ] Implementar rate limiting: express-rate-limit
- [ ] Adicionar logs estruturados: winston
- [ ] Implementar cache Redis
- [ ] Adicionar testes automatizados unitários, integração, end to end: vitest
- [ ] Implementar paginação
- [ ] Adicionar filtros de busca
- [ ] Adicionar bibliotecas de segurança: helmet, cors
- [ ] Avaliar migração para framework: Nest.js

---

**Desenvolvido usando Node.js + TypeScript, por:  VINICIUS EMANUEL COSTA** 