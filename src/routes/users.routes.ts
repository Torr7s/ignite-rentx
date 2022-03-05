import { Router } from 'express';

const userRouter = Router()

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';

const CreateUserHandler = new CreateUserController().handle

userRouter.post('/', CreateUserHandler)

export { userRouter }