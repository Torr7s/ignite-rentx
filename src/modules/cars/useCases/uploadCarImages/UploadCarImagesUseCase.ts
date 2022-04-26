import { inject, injectable } from 'tsyringe';

import { ICarImagesRepository } from '@modules/cars/domain/repositories/CarImagesInterface';

interface IUploadCarImagesRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private _repository: ICarImagesRepository
  ) {}

  async perform({ car_id, images_name }: IUploadCarImagesRequest) {
    images_name.map(async (image) => {
      await this._repository.create(
        car_id,
        image
      )
    })
  }
}

export { UploadCarImagesUseCase }