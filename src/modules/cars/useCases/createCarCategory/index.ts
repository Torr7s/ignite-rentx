import { CarCategoriesRepository } from '../../repositories/implementations/CarCategoriesRepository';
import { CreateCarCategoryUseCase } from './CreateCarCategoryUseCase';
import { CreateCarCategoryController } from './CreateCarCategoryController';

const carCategoriesRepository = CarCategoriesRepository.getInstance()

const createCarCategoryUseCase = new CreateCarCategoryUseCase(carCategoriesRepository)

const createCarCategoryController = new CreateCarCategoryController(createCarCategoryUseCase)

export { createCarCategoryController }