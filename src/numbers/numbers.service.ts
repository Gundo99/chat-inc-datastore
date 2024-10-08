import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AddNumbersDto } from './dto/add-numbers.dto';
import { CheckNumbersDto } from './dto/check-numbers.dto';

@Injectable()
export class NumbersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addNumbers(addNumbersDto: AddNumbersDto, userUid: number) {
    for (const numberEntry of addNumbersDto.numbers) {
      await this.databaseService.addNumber(
        numberEntry.telephone_number,
        numberEntry.has_whatsapp,
        userUid
      );
    }
    return { message: 'Numbers added successfully' };
  }

  async checkNumbers(checkNumbersDto: CheckNumbersDto) {
    const checkedNumbers = await this.databaseService.checkNumbers(checkNumbersDto.numbers);
    
    // Create a map for quick lookup
    const checkedNumbersMap = new Map(
      checkedNumbers.map(num => [num.telephone_number, num.has_whatsapp])
    );

    // Prepare the response, including numbers not found in the database
    const response = checkNumbersDto.numbers.map(num => ({
      telephone_number: num,
      has_whatsapp: checkedNumbersMap.has(num) ? checkedNumbersMap.get(num) : 'unknown'
    }));

    return { numbers: response };
  }

  async getRecentNumbers() {
    const query = `
      SELECT uid as id, telephone_number, has_whatsapp, date_added
      FROM numbers
      ORDER BY date_added DESC
      LIMIT 10
    `;
    const result = await this.databaseService.executeQuery(query);
    return result.rows;
  }
}