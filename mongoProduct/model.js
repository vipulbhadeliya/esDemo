
import Q from 'q';
import db from '../utils/mongo-query';
import config from '../config';

let product = {}
/**
 *  Add Product
 * 
 * @param data            - req. data
 * @return (productID)
 */
product.add = (data) => {
    const deffered = Q.defer();
    let obj = {};
    obj._id = db.getNextKey();
    obj.name = 'Testing';
    obj.isActive = true;
    obj.isDeleted = false;
    db.addDocument(`${config.tables.user}`, obj).then((res) => {
        deffered.resolve(obj._id);
    });
    return deffered.promise;
}
/**
 *  Get Product
 * 
 * @param data            - req. data
 * @return ([])
 */
product.get = (data) => {
    const deffered = Q.defer();
    let findObj = {
        _id: '1d1e2857-c87d-4f11-aef8-c7e37e13881d'
    };
    db.getDocument(`${config.tables.user}`, findObj).then((res) => {
        deffered.resolve(res);
    });
    return deffered.promise;
}
/**
 *  Remove Product
 * 
 * @param data            - req. data
 * @return (productID)
 */
product.remove = (data) => {
    const deffered = Q.defer();
    const removeID = '1d1e2857-c87d-4f11-aef8-c7e37e13881d';
    let removeObj = {
        _id: removeID
    };
    db.deleteDocument(`${config.tables.user}`, removeObj).then((res) => {
        deffered.resolve(removeID);
    });
    return deffered.promise;
}
/**
 *  Get Product list
 * 
 * @param data            - req. data
 * @return ([])
 */
product.list = (data) => {
    const deffered = Q.defer();
    let findObj = {};
    db.getDocument(`${config.tables.user}`, findObj).then((res) => {
        deffered.resolve(res);
    });
    return deffered.promise;
}
export default product;
