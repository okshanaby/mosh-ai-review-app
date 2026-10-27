import { reviewsRepository } from '../repositories/reviews.repository';

// Public Interface
export const reviewsService = {
  async getProductReviews(productId: number) {
    const reviews = await reviewsRepository.findAllProductReviews(productId);
    return reviews;
  },
};
