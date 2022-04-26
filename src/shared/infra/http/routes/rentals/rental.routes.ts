import { Router } from 'express';

import { AuthUserMiddleware } from '../../middlewares/auth-user.middleware';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';

const rentalRouter = Router()

const CreateRentalHandler = new CreateRentalController().handle

rentalRouter.post('/', AuthUserMiddleware, CreateRentalHandler)

export { rentalRouter }