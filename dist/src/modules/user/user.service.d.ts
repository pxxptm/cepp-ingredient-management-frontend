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
import * as mongoose from 'mongoose';
import { User } from './schema/user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: mongoose.Model<User>);
    getAll(): Promise<(mongoose.Document<unknown, any, User> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    }, never>)[]>;
    getByIdReturnValidData(id: string): Promise<{
        userId: any;
        username: string;
        firstname: string;
        lastname: string;
        role: import("./schema/user.schema").AllRole;
    }>;
    getUserByUsername(username: string): Promise<any>;
}
