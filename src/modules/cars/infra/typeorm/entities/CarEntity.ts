import { PrimaryColumn, Entity, CreateDateColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CarCategoryEntity } from './CarCategoryEntity';

@Entity('cars')
class CarEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string

  @ManyToOne(() => CarCategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CarCategoryEntity

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid()
    this.available = true
  }
}

export { CarEntity }
