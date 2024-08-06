import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../output/models/interfaces/users/IUserService';

export const ROLES_KEY = 'roles';
export const Roles = (role) => SetMetadata(ROLES_KEY, role);