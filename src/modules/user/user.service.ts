import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDto } from './dto';
import { WatchList } from '../watch-list/model/watchList.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}
  getUsers() {
    return [];
  }
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  async findUserByEmail(email) {
    return this.userRepository.findOne({ where: { email } });
  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    const newUser = {
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    };
    await this.userRepository.create(newUser);
    return dto;
  }
  async publicUser(email: string) {
    return this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
      include: {
        model: WatchList,
        required: false,
      },
    });
  }
  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.update(dto, {
      where: { email },
    });
    return dto;
  }
  async deleteUser(email: string): Promise<boolean> {
    await this.userRepository.destroy({
      where: { email },
    });
    return true;
  }
}
