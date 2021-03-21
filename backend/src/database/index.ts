import { db } from '../config.json'
import { Pool, Client } from 'pg'

const { database, host, password, port: _port, user } = db
const port: number = +_port

const pool = new Pool({ user, password, host, port, database })

export { pool }