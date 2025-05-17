"use client";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ConfirmationForm() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);

  const handleButton = () => {
    router.replace("/");
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("signup_email");

    if (!storedEmail) {
      router.replace("/");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="text-2xl font-bold">Verify your email address</h1>
        <p className="text-muted-foreground text-sm">
          To start using{" "}
          <span className="font-bold text-primary text-base">Acorn</span>,
          confirm your email address with the email we sent to:
        </p>
        <span className="font-bold">{email}</span>
      </div>
      <div>
        <Button className="w-full" onClick={handleButton}>
          Go back to Login Page
        </Button>
      </div>
    </div>
  );
}
