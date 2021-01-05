import Knex from 'knex';
import { db } from '../config.json';
import { Pool, Client } from 'pg';

const { database, host, password, port: _port, user } = db;
const port: number = +_port;

/*
*   You can use `knex` library as a 
*   lightweight query builder
*/

const knex = Knex({
  client: 'pg',
  connection: { user, password, host, port, database },
  searchPath: ['public'],
});

/*
*   Also, you have an option to work directly 
*   with `pg` (node-postgres). A PostgreSQL 
*   client for Node.js.
*/

const pool = new Pool({ user, password, host, port, database });

export { knex, pool };