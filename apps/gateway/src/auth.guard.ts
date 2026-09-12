import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { GatewayService } from './gateway.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly gatewayService: GatewayService,
  ) {}

  private isPublicRoute(path: string): boolean {
    const publicRoutes = [
      '/',
      '/service-health',
      '/user-health',
      '/user-hello',
      '/create-user',
      '/login',
      '/verify-email',
      '/organizers',
    ];

    return publicRoutes.includes(path) || path.startsWith('/docs');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.path || request.originalUrl || '';

    if (this.isPublicRoute(path)) {
      return true;
    }

    const authHeader = request.headers.authorization ?? '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      throw new UnauthorizedException('JWT token is required');
    }

    const secret = this.configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new UnauthorizedException('JWT_SECRET is not configured');
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch {
      throw new UnauthorizedException('Invalid or expired JWT token');
    }

    if (!decoded?.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.gatewayService.getUserByEmail(decoded.email);
    if (!user) {
      throw new UnauthorizedException('User not found for this token');
    }

    request.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    if (path.startsWith('/admin/')) {
      if (user.role !== 'admin') {
        throw new ForbiddenException('Admin access required');
      }
    }

    return true;
  }
}
