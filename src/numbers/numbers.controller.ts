import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { NumbersService } from './numbers.service';
import { AddNumbersDto } from './dto/add-numbers.dto';
import { CheckNumbersDto } from './dto/check-numbers.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('numbers')
 //@UseGuards(AuthGuard)
export class NumbersController {
  constructor(private readonly numbersService: NumbersService) {}

  @Post('add')
  addNumbers(@Body() addNumbersDto: AddNumbersDto, @Request() req) {
    // Assuming the AuthGuard adds the user to the request object
    return this.numbersService.addNumbers(addNumbersDto);
  }

  @Post('check')
  checkNumbers(@Body() checkNumbersDto: CheckNumbersDto) {
    return this.numbersService.checkNumbers(checkNumbersDto);
  }

  @Get('recent')
  getRecentNumbers() {
    return this.numbersService.getRecentNumbers();
  }
}