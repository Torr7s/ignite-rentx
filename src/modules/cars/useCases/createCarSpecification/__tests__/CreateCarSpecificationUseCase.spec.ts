import { AppError } from '@shared/errors';

import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';
import { SpecificationEntity } from '@modules/cars/infra/typeorm/entities/SpecificationEntity';

import { CreateCarSpecificationUseCase } from '../CreateCarSpecificationUseCase';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })

  it('should not be able to add a new specification to a non-existent car', () => {
    expect(async () => {
      const car_id = '1234'
      const specifications_id = ['54321']

      await createCarSpecificationUseCase.perform({
        car_id,
        specifications_id
      })
    })
      .rejects
      .toBeInstanceOf(AppError)
      .catch(() => { })
  })

  it('should be able to add new specification to a car', async () => {
    const newCarData: CarEntity = await carsRepositoryInMemory.create({
      name: 'Test car',
      description: 'Test car description',
      daily_rate: 100,
      license_plate: 'testcar-1234',
      fine_amount: 60,
      brand: 'Test brand',
      category_id: 'Test category'
    })

    const newSpecificationData: SpecificationEntity = await specificationsRepositoryInMemory.create({
      name: 'Test',
      description: 'Test'
    })

    const specifications_id = [newSpecificationData.id]

    const specificationsCars = await createCarSpecificationUseCase.perform({
      car_id: newCarData.id,
      specifications_id
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })
})
