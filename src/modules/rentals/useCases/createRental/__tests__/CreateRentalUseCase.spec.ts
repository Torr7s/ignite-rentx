import { AppError } from '@shared/errors'

import dayjs from 'dayjs';

import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from '../CreateRentalUseCase'

let dayjsDateProvider: DayjsDateProvider
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase

describe('Create rental', () => {
  const add24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory, 
      dayjsDateProvider
    )
  })

  it('should be able to create new rental', async () => {
    const rentalData = await createRentalUseCase.perform({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: add24Hours
    })

    expect(rentalData).toHaveProperty('id')
    expect(rentalData).toHaveProperty('start_date')
  })

  it('should not be able to create new rental if there is another open rental to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.perform({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: add24Hours
      })

      await createRentalUseCase.perform({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: add24Hours
      })
    })
      .rejects
      .toBeInstanceOf(AppError)
  })

  it('should not be able to create new rental if there is another open rental to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.perform({
        user_id: '67890',
        car_id: '343434',
        expected_return_date: add24Hours
      })

      await createRentalUseCase.perform({
        user_id: '67890',
        car_id: '343434',
        expected_return_date: add24Hours
      })
    })
      .rejects
      .toBeInstanceOf(AppError)
  })

  it ('should not be able to create new rental if invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.perform({
        user_id: '67890',
        car_id: '343434',
        expected_return_date: dayjs().toDate()
      })
    })
      .rejects
      .toBeInstanceOf(AppError)
  })
})