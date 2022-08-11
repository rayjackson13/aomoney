import type { ExtendedTransaction, Transaction } from '../types/common';

export const DefaultTransaction: Transaction = {
  title: '',
  amount: null
};

export const DefaultExtendedTransaction: ExtendedTransaction = {
  title: '',
  budget: 0,
  balance: 0,
  amount: null
};

export const DateFormat = 'dd.MM.yyyy';
