import { Module } from '@nestjs/common';
import { NumbersModule } from './numbers/numbers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [NumbersModule, UsersModule, AuthModule, DatabaseModule],
})
export class AppModule {}