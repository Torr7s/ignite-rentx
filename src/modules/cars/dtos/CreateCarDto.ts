import { SpecificationEntity } from '@modules/cars/infra/typeorm/entities/SpecificationEntity';

interface ICreateCarDto {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: SpecificationEntity[];
  id?: string;
}

export { ICreateCarDto }