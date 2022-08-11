<script lang="ts">
  import Portal from 'svelte-portal';
  import getTime from 'date-fns/getTime';
  import intervalToDuration from 'date-fns/intervalToDuration';
  import Edit from '../assets/icons/Edit.svelte';
  import type { Transaction, TransactionSheet } from '../types/common';
  import DatePicker from './DatePicker.svelte';
  import TransactionList from './TransactionList.svelte';
  import Card from './Card/Card.svelte';
  import CardHeader from './Card/CardHeader.svelte';
  import Summary from './Summary.svelte';
  import DailyExpenses from './DailyExpenses/DailyExpenses.svelte';

  const defaultTransaction: Transaction = {
    title: '',
    amount: null
  };

  export let sheet: TransactionSheet | undefined;

  if (!sheet) {
    sheet = {
      id: getTime(new Date()),
      name: 'New Sheet',
      start: undefined,
      end: undefined,
      incomes: Array(3).fill(defaultTransaction),
      mandatory: Array(5).fill(defaultTransaction),
      period: [],
      daily: {},
      savingPercent: '10',
      updatedAt: getTime(new Date())
    };
  }

  $: savingsAmount = (totalIncome / 100) * Number(sheet.savingPercent);
  $: totalIncome = calculateTotal(sheet.incomes);
  $: totalExpense = calculateTotal(sheet.mandatory) + savingsAmount;
  $: remainingIncome = totalIncome - totalExpense;
  $: dailyBudget = remainingIncome / getPeriodDuration();

  $: getPeriodDuration = () => {
    if (!sheet.start || !sheet.end) return 1;

    const duration = intervalToDuration({
      start: new Date(sheet.start),
      end: new Date(sheet.end)
    });
    return duration.days;
  };

  const calculateTotal = (input: Transaction[]) =>
    input.reduce(
      (total, { amount }) =>
        !amount ? total : total + parseInt(String(amount).replace(/\D/g, '')),
      0
    );

  const handleStartChange = () => {
    if (sheet.start > sheet.end) sheet.end = sheet.start;
  };

  const onFormChange = () => {
    const timestamp = getTime(new Date());

    localStorage.setItem(
      `sheet-${sheet.id}`,
      JSON.stringify({
        ...sheet,
        updatedAt: timestamp
      } as TransactionSheet)
    );
  };

  const onNameKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
  };
</script>

<form on:input={onFormChange} autocomplete="disabled" class="mb-8 text-gray-800">
  <Portal target="#header-title-portal">
    <div class="relative flex items-center">
      <span
        class="flex-auto border-gray-300 focus:outline-none focus:border-blue-500 transition-colors bg-transparent border-2 border-transparent hover:border-transparent hover:z-auto focus:z-auto focus:border-b-white hover:border-b-white/50 py-0 pl-0 pr-6"
        contenteditable
        bind:innerHTML={sheet.name}
        on:input={onFormChange}
        on:keydown={onNameKeyDown}
      />
      <div class="absolute w-4 h-4 right-0">
        <Edit />
      </div>
    </div>
  </Portal>

  <div class="sm:px-5 flex flex-wrap">
    <div class="w-full xl:w-5/12 sm:px-5">
      <Card>
        <CardHeader>
          <p class="text-lg sm:text-xl">Time period</p>
        </CardHeader>
        <DatePicker bind:sheet {handleStartChange} />
      </Card>

      <TransactionList
        bind:transactions={sheet.incomes}
        save={onFormChange}
        totalSum={totalIncome}
        title="Income"
      />

      <TransactionList
        bind:transactions={sheet.mandatory}
        save={onFormChange}
        totalSum={totalExpense}
        title="Mandatory expenses"
      />

      <Summary
        bind:savingPercent={sheet.savingPercent}
        {remainingIncome}
        {dailyBudget}
        {savingsAmount}
      />
    </div>

    <div class="w-full xl:w-7/12 sm:px-5">
      <DailyExpenses
        bind:daily={sheet.daily}
        bind:startDate={sheet.start}
        bind:endDate={sheet.end}
        {dailyBudget}
        save={onFormChange}
      />
    </div>
  </div>
</form>
