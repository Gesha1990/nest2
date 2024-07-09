import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/modules/user/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('Api')
  @ApiResponse({ status: 201, type: CreateUserDTO })
  @Post('register')
  async register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(dto);
  }
  @ApiTags('Api')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
