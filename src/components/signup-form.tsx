"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    try {
      await signUpWithEmail(formData.name, formData.email, formData.password);
      localStorage.setItem("signup_email", formData.email);
      router.replace("/confirm-email");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    localStorage.removeItem("signup_email");
  }, []);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-balance text-muted-foreground text-sm">
          Fill in your details to get started
        </p>
      </div>
      <div className="grid gap-12">
        <div className="grid gap-2">
          <Label htmlFor="name" className="font-bold">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Jane Doe"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="font-bold">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="font-bold">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword" className="font-bold">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <Button className="w-full">Create Account</Button>
        {error && <p className="text-white text-sm">{error}</p>}
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href={"/"} className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}
