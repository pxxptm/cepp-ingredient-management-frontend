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
import { Menu } from './schema/menu.schema';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
export declare class MenuService {
    private readonly menuModel;
    constructor(menuModel: mongoose.Model<Menu>);
    create(createMenuDto: CreateMenuDto): Promise<void>;
    findOneById(menuId: string): Promise<mongoose.Document<unknown, any, Menu> & Omit<Menu & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    findByRestaurantId(restaurantId: string): Promise<(mongoose.Document<unknown, any, Menu> & Omit<Menu & {
        _id: mongoose.Types.ObjectId;
    }, never>)[]>;
    update(menuId: string, updateMenuDto: UpdateMenuDto): Promise<mongoose.Document<unknown, any, Menu> & Omit<Menu & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    delete(menuId: string): Promise<mongoose.Document<unknown, any, Menu> & Omit<Menu & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
}
