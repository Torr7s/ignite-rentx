import { inject, injectable } from 'tsyringe';

import { CarSpecificationEntity } from '../../entities/CarSpecificationEntity';

import { ICarSpecificationsRepository } from '../../repositories/CarSpecificationsInterface';

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
      throw new Error(
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