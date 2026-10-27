import { db } from '../prisma/db';

// Public Interface
export const reviewsRepository = {
  async findAllProductReviews(productId: number, limit?: number) {
    const results = await db.orm.public.Review.where({
      productId,
    })
      .orderBy((review) => review.createdAt.desc())
      .limit(limit!)
      .all();

    return results;
  },
};
