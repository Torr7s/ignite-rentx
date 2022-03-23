import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)

    const { id } = request.params
    const images = request.files as IFiles[]

    const images_name = images.map((file) => file.filename)

    await uploadCarImageUseCase.perform({
      car_id: id,
      images_name
    })

    return response.sendStatus(201)
  }
}

export { UploadCarImagesController }