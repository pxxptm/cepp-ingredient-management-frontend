import { SetMetadata } from '@nestjs/common';
import { AllRole } from 'backend/src/modules/user/schema/user.schema';

export const ROLES_KEY = 'role';
export const Roles = (...roles: AllRole[]) => SetMetadata(ROLES_KEY, roles);
