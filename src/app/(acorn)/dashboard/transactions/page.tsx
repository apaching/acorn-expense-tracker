import { TransactionHistory } from "@/components/all-transactions";

export default async function Transactions() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-hidden px-10 py-20">
        <TransactionHistory />
      </div>
    </div>
  );
}
