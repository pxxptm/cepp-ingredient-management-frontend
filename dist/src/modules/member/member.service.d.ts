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
import mongoose from 'mongoose';
import { Member } from './schema/member.schema';
import { UserService } from '../user/user.service';
import { RestaurantService } from '../restaurant/restaurant.service';
export declare class MemberService {
    private readonly memberModel;
    private readonly restaurantService;
    private readonly userService;
    constructor(memberModel: mongoose.Model<Member>, restaurantService: RestaurantService, userService: UserService);
    create(userId: string, restaurantId: string): Promise<mongoose.Document<unknown, any, Member> & Omit<Member & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    getUsersByRestaurantId(restaurantId: string): Promise<{
        userId: any;
        username: string;
        firstname: string;
        lastname: string;
        role: import("../user/schema/user.schema").AllRole;
    }[]>;
    getRestaurantsByUserId(userId: string): Promise<(mongoose.Document<unknown, any, import("../restaurant/schema/restaurant.schema").Restaurant> & Omit<import("../restaurant/schema/restaurant.schema").Restaurant & {
        _id: mongoose.Types.ObjectId;
    }, never>)[]>;
    findByRestaurantId(restaurantId: string): Promise<(mongoose.Document<unknown, any, Member> & Omit<Member & {
        _id: mongoose.Types.ObjectId;
    }, never>)[]>;
    findByUserId(userId: string): Promise<(mongoose.Document<unknown, any, Member> & Omit<Member & {
        _id: mongoose.Types.ObjectId;
    }, never>)[]>;
    deleteUser(userId: string, restaurantId: string): Promise<mongoose.Document<unknown, any, Member> & Omit<Member & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
}
