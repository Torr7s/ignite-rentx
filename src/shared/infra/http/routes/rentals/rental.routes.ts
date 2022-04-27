import { Router } from 'express';

import { AuthUserMiddleware } from '../../middlewares/auth-user.middleware';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

const rentalRouter = Router()

const CreateRentalHandler     = new CreateRentalController().handle
const DevolutionRentalHandler = new DevolutionRentalController().handle

rentalRouter.post('/', AuthUserMiddleware, CreateRentalHandler)
rentalRouter.post('/devolution/:id', AuthUserMiddleware, DevolutionRentalHandler)

export { rentalRouter }