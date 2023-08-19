import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class CreatePaymentIntent {
  private stripe = new Stripe(
    'sk_test_51NgYelD0rgzgDy4Qwxa1OTQ64AZQY7TTtkjONn3Wj6N3Ek4W1HDHbhbSIPwTqz7aGJKZoQxVgpDgRCB59QYkYgO300oExXQEKC',
    { apiVersion: '2023-08-16' },
  );

  async execute(): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 1400,
      currency: 'brl',
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      payment_method_types: ['card', 'boleto'],
    });

    return paymentIntent;
  }
}
