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
import { Restaurant } from './schema/restaurant.schema';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';
import { MemberService } from '../member/member.service';
export declare class RestaurantService {
    private readonly restaurantModel;
    private readonly memberService;
    constructor(restaurantModel: mongoose.Model<Restaurant>, memberService: MemberService);
    create(userId: string, creatRestaurantDto: CreateRestaurantDto): Promise<mongoose.Document<unknown, any, Restaurant> & Omit<Restaurant & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    findOneById(restaurantId: string): Promise<mongoose.Document<unknown, any, Restaurant> & Omit<Restaurant & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    update(restaurantId: string, updaterestaurantDto: UpdateRestaurantDto): Promise<mongoose.Document<unknown, any, Restaurant> & Omit<Restaurant & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    delete(restaurantId: string): Promise<mongoose.Document<unknown, any, Restaurant> & Omit<Restaurant & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
}
