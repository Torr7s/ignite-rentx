import { Router } from 'express';

const authRouter = Router()

import { AuthUserController } from '@modules/users/useCases/createUserAuth/AuthUserController';
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController';

const AuthUserHandler     = new AuthUserController().handle
const RefreshTokenHandler = new RefreshTokenController().handle

authRouter.post('/login', AuthUserHandler)
authRouter.post('/refresh-token', RefreshTokenHandler)

export { authRouter }