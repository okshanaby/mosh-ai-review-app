import { Router } from 'express';
import { db } from '../prisma/db';

const reviewRouter = Router();

reviewRouter.get('/:id/reviews', async (req, res) => {
  console.info(
    '================= GET: /api/v1/products/:id/reviews - HIT =========================='
  );

  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    const error = 'Invalid Product ID';

    res.status(400).json({
      error,
    });

    console.error(
      '================= GET: /api/v1/products/:id/reviews - ERROR =========================='
    );
    console.error(error);

    return;
  }

  try {
    const reviews = await db.orm.public.Review.where({
      productId,
    })
      .orderBy((review) => review.createdAt.desc())
      .all();

    console.info(
      '================= GET: /api/v1/products/:id/reviews - RESPONDED =========================='
    );

    res.json({
      reviews,
    });
  } catch (error) {
    console.error(
      '================= GET: /api/v1/products/:id/reviews - ERROR =========================='
    );
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve this product reviews, try again' });
  }
});

export default reviewRouter;
