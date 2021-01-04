import CarBrandService from "../services/car-brand.service";
import TenantService from "../services/tenant.service";
import { knex } from '../database/index';

class CarBrandsSeed {
  public tenantService: TenantService = new TenantService();
  public carBrandService: CarBrandService = new CarBrandService();

  public async seed(): Promise<void> {
    let tenant = await this.tenantService.getTenantByName('subdomain1');

    [{
      name: 'Audi',
      about: 'Audi AG is a German automobile manufacturer that designs, engineers, produces, markets and distributes luxury vehicles. Audi is a member of the Volkswagen Group and has its roots at Ingolstadt, Bavaria, Germany. Audi-branded vehicles are produced in nine production facilities worldwide.'
    }, {
      name: 'Mercedes-Benz',
      about: 'Mercedes-Benz is both a German automotive marque and, from late 2019 onwards, a subsidiary (Mercedes-Benz AG) of Daimler AG. Mercedes-Benz is known for producing luxury vehicles and commercial vehicles. The headquarters is in Stuttgart, Baden-Württemberg. The name first appeared in 1926 under Daimler-Benz. In 2018, Mercedes-Benz was the largest seller of premium vehicles in the world, having sold 2.31 million passenger cars.'
    }]
      .forEach(async (brand, i) => {
        let output = await knex('car_brands').where({ 'name': brand.name, 'tenant_id': tenant.id }).count('id as cnt');

        if (output[0].cnt == 0) {
          await this.carBrandService.create({ name: brand.name, about: brand.about, tenantId: tenant.id });
        }
      });
  }
}

export default CarBrandsSeed;