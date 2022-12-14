<script lang="ts">
  import { getContext } from 'svelte';
  import { scale } from 'svelte/transition';
  import Portal from 'svelte-portal';
  import debounce from 'lodash/debounce';
  import { _ } from 'svelte-i18n';
  
  import type { App } from 'app';
  import Edit from 'assets/icons/Edit.svelte';
  import Summary from 'components/EditPage/Summary/index.svelte';
  import TransactionList from 'components/EditPage/TransactionList/List.svelte';
  import Card from 'components/ui/Card/Card.svelte';
  import CardHeader from 'components/ui/Card/CardHeader.svelte';
  import { AppName } from 'constants/defaults';
  import type { TransactionSheet } from 'types/common';
  
  import DatePicker from '../DatePicker/index.svelte';
  import DailyExpenses from '../DailyExpenses/DailyExpenses.svelte';
  import { TransactionViewer } from '../../../helpers/TransactionViewer';

  export let data: TransactionSheet | undefined;

  const { user } = getContext<App.Session>('session');

  $: viewer = new TransactionViewer(data, user);
  $: sheet = viewer.sheet;
  $: summary = viewer.summary;

  const onNameKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const onSave = debounce(() => viewer.save(), 200);
</script>

<svelte:head>
  <title>{sheet.name} | {AppName}</title>
</svelte:head>

<form on:input={onSave} autocomplete="disabled" class="mb-8 text-gray-800">
  <Portal target="#header-title-portal">
    <div class="relative items-center hidden md:flex">
      <span
        class="whitespace-nowrap overflow-hidden border-gray-300 focus:outline-none focus:border-blue-500 transition-colors bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:bg-white/20 hover:z-auto focus:z-auto rounded-lg py-3 pl-4 pr-10 leading-6"
        contenteditable
        bind:innerHTML={sheet.name}
        on:input={viewer.save}
        on:keydown={onNameKeyDown}
        transition:scale
      />
      <div class="absolute w-4 h-4 right-4 hidden sm:block" transition:scale>
        <Edit />
      </div>
    </div>
  </Portal>

  <div class="px-4 flex flex-wrap">
    <div class="w-full xl:w-5/12 sm:px-5">
      <Card classes="md:hidden">
        <CardHeader>
          <p class="text-md md:text-xl">{$_('edit.title')}</p>
        </CardHeader>
        <div class="relative items-center flex">
          <span
            class="border-t-2 text-sm block border-gray-200 w-full whitespace-nowrap overflow-hidden focus:outline-none py-3 pl-4 pr-10 leading-6"
            contenteditable
            bind:innerHTML={sheet.name}
            on:input={viewer.save}
            on:keydown={onNameKeyDown}
          />
          <div class="absolute w-4 h-4 right-4">
            <Edit />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <p class="text-md md:text-xl">{$_('edit.period')}</p>
        </CardHeader>
        <DatePicker bind:sheet />
      </Card>

      <TransactionList
        bind:transactions={sheet.incomes}
        totalSum={summary.totalIncome}
        save={viewer.save}
        title={$_('edit.income')}
      />

      <TransactionList
        bind:transactions={sheet.mandatory}
        totalSum={summary.totalExpense}
        save={viewer.save}
        title={$_('edit.mandatory')}
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
