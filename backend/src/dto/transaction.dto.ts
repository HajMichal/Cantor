import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amountEur: number;
}

export class TransactionDto {
  amountPln: number;
  amountEur: number;
  rate: number;
  timestamp: Date;
}

export class TransactionResponseDto extends TransactionDto {
  id: string;
}
