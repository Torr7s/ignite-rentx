import { CarCategoriesRepository } from '../../repositories/implementations/CarCategoriesRepository';
import { CreateCarCategoryUseCase } from './CreateCarCategoryUseCase';
import { CreateCarCategoryController } from './CreateCarCategoryController';

export default (): CreateCarCategoryController => {
  const carCategoriesRepository = new CarCategoriesRepository()

  const createCarCategoryUseCase = new CreateCarCategoryUseCase(carCategoriesRepository)

  const createCarCategoryController = new CreateCarCategoryController(createCarCategoryUseCase)

  return createCarCategoryController
}
