import { Controller, Get, Post, Patch, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserServiceService } from './user-service.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../entitites/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  @MessagePattern('user.getHello')
  getHello(): string {
    return this.userServiceService.getHello();
  }

  @MessagePattern('user.health')
  getUserHealth(): string {
    return this.userServiceService.getHello();
  }

  @Post('create-user')
  @MessagePattern('user.create-user')
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userServiceService.createuser(user);
  }

  @Post('login')
  @MessagePattern('user.login')
  loginUser(@Body() data: LoginDto): Promise<{ message: string; token: string }> {
    return this.userServiceService.loginUser(
      data.email ?? '',
      data.password ?? '',
    );
  }

  @MessagePattern('user.edit-profile')
  editProfile(data: { id: string; updates: UpdateUserDto }): Promise<User> {
    return this.userServiceService.editProfile(data.id, data.updates);
  }

  @MessagePattern('user.verify-email')
  verifyEmail(data: { email: string }): Promise<{ message: string; verificationLink: string }> {
    return this.userServiceService.sendEmailVerification(data.email);
  }

  @MessagePattern('user.find-organizers')
  findOrganizers(filter: {
    state?: string;
    city?: string;
    category?: string;
    t?: string;
  }): Promise<User[]> {
    return this.userServiceService.findOrganizers(filter);
  }

  @MessagePattern('user.get-by-id')
  getUserById(data: { id: string }): Promise<User | null> {
    return this.userServiceService.getUserById(data.id);
  }

  @MessagePattern('user.get-public-profile')
  getPublicUserProfile(data: { id: string }): Promise<any> {
    return this.userServiceService.getPublicUserProfile(data.id);
  }
}
