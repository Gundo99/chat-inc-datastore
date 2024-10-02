import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [AuthService, DatabaseService],
  exports: [AuthService],
})
export class AuthModule {}
