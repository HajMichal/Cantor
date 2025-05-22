import { TransactionDto } from 'src/dto';

class InMemoryDatabase {
  private db: Record<string, TransactionDto> = {};

  constructor() {
    this.db = {};
  }

  set(key: string, transaction: TransactionDto): void {
    this.db[key] = transaction;
  }

  get(key: string): TransactionDto {
    return this.db[key];
  }
}

export const db = new InMemoryDatabase();
