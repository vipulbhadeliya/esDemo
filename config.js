export default {
  env: 'development',
  port: 4049,
  db: {
    dbName: 'HelloTest',
    username: 'root',
    password: '',
    details: {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  },
  mongo: {
    host: 'mongodb://localhost',
    dbName: 'HelloTest'
  },
  tables: {
    user: 'user'
  }
};
