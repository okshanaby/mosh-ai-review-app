import { Router } from 'express';
import { reviewsController } from '../controllers/reviews.controller';

const reviewRouter = Router();

reviewRouter.get('/:id/reviews', reviewsController.getProductReviews);

export default reviewRouter;
