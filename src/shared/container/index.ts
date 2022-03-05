import { container } from 'tsyringe';

import { ICarCategoriesRepository } from '../../modules/cars/repositories/CarCategoriesInterface'
import { ICarSpecificationsRepository } from '../../modules/cars/repositories/CarSpecificationsInterface';
import { IUsersRepository } from '../../modules/users/repositories/UsersInterface';

import { CarCategoriesRepository } from '../../modules/cars/repositories/implementations/CarCategoriesRepository';
import { CarSpecificationsRepository } from '../../modules/cars/repositories/implementations/CarSpecificationsRepository';
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository';

container.registerSingleton<ICarCategoriesRepository>(
  'CarCategoriesRepository',
  CarCategoriesRepository
)

container.registerSingleton<ICarSpecificationsRepository>(
  'CarSpecificationsRepository',
  CarSpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)