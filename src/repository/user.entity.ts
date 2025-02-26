import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserContact } from './user-contact.entity';
import { UserAddress } from './user-address.entity';
import { AcademicBackground } from './academic-background.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  occupation: string;

  @Column()
  gender: string;

  @OneToOne(() => UserContact, (userContact) => userContact.user, { cascade: true })
  @JoinColumn()
  contact: UserContact;

  @OneToOne(() => UserAddress, (userAddress) => userAddress.user, { cascade: true })
  @JoinColumn()
  address: UserAddress;

  @OneToMany(() => AcademicBackground, (academicBackground) => academicBackground.user, { cascade: true })
  academicBackgrounds: AcademicBackground[]; 
}