import { inject, injectable } from 'tsyringe';

import { CarSpecificationEntity } from '../../entities/CarSpecificationEntity';

import { ICarSpecificationsRepository } from '../../repositories/CarSpecificationsInterface';

import { AppError } from '../../../../errors/app.error';

interface ICarSpecificationRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarSpecificationsRepository')
    private _specificationsRepository: ICarSpecificationsRepository
  ) { }

  async perform({ name, description }: ICarSpecificationRequest): Promise<void> {
    const specificationData: CarSpecificationEntity = await this._specificationsRepository.findByName(name)

    if (specificationData) {
      throw new AppError(
        'Car specification already exists!'
      )
    }

    await this._specificationsRepository.create({
      name,
      description
    })
  }
}

export { CreateCarSpecificationUseCase }