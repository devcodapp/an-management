export const generateSKU = (length: number): string => {
  const model = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * 36);
    sku = sku + model[random];
  }
  return sku;
};
