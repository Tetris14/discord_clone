import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { RegisterUserDto } from './dtos/register.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: RegisterUserDto): Promise<{
    username: string;
    email: string;
    id: string;
    jwt: string;
  }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const newUser = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: passwordHash,
    });

    await this.userRepository.save(newUser);
    const payload = { email: newUser.email, sub: newUser.id };
    const jwt = await this.jwtService.signAsync(payload);
    return {
      username: newUser.username,
      email: newUser.email,
      id: newUser.id,
      jwt: jwt,
    };
  }

  async login(dto: LoginUserDto): Promise<{
    username: string;
    email: string;
    id: string;
    jwt: string;
  }> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const jwt = await this.jwtService.signAsync(payload);
    return {
      username: user.username,
      email: user.email,
      id: user.id,
      jwt: jwt
    };
  }
}
