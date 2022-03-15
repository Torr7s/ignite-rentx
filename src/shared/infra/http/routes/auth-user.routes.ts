import { Router } from 'express';

const authUserRouter = Router()

import { AuthUserController } from '@modules/users/useCases/createUserAuth/AuthUserController';

const AuthUserHandler = new AuthUserController().handle

authUserRouter.post('/login', AuthUserHandler)

export { authUserRouter }