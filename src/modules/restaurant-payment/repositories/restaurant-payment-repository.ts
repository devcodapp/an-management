import { FilterRestaurantPaymentBody } from "../dtos/filter-restaurant-payment.body";
import { RestaurantPayment } from "../entities/restaurant-payment";

export abstract class RestaurantPaymentRepository {

    abstract create(restaurantPayment: RestaurantPayment) : Promise<void>; 

    abstract restaurantPayments(filters: FilterRestaurantPaymentBody): Promise<RestaurantPayment[] | null>;

    abstract restaurantPayment(restaurantPaymentId: string): Promise<RestaurantPayment | null>;

    abstract save(coupon: RestaurantPayment): Promise<void>;
}