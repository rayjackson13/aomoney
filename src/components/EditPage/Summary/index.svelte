<script lang="ts">
  import { _ } from 'svelte-i18n';

  import Card from 'components/ui/Card/Card.svelte';
  import CardHeader from 'components/ui/Card/CardHeader.svelte';
  import Input from 'components/ui/Input.svelte';
  import { Table, Row, Column } from 'components/ui/Table';

  export let savingPercent = '0';
  export let remainingIncome: number;
  export let dailyBudget: number;
  export let savingsAmount: number;
</script>

<Card>
  <CardHeader>
    <p class="text-md md:text-xl">{$_('edit.summary.title')}</p>
  </CardHeader>
  <Table>
    <Row>
      <Column disabled padding classes="w-7/12 sm:w-auto">{$_('edit.summary.percentage')}:</Column>
      <Column>
        <Input isNumber classes="border-0 w-full text-right" bind:value={savingPercent} />
      </Column>
      <Column disabled padding classes="w-10 text-center">%</Column>
    </Row>
    <Row>
      <Column disabled padding classes="w-7/12 sm:w-auto">{$_('edit.summary.remainder')}:</Column>
      <Column disabled padding classes="text-right">{remainingIncome.toLocaleString()}</Column>
      <Column disabled padding classes="w-10 text-center">₽</Column>
    </Row>
    <Row>
      <Column disabled padding classes="w-7/12 sm:w-auto">{$_('edit.budget')}:</Column>
      <Column disabled padding classes="text-right"
        >{Math.round(dailyBudget).toLocaleString()}</Column
      >
      <Column disabled padding classes="w-10 text-center">₽</Column>
    </Row>
    <Row>
      <Column disabled padding classes="w-7/12 sm:w-auto">{$_('edit.summary.savings')}:</Column>
      <Column disabled padding classes="text-right">{savingsAmount.toLocaleString()}</Column>
      <Column disabled padding classes="w-10 text-center">₽</Column>
    </Row>
  </Table>
</Card>
