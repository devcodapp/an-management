export interface ProductFilterInput {
  name?: string;
  price?: number;
  categoryId?: string;
  categoryReturn: boolean;
  additionalsReturn: boolean;
  deleted?: boolean;
}
