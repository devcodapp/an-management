import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class RestaurantPaymentCreateBody {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsUUID()
    @IsNotEmpty()
    restaurantId: string;
}