"use server";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function addTransaction(newTransaction: {
  user_id: string;
  amount: number;
  type: "incoming" | "outgoing";
  category: string;
  date: Date;
  note?: string;
}) {
  const { user_id, amount, type, category, date, note } = newTransaction;

  try {
    await sql`
			INSERT INTO transactions (user_id, amount, type, category, date, note)
			VALUES(
				${user_id},
				${amount},
				${type},
				${category},
				${date},
				${note ?? null}
			)
		`;
  } catch (error) {
    console.error("Database error:", error);
  }
}
