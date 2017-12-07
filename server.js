import express from 'express';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import config from './config';
import routes from './router';

const db = config.db;
const sequelize = new Sequelize(db.dbName, db.username, db.password, db.details);
const app = express();
// // mount all routes on / path
app.use('/', routes);
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => res.status(httpStatus.NOT_FOUND).json({ error: 'API not found' })); // eslint-disable-line no-unused-vars
// setting sequelize connection as global to use it anywhere in the application.
global.sequelize = sequelize;
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// Adding a settle method that will allow multiple promise to executed like (Promise.all)
// but wil run other promise even if one of the promise gets rejected.
/* Promise.settleAll = promises => Promise.all(promises.map(p =>
  // make sure any values or foreign promises are wrapped in a promise
  Promise.resolve(p).catch((err) => {
    // make sure error is wrapped in Error object so we can check which promises rejected
    if (err instanceof Error) {
      return err;
    }
    const errObject = new Error();
    errObject.rejectErr = err;
    return errObject;
  })
)); */
sequelize.authenticate().then(result => result).then(() => {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`----------------server started on port :: ${config.port} (${config.env})----------------`);
  });
}).catch(err => console.error('Unable to connect to the database:', err));

export default app;
