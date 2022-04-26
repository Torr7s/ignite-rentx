import { AppError } from '@shared/errors';

import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase';
import { CategoriesRepositoryInMemory } from '@modules/cars/domain/repositories/in-memory/CategoriesRepositoryInMemory';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let createCategoryUseCase: CreateCategoryUseCase

describe('Create category', () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    const categoryData = {
      name: 'Category test',
      description: 'Category description test'
    }

    await createCategoryUseCase.perform(categoryData)

    const categoryExists = await categoriesRepositoryInMemory.findByName(categoryData.name)

    expect(categoryExists).toHaveProperty('id')
  })

  it('should not be able to create a new category when name already exists', async () => {
    expect(async () => {
      const categoryData = {
        name: 'Category test',
        description: 'Category description test'
      }

      await createCategoryUseCase.perform(categoryData)

      await createCategoryUseCase.perform(categoryData)
    })
      .rejects
      .toBeInstanceOf(AppError)
      .catch(() => { })
  })
})