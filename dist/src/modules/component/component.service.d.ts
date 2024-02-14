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
import { Component } from './schema/component.schema';
import { Model } from 'mongoose';
import { CreateComponentDto, UpdateComponentDto } from './dto/component.dto';
export declare class ComponentService {
    private readonly componentModel;
    constructor(componentModel: Model<Component>);
    create(createComponentDto: CreateComponentDto): Promise<import("mongoose").Document<unknown, any, Component> & Omit<Component & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(componentId: string, updateComponentDto: UpdateComponentDto): Promise<import("mongoose").Document<unknown, any, Component> & Omit<Component & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByMenuId(menuId: string): Promise<(import("mongoose").Document<unknown, any, Component> & Omit<Component & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
}
