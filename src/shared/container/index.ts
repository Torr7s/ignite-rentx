import { container } from 'tsyringe';

import '@shared/container/providers';

import { ICarsRepository } from '@modules/cars/repositories/CarsInterface';
import { ICarImagesRepository } from '@modules/cars/repositories/CarImagesInterface';
import { ICategoriesRepository } from '@modules/cars/repositories/CategoriesInterface';
import { ISpecificationsRepository } from '@modules/cars/repositories/SpecificationsInterface';
import { IRentalsRepository } from '@modules/rentals/repositories/RentalsInterface';
import { IUsersRepository } from '@modules/users/repositories/UsersInterface';

import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository
)

container.registerSingleton<ICarImagesRepository>(
  'CarImagesRepository',
  CarImagesRepository
)

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)