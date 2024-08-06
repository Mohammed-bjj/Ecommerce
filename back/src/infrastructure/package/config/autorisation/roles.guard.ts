import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../../output/models/interfaces/users/IUserService';
import { ROLES_KEY, Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService,
    ) {}


  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log();
    if (!requiredRoles) {
      return true;
    }
    const token = context.switchToHttp().getRequest().headers.authorization.split(' ')[1];
    const { role } = this.jwtService.verify(token, {secret: process.env.SECRET});
    if(role !== requiredRoles ){
      throw new UnauthorizedException();
    }
   return true;
  }
}