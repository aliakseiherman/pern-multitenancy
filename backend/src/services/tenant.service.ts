import * as urlHelper from '../helpers/url.helper';
import { v4 as uuidv4 } from 'uuid';
import { knex } from '../database/index';

class TenantService {

  public async create(name: string): Promise<any> {

    let exists = await this.exists(name);
    if (exists) {
      throw new Error('Tenant already exists.');
    }

    let output = await knex('tenants').insert({ id: uuidv4(), name }).returning('*');
    return output[0];
  }

  public async exists(name: string): Promise<boolean> {
    let result = await knex('tenants').where('name', name).count('id as cnt').first();
    return result.cnt > 0;
  }

  public async getTenantBySubdomain(url: string): Promise<any> {
    let subdomain = urlHelper.getSubdomain(url);

    if (!subdomain) {
      return null
    }

    return await this.getTenantByName(subdomain);
  }

  public async getTenantByName(name: string): Promise<any> {
    let result = await knex('tenants').where({ name }).first();
    return result;
  }
}

export default TenantService;