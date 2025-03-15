import { UserService } from './user.service';
import { ResponseUserDto } from './dtos/response-user.dto';
import { Controller, Get, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('findAll')
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userService.findAll();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<ResponseUserDto | null> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
