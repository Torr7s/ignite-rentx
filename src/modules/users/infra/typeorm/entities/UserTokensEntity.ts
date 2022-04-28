import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './UserEntity';

@Entity('users_tokens')
class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @Column()
  expiration_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid()
  }
}

export { UserTokens }