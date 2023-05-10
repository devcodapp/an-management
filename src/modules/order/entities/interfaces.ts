import { Table } from '@modules/table/entities/table';

export interface OrderProps {
  code: string;

  date: Date;
  seenDate: Date;
  authorizedData: Date;

  products: any;
  subtotal: number;
  total: number;

  customer: any;
  tableId: string;
  table?: Table;

  coupon: any;

  payment: PaymentProps;

  invoiceId: string;
}

interface PaymentProps {
  method: string;
  paymentOnline: boolean;
  paymentDelivery: boolean;
  paymentDate: Date;
}
