<script lang="ts">
  import { getContext } from 'svelte';
  import Portal from 'svelte-portal';
  
  import type { App } from 'app';
  import Edit from 'assets/icons/Edit.svelte';
  import DatePicker from 'components/DatePicker.svelte';
  import TransactionList from 'components/TransactionList.svelte';
  import Card from 'components/Card/Card.svelte';
  import CardHeader from 'components/Card/CardHeader.svelte';
  import Summary from 'components/Summary.svelte';
  import DailyExpenses from 'components/DailyExpenses/DailyExpenses.svelte';
  import type { TransactionSheet } from 'types/common';

  import { TransactionViewer } from './TransactionViewer';

  export let data: TransactionSheet | undefined;

  const { user } = getContext<App.Session>('session');
  $: viewer = new TransactionViewer(data, user);
  $: sheet = viewer.sheet;
  $: summary = viewer.summary;
  const onNameKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
  };
</script>

<form on:input={viewer.save} autocomplete="disabled" class="mb-8 text-gray-800">
  <Portal target="#header-title-portal">
    <div class="relative flex items-center">
      <span
        class="flex-auto border-gray-300 focus:outline-none focus:border-blue-500 transition-colors bg-transparent border-2 border-transparent hover:border-transparent hover:z-auto focus:z-auto focus:border-b-white hover:border-b-white/50 py-0 pl-0 pr-6"
        contenteditable
        bind:innerHTML={sheet.name}
        on:input={viewer.save}
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
        <DatePicker bind:sheet />
      </Card>

      <TransactionList
        bind:transactions={sheet.incomes}
        totalSum={summary.totalIncome}
        save={viewer.save}
        title="Income"
      />

      <TransactionList
        bind:transactions={sheet.mandatory}
        totalSum={summary.totalExpense}
        save={viewer.save}
        title="Mandatory expenses"
      />

      <Summary
        bind:savingPercent={sheet.savingPercent}
        remainingIncome={summary.remainingIncome}
        dailyBudget={summary.dailyBudget}
        savingsAmount={summary.savingsAmount}
      />
    </div>

    <div class="w-full xl:w-7/12 sm:px-5">
      <DailyExpenses
        bind:daily={sheet.daily}
        bind:startDate={sheet.start}
        bind:endDate={sheet.end}
        dailyBudget={summary.dailyBudget}
        save={viewer.save}
      />
    </div>
  </div>
</form>
