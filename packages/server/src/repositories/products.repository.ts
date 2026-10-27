import { db } from '../prisma/db';

export const productsRepository = {
  async findProduct(productId: number) {
    const result = db.orm.public.Product.where({ id: productId }).first();

    return result;
  },
};
