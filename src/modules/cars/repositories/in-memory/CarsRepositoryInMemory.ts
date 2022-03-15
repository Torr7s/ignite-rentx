import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';
import { ICarsRepository } from '../CarsInterface';
import { ICreateCarDto } from '@modules/cars/dtos/CreateCarDto';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: CarEntity[] = []

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarDto): Promise<CarEntity> {
    const newCarData: CarEntity = new CarEntity()

    Object.assign(newCarData, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    this.cars.push(newCarData)

    return newCarData
  }

  async findByLicensePlate(license_plate: string): Promise<CarEntity> {
    return this.cars.find(({ license_plate }) => license_plate)
  }
}

export { CarsRepositoryInMemory }