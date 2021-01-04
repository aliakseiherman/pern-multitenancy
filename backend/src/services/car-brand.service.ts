import { knex } from '../database/index';

class CarBrandService {

  public async getAll(tenantId: string): Promise<any[]> {
    let output = await knex('car_brands').where({ 'tenant_id': tenantId });
    return output;
  }

  public async get(input: any): Promise<any> {
    let result = await knex('car_brands').where({ id: input.id, 'tenant_id': input.tenantId }).first();
    return result;
  }

  public async create(input: any): Promise<any> {
    let output = await knex('car_brands').insert({ name: input.name, about: input.about, 'tenant_id': input.tenantId }).returning('*');
    return output[0];
  }

  public async update(input: any): Promise<void> {
    await knex('car_brands')
      .where({ id: input.id, 'tenant_id': input.tenantId })
      .update({ about: input.about });
  }

  public async delete(input: any): Promise<void> {
    await knex('car_brands')
      .where({ id: input.id, 'tenant_id': input.tenantId })
      .del();
  }
}

export default CarBrandService;