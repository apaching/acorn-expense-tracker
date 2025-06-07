import * as React from "react";
import { createClient } from "@/utils/supabase/server";
import { EmptyExpensesChart, ExpensesChartClient } from "./expenses-chart";
import { CashFlowChartClient, EmptyCashFlowChart } from "./cash-flow-chart";

interface Props {
  userId: string;
}

async function CashFlowChart({ userId }: Props) {
  const supabase = await createClient();

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const { data } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .gte("date", firstDayOfMonth.toISOString())
    .lte("date", lastDayOfMonth.toISOString());

  const incoming = data
    ?.filter((transaction) => transaction.type === "incoming")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const outgoing = data
    ?.filter((transaction) => transaction.type === "outgoing")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  if (incoming === 0 && outgoing === 0) {
    return <EmptyCashFlowChart />;
  }

  return (
    <CashFlowChartClient
      incoming={incoming}
      outgoing={outgoing}
      net={incoming - outgoing}
    />
  );
}

async function ExpensesChart({ userId }: Props) {
  const supabase = await createClient();

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const { data } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .gte("date", firstDayOfMonth.toISOString())
    .lte("date", lastDayOfMonth.toISOString());

  const outgoing = data
    ?.filter((transaction) => transaction.type === "outgoing")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  if (outgoing === 0) {
    <EmptyExpensesChart />;
  }

  const foods_and_drinks = data
    ?.filter((transaction) => transaction.category === "Foods & Drinks")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const transport = data
    ?.filter((transaction) => transaction.category === "Transport")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const groceries = data
    ?.filter((transaction) => transaction.category === "Groceries")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const bills = data
    ?.filter((transaction) => transaction.category === "Bills")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const luxury = data
    ?.filter((transaction) => transaction.category === "Luxury")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const healthcare = data
    ?.filter((transaction) => transaction.category === "Healthcare")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const others = data
    ?.filter((transaction) => transaction.category === "Others")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  if (
    foods_and_drinks === 0 &&
    transport === 0 &&
    groceries === 0 &&
    bills === 0 &&
    luxury === 0 &&
    healthcare === 0 &&
    others === 0
  ) {
    return <EmptyExpensesChart />;
  }

  return (
    <ExpensesChartClient
      f_and_d={foods_and_drinks}
      transport={transport}
      groceries={groceries}
      bills={bills}
      luxury={luxury}
      healthcare={healthcare}
      others={others}
      total={
        foods_and_drinks +
        transport +
        groceries +
        bills +
        luxury +
        healthcare +
        others
      }
    />
  );
}

export { CashFlowChart, ExpensesChart };
