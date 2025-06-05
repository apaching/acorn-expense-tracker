import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { MonthlyExpensesChart } from "@/components/bar-chart";
import { RecentTransactions } from "@/components/recent-transactions";
import { CashFlowChart, ExpensesChart } from "@/components/pie-chart";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <div className="grid h-full w-full grid-cols-[30%_70%]">
      <div className="flex flex-row">
        <div className="my-10 flex flex-1 flex-col gap-12 p-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold text-foreground">
              Hello{" "}
              <span className="text-primary">
                {userData?.full_name.split(" ")[0]}
              </span>
              ,
            </h1>
            <p className="text-lg text-balance text-muted-foreground">
              Here&apos;s a summary of your recent expenses.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <CashFlowChart userId={user?.id as string} />
            <ExpensesChart userId={user?.id as string} />
          </div>
        </div>
        <div className="py-10">
          <Separator orientation="vertical" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="my-11 flex h-full flex-col gap-8 py-10">
          <MonthlyExpensesChart />
          <RecentTransactions userId={user?.id as string} />
        </div>
      </div>
    </div>
  );
}
