import { HardHat } from "lucide-react";

export default function Settings() {
  return (
    <div className="bg-gray flex h-full w-full flex-col items-center justify-center">
      <div className="flex items-center gap-3">
        <HardHat className="h-6 w-6 text-primary" />
        <h1 className="text-center text-xl font-semibold">
          This page is under construction.
        </h1>
      </div>
      <p className="mt-2 text-sm text-gray-500">Please check back later.</p>
    </div>
  );
}
