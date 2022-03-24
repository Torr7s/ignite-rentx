import { container } from 'tsyringe';

import { IDateProvider } from './dateProvider/DateProviderInterface';

import { DayjsDateProvider } from './dateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
)