import { Request, Response, Router } from 'express';

const carSpecificationRouter = Router()

import { createCarSpecificationController } from '../modules/cars/useCases/createCarSpecification';

carSpecificationRouter.post('/', (request: Request, response: Response) => {
  return createCarSpecificationController.handle(request, response)
})

export { carSpecificationRouter }