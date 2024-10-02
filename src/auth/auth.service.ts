import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as crypto from 'crypto';  // Import crypto for secure key generation

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Validates the provided API key by querying the database
  async validateApiKey(apiKey: string): Promise<any> {
    const query = 'SELECT uid, username FROM users WHERE api_key = $1';
    const result = await this.databaseService.executeQuery(query, [apiKey]);

    if (result.rows.length === 0) {
      throw new UnauthorizedException('Invalid API key');
    }

    return result.rows[0];
  }

  // Generates a more secure API key using crypto
  async generateApiKey(): Promise<string> {
    // Generate a cryptographically secure API key
    const apiKey = crypto.randomBytes(32).toString('hex');
    return apiKey;
  }
}
