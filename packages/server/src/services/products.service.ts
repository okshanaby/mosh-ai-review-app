import { productsRepository } from '../repositories/products.repository';

export const productsService = {
  async getProductbyId(productId: number) {
    const product = await productsRepository.findProduct(productId);
    return product;
  },
};
