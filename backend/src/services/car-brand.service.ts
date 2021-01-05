import { knex } from '../database/index';
import { tx } from '../database/transaction';

class CarBrandService {

  public async getAll(tenantId: string): Promise<any[]> {
    // let output = await knex('car_brands').where({ 'tenant_id': tenantId });
    // return output;

    let result;

    await tx(async client => {
      const { rows } = await client.query('SELECT * FROM car_brands WHERE tenant_id = $1', [tenantId]);
      result = rows;
    });

    return result;
  }

  public async get(input: any): Promise<any> {
    // let result = await knex('car_brands').where({ id: input.id, 'tenant_id': input.tenantId }).first();
    // return result;

    let result;

    await tx(async client => {
      const { rows } = await client.query('SELECT * FROM car_brands WHERE id = $1 AND tenant_id = $2', [input.id, input.tenantId]);
      result = rows[0];
    });

    return result;
  }

  public async create(input: any): Promise<any> {
    // let output = await knex('car_brands').insert({ name: input.name, about: input.about, 'tenant_id': input.tenantId }).returning('*');
    // return output[0];

    let result;

    await tx(async client => {
      const { rows } = await client.query('INSERT INTO car_brands (name, about, tenant_id) VALUES ($1 ,$2, $3) RETURNING *', [input.name, input.about, input.tenantId]);
      result = rows[0];
    });

    return result;
  }

  public async exists(name: string, tenantId: number): Promise<boolean> {
    // let output = await knex('users').where({ username }).count('id as cnt').first();
    // return output.cnt > 0;

    let result = false;

    await tx(async client => {
      const { rows } = await client.query<{ cnt: string }>('SELECT COUNT(*) AS cnt FROM car_brands WHERE name = $1 AND tenant_id = $2', [name, tenantId]);
      const cnt = rows[0].cnt;
      result = parseInt(cnt) > 0;
    });

    return result;
  }

  public async update(input: any): Promise<void> {
    // await knex('car_brands')
    //   .where({ id: input.id, 'tenant_id': input.tenantId })
    //   .update({ about: input.about });

    await tx(async client => {
      await client.query('UPDATE car_brands SET about = $1 WHERE id = $2 AND tenant_id = $3', [input.about, input.id, input.tenantId]);
    });
  }

  public async delete(input: any): Promise<void> {
    // await knex('car_brands')
    //   .where({ id: input.id, 'tenant_id': input.tenantId })
    //   .del();

    await tx(async client => {
      await client.query('DELETE FROM car_brands WHERE id = $1 AND tenant_id = $2', [input.id, input.tenantId]);
    });
  }
}

export default CarBrandService;