import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import { Transaction } from "@/types/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

interface Props {
  userId: string;
}

async function RecentTransactions({ userId }: Props) {
  const supabase = await createClient();

  const { data: recentTransactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(5);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="py-6">
        <Table>
          <TableCaption>A list of your most recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Details</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions?.map((transaction: Transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {transaction.category}
                    </span>
                    <span
                      className={`text-xs ${
                        transaction.type === "incoming"
                          ? "text-chart-incoming"
                          : "text-chart-outgoing"
                      }`}
                    >
                      {capitalizeFirstLetter(transaction.type)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  {transaction.note ? transaction.note : "No notes"}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export { RecentTransactions };
