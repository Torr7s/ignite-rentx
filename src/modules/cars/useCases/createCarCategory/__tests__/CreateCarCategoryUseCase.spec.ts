import { AppError } from '../../../../../errors/app.error'

import { CreateCarCategoryUseCase } from '../CreateCarCategoryUseCase';

import { CarCategoriesRepositoryInMemory } from '../../../repositories/in-memory/CarCategoriesRepositoryInMemory';

let carCategoriesRepositoryInMemory: CarCategoriesRepositoryInMemory
let createCarCategoryUseCase: CreateCarCategoryUseCase

describe('Create car category', () => {
  beforeAll(() => {
    carCategoriesRepositoryInMemory = new CarCategoriesRepositoryInMemory()
    createCarCategoryUseCase = new CreateCarCategoryUseCase(
      carCategoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    const categoryData = {
      name: 'Category test',
      description: 'Category description test'
    }

    await createCarCategoryUseCase.perform(categoryData)

    const categoryExists = await carCategoriesRepositoryInMemory.findByName(categoryData.name)

    expect(categoryExists).toHaveProperty('id')
  })

  it('should not be able to create a new category when name already exists', async () => {
    expect(async () => {
      const categoryData = {
        name: 'Category test',
        description: 'Category description test'
      }

      await createCarCategoryUseCase.perform(categoryData)

      await createCarCategoryUseCase.perform(categoryData)
    })
      .rejects
      .toBeInstanceOf(AppError)
  })
})