import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateTransactionDto,
  ExchangeRateDto,
  TransactionResponseDto,
} from './dto';

@Controller('cantor')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('rate/eur-to-pln')
  getEurToPlnRate(): Promise<ExchangeRateDto> {
    return this.appService.getEurToPlnRate();
  }

  @Post('transaction')
  createTransaction(
    @Body() { amountEur }: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    return this.appService.createTransaction(amountEur);
  }
}
