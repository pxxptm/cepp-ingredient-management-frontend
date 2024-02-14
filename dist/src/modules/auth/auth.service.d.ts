/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { User } from '../user/schema/user.schema';
import { RegisterOwnerDto, RegisterUserDto } from './dto/auth-register.dto';
import { LoginUserDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MemberService } from '../member/member.service';
export declare class AuthService {
    private readonly userModel;
    private readonly userService;
    private readonly memberService;
    private jwtService;
    constructor(userModel: Model<User>, userService: UserService, memberService: MemberService, jwtService: JwtService);
    registerOwner(registerOwnerDto: RegisterOwnerDto): Promise<string>;
    registerUser(restaurantId: string, registerUserDto: RegisterUserDto): Promise<import("mongoose").Document<unknown, any, import("../member/schema/member.schema").Member> & Omit<import("../member/schema/member.schema").Member & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    private register;
    LoginUser(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
    private generateAccessToken;
}
