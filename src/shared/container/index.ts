import { container } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/CarsInterface';
import { ICategoriesRepository } from '@modules/cars/repositories/CategoriesInterface';
import { ISpecificationsRepository } from '@modules/cars/repositories/SpecificationsInterface';
import { IUsersRepository } from '@modules/users/repositories/UsersInterface';

import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository
)

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)