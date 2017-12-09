import express from 'express';
import mysql from '../mysqlProduct/index';
import mongo from '../mongoProduct/index'
const router = new express.Router();

router.use('/api/mysql', mysql);
router.use('/api/mongo', mongo);

export default router;
