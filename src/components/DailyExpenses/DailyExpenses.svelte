<script lang="ts">
  import parse from 'date-fns/parse';
  import format from 'date-fns/format';
  import eachDayOfInterval from 'date-fns/eachDayOfInterval';

  import { DateFormat, DefaultExtendedTransaction } from 'constants/defaults';
  import type {
    DailyTransactions,
    ExtendedTransaction,
    DailyTotal
  } from 'types/common';
  import { DailyBudget } from 'helpers/daily';

  import Card from '../Card/Card.svelte';
  import CardHeader from '../Card/CardHeader.svelte';
  import Table from '../Table/Table.svelte';
  import Row from '../Table/Row.svelte';
  import Column from '../Table/Column.svelte';
  import DailyExpenseRow from './DailyExpenseRow.svelte';

  export let daily: DailyTransactions;
  export let startDate: string | undefined;
  export let endDate: string | undefined;
  export let dailyBudget: number;
  export let save = () => {};

  const getDailyExpenses = (start: string | undefined, end: string | undefined): DailyTransactions => {
    if (!start || !end) return {};

    const duration = eachDayOfInterval({
      start: new Date(start),
      end: new Date(end)
    });

    return duration.reduce((total, current) => {
      const date = format(current, DateFormat);
      const dateRow: ExtendedTransaction[] = daily[date] || [
        {
          ...DefaultExtendedTransaction,
          additive: false
        }
      ];

      return { ...total, [date]: dateRow };
    }, {});
  };

  $: daily = getDailyExpenses(startDate, endDate);
  // let cmps = [];
  // $: cmps = cmps.filter((el) => el);
  $: total = { amount: 0, balance: 0 } as DailyTotal;

  const addRow = (date: string) => {
    daily = {
      ...daily,
      [date]: [
        ...daily[date],
        {
          ...DefaultExtendedTransaction,
          additive: true
        }
      ]
    };
    calculateBudget();
    save();
  };

  const deleteRow = (date: string, index: number) => {
    daily = { ...daily, [date]: daily[date].filter((_, idx) => idx !== index) };
    calculateBudget();
    save();
  };

  const getEndDate = () => {
    if (!endDate) return new Date();

    return parse(endDate, 'yyyy-MM-dd', new Date());
  };

  $: calculateBudget = () => {
    const endDate = format(getEndDate(), DateFormat);
    daily = DailyBudget.calculate(daily, dailyBudget);
    total = DailyBudget.getTotal(daily, endDate);
  };

  $: calculateBudget();
</script>

<Card>
  <CardHeader>
    <p class="text-lg sm:text-xl">Daily Expenses</p>
  </CardHeader>
  <Table scrollable>
    <tbody class="table w-full">
      <Row>
        <Column disabled padding>Date</Column>
        <Column disabled padding>Description</Column>
        <Column disabled padding>Amount</Column>
        <Column disabled padding>Daily budget</Column>
        <Column disabled padding>Balance</Column>
        <Column disabled padding />
      </Row>
      {#each Object.keys(daily) as row}
        {#each daily[row] as item, index}
          <DailyExpenseRow
            {item}
            date={row}
            addRow={() => addRow(row)}
            deleteRow={() => deleteRow(row, index)}
            update={calculateBudget}
          />
        {/each}
      {/each}
      <Row>
        <Column padding />
        <Column padding classes="font-semibold">Total</Column>
        <Column padding classes="text-right font-semibold"
          >{Math.round(total.amount).toLocaleString()}</Column
        >
        <Column padding classes="text-right" />
        <Column padding classes="text-right {total.balance < 0 && 'text-red-700'}"
          >{Math.round(total.balance).toLocaleString()}</Column
        >
        <Column padding />
      </Row>
    </tbody>
  </Table>
</Card>
