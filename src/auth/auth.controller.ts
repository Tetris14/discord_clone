import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dtos/login.dto";
import { plainToInstance } from "class-transformer";
import { Public } from "src/shared/public.decorator";
import { RegisterUserDto } from "./dtos/register.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { ResponseUserDto } from "src/user/dtos/response-user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Public()
    @Post('register')
    async register(@Body() registerDto: RegisterUserDto): Promise<ResponseUserDto> {
        const user = await this.authService.createUser(registerDto);
        return plainToInstance(ResponseUserDto, user, {excludeExtraneousValues: true});
    }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginUserDto): Promise<ResponseUserDto> {
        const user = await this.authService.login(loginDto);
        return plainToInstance(ResponseUserDto, user, {excludeExtraneousValues: true});
    }
}