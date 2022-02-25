import { CarSpecificationModel } from '../../models/CarSpecificationModel';

import { ICreateCarSpecificationDto, ICarSpecificationsRepository } from '../CarSpecificationsInterface';

class CarSpecificationsRepository implements ICarSpecificationsRepository {
  private _carSpecifications: CarSpecificationModel[]

  constructor() { 
    this._carSpecifications = []
  }

  create({ name, description }: ICreateCarSpecificationDto) {
    const specification = new CarSpecificationModel()
    
    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    })

    this._carSpecifications.push(specification)
  }

  findByName(name: string): CarSpecificationModel {
    const specification = this._carSpecifications.find((spec) => spec.name === name)

    return specification
  }
}

export { CarSpecificationsRepository }