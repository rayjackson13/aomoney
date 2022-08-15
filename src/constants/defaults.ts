import type { ExtendedTransaction, Transaction } from '../types/common';

export const DefaultTransaction: Transaction = {
  id: 0,
  title: '',
  amount: null
};

export const DefaultExtendedTransaction: ExtendedTransaction = {
  ...DefaultTransaction,
  budget: 0,
  balance: 0,
};

export const DateFormat = 'dd.MM.yyyy';

export const AppName = '7Ms';
