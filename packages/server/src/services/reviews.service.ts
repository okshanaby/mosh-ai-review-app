import { reviewsRepository } from '../repositories/reviews.repository';
import OpenAI from 'openai';

// Implementation details
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 200,
    });

    const summary = response.output_text;

    return summary;
  },
};
