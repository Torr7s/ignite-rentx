import { PrimaryColumn, Entity, CreateDateColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class UserEntity {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  driver_license: string

  @Column()
  admin: boolean

  @CreateDateColumn({ default: Date.now() })
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}

export { UserEntity }