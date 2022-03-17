import { PrimaryColumn, Entity, CreateDateColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('specifications')
class SpecificationEntity {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn({ default: Date.now() })
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}

export { SpecificationEntity }