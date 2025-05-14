import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-balance text-muted-foreground text-sm">
          Please enter your details
        </p>
      </div>
      <div className="grid gap-12">
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
          <div className="flex items-center">
            <Label htmlFor="password" className="font-bold">
              Password
            </Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full">Login</Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.73 1.37 9.14 3.6l6.82-6.82C35.06 2.66 29.88 0 24 0 14.88 0 6.94 5.36 2.92 13.11l7.9 6.13C12.73 13.48 17.95 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.1 24.58c0-1.43-.14-2.8-.4-4.12H24v7.8h12.4c-.53 2.84-2.16 5.25-4.6 6.88l7.3 5.68c4.26-3.93 7-9.72 7-16.24z"
            />
            <path
              fill="#FBBC05"
              d="M10.82 28.24a14.49 14.49 0 010-8.48l-7.9-6.13a24.04 24.04 0 000 20.74l7.9-6.13z"
            />
            <path
              fill="#EA4335"
              d="M24 48c6.48 0 11.92-2.14 15.9-5.82l-7.3-5.68a13.75 13.75 0 01-20.1-5.25l-7.9 6.13C6.94 42.64 14.88 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        {" "}
        Don&apos;t have an account?{" "}
        <a className="underline underline-offset-4">Sign up</a>
      </div>
    </form>
  );
}
