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
import { Ingredient } from './schema/ingredient.schema';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';
export declare class IngredientService {
    private readonly ingredientModel;
    constructor(ingredientModel: mongoose.Model<Ingredient>);
    getById(ingredientId: string): Promise<mongoose.Document<unknown, any, Ingredient> & Omit<Ingredient & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    create(createIngredientDto: CreateIngredientDto): Promise<mongoose.Document<unknown, any, Ingredient> & Omit<Ingredient & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    update(ingredientId: string, updateIngredientDto: UpdateIngredientDto): Promise<mongoose.Document<unknown, any, Ingredient> & Omit<Ingredient & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    delete(ingredientId: string): Promise<mongoose.Document<unknown, any, Ingredient> & Omit<Ingredient & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    checkCanMake(ingredientId: string, amount: number): Promise<boolean>;
}
