import express, { type Express, type Request, type Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors'
import { config } from './config'
import logger from './config/logger'
import { swaggerSpec } from './config/swaggerConfig'
import authRoute from './routes/auth.route'
import productRoute from './routes/product.route'
import categoryRoute from './routes/category.route'

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use(`/api/v1/auth`, authRoute)
app.use(`/api/v1/products`, productRoute)
app.use(`/api/v1/category`, categoryRoute)

if (config.api.nodeENV.toLowerCase() === 'dev') {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

  app.get('/', (req: Request, res: Response) => {
    const date = '9/13/2024'
    const verstion = 1
    if (config.api.nodeENV.toLowerCase() === 'dev') {
      res.send(`
        <div style='text-align: center; margin-top: 50px;'>
            <h2>Welcome to ${config.swagger.projectName} API services!</h2>
            <p style='font-size: 1.2em;'>Click below for API Documentation:</p>
            <a href='/api-docs' style='text-decoration: none;'>
            <button style='padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;'>
                View API Documentation
            </button>
            </a>
        </div>
        `)
    } else {
      res.send(`
        <div style='text-align: center; margin-top: 50px;'>
            <h2>Welcome to ${config.swagger.projectName} API services!</h2>
            <p> Verstion : ${verstion} </p>
            <p> Date : ${date} </p>
        </div>
        `)
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.listen(config.api.port, async () => {
  logger.info('App listening on port ' + config.api.port)
  logger.info('App runnung on ' + 'http://localhost:' + config.api.port)
})

export default app
