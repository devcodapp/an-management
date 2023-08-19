import { Controller, Post } from '@nestjs/common';
import { CreatePaymentIntent } from './use-cases/create-payment-intent';
import { CreateCheckoutSession } from './use-cases/create-checkout-session';

@Controller('stripe')
export class StripeController {
  constructor(
    private createPaymentIntent: CreatePaymentIntent,
    private createCheckoutSession: CreateCheckoutSession,
  ) {}

  @Post('create-payment-intent')
  async create() {
    return await this.createPaymentIntent.execute();
  }

  @Post('create-checkout-session')
  async createCheckout() {
    return await this.createCheckoutSession.execute();
  }
}
