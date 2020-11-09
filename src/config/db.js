  
import Sequelize from 'sequelize';

// Sequelize patch
import * as pg from 'pg';

import * as models from 'src/models';

const user = process.env.DB_USER || 'postgres';
const host = process.env.DB_HOST || 'db';
const port = process.env.DB_PORT || 5432;
const name = process.env.DB_NAME || 'postgres';
const password = process.env.DB_PASSWORD ? `:${process.env.DB_PASSWORD}` : '';

export const dbUrl = `postgres://${user}${password}@${host}:${port}/${name}`;

const db = new Sequelize(dbUrl, {
  dialect: 'postgres',
  connectionTimeout: 10000,
  requestTimeout: 10000,
  logging: null,
  define: {
    underscored: true,
    timestamps: true,
    paranoid: true,
  },
  query: {
    individualHooks: true,
  },
});

for (const model of Object.values(models)) {
  model.init(db);
}

for (const model of Object.values(models)) {
  if (typeof model.associate === 'function') model.associate(models);
}

export default db;