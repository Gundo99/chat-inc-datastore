import { Module } from '@nestjs/common';
import { NumbersModule } from './numbers/numbers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { User } from './users/users.entity';
import { Numbers } from './numbers/numbers.entity';

@Module({
  imports: [NumbersModule, User, Numbers,UsersModule, AuthModule, DatabaseModule],
})
export class AppModule {}