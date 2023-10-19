import { RestaurantPayment } from "../entities/restaurant-payment";

export class RestaurantPaymentViewModel {
    static toHTTP(restaurantPayment: RestaurantPayment) : IRestaurantPaymentView { 
        return {
            description: restaurantPayment.description,
            id: restaurantPayment.id,
            name: restaurantPayment.name,
            restaurantId: restaurantPayment.restaurantId,
            disabled: restaurantPayment.disabled,
        }
    }
}


export interface IRestaurantPaymentView {
    id: string;
    description: string;
    name: string;
    disabled?: boolean;
    restaurantId: string;
}