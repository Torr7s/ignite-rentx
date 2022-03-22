import { Router } from 'express';

import { AuthUserMiddleware } from '@shared/infra/http/middlewares/auth-user.middleware';
import { AdminMiddleware } from '@shared/infra/http/middlewares/admin.middleware';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carRouter = Router()

const CreateCarHandler              = new CreateCarController().handle
const CreateCarSpecificationHandler = new CreateCarSpecificationController().handle
const ListAvailableCarsHandler      = new ListAvailableCarsController().handle

carRouter.post(
  '/', 
  AuthUserMiddleware, 
  AdminMiddleware, 
  CreateCarHandler
)

carRouter.post(
  '/specifications/:id',
  AuthUserMiddleware,
  AdminMiddleware,
  CreateCarSpecificationHandler
)

carRouter.get('/available', ListAvailableCarsHandler)

export { carRouter }