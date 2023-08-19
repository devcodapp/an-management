import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { CreatePaymentIntent } from './use-cases/create-payment-intent';
import { CreateCheckoutSession } from './use-cases/create-checkout-session';

@Module({
  providers: [CreatePaymentIntent, CreateCheckoutSession],
  controllers: [StripeController],
})
export class StripeModule {}
