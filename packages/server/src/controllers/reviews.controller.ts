import type { Request, Response } from 'express';
import { reviewsService } from '../services/reviews.service';
import { productsService } from '../services/products.service';

// Public interfae
export const reviewsController = {
  // GET ALL PRODUCT REVIEWS
  async getProductReviews(req: Request, res: Response) {
    console.info(
      '================= GET: /api/v1/products/:id/reviews - HIT =========================='
    );

    const productId = Number(req.params.id);

    if (!Number.isSafeInteger(productId) || productId <= 0) {
      const error = 'Invalid Product ID';

      console.error(
        '================= GET: /api/v1/products/:id/reviews - ERROR =========================='
      );
      console.error(error);

      return res.status(400).json({
        error,
      });
    }

    try {
      const product = await productsService.getProductbyId(productId);
      if (!product) {
        const error = 'Product Not Found';

        console.error(
          '================= GET: /api/v1/products/:id/reviews - ERROR =========================='
        );
        console.error(error);

        return res.status(404).json({
          error,
        });
      }

      const { summary, reviews } = await reviewsService.getProductReviewsAndSummary(productId);

      console.info(
        '================= GET: /api/v1/products/:id/reviews - RESPONDED =========================='
      );

      res.status(200).json({
        summary,
        reviews,
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
    if (!Number.isSafeInteger(productId) || productId <= 0) {
      const error = 'Invalid Product ID';

      console.error(
        '================= GET: /api/v1/products/:id/reviews/summarize - ERROR =========================='
      );
      console.error(error);

      return res.status(400).json({
        error,
      });
    }

    try {
      const product = await productsService.getProductbyId(productId);
      if (!product) {
        const error = 'Product Not Found';

        console.error(
          '================= GET: /api/v1/products/:id/reviews/summarize - ERROR =========================='
        );
        console.error(error);

        return res.status(404).json({
          error,
        });
      }

      const summary = await reviewsService.summarizeProductReviews(productId);

      console.info(
        '================= GET: /api/v1/products/:id/reviews/summarize - RESPONDED =========================='
      );

      res.status(200).json({
        summary,
      });
    } catch (error) {
      console.error(
        '================= GET: /api/v1/products/:id/reviews/summarize - ERROR =========================='
      );

      if (error instanceof Error && error.message === 'There are no reviews to summarize') {
        return res.status(404).json({
          error: error.message,
        });
      }

      console.error(error);

      return res.status(500).json({ error: 'Failed to summarize this product reviews, try again' });
    }
  },
};
