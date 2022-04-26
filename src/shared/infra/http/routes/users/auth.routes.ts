import { Router } from 'express';

const authRouter = Router()

import { AuthUserController } from '@modules/users/useCases/createUserAuth/AuthUserController';

const AuthUserHandler = new AuthUserController().handle

authRouter.post('/login', AuthUserHandler)

export { authRouter }