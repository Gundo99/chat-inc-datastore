import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "postgres",
      host:"localhost",
      database: "datastore", // Use the correct env variable
      password: "990210",  // Use env variable for password
      port: Number(5432),
      idleTimeoutMillis: 30000,  // Set a higher idle timeout
      connectionTimeoutMillis: 20000, // Set a higher connection timeout
    });
  }

  async onModuleInit() {
    await this.pool.connect();
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async executeQuery(query: string, params: any[] = []): Promise<QueryResult> {
    return this.pool.query(query, params);
  }

  async addNumber(telephoneNumber: string, hasWhatsapp: boolean, userUid: number): Promise<void> {
    const query = `
      INSERT INTO numbers (telephone_number, has_whatsapp, user_uid)
      VALUES ($1, $2, $3)
      ON CONFLICT (telephone_number) 
      DO UPDATE SET has_whatsapp = $2, user_uid = $3, date_modified = CURRENT_TIMESTAMP
    `;
    await this.executeQuery(query, [telephoneNumber, hasWhatsapp, userUid]);
  }

  async checkNumbers(numbers: string[]): Promise<any[]> {
    const query = `
      SELECT telephone_number, has_whatsapp
      FROM numbers
      WHERE telephone_number = ANY($1)
    `;
    const result = await this.executeQuery(query, [numbers]);
    return result.rows;
  }

  async createUser(username: string, hashedPassword: string, fullName: string, apiKey: string): Promise<number> {
    const query = `
      INSERT INTO users (username, password, full_name, api_key)
      VALUES ($1, $2, $3, $4)
      RETURNING uid
    `;
    const result = await this.executeQuery(query, [username, hashedPassword, fullName, apiKey]);
    return result.rows[0].uid;
  }
}
