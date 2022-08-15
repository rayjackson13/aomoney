<script lang="ts">
  import { _ } from 'svelte-i18n';
  import parse from 'date-fns/parse/index';
  import format from 'date-fns/format/index';
  import eachDayOfInterval from 'date-fns/eachDayOfInterval/index';

  import { DateFormat, DefaultExtendedTransaction } from 'constants/defaults';
  import type {
    DailyTransactions,
    ExtendedTransaction,
    DailyTotal
  } from 'types/common';
  import { DailyBudget } from 'helpers/DailyBudget';

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

  const getDuration = (start: string, end: string) => {
    try {
      return eachDayOfInterval({
        start: new Date(start),
        end: new Date(end)
      }) || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const getDailyExpenses = (start: string | undefined, end: string | undefined): DailyTransactions => {
    if (!start || !end) return {};

    const duration = getDuration(start, end);

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
  $: total = { amount: 0, balance: 0 } as DailyTotal;

  const getMaxId = (date: string) => {
    const ids = daily[date].map(val => val.id);
    return Math.max(...ids);
  };

  const addRow = (date: string) => {
    const id = getMaxId(date) + 1;
    daily = {
      ...daily,
      [date]: [
        ...daily[date],
        {
          ...DefaultExtendedTransaction,
          additive: true,
          id,
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
    <p class="text-md md:text-xl">{$_('edit.daily.title')}</p>
  </CardHeader>
  <Table scrollable>
    <tbody class="table w-full">
      <Row>
        <Column disabled padding>{$_('edit.daily.date')}</Column>
        <Column disabled padding>{$_('edit.description')}</Column>
        <Column disabled padding>{$_('edit.amount')}</Column>
        <Column disabled padding>{$_('edit.budget')}</Column>
        <Column disabled padding>{$_('edit.daily.balance')}</Column>
        <Column disabled padding />
      </Row>
      {#each Object.keys(daily) as row (row)}
        {#each daily[row] as item, index (item.id)}
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
        <Column padding classes="font-semibold">{$_('edit.daily.total')}</Column>
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
