import { Request, Response, Router } from 'express';

const carSpecificationRouter = Router()

import { CreateCarSpecificationController } from '../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

const CreateCarSpecificationHandler = new CreateCarSpecificationController().handle

carSpecificationRouter.post('/', CreateCarSpecificationHandler)

export { carSpecificationRouter }