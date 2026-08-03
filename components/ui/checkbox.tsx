"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex justify-center items-center bg-input/20 data-checked:bg-primary dark:bg-input disabled:opacity-50 group-has-disabled/field:opacity-50 border border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-sm outline-none aria-invalid:ring-2 aria-invalid:ring-destructive/20 focus-visible:ring-3 focus-visible:ring-ring/30 dark:aria-invalid:ring-destructive/40 size-5 text-primary-foreground data-checked:text-primary-foreground transition-colors hover:cursor-pointer disabled:cursor-not-allowed shrink-0",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex justify-center items-center [&>svg]:size-3.5 text-current transition-none"
      >
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
