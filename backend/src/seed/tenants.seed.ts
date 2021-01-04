import TenantService from "../services/tenant.service";
import { knex } from '../database/index';

class TenantSeed {
  public tenantService: TenantService = new TenantService();

  public async seed(): Promise<void> {
    ['subdomain1', 'subdomain2'].forEach(async (name, i) => {
      let output = await knex('tenants').where({ name }).count('id as cnt');

      if (output[0].cnt == 0) {
        await this.tenantService.create(name);
      }
    });
  }
}

export default TenantSeed;