import q from 'q';
import uuid from 'node-uuid';
import config from '../config';
import Mongo from 'mongodb';

let mongodb = config.mongo;
// let MongoClient = require('mongodb').MongoClient;
let db;
const MongoClient = Mongo.MongoClient;

MongoClient.connect(`${mongodb.host}`, (err, client) => {
    db = client.db(`${mongodb.dbName}`);
});

let addDocument = (tableName, docToInsert) => {
    const deffered = q.defer();
    db.collection(tableName).insertOne(docToInsert).then((resp) => {
        deffered.resolve(resp);
    }).catch(err => deffered.reject(err));
    return deffered.promise;
}

let addDocuments = function (tableName, docstoInsert) {
    const deffered = q.defer();
    db.collection(tableName).insertMany(docstoInsert).then((resp) => {
        deffered.resolve(resp);
    }).catch(err => deffered.reject(err));
    return deffered.promise;
}

let updateDocument = function (tableName, uniqueReference, docstoUpdate, updateInES) {
    const deffered = q.defer();
    db.collection(tableName).update(uniqueReference, docstoUpdate).then(function (resp) {
        if (updateInES === true) {
            common.addDocumentToEs(docstoUpdate)
            deffered.resolve(resp);
        } else {
            deffered.resolve(resp);
        }
    }).catch(err => deffered.reject(err));;

    return deffered.promise;
}

let deleteDocument = function (tableName, removeObj) {
    const deffered = q.defer();
    db.collection(tableName).remove(removeObj).then(function (resp) {
        deffered.resolve(resp);
    }).catch(err => deffered.reject(err));;
    return deffered.promise;
}

let getDocument = function (tableName, docToSearch, fields) {
    const deffered = q.defer();
    db.collection(tableName).find(docToSearch, fields).toArray((err, resp) => {
        if (!err) deffered.resolve(resp);
        deffered.reject(err);
    });
    return deffered.promise;
}

let getAllDocuments = function (tableName) {
    const deffered = q.defer();
    db.collection(tableName).find().toArray((err, resp) => {
        if (!err) {
            deffered.resolve(resp);
        } else {
            deffered.reject(err);
        }
    });
    return deffered.promise;
}

let aggregate = function (tableName, aggregateObj) {
    const deffered = q.defer();
    db.collection(tableName).aggregate(aggregateObj).toArray((err, resp) => {
        if (!err) {
            deffered.resolve(resp);
        } else {
            deffered.reject(err);
        }
    });
    return deffered.promise;
};
let getNextKey = function () {
    return uuid.v4();
};
export default {
    addDocument,
    getDocument,
    addDocuments,
    aggregate,
    updateDocument,
    deleteDocument,
    getAllDocuments,
    getNextKey,
    MongoClient
};