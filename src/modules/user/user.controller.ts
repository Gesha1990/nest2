import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create-user')
  createUser(@Body() dto: CreateUserDTO) {
    return this.userService.createUser(dto);
  }
  @ApiTags('Api')
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() updateDto: UpdateUserDto,
    @Req() request,
  ): Promise<UpdateUserDto> {
    const user = request.body;
    return this.userService.updateUser(user.email, updateDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.body;
    return this.userService.deleteUser(user.email);
  }
}
