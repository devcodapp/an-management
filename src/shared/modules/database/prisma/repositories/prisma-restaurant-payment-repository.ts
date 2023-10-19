import { RestaurantPayment } from "@modules/restaurant-payment/entities/restaurant-payment";
import { RestaurantPaymentRepository } from "@modules/restaurant-payment/repositories/restaurant-payment-repository";
import { PrismaRestaurantPaymentMapper } from "../mappers/prisma-restaurant-payment-mapper";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { FilterRestaurantPaymentBody } from "@modules/restaurant-payment/dtos/filter-restaurant-payment.body";

@Injectable()
export class PrismaRestaurantPaymentRepository implements RestaurantPaymentRepository{

    constructor(private prisma: PrismaService) {}

    async create(restaurantPayment: RestaurantPayment): Promise<void> {
        
        const raw = PrismaRestaurantPaymentMapper.toPrisma(restaurantPayment)

        await this.prisma.restaurantPayment.create({ data: raw })
    }

    async restaurantPayments(filters: FilterRestaurantPaymentBody): Promise<RestaurantPayment[] | null> {
        const restaurantPayments = await this.prisma.restaurantPayment.findMany({
          where: {
            ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
            ...(filters.description && { description: { contains: filters.description, mode: 'insensitive' } }),
            ...(filters.restaurantId && { restaurantId: filters.restaurantId }),
            deleted: filters.deleted || false,
          },
        });
    
        return restaurantPayments.map(PrismaRestaurantPaymentMapper.toDomain);
      }

    async restaurantPayment(restaurantPaymentId: string): Promise<RestaurantPayment | null> {
        const restaurantPayment = await this.prisma.restaurantPayment.findUnique({
            where: { id: restaurantPaymentId },
        })

        if (!restaurantPayment) {
            return null;
          }
      
        return PrismaRestaurantPaymentMapper.toDomain(restaurantPayment);
    }

    async save(restaurantPayment: RestaurantPayment): Promise<void> {
        const { id, ...raw } = PrismaRestaurantPaymentMapper.toPrisma(restaurantPayment);
    
        await this.prisma.restaurantPayment.update({
          where: { id },
          data: raw,
        });
    }
}