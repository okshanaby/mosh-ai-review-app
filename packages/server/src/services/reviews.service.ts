import { reviewsRepository } from '../repositories/reviews.repository';

// Public Interface
export const reviewsService = {
  // GET ALL PRODUCT REVIEWS
  async getProductReviews(productId: number) {
    const reviews = await reviewsRepository.findAllProductReviews(productId);
    return reviews;
  },
  // SUMMARIZE PRODUCT REVIEWS
  async summarizeProductReviews(productId: number) {
    const reviews = await reviewsRepository.findAllProductReviews(productId, 2);
    const joinedReview = reviews.map((r) => r.content).join('\n\n');
    const summary = 'This is a demo summary';
    return summary;
  },
};
