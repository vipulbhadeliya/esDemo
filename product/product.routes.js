import express from 'express';
import productCtrl from './product.controller';

const routes = new express.Router();

routes.route('/')
    .get(productCtrl.list);

export default routes;
