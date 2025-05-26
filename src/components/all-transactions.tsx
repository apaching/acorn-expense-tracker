import {
  Table,
  TableRow,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import { AddModal } from "./add-modal";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

function TransactionHistory() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between">
            <span>Transaction History</span>
            <AddModal />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <Table>
          <TableCaption>
            A list of your recent most recent transactions.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Details</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <TableRow>
              <TableCell>Transportation</TableCell>
              <TableCell>$250.00</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">11/07/2025</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export { TransactionHistory };
