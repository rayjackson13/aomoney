import getTime from "date-fns/getTime/index";
import intervalToDuration from "date-fns/intervalToDuration/index";

import { DefaultTransaction } from "constants/defaults";
import { FirebaseHelper } from "helpers/FirebaseHelper";
import type { SheetDraft, Transaction, TransactionSheet, UserInfo } from "types/common";

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
    incomes: this.createTransactionList(3),
    mandatory: this.createTransactionList(5),
    period: [],
    daily: {},
    savingPercent: '10',
    updatedAt: getTime(new Date())
  });

  private createTransactionList = (length: number): Transaction[] => {
    return Array(length).fill(DefaultTransaction).map((val, idx) => ({
      ...val,
      id: idx
    }));
  };

  private calculateTotal = (input: Transaction[]) => input.reduce(
    (total, { amount }) =>
      !amount ? total : total + parseInt(String(amount).replace(/\D/g, '')),
    0
  );

  private getPeriodDuration = (): number => {
    const { start, end } = this.sheet;
    if (!start || !end) return 1;

    try {
      const duration = intervalToDuration({
        start: new Date(start),
        end: new Date(end)
      });
      return duration.days || 1;
    } catch (e) {
      console.error(e);
      return 1;
    }
  };

  save = async () => {
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
