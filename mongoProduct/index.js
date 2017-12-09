import express from 'express';
import service from './service';
import validate from 'express-validation';
import Joi from 'joi';

const routes = new express.Router();

const paramValidation = {
    product: {
        body: {
            name: Joi.string().required(),
            isActive: Joi.boolean().required()
        }
    }
};

routes.route('/')
    /** GET /api/product                    - Get list of Product */
    .get(service.list)
    /** POST /api/product                   - Add of Products */
    .post(validate(paramValidation.product), service.add);

routes.route('/:productID')
    /** GET /api/product                    - Get Product */
    .get(service.get)
    /** DELETE /api/product/:productID      - Add of Products */
    .delete(service.remove);
export default routes;
