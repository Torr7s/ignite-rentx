import { CarCategoriesRepository } from '../../repositories/implementations/CarCategoriesRepository';
import { ListCarCategoriesController } from './ListCarCategoriesController';
import { ListCarCategoriesUseCase } from './ListCarCategoriesUseCase';

const carCategoriesRepository = null

const listCarCategoriesUseCase = new ListCarCategoriesUseCase(carCategoriesRepository)

const listCarCategoriesController = new ListCarCategoriesController(listCarCategoriesUseCase)

export { listCarCategoriesController }