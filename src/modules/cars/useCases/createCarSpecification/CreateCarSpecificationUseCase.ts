import { CarSpecificationModel } from '../../models/CarSpecificationModel';

import { ICarSpecificationsRepository } from '../../repositories/CarSpecificationsInterface';

interface ICarSpecificationRequest {
  name: string;
  description: string;
}

class CreateCarSpecificationUseCase {
  constructor(
    private _carSpecificationsRepository: ICarSpecificationsRepository
  ) { }

  perform({ name, description }: ICarSpecificationRequest): void {
    const carSpecificationData: CarSpecificationModel = this._carSpecificationsRepository.findByName(name)

    if (!carSpecificationData) {
      this._carSpecificationsRepository.create({
        name,
        description
      })
    }
  }
}

export { CreateCarSpecificationUseCase }