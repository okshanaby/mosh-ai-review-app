import { llmClient } from '../llm/client';
import { reviewsRepository } from '../repositories/reviews.repository';
import promptTemplate from '../prompts/reviewSummary.txt';
import { productsRepository } from '../repositories/products.repository';

// Public Interface
export const reviewsService = {
  // GET ALL PRODUCT REVIEWS
  async getProductReviews(productId: number) {
    const reviews = await reviewsRepository.findAllProductReviews(productId);
    return reviews;
  },
  // GET ALL PRODUCT REVIEWS with SUMMARY
  async getProductReviewsAndSummary(productId: number) {
    const reviews = await reviewsRepository.findAllProductReviews(productId);
    const summary = await reviewsRepository.findProductReviewSummary(productId);

    return {
      summary,
      reviews,
    };
  },
  // SUMMARIZE PRODUCT REVIEWS
  async summarizeProductReviews(productId: number) {
    const existingSummary = await reviewsRepository.findProductReviewSummary(productId);

    if (existingSummary) {
      return existingSummary;
    }

    const reviews = await reviewsRepository.findAllProductReviews(productId, 10);

    if (reviews.length === 0) {
      throw new Error('There are no reviews to summarize');
    }

    const joinedReview = reviews.map((r) => r.content).join('\n\n');
    const prompt = promptTemplate.replace('{{joinedReview}}', joinedReview);

    const { text: summary } = await llmClient.generateText({ input: prompt });

    const result = await reviewsRepository.upsertReviewSummary(productId, summary);

    return result.content;
  },
};
