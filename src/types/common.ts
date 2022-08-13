export const enum TransactionType {
  Income = 'income',
  Expense = 'expense'
}

export type Transaction = {
  title: string;
  amount: string | null;
};

export type ExtendedTransaction = Transaction & {
  budget: number;
  balance: number;
  additive?: boolean;
};

export type DailyTransactions = {
  [date: string]: Array<ExtendedTransaction>;
};

export type TransactionSheet = {
  id: number;
  name: string;
  start: string | undefined;
  end: string | undefined;
  savingPercent: string;
  incomes: Transaction[];
  mandatory: Transaction[];
  period: ExtendedTransaction[];
  daily: DailyTransactions;
  updatedAt: number;
};

export type SheetDraft = Omit<TransactionSheet, 'id'> & {
  id?: number;
};

export type DailyTotal = {
  amount: number;
  balance: number;
};

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  accessToken: string;
};

export type UserContext = { 
  user: UserInfo;
};
