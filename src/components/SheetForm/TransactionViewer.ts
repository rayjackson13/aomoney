import getTime from "date-fns/getTime";
import intervalToDuration from "date-fns/intervalToDuration";
import { FirebaseHelper } from "helpers/firebase";

import type { SheetDraft, Transaction, TransactionSheet, UserInfo } from "types/common";


const DefaultTransaction: Transaction = {
  title: '',
  amount: null
};

export class TransactionViewer {
  sheet: SheetDraft;
  user: UserInfo;

  constructor (data: TransactionSheet | undefined, user: UserInfo) {
    this.user = user;

    if (!data) {
      this.sheet = this.createTransactionSheet();
      return;
    }

    this.sheet = data;
  }

  get summary() {
    const { incomes, savingPercent, mandatory } = this.sheet;
    const totalIncome = this.calculateTotal(incomes);
    const savingsAmount = (totalIncome / 100) * Number(savingPercent);
    const totalExpense = this.calculateTotal(mandatory) + savingsAmount;
    const remainingIncome = totalIncome - totalExpense;
    const dailyBudget = remainingIncome / (this.getPeriodDuration() + 1);

    return { totalIncome, totalExpense, savingsAmount, remainingIncome, dailyBudget };
  }
  
  private createTransactionSheet = (): SheetDraft => ({
    name: 'New Sheet',
    start: undefined,
    end: undefined,
    incomes: Array(3).fill(DefaultTransaction),
    mandatory: Array(5).fill(DefaultTransaction),
    period: [],
    daily: {},
    savingPercent: '10',
    updatedAt: getTime(new Date())
  });

  private calculateTotal = (input: Transaction[]) => input.reduce(
    (total, { amount }) =>
      !amount ? total : total + parseInt(String(amount).replace(/\D/g, '')),
    0
  );

  private getPeriodDuration = (): number => {
    const { start, end } = this.sheet;
    if (!start || !end) return 1;

    const duration = intervalToDuration({
      start: new Date(start),
      end: new Date(end)
    });
    return duration.days || 1;
  };

  save = async () => {
    console.log('save');
    const timestamp = getTime(new Date());
    if (!this.sheet.id) {
      this.sheet.id = timestamp;

      // Using history instead of goto because the latter
      // updates the page and selected input loses focus.
      history.replaceState(undefined, '', `/sheet/${timestamp}`);
    }

    this.sheet.updatedAt = timestamp;

    await FirebaseHelper.savePost(this.user, this.sheet as TransactionSheet);
  };
};
