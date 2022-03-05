import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { AuthUserUseCase } from './AuthUserUseCase';

class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authUserUseCase = container.resolve(AuthUserUseCase)

    const { email, password } = request.body

    const tokenData = await authUserUseCase.perform({ email, password })

    return response.json(tokenData)
  }
}

export { AuthUserController }