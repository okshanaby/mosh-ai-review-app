import { Router } from 'express';
import chatRouter from './chat.router';
import reviewRouter from './review.router';

const appRouter = Router();

appRouter.use('/chat', chatRouter);
appRouter.use('/products', reviewRouter);
// appRouter.use('/products', productsRouter)

export default appRouter;
