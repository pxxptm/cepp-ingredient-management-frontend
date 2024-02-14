import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    checkCanMake(menuId: string, amount: number): Promise<{
        name: string;
        status: string;
    }[]>;
}
