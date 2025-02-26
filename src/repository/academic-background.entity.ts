import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class AcademicBackground {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  schoolName: string;

  @Column({ nullable: true })
  degree: string; 

  @Column({ nullable: true })
  fieldOfStudy: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

@ManyToOne(() => User, (user) => user.academicBackgrounds, { onDelete: 'CASCADE' })
user: User;
}