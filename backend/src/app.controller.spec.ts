import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRateDto, TransactionResponseDto } from './dto';
import { HttpModule } from '@nestjs/axios';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getEurToPlnRate', () => {
    it('should return the EUR to PLN exchange rate', async () => {
      const result: ExchangeRateDto = { rate: 4.5, timestamp: new Date() };
      jest.spyOn(appService, 'getEurToPlnRate').mockResolvedValue(result);

      expect(await appController.getEurToPlnRate()).toBe(result);
      expect(appService.getEurToPlnRate).toHaveBeenCalled();
    });
  });

  describe('createTransaction', () => {
    it('should create a transaction with the given EUR amount', async () => {
      const amountEur = 100;
      const result: TransactionResponseDto = {
        id: '123',
        amountEur,
        amountPln: 450,
        rate: 4.5,
        timestamp: new Date(),
      };
      jest.spyOn(appService, 'createTransaction').mockResolvedValue(result);

      expect(await appController.createTransaction({ amountEur })).toBe(result);
      expect(appService.createTransaction).toHaveBeenCalledWith(amountEur);
    });
  });
});
