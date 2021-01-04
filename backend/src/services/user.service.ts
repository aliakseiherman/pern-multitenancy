import { generateSalt, getHash } from '../helpers/password.helper';
import { v4 as uuidv4 } from 'uuid';
import { knex } from '../database/index';

class UserService {

  public async create(input: any): Promise<any> {
    const { username, password } = input;

    let exists = await this.exists(username);
    if (exists) {
      throw new Error('User already exists.');
    }

    let salt = generateSalt();
    let newPassword = getHash(password, salt);

    let output = await knex('users').insert({ id: uuidv4(), username: username, password: newPassword, salt }).returning('*');
    return output[0];
  }

  public async exists(username: string): Promise<boolean> {
    let output = await knex('users').where({ username }).count('id as cnt').first();
    return output.cnt > 0;
  }

  public async getByName(username: string): Promise<any> {
    let result = await knex('users').where({ username }).first();
    return result;
  }

  public async getById(id: string): Promise<any> {
    let result = await knex('users').where({ id }).first();
    return result;
  }
}

export default UserService;