module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
  },
  production: {
    username: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_NAME,
    host: process.env.APP_DB_HOST,
    dialect: 'postgres',
  },
};