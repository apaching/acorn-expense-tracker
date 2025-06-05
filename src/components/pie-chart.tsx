import * as React from "react";
import ExpensesChartClient from "./expenses-chart";
import { createClient } from "@/utils/supabase/server";
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

  return <CashFlowChartClient incoming={incoming} outgoing={outgoing} />;
}

function ExpensesChart({ userId }: Props) {
  return <ExpensesChartClient />;
}

export { CashFlowChart, ExpensesChart };
