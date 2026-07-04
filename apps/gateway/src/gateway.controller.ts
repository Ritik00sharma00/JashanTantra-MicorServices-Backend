import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ApiKeyGuard } from './api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): Promise<string> {
    return this.gatewayService.getServiceHealth();
  }

  @Get('service-health')
  getServiceHealth(): Promise<string> {
    return this.gatewayService.getServiceHealth();
  }

  @Get('user-health')
  getUserHealth(): Promise<string> {
    return this.gatewayService.getUserHealth();
  }

  @Get('user-hello')
  getUserHello(): Promise<string> {
    return this.gatewayService.getUserHello();
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string): Promise<any> {
    return this.gatewayService.getUserById(id);
  }

  @Patch('user/:id/profile')
  editUserProfile(
    @Param('id') id: string,
    @Body() updates: any,
  ): Promise<any> {
    return this.gatewayService.editUserProfile(id, updates);
  }

  @Post('verify-email')
  verifyEmail(@Body() body: { email: string }): Promise<any> {
    return this.gatewayService.verifyEmail(body.email);
  }

  @Get('organizers')
  findOrganizers(
    @Query('state') state?: string,
    @Query('city') city?: string,
    @Query('category') category?: string,
    @Query('t') t?: string,
  ): Promise<any> {
    return this.gatewayService.findOrganizers({ state, city, category, t });
  }

  @Post('create-user')
  createUser(@Body() user: any): Promise<any> {
    return this.gatewayService.createUser(user);
  }

  @Post('login')
  loginUser(
    @Body() data: { email: string; password: string },
  ): Promise<any> {
    return this.gatewayService.loginUser(data);
  }
}
