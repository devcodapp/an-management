import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class CreateCheckoutSession {
  private stripe = new Stripe(
    'sk_test_51NgYelD0rgzgDy4Qwxa1OTQ64AZQY7TTtkjONn3Wj6N3Ek4W1HDHbhbSIPwTqz7aGJKZoQxVgpDgRCB59QYkYgO300oExXQEKC',
    { apiVersion: '2023-08-16' },
  );

  async execute(): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1NgbJcD0rgzgDy4Q2WuzXAq6',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `http://localhost:3333/?success=true`,
      cancel_url: `http://localhost:3333/?canceled=true`,
    });

    return session;
  }
}
