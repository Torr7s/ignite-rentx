import { container } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/CarsInterface';
import { ICarCategoriesRepository } from '@modules/cars/repositories/CarCategoriesInterface';
import { ICarSpecificationsRepository } from '@modules/cars/repositories/CarSpecificationsInterface';
import { IUsersRepository } from '@modules/users/repositories/UsersInterface';

import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CarCategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CarCategoriesRepository';
import { CarSpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/CarSpecificationsRepository';
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository
)

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