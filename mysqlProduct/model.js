import Sequelize from 'sequelize';
import config from '../config';

const dbTables = config.tables;
/**
 * Product Schema
 */
const productSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  isActive: {
    type: Sequelize.BOOLEAN
  },
  isDeleted: {
    type: Sequelize.BOOLEAN
  }
};

// const getModel = sequelize.define(dbTables.user, productSchema, { timestamps: false, freezeTableName: true, });
const getModel = Sequelize;


/**
 * Get Doc From DB.
 * @return {{}}
 */
getModel.get = function get() {
  return this.findAll().then(data => data).catch(e => e);
}
/**
 * Save Doc to DB.
 * @param data                     - Data object
 * 
 */
getModel.add = function add(data) {
  return this.create(data).then(res => res).catch(e => e);
}
/**
 * Remove Doc from DB.
 * @param data                     - Data object
 * 
 */
getModel.remove = function remove(data) {
  const row = getModel.build({ id: data.id }, { isNewRecord: false });
  return row.destroy().then(res => res).catch(e => e);
}

export default getModel;
