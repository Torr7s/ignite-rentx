import { CarSpecificationEntity } from '../../entities/CarSpecificationEntity';

import { ICarSpecificationsRepository } from '../../repositories/CarSpecificationsInterface';

interface ICarSpecificationRequest {
  name: string;
  description: string;
}

class CreateCarSpecificationUseCase {
  constructor(
    private _specificationsRepository: ICarSpecificationsRepository
  ) { }

  async perform({ name, description }: ICarSpecificationRequest): Promise<void> {
    const specificationData: CarSpecificationEntity = await this._specificationsRepository.findByName(name)

    if (!specificationData) {
      this._specificationsRepository.create({
        name,
        description
      })
    }
  }
}

export { CreateCarSpecificationUseCase }