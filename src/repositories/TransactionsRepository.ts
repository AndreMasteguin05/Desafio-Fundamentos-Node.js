import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO

    const { income, outcome } = this.transactions.reduce(
      (acummulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acummulator.income += transaction.value;
            break;
          case 'outcome':
            acummulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return acummulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ value, type, title });

    const { total } = this.getBalance();
    if (type === 'outcome' && total < value) {
      throw Error('Cannot create outcome transaction without a valid balance');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
