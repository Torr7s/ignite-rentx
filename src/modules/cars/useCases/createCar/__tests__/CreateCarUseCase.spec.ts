import { AppError } from '@shared/errors';

import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';
import { CarsRepositoryInMemory } from '@modules/cars/domain/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from '../CreateCarUseCase';

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const carData: CarEntity = await createCarUseCase.perform({
      name: 'Test car',
      description: 'Test car description',
      daily_rate: 100,
      license_plate: 'testcar-1234',
      fine_amount: 60,
      brand: 'Test brand',
      category_id: 'Test category'
    })

    expect(carData).toHaveProperty('id')
  })

  it('should not be able to create a car with an existing license plate', async () => {
    await createCarUseCase.perform({
      name: 'Test car',
      description: 'Test car description',
      daily_rate: 100,
      license_plate: 'testcar-12345',
      fine_amount: 60,
      brand: 'Test brand',
      category_id: 'Test category'
    })

    await expect(
      createCarUseCase.perform({
        name: 'Test car 2',
        description: 'Test car description 2',
        daily_rate: 100,
        license_plate: 'testcar-12345',
        fine_amount: 60,
        brand: 'Test brand 2',
        category_id: 'Test category 2'
      })
    )
      .rejects
      .toEqual(
        new AppError('Car already exists!')
      )
  })

  it('should not be able to create a car with available true by default', async () => {
    const carData: CarEntity = await createCarUseCase.perform({
      name: 'Test car 3',
      description: 'Test car description 3',
      daily_rate: 100,
      license_plate: 'testcar-123456',
      fine_amount: 60,
      brand: 'Test brand 3',
      category_id: 'Test category 3'
    })

    expect(carData.available).toBe(true)
  })
})