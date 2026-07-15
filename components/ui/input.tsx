import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:inline-flex bg-input/20 dark:bg-input file:bg-transparent disabled:opacity-50 px-4 py-3 border border-primary aria-invalid:border-destructive focus-visible:border-ring dark:aria-invalid:border-destructive/50 file:border-0 rounded-lg outline-none aria-invalid:ring-2 aria-invalid:ring-destructive/20 focus-visible:ring-3 focus-visible:ring-ring/30 dark:aria-invalid:ring-destructive/40 w-full min-w-0 file:h-6 file:font-medium placeholder:text-muted-foreground file:text-foreground file:text-xs/relaxed text-base md:text-base/relaxed transition-colors disabled:cursor-not-allowed disabled:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
