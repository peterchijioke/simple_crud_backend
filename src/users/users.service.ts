import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../repository/user.entity';
import { UserContact } from '../repository/user-contact.entity';
import { UserAddress } from '../repository/user-address.entity';
import { AcademicBackground } from '../repository/academic-background.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserContact)
    private readonly userContactRepository: Repository<UserContact>,
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
    @InjectRepository(AcademicBackground)
    private readonly academicBackgroundRepository: Repository<AcademicBackground>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const contact = this.userContactRepository.create(data.contact);
    const address = this.userAddressRepository.create(data.address);
    const academicBackgrounds = data.academicBackgrounds.map((background) =>
      this.academicBackgroundRepository.create(background),
    );
    const user = this.userRepository.create({
      ...data,
      contact,
      address,
      academicBackgrounds,
    });
    return this.userRepository.save(user);
  }

async updateUser(id: string, data: CreateUserDto): Promise<User> {
  const user = await this.userRepository.findOne({
    where: { id },
    relations: ['contact', 'address', 'academicBackgrounds'],
  });
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  await this.userContactRepository.update(user.contact.id, data.contact);
  await this.userAddressRepository.update(user.address.id, data.address);
  await this.academicBackgroundRepository.delete({ user: { id } }); // Deletes all academic backgrounds
  const academicBackgrounds = data.academicBackgrounds.map((background) =>
    this.academicBackgroundRepository.create({ ...background, user }),
  );
  await this.academicBackgroundRepository.save(academicBackgrounds);
  await this.userRepository.update(id, {
    profilePhoto: data.profilePhoto,
    firstName: data.firstName,
    lastName: data.lastName,
    dob: data.dob,
    occupation: data.occupation,
    gender: data.gender,
  });
  return this.userRepository.findOne({ where: { id }, relations: ['contact', 'address', 'academicBackgrounds'] });
}
async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id); 
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['contact', 'address', 'academicBackgrounds'],
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contact', 'address', 'academicBackgrounds'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}