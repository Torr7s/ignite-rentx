import { container } from 'tsyringe';

import { ICarCategoriesRepository } from '../../modules/cars/repositories/CarCategoriesInterface'
import { ICarSpecificationsRepository } from '../../modules/cars/repositories/CarSpecificationsInterface';

import { CarCategoriesRepository } from '../../modules/cars/repositories/implementations/CarCategoriesRepository';
import { CarSpecificationsRepository } from '../../modules/cars/repositories/implementations/CarSpecificationsRepository';

container.registerSingleton<ICarCategoriesRepository>(
  'CarCategoriesRepository',
  CarCategoriesRepository
)

container.registerSingleton<ICarSpecificationsRepository>(
  'CarSpecificationsRepository',
  CarSpecificationsRepository
)