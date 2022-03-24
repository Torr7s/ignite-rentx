import { ICreateRentalDto } from '../dtos/CreateRentalDto';
import { RentalEntity } from '../infra/typeorm/entities/RentalEntity';

interface IRentalsRepository {
  create({ user_id, car_id, expected_return_date }: ICreateRentalDto): Promise<RentalEntity>;
  findRentalByCarId(car_id: string): Promise<RentalEntity>;
  findRentalByUserId(user_id: string): Promise<RentalEntity>;
}

export { IRentalsRepository }