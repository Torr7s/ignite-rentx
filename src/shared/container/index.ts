import '@shared/container/providers';

import { container } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/domain/repositories/CarsInterface';
import { ICarImagesRepository } from '@modules/cars/domain/repositories/CarImagesInterface';
import { ICategoriesRepository } from '@modules/cars/domain/repositories/CategoriesInterface';
import { ISpecificationsRepository } from '@modules/cars/domain/repositories/SpecificationsInterface';
import { IRentalsRepository } from '@modules/rentals/domain/repositories/RentalsInterface';
import { IUsersRepository } from '@modules/users/domain/repositories/UsersInterface';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/UsersTokensInterface';

import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

container
  .registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)
  .registerSingleton<ICarImagesRepository>('CarImagesRepository', CarImagesRepository)
  .registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
  .registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository)
  .registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository)
  .registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
  .registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UsersTokensRepository)
