<script lang="ts">
  import Card from './Card/Card.svelte';
  import CardHeader from './Card/CardHeader.svelte';
  import Input from './Input.svelte';
  import Column from './Table/Column.svelte';
  import Row from './Table/Row.svelte';
  import Table from './Table/Table.svelte';

  export let savingPercent = '0';
  export let remainingIncome: number;
  export let dailyBudget: number;
  export let savingsAmount: number;
</script>

<Card>
  <CardHeader>
    <p class="text-md md:text-xl">Summary</p>
  </CardHeader>
  <Table>
    <Row>
      <Column disabled padding classes="w-7/12 sm:w-auto">Savings percentage:</Column>
      <Column>
        <Input isNumber classes="border-0 w-full text-right" bind:value={savingPercent} />
      </Column>
      <Column disabled padding classes="w-10 text-center">%</Column>
    </Row>
    <Row>
      <Column disabled padding classes="w-7/12 sm:w-auto">Remainder:</Column>
      <Column disabled padding classes="text-right">{remainingIncome.toLocaleString()}</Column>
      <Column disabled padding classes="w-10 text-center">₽</Column>
    </Row>
    <Row>
      <Column disabled padding classes="w-7/12 sm:w-auto">Daily budget:</Column>
      <Column disabled padding classes="text-right"
        >{Math.round(dailyBudget).toLocaleString()}</Column
      >
      <Column disabled padding classes="w-10 text-center">₽</Column>
    </Row>
    <Row>
      <Column disabled padding classes="w-7/12 sm:w-auto">Savings amount:</Column>
      <Column disabled padding classes="text-right">{savingsAmount.toLocaleString()}</Column>
      <Column disabled padding classes="w-10 text-center">₽</Column>
    </Row>
  </Table>
</Card>
