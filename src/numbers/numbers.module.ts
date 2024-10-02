import { Module } from '@nestjs/common';
import { NumbersController } from './numbers.controller';
import { NumbersService } from './numbers.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [DatabaseModule], 
  controllers: [NumbersController],
  providers: [NumbersService, AuthService],
})
export class NumbersModule {}