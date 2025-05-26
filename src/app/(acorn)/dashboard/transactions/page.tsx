import { TransactionHistory } from "@/components/all-transactions";

export default function Transactions() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden px-10 py-20">
        <TransactionHistory />
      </div>
    </div>
  );
}
