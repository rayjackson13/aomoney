import format from 'date-fns/format/index';
import parse from 'date-fns/parse/index';
import subDays from 'date-fns/subDays/index';
import { DateFormat } from '../constants/defaults';
import type { DailyTotal, DailyTransactions, ExtendedTransaction } from '../types/common';

export class DailyBudget {
  static calculate = (input: DailyTransactions, dailyBudget: number, remainingIncome: number) => {
    return Object.keys(input).reduce((total: DailyTransactions, current, index) => {
      const date = parse(current, DateFormat, new Date());
      const day: ExtendedTransaction[] = input[current];

      if (index === 0) {
        const updatedDay = this.getDay(day, dailyBudget, remainingIncome);
        return { ...total, [current]: updatedDay };
      }

      const prevDate = format(subDays(date, 1), DateFormat);
      const prevDay = total[prevDate];
      const budget = dailyBudget + prevDay[prevDay.length - 1].balance;
      const remainder = prevDay[prevDay.length - 1].remainder;
      const updatedDay = this.getDay(day, budget, remainder);

      return { ...total, [current]: updatedDay };
    }, {});
  };

  private static getDay = (
    day: ExtendedTransaction[],
    dailyBudget: number,
    remainder: number,
  ): ExtendedTransaction[] => {
    return day.reduce((total: ExtendedTransaction[], val, idx) => {
      const row = val;
      if (idx === 0) {
        return total.concat({ 
          ...val,
          balance: dailyBudget - Number(row.amount),
          remainder: remainder - Number(row.amount)
        });
      }

      const prevRow: ExtendedTransaction = total[idx - 1];
      return total.concat({ 
        ...val,
        balance: prevRow.balance - Number(row.amount),
        remainder: Number(prevRow.remainder) - Number(row.amount)
      });
    }, []);
  };

  private static getTotalExpense = (input: DailyTransactions) => {
    return Object.keys(input).reduce((total, current) => {
      const dailyExpense = input[current].reduce((all, row): number => {
        return all + Number(row.amount);
      }, 0);

      return total + dailyExpense;
    }, 0);
  };

  private static getTotalBalance = (input: DailyTransactions, endDate: string) => {
    if (!Object.keys(input).length) return 0;

    const lastDay = input[endDate];
    const lastRow = lastDay[lastDay.length - 1];
    return lastRow.balance;
  };

  private static getTotalRemainder = (input: DailyTransactions, endDate: string) => {
    if (!Object.keys(input).length) return 0;

    const lastDay = input[endDate];
    const lastRow = lastDay[lastDay.length - 1];
    return lastRow.remainder;
  };

  static getTotal = (input: DailyTransactions, endDate: string): DailyTotal => {
    return {
      amount: this.getTotalExpense(input),
      balance: this.getTotalBalance(input, endDate),
      remainder: this.getTotalRemainder(input, endDate)
    };
  };
}
