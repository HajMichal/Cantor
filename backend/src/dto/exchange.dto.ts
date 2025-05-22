import { IsNumber, IsNotEmpty } from 'class-validator';

export class ExchangeRateDto {
  rate: number;
  timestamp: Date;
}

export class GetExchangeRateFromApiDto {
  @IsNotEmpty()
  @IsNumber()
  exchange_rate: number;
}
