import { db } from '../prisma/db';

// Public Interface
export const reviewsRepository = {
  // FIND ALL PRODUCT REVIEWS
  async findAllProductReviews(productId: number, limit?: number) {
    const results = await db.orm.public.Review.where({
      productId,
    })
      .orderBy((review) => review.createdAt.desc())
      .limit(limit!)
      .all();

    return results;
  },
  // CREATE OR UPDATE PRODUCT SUMMARY
  async upsertReviewSummary(productId: number, summary: string) {
    const generatedAt = Temporal.Now.instant();
    const expiresAt = generatedAt.add({ hours: 24 * 7 });

    const data = {
      productId,
      content: summary,
      generatedAt,
      expiresAt,
    };

    const result = await db.orm.public.Summary.upsert({
      create: data,
      update: data,
      conflictOn: { productId },
    });

    return result;
  },
  // FIND PRODUCT SUMMARY
  async findProductReviewSummary(productId: number) {
    const result = await db.orm.public.Summary.where({
      productId,
    }).first();

    return result;
  },
};
