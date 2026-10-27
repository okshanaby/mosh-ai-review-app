import type { Request, Response } from 'express';
import { reviewsService } from '../services/reviews.service';

// Public interfae
export const reviewsController = {
  // GET ALL PRODUCT REVIEWS
  async getProductReviews(req: Request, res: Response) {
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
      const reviews = await reviewsService.getProductReviews(productId);

      console.info(
        '================= GET: /api/v1/products/:id/reviews - RESPONDED =========================='
      );

      res.json({
        results: reviews,
      });
    } catch (error) {
      console.error(
        '================= GET: /api/v1/products/:id/reviews - ERROR =========================='
      );
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve this product reviews, try again' });
    }
  },
  // SUMMARIZE PRODUCT REVIEWS
  async summarizeProductReviews(req: Request, res: Response) {
    console.info(
      '================= GET: /api/v1/products/:id/reviews/summarize - HIT =========================='
    );

    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      const error = 'Invalid Product ID';

      res.status(400).json({
        error,
      });

      console.error(
        '================= GET: /api/v1/products/:id/reviews/summarize - ERROR =========================='
      );
      console.error(error);

      return;
    }

    try {
      const summary = await reviewsService.summarizeProductReviews(productId);

      console.info(
        '================= GET: /api/v1/products/:id/reviews/summarize - RESPONDED =========================='
      );

      res.json({
        summary,
      });
    } catch (error) {
      console.error(
        '================= GET: /api/v1/products/:id/reviews/summarize - ERROR =========================='
      );
      console.error(error);
      return res.status(500).json({ error: 'Failed to summarize this product reviews, try again' });
    }
  },
};
