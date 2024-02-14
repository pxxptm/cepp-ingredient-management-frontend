import { Priority } from '../schema/component.schema';
export declare class CreateComponentDto {
    readonly restaurantId: string;
    readonly menuId: string;
    readonly ingredientId: string;
    readonly ingredientAmount: number;
    readonly priority: Priority;
}
export declare class UpdateComponentDto {
    readonly restaurantId: string;
    readonly menuId: string;
    readonly ingredientId: string;
    readonly ingredientAmount: number;
    readonly priority: Priority;
}
