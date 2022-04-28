import { AppError } from '@shared/errors'

import dayjs from 'dayjs';

import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { RentalsRepositoryInMemory } from '@modules/rentals/domain/repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from '../CreateRentalUseCase'
import { CarsRepositoryInMemory } from '@modules/cars/domain/repositories/in-memory/CarsRepositoryInMemory';

let dayjsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let createRentalUseCase: CreateRentalUseCase;

describe('Create rental', () => {
  const add24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    )
  })

  it('should be able to create new rental', async () => {
    const carData = await carsRepositoryInMemory.create({
      name: 'Test car',
      description: 'Test car description',
      daily_rate: 100,
      license_plate: 'Test car',
      fine_amount: 40,
      category_id: '12345',
      brand: 'Test brand'
    })

    const rentalData = await createRentalUseCase.perform({
      user_id: '12345',
      car_id: carData.id,
      expected_return_date: add24Hours
    })

    expect(rentalData).toHaveProperty('id')
  })

  it('should not be able to create new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '12345',
      car_id: '1111',
      expected_return_date: add24Hours
    })

    await expect(
      createRentalUseCase.perform({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: add24Hours
      })
    )
      .rejects
      .toEqual(
        new AppError('Rental already open for this user!')
      )
  })

  it('should not be able to create new rental if there is another open rental to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '67890',
      car_id: '343434',
      expected_return_date: add24Hours
    })

    await expect(
      createRentalUseCase.perform({
        user_id: '09876',
        car_id: '343434',
        expected_return_date: add24Hours
      })
    )
      .rejects
      .toEqual(
        new AppError('Car unavailable for rental!')
      )
  })

  it('should not be able to create new rental if invalid return time', async () => {
    await expect(
      createRentalUseCase.perform({
        user_id: '67890',
        car_id: '343434',
        expected_return_date: dayjs().toDate()
      })
    )
      .rejects
      .toEqual(
        new AppError('Invalid return time!')
      )
  })
})