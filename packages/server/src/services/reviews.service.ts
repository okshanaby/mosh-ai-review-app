import { llmClient } from '../llm/client';
import { reviewsRepository } from '../repositories/reviews.repository';
import promptTemplate from '../prompts/reviewSummary.txt';

// Public Interface
export const reviewsService = {
  // GET ALL PRODUCT REVIEWS
  async getProductReviews(productId: number) {
    const reviews = await reviewsRepository.findAllProductReviews(productId);
    return reviews;
  },
  // SUMMARIZE PRODUCT REVIEWS
  async summarizeProductReviews(productId: number) {
    const existingSummary = await reviewsRepository.findProductReviewSummary(productId);

    if (
      existingSummary &&
      Temporal.Instant.compare(existingSummary.expiresAt, Temporal.Now.instant()) > 0
    ) {
      return existingSummary.content;
    }

    const reviews = await reviewsRepository.findAllProductReviews(productId, 10);
    const joinedReview = reviews.map((r) => r.content).join('\n\n');
    const prompt = promptTemplate.replace('{{joinedReview}}', joinedReview);

    const { text: summary } = await llmClient.generateText({ input: prompt });

    const result = await reviewsRepository.upsertReviewSummary(productId, summary);

    return result.content;
  },
};
