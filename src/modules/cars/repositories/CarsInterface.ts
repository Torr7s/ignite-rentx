import { ICreateCarDto } from '../dtos/CreateCarDto';
import { CarEntity } from '../infra/typeorm/entities/CarEntity';

interface ICarsRepository {
  create(data: ICreateCarDto): Promise<CarEntity>;
  findByLicensePlate(license_plate: string): Promise<CarEntity>;
}

export { ICarsRepository }