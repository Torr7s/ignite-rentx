import { CarSpecificationsRepository } from '../../repositories/implementations/CarSpecificationsRepository';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';
import { CreateCarSpecificationController } from './CreateCarSpecificationController';

const carSpecificationsRepository = new CarSpecificationsRepository()

const createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carSpecificationsRepository)

const createCarSpecificationController = new CreateCarSpecificationController(createCarSpecificationUseCase)

export { createCarSpecificationController }