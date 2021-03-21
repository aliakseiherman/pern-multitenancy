import { tx } from '../database/transaction'
import TenantService from "../services/tenant.service"
class TenantSeed {
  public tenantService: TenantService = new TenantService();

  public async seed(): Promise<void> {
    const tenants = ['subdomain1', 'subdomain2']

    for (let name of tenants) {
      let exists = await this.tenantService.exists(name)
      if (!exists) {
        await this.tenantService.create(name)
      }
    }
  }
}

export default TenantSeed