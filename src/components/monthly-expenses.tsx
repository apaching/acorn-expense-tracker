import { BarChartClient } from "./bar-chart";
import { createClient } from "@/utils/supabase/server";

interface Props {
  userId: string;
}

async function MonthlyExpensesChart({ userId }: Props) {
  const supabase = await createClient();

  const now = new Date();

  const transactionsByMonth = new Map();

  for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = new Date(now.getFullYear(), month, 1);
    const lastDayOfMonth = new Date(now.getFullYear(), month + 1, 0);

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

    transactionsByMonth.set(month + 1, {
      incoming: incoming,
      outgoing: outgoing,
    });
  }

  return (
    <BarChartClient
      jan={transactionsByMonth.get(1)}
      feb={transactionsByMonth.get(2)}
      mar={transactionsByMonth.get(3)}
      apr={transactionsByMonth.get(10)}
      may={transactionsByMonth.get(11)}
      jun={transactionsByMonth.get(4)}
      jul={transactionsByMonth.get(5)}
      aug={transactionsByMonth.get(6)}
      sep={transactionsByMonth.get(7)}
      oct={transactionsByMonth.get(8)}
      nov={transactionsByMonth.get(9)}
      dec={transactionsByMonth.get(12)}
    />
  );
}

export { MonthlyExpensesChart };
