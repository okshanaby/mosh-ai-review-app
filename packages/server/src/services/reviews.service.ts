import { llmClient } from '../llm/client';
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
    const reviews = await reviewsRepository.findAllProductReviews(productId, 10);
    const joinedReview = reviews.map((r) => r.content).join('\n\n');
    const prompt = `Summarize the following customer reviews into a short paragraph highlighting
     key themes both positive and negative: 
     ${joinedReview}
    `;

    const response = await llmClient.generateText({ input: prompt });

    const summary = response.text;

    return summary;
  },
};
