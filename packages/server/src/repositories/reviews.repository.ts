import { db } from '../prisma/db';

// Public Interface
export const reviewsRepository = {
  async findAllProductReviews(productId: number) {
    const results = await db.orm.public.Review.where({
      productId,
    })
      .orderBy((review) => review.createdAt.desc())
      .all();

    return results;
  },
};
