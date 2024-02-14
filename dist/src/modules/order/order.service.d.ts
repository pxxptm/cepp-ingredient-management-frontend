import { ComponentService } from '../component/component.service';
import { IngredientService } from '../ingredient/ingredient.service';
export declare class OrderService {
    private readonly componentService;
    private readonly ingredientService;
    constructor(componentService: ComponentService, ingredientService: IngredientService);
    checkCanMake(menuId: string, amount: number): Promise<{
        name: string;
        status: string;
    }[]>;
}
