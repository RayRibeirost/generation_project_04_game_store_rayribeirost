import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async findAllUsers(): Promise<Users[]> {
    return await this.usersRepository.find();
  }
  async findUserById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    return user;
  }
  async createUser(user: Users): Promise<Users> {
    return await this.usersRepository.save(user);
  }
  async updateUser(user: Users): Promise<Users> {
    await this.findUserById(user.id);
    return this.usersRepository.save(user);
  }
  async deleteUser(id: string): Promise<DeleteResult> {
    await this.findUserById(id);
    return this.usersRepository.delete(id);
  }
}
