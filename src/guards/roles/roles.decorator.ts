import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

// This decorator can be used to specify roles required for a route handler
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
