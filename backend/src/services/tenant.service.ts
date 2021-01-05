import * as urlHelper from '../helpers/url.helper';
import { v4 as uuidv4 } from 'uuid';
import { knex } from '../database/index';
import { tx } from '../database/transaction';

class TenantService {

  public async create(name: string): Promise<any> {

    let exists = await this.exists(name);
    if (exists) {
      throw new Error('Tenant already exists.');
    }

    // let result = await knex('tenants').insert({ id: uuidv4(), name }).returning('*').first();
    // return result;

    let result;

    await tx(async client => {
      const { rows } = await client.query('INSERT INTO tenants (id, name) VALUES ($1 ,$2) RETURNING *', [uuidv4(), name]);
      result = rows[0];
    });

    return result;
  }

  public async exists(name: string): Promise<boolean> {
    // let result = await knex('tenants').where('name', name).count('id as cnt').first();
    // return result.cnt > 0;

    let result = false;

    await tx(async client => {
      const { rows } = await client.query<{ cnt: string }>('SELECT COUNT(*) AS cnt FROM tenants WHERE name = $1', [name]);
      const cnt = rows[0].cnt;
      result = parseInt(cnt) > 0;
    });

    return result;
  }

  public async getTenantBySubdomain(url: string): Promise<any> {
    let subdomain = urlHelper.getSubdomain(url);

    if (!subdomain) {
      return null
    }

    return await this.getTenantByName(subdomain);
  }

  public async getTenantByName(name: string): Promise<any> {
    // let result = await knex('tenants').where({ name }).first();
    // return result;

    let result;

    await tx(async client => {
      const { rows } = await client.query('SELECT * FROM tenants WHERE name = $1', [name]);
      result = rows[0];
    });

    return result;
  }
}

export default TenantService;