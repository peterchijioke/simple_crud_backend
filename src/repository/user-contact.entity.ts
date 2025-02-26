import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  linkedInUrl: string;

  @OneToOne(() => User, (user) => user.contact,{ onDelete: 'CASCADE' })
  user: User; 
}