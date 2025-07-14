import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
      description: 'API para gerenciamento de produtos com autenticação por API Key',
    },
    servers: [
      {
        url: 'http://localhost:3005',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
          description: 'API Key necessária para acessar endpoints protegidos'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price', 'quantity'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único do produto',
              example: 'uuid-123',
            },
            name: {
              type: 'string',
              description: 'Nome do produto',
              example: 'Smartphone',
            },
            price: {
              type: 'number',
              description: 'Preço do produto',
              example: 999.99,
            },
            quantity: {
              type: 'number',
              description: 'Quantidade em estoque',
              example: 50,
            },
          },
        },
        CreateProductRequest: {
          type: 'object',
          required: ['name', 'price', 'quantity'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome do produto',
              example: 'Smartphone',
            },
            price: {
              type: 'number',
              description: 'Preço do produto',
              example: 999.99,
            },
            quantity: {
              type: 'number',
              description: 'Quantidade em estoque',
              example: 50,
            },
          },
        },
        UpdateProductRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome do produto',
              example: 'Smartphone Pro',
            },
            price: {
              type: 'number',
              description: 'Preço do produto',
              example: 1299.99,
            },
            quantity: {
              type: 'number',
              description: 'Quantidade em estoque',
              example: 30,
            },
          },
        },
        ApiKey: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único da API key',
              example: 'uuid-456',
            },
            key: {
              type: 'string',
              description: 'A chave de API gerada',
              example: 'abc123xyz789def456',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação da API key',
              example: '2024-01-15T10:30:00Z',
            },
            owner: {
              type: 'string',
              description: 'Proprietário da API key (opcional)',
              example: 'usuario@email.com',
            },
            active: {
              type: 'boolean',
              description: 'Status da API key (ativa/inativa)',
              example: true,
            },
          },
        },
        CreateApiKeyRequest: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
              description: 'Proprietário da API key (opcional)',
              example: 'usuario@email.com',
            },
          },
        },
        CreateApiKeyResponse: {
          type: 'object',
          properties: {
            apiKey: {
              type: 'string',
              description: 'A chave de API gerada',
              example: 'abc123xyz789def456',
            },
            owner: {
              type: 'string',
              description: 'Proprietário da API key',
              example: 'usuario@email.com',
            },
            active: {
              type: 'boolean',
              description: 'Status da API key',
              example: true,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Produto não encontrado',
            },
          },
        },
        UnauthorizedError: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Erro de autenticação',
              example: 'API Key inválida ou não fornecida',
            },
          },
        },
      },
    },
    paths: {
      '/apikey/generate': {
        post: {
          tags: ['API Key'],
          summary: 'Gera uma nova API Key',
          description: 'Cria uma nova API key para autenticação nos endpoints protegidos',
          requestBody: {
            required: false,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateApiKeyRequest',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'API Key criada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateApiKeyResponse',
                  },
                },
              },
            },
            '500': {
              description: 'Erro interno do servidor',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/products': {
        get: {
          tags: ['Products'],
          summary: 'Lista todos os produtos',
          description: 'Retorna uma lista com todos os produtos cadastrados',
          responses: {
            '200': {
              description: 'Lista de produtos retornada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Products'],
          summary: 'Cria um novo produto',
          description: 'Cria um novo produto com os dados fornecidos. **Requer autenticação por API Key.**',
          security: [
            {
              ApiKeyAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateProductRequest',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Produto criado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
            '400': {
              description: 'Dados inválidos',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            '401': {
              description: 'API Key inválida ou não fornecida',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError',
                  },
                },
              },
            },
          },
        },
      },
      '/products/{id}': {
        get: {
          tags: ['Products'],
          summary: 'Obtém um produto pelo ID',
          description: 'Retorna um produto específico baseado no ID fornecido',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID do produto',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Produto encontrado',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
            '404': {
              description: 'Produto não encontrado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Not found',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ['Products'],
          summary: 'Atualiza um produto',
          description: 'Atualiza um produto existente com os dados fornecidos. **Requer autenticação por API Key.**',
          security: [
            {
              ApiKeyAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID do produto',
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdateProductRequest',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Produto atualizado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
            '401': {
              description: 'API Key inválida ou não fornecida',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError',
                  },
                },
              },
            },
            '404': {
              description: 'Produto não encontrado',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Products'],
          summary: 'Remove um produto',
          description: 'Remove um produto específico baseado no ID fornecido. **Requer autenticação por API Key.**',
          security: [
            {
              ApiKeyAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID do produto',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '204': {
              description: 'Produto removido com sucesso',
            },
            '401': {
              description: 'API Key inválida ou não fornecida',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError',
                  },
                },
              },
            },
            '404': {
              description: 'Produto não encontrado',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/infra/http/routes/*.ts'], // Caminho para os arquivos de rotas
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi }; 