"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addTransaction } from "@/actions/actions";
import { Calendar } from "@/components/ui/calendar";
import { createClient } from "@/utils/supabase/client";
import { incomingCategories, outgoingCategories } from "@/constants/constants";

interface Props {
  onAdd: () => void;
  setIsMutating: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddModal({ onAdd, setIsMutating }: Props) {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState({
    userId: null as string | null,
    amount: "",
    type: "incoming" as "incoming" | "outgoing",
    category: "",
    date: new Date() as Date | undefined,
    note: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof typeof transaction, value: any) => {
    if (field === "date" && value instanceof Date) {
      const now = new Date();
      value.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds(),
      );
      console.log("With time:", value);
    }

    setTransaction((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!transaction.amount || !transaction.type || !transaction.date) {
      alert("Please fill in needed fields.");
      return;
    }

    setOpen(false);
    setIsMutating(true);

    await addTransaction({
      user_id: transaction.userId!,
      amount: Number(transaction.amount),
      type: transaction.type === "incoming" ? "incoming" : "outgoing",
      category: transaction.category,
      date: transaction.date!,
      note: transaction.note,
    });

    setTransaction((prev) => ({
      userId: prev.userId,
      amount: "",
      type: "incoming" as "incoming" | "outgoing",
      category: "",
      date: undefined as Date | undefined,
      note: "",
    }));
    onAdd();
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setTransaction((prev) => ({ ...prev, userId: session.user.id }));
      }
    };

    getSession();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-3 text-primary-foreground" />
          <span>New Transaction</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction. Click the button when you&apos;re done
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              className="col-span-3"
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Type
            </Label>
            <div className="col-span-3">
              <Select
                defaultValue="incoming"
                onValueChange={(value) =>
                  handleChange("type", value as "incoming" | "outgoing")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem key="incoming" value="incoming">
                      Incoming
                    </SelectItem>
                    <SelectItem key="outgoing" value="outgoing">
                      Outgoing
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Category
            </Label>
            <div className="col-span-3">
              <Select
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {(transaction.type === "incoming"
                      ? incomingCategories
                      : outgoingCategories
                    ).map((category) => (
                      <div
                        key={category.category}
                        className="flex flex-row items-center gap-1 px-2"
                      >
                        <category.icon className="size-5" />
                        <SelectItem value={category.category}>
                          {category.category}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="date" className="pt-2 text-right">
              Date
            </Label>
            <div className="col-span-3">
              <div className="flex justify-center rounded-md border shadow-sm">
                <Calendar
                  mode="single"
                  selected={transaction.date}
                  onSelect={(date) => handleChange("date", date)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Notes
            </Label>
            <Input
              id="username"
              className="col-span-3"
              onChange={(e) => handleChange("note", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
