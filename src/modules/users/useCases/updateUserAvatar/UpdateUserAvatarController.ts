import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handler(request: Request, response: Response): Promise<Response> { 
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    const { user_id } = request
    
    const avatar_file = request.file.filename

    await updateUserAvatarUseCase.perform({ user_id, avatar_file })

    return response.status(204).send()
  }
}

export { UpdateUserAvatarController }