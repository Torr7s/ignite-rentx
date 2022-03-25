import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const newCarData: CarEntity = await carsRepositoryInMemory.create({
      'name': 'test_car',
      'description': 'test_car_desc',
      'daily_rate': 111,
      'license_plate': 'DEF-1234',
      'fine_amount': 111,
      'brand': 'test_brand',
      'category_id': 'test_category'
    })

    const cars: CarEntity[] = await listAvailableCarsUseCase.perform({})

    expect(cars).toEqual([newCarData])
  })

  it('should be able to list all available cars by name', async () => {
    const newCarData: CarEntity = await carsRepositoryInMemory.create({
      'name': 'test_car_2',
      'description': 'test_car_desc_2',
      'daily_rate': 222,
      'license_plate': 'DEF-1234',
      'fine_amount': 222,
      'brand': 'test_brand_2',
      'category_id': 'test_category_2'
    })

    const cars: CarEntity[] = await listAvailableCarsUseCase.perform({
      name: 'test_car_2'
    })

    expect(cars).toEqual([newCarData])
  })

  it('should be able to list all available cars by brand', async () => {
    const newCarData: CarEntity = await carsRepositoryInMemory.create({
      'name': 'test_car_3',
      'description': 'test_car_desc_3',
      'daily_rate': 333,
      'license_plate': 'DEF-1234',
      'fine_amount': 333,
      'brand': 'test_brand_3',
      'category_id': 'test_category_3'
    })

    const cars: CarEntity[] = await listAvailableCarsUseCase.perform({
      brand: 'test_brand_3'
    })

    expect(cars).toEqual([newCarData])
  })

  it('should be able to list all available cars by category', async () => {
    const newCarData: CarEntity = await carsRepositoryInMemory.create({
      'name': 'test_car_4',
      'description': 'test_car_desc_4',
      'daily_rate': 444,
      'license_plate': 'DEF-1234',
      'fine_amount': 444,
      'brand': 'test_brand_4',
      'category_id': 'test_category_4'
    })

    const cars: CarEntity[] = await listAvailableCarsUseCase.perform({
      category_id: 'test_category_4'
    })

    expect(cars).toEqual([newCarData])
  })
})