import model from './model';

// Add Product
const add = (req, res) => {
    const data = req.body;
    console.log('Request Data :: %j', data);
    model.add(data).then((doc) => {
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

// Get Product list
const list = (req, res) => {
    const data = req.body;
    console.log('Request Data :: %j', data);
    model.list('').then((doc) => {
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
    add, get, remove, list
}