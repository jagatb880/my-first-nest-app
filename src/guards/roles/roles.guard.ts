import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.enums';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  // reflector is used to retrieve metadata set by decorators
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Retrieve the required roles for the route handler from metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // If no roles are required, allow access
    if (!requiredRoles) return true;
    // Retrieve the user's role from the request headers
    const request = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string> }>();
    // Check if the user's role is included in the required roles
    const userRole = request.headers['x-user-roles'] as Role;
    // If the user's role is not present, deny access
    if (!userRole) return false;
    return requiredRoles.some((role) => userRole === role);
  }
}
