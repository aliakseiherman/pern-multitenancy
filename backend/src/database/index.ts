import Knex from 'knex';
import { db } from '../config.json';
const { database, host, password, port: _port, user } = db;
const port: number = +_port;

const knex = Knex({
  client: 'pg',
  connection: {
    user,
    password,
    host,
    port,
    database
  },
  searchPath: ['public'],
});

export { knex };