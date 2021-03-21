import { generateSalt, getHash } from '../helpers/password.helper'
import { v4 as uuidv4 } from 'uuid'
import { tx } from '../database/transaction'

class UserService {

  public async create(input: any): Promise<any> {
    const { username, password } = input

    let exists = await this.exists(username)
    if (exists) {
      throw new Error('User already exists.')
    }

    let salt = generateSalt()
    let hashedPassword = getHash(password, salt)

    let result

    await tx(async client => {
      const { rows } = await client.query('INSERT INTO users (id, username, password, salt) VALUES ($1 ,$2, $3, $4) RETURNING *', [uuidv4(), username, hashedPassword, salt])
      result = rows[0]
    })

    return result
  }

  public async exists(username: string): Promise<boolean> {

    let result

    await tx(async client => {
      const { rows } = await client.query<{ cnt: string }>('SELECT COUNT(*) AS cnt FROM users WHERE username = $1', [username])
      result = parseInt(rows[0].cnt) > 0
    })

    return result
  }

  public async getByName(username: string): Promise<any> {

    let result

    await tx(async client => {
      const { rows } = await client.query('SELECT * FROM users WHERE username = $1', [username])
      result = rows[0]
    })

    return result
  }

  public async getById(id: string): Promise<any> {

    let result

    await tx(async client => {
      const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [id])
      result = rows[0]
    })

    return result
  }
}

export default UserService