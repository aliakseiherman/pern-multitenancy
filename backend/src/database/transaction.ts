import { PoolClient } from "pg"
import { pool } from "../database"

const tx = async (callback: (client: PoolClient) => void) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    try {
      await callback(client)
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
    }
  } finally {
    client.release()
  }
}

export { tx }