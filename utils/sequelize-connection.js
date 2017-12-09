import Sequelize from 'sequelize';
import config from '../config';
import Q from 'q';
const db = config.db;
const sequelize = new Sequelize(db.dbName, db.username, db.password, db.details);
// global.sequelize = sequelize;
// setting sequelize connection as global to use it anywhere in the application.
global.testing = 5000;
let dbConnected = false;
function connect() {
    const deffer = Q.defer();
    sequelize.authenticate().then((result) => {
        dbConnected = true;
        // Force sync all models
        if (process.env.NODE_ENV === 'test') {
            return sequelize.sync({ force: true }).then(() => setTimeout(() => true, 9000));
        }
        console.log(`Mysql Database "${db.dbName}" Connected`);
        return deffer.resolve(dbConnected);

    }).catch(err => console.error('Unable to connect to the database:', err));
    return deffer.promise;
}

export default { connect };