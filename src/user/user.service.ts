import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { ResponseUserDto } from "./dtos/response-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(ResponseUserDto, users, {excludeExtraneousValues: true});
  }

  async findById(id: string): Promise<ResponseUserDto | null> {
    const user = await this.userRepository.findOne({where: {id}});
    return plainToInstance(ResponseUserDto, user, {excludeExtraneousValues: true});
  }

}