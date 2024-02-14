import { UserRole } from 'src/modules/user/schema/user.schema';
export declare class RegisterUserDto {
    readonly username: string;
    readonly password: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly role: UserRole;
}
export declare class RegisterOwnerDto {
    readonly username: string;
    readonly password: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly ownerSecret: string;
}
