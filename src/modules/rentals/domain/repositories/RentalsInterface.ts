import { ICreateRentalDto } from '../dtos/CreateRentalDto';
import { RentalEntity } from '../../infra/typeorm/entities/RentalEntity';

interface IRentalsRepository {
  create(data: ICreateRentalDto): Promise<RentalEntity>;
  findById(id: string): Promise<RentalEntity>;
  findRentalByCarId(car_id: string): Promise<RentalEntity>;
  findRentalByUserId(user_id: string): Promise<RentalEntity>;
}

export { IRentalsRepository }