import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { SendForgotMailUseCase } from './sendForgotMailUseCase';

class SendForgotMailController {
  
  async handle(request: Request, response: Response) {
    const sendForgotMailUseCase = container.resolve(SendForgotMailUseCase)

    const { email } = request.body

    await sendForgotMailUseCase.perform(email)

    return response.sendStatus(200)
  }
}

export { SendForgotMailController }