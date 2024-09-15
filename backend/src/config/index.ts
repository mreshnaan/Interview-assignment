import dotenv from 'dotenv'
dotenv.config()

export const config = {
  swagger: {
    projectName: process.env.PROJECT_NAME ?? 'Artura Auth',
    apiBaseURL: process.env.API_BASE_URL ?? '',
  },
  api: {
    port: process.env.API_PORT ?? 3000,
    jwtSecret: process.env.JWT_SECRET ?? 'CCN',
    adminBaseURL: process.env.ADMIN_BASE_URL ?? '',
    clientBaseURL: process.env.CLIENT_BASE_URL ?? '',
    nodeENV: process.env.NODE_ENV ?? 'dev',
  },
}
