import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  TransactionDto,
  ExchangeRateDto,
  GetExchangeRateFromApiDto,
  TransactionResponseDto,
} from './dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { db } from './db/in-memory-db';

@Injectable()
export class AppService {
  // Normally it should be in .env file
  private readonly API_URL =
    'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api';
  private readonly API_KEY = 'DInGz8W0Wr8t0fYAY21ddL2JMmZ2uHT1hxAxUSTa';

  private readonly logger = new Logger(AppService.name);
  private readonly cacheExprationMs = 60 * 1000; // 1 minute
  private cachedRate: ExchangeRateDto | null = null;

  constructor(private readonly httpService: HttpService) {}

  async getEurToPlnRate(): Promise<ExchangeRateDto> {
    if (
      this.cachedRate &&
      Date.now() - this.cachedRate.timestamp.getTime() < this.cacheExprationMs
    ) {
      this.logger.log('Returning cached rate');
      return this.cachedRate;
    }

    this.logger.log('Fetching new rate');
    const response = await firstValueFrom(
      this.httpService
        .get<GetExchangeRateFromApiDto>(`${this.API_URL}`, {
          headers: {
            'x-api-key': this.API_KEY,
          },
        })
        .pipe(
          catchError((error) => {
            this.logger.error('Error fetching exchange rate', error);
            throw new HttpException(
              'Error fetching exchange rate',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
    );
    this.cachedRate = {
      rate: response.data.exchange_rate,
      timestamp: new Date(),
    };
    return this.cachedRate;
  }

  async createTransaction(amountEur: number): Promise<TransactionResponseDto> {
    const eurToPlnRate = await this.getEurToPlnRate();
    const amountPln = amountEur * eurToPlnRate.rate;
    const transaction: TransactionDto = {
      amountPln,
      amountEur,
      rate: eurToPlnRate.rate,
      timestamp: new Date(),
    };

    const transactionID = `${transaction.timestamp.getTime()}-${Math.random() * 1000}`;
    db.set(transactionID, transaction);

    return { id: transactionID, ...transaction };
  }
}
