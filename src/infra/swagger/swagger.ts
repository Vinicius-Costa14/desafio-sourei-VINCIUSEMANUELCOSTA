import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
      description: 'API para gerenciamento de produtos',
    },
    servers: [
      {
        url: 'http://localhost:3005',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
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
      },
    },
    paths: {
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
          description: 'Cria um novo produto com os dados fornecidos',
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
          description: 'Atualiza um produto existente com os dados fornecidos',
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
          description: 'Remove um produto específico baseado no ID fornecido',
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