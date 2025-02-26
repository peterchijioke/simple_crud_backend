import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string; 

  @Column()
  city: string;

  @Column()
  state: string; 

  @Column()
  country: string;

  @Column()
  zipCode: string; 

@OneToOne(() => User, (user) => user.address, { onDelete: 'CASCADE' })
user: User;
}