import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  return (
    <form className="flex flex-col gap-6">
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
          <Input id="name" type="text" placeholder="Jane Doe" required />
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
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="font-bold">
            Password
          </Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword" className="font-bold">
            Confirm Password
          </Label>
          <Input id="confirmPassword" type="password" required />
        </div>
        <Button className="w-full">Create Account</Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href={"/login"} className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}
