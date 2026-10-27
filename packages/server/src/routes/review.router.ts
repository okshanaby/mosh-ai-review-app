import { Router } from 'express';
import { reviewsController } from '../controllers/reviews.controller';

const reviewRouter = Router();

reviewRouter.get('/:id/reviews', reviewsController.getProductReviews);
reviewRouter.post('/:id/reviews/summarize', reviewsController.summarizeProductReviews);

export default reviewRouter;
