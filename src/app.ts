import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';

import { router } from './routes';

import express, { NextFunction, Request, Response } from 'express';

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message
      })
    }

    return response.status(500).json({
      status: 'error',
      error: 'Internal server error'
    })
  }
)

export { app }