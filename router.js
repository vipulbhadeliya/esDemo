import express from 'express';
import productRoutes from './product/product.routes';

const router = new express.Router();

router.use('/', productRoutes);

export default router;
