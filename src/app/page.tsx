import { Nut } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[40%_60%]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex font-medium items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <Nut className="text-primary-foreground size-4" />
          </div>
          Acorn
        </div>
        <div className="flex justify-center flex-1 items-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative bg-muted hidden lg:block" />
    </div>
  );
}
