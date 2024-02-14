import { AllRole } from 'src/modules/user/schema/user.schema';
export declare const ROLES_KEY = "role";
export declare const Roles: (...roles: AllRole[]) => import("@nestjs/common").CustomDecorator<string>;
