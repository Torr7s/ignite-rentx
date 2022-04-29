import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { SendForgotMailUseCase } from './sendForgotMailUseCase';

class SendForgotMailController {
  
  async handle(request: Request, response: Response) {
    const sendForgotMailUseCase = container.resolve(SendForgotMailUseCase)
  }
}

export { SendForgotMailController }