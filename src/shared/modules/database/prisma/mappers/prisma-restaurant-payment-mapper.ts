import { RestaurantPayment } from "@modules/restaurant-payment/entities/restaurant-payment";
import { RestaurantPayment as RawRestaurantPayment } from "@prisma/client";

export class PrismaRestaurantPaymentMapper {
    static toPrisma(restaurantPayment: RestaurantPayment) {
        return {
            id: restaurantPayment.id,
            createdAt: restaurantPayment.createdAt,
            createdUser: restaurantPayment.createdUser,
            deletedUser: restaurantPayment.deletedUser,
            deletedAt: restaurantPayment.deletedAt,
            deleted: restaurantPayment.deleted,
            name: restaurantPayment.name,
            description: restaurantPayment.description,
            disabled: restaurantPayment.disabled,
            restaurantId: restaurantPayment.restaurantId
        }
    }

    static toDomain(raw: RawRestaurantPayment) {
        return new RestaurantPayment({ ...raw, disabled: raw.disabled || undefined }, {...raw})
    }
}