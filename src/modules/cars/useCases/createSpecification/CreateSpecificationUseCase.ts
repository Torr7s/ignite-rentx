import { inject, injectable } from 'tsyringe';

import { SpecificationEntity } from '@modules/cars/infra/typeorm/entities/SpecificationEntity';
import { ISpecificationsRepository } from '@modules/cars/domain/repositories/SpecificationsInterface';

import { AppError } from '@shared/errors';

interface ICreateSpecificationRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private _repository: ISpecificationsRepository
  ) { }

  async perform({ name, description }: ICreateSpecificationRequest): Promise<void> {
    const specificationData: SpecificationEntity = await this._repository.findByName(name)

    if (specificationData) throw new AppError('Specification already exists!')

    await this._repository.create({
      name,
      description
    })
  }
}

export { CreateSpecificationUseCase }