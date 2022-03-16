import { Router } from 'express';

import { AuthUserMiddleware } from '@shared/infra/http/middlewares/auth-user.middleware';
import { AdminMiddleware } from '@shared/infra/http/middlewares/admin.middleware';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsController';

const carRouter = Router()

const CreateCarHandler         = new CreateCarController().handle
const ListAvailableCarsHandler = new ListAvailableCarsController().handle

carRouter.post(
  '/', 
  AuthUserMiddleware, 
  AdminMiddleware, 
  CreateCarHandler
)

carRouter.get('/available', ListAvailableCarsHandler)

export { carRouter }