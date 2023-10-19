import { BaseEntity, BaseEntityProps } from "@shared/entities/base-entity";

interface RestaurantPaymentProps {
    name: string;
    description: string;
    disabled?: boolean;
    restaurantId: string;
}

export class RestaurantPayment extends BaseEntity {

    private props: RestaurantPaymentProps

    constructor(props: RestaurantPaymentProps, baseProps: BaseEntityProps) {
        super(baseProps);

        this.props = {
            ...props,
            disabled: props.disabled || false,
        };
    }

    public get name() : string {
        return this.props.name 
    }

    public get description() : string {
        return this.props.description 
    }

    public get disabled() : boolean | undefined {
        return this.props.disabled 
    }

    public get restaurantId() : string {
        return this.props.restaurantId 
    }

    public set name(name: string) {
        this.props.name = name;
    }

    public set description(description: string) {
        this.props.description = description;
    }

    public set disabled(disabled: boolean | undefined) {
        this.props.disabled = disabled;
    }
    
    public set restaurantId(restaurantId: string) {
        this.props.restaurantId = restaurantId;
    }
}