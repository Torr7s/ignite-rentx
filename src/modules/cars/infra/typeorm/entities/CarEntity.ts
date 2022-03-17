import { PrimaryColumn, Entity, CreateDateColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CategoryEntity } from './CategoryEntity';
import { SpecificationEntity } from './SpecificationEntity';

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

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @Column()
  category_id: string;

  @ManyToMany(() => SpecificationEntity)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }]
  })
  specifications: SpecificationEntity[]

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid()
    this.available = true
  }
}

export { CarEntity }
