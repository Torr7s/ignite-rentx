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
    category_id,
    specifications,
    id
  }: ICreateCarDto): Promise<CarEntity> {
    const newCarData: CarEntity = new CarEntity()

    Object.assign(newCarData, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    })

    this.cars.push(newCarData)

    return newCarData
  }

  async findAvailableCars(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<CarEntity[]> {
    const availableCarsData: CarEntity[] = this.cars.filter((car) => {
      if (
        car.available ||
        ((name && car.name === name) ||
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id)
        )) {
        return car
      }
    })

    return availableCarsData
  }

  async findByLicensePlate(license_plate: string): Promise<CarEntity> {
    const carsData: CarEntity = this.cars.find((car) => car.license_plate === license_plate)

    return carsData
  }

  async findById(car_id: string): Promise<CarEntity> {
    const carData: CarEntity = this.cars.find((car) => car.id === car_id)

    return carData
  }
}

export { CarsRepositoryInMemory }