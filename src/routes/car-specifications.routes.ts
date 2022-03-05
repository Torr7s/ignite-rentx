import { Router } from 'express';

import { CreateCarSpecificationController } from '../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

const carSpecificationRouter = Router()

const CreateCarSpecificationHandler = new CreateCarSpecificationController().handle

carSpecificationRouter.post('/', CreateCarSpecificationHandler)

export { carSpecificationRouter }