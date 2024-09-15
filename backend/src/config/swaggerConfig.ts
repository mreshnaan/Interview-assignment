import swaggerJSDoc from 'swagger-jsdoc'
import { config } from './index'

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${config.swagger.projectName} API`,
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${config.api.port}`,
      },
      {
        url: config.swagger.apiBaseURL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(options)
