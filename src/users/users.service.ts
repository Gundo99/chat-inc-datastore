import { Injectable, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authService: AuthService
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Check if username already exists
    const existingUser = await this.databaseService.executeQuery(
      'SELECT * FROM users WHERE username = $1',
      [createUserDto.username]
    );

    if (existingUser.rows.length > 0) {
      throw new ConflictException('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Generate API key
    const apiKey = await this.authService.generateApiKey();

    // Create user
    const userId = await this.databaseService.createUser(
      createUserDto.username,
      hashedPassword,
      createUserDto.full_name || '',
      apiKey
    );

    return {
      message: 'User registered successfully',
      userId,
      apiKey
    };
  }
}