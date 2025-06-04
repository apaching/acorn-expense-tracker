import { createClient } from "@/utils/supabase/server";
import { TransactionHistory } from "@/components/all-transactions";

export default async function Transactions() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden px-10 py-20">
        <TransactionHistory userId={user?.id as string} />
      </div>
    </div>
  );
}
