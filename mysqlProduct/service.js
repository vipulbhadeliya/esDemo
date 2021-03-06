import model from './model';
import db from '../utils/mongo-query';

// Add Product
const add = (req, res) => {
    console.log('req.Query :: ==> %j', req.query);
    console.log('req.body :: ==> %j', req.body);
    const data = req.body;
    let obj = {};
    obj._id = db.getNextKey();
    obj.name = 'Testing';
    obj.isActive = true;
    obj.isDeleted = false;
    model.add(obj).then((doc) => {
        res.status(200).send({
            code: 2000,
            message: 'success',
            data: doc
        });
    }, (error) => {
        // Internal server error
        res.status(500).send({
            code: 5002,
            message: 'Error :: ' + error,
            data: {}
        });
    });
}
// Get Product
const get = (req, res) => {
    const data = req.body;
    console.log('Request Data :: %j', data);
    model.get(data).then((doc) => {
        res.status(200).send({
            code: 2000,
            message: 'success',
            data: doc
        });
    }, (error) => {
        // Internal server error
        res.status(500).send({
            code: 5002,
            message: 'Error :: ' + error,
            data: {}
        });
    });
}

// Remove Product
const remove = (req, res) => {
    console.log('req.Query :: ==> %j', req.query);
    console.log('req.body :: ==> %j', req.body);
    const data = req.query;
    console.log('Request Data :: %j', data);
    model.remove(data).then((doc) => {
        res.status(200).send({
            code: 2000,
            message: 'success',
            data: doc
        });
    }, (error) => {
        // Internal server error
        res.status(500).send({
            code: 5002,
            message: 'Error :: ' + error,
            data: {}
        });
    });
}

export default {
    add, get, remove
}