import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SaveRestaurantPaymentBody {
    @IsNotEmpty()
    @IsUUID()
    restaurantPaymentId: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    disabled?: boolean | undefined
}
