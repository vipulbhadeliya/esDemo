import express from 'express';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import config from './config';
import routes from './router/index';
import sequelize from './utils/sequelize-connection';

const app = express();
const db = config.db;
const MongoClient = './utils/mongo-query';
// // mount all routes on / path
app.use('/', routes);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use((req, res, next) => res.status(httpStatus.NOT_FOUND).json({ error: 'API not found' })); // eslint-disable-line no-unused-vars
sequelize.connect().then((res, err) => {
  if (err) console.log(`Mysql Database "${db.dbName}" Connected`);
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`>>>>>>>> Server started on PORT :: ${config.port}(${config.env}) <<<<<<<<`);
  });
});


export default app;
