import { CarCategoriesRepository } from '../../repositories/implementations/CarCategoriesRepository';
import { ImportCarCategoryController } from './ImportCarCategoryController';
import { ImportCarCategoryUseCase } from './ImportCarCategoryUseCase';

const carCategoriesRepository = null

const importCarCategoryUseCase = new ImportCarCategoryUseCase(carCategoriesRepository)

const importCarCategoryController = new ImportCarCategoryController(importCarCategoryUseCase)

export { importCarCategoryController }