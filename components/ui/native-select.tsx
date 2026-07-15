import * as React from "react";

import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons";

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default";
};

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative has-[select:disabled]:opacity-50 w-fit",
        className,
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="bg-background hover:bg-input/50 selection:bg-primary px-4 py-3 border border-primary rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus:ring-2 focus:ring-secondary dark:aria-invalid:ring-destructive/40 w-100 min-w-0 h-13 data-[size=sm]:h-6 data-[size=sm]:text-[0.625rem] selection:text-primary-foreground placeholder:text-muted-foreground text-xs/relaxed transition-colors appearance-none disabled:cursor-not-allowed disabled:pointer-events-none select-none"
        {...props}
      />
      <HugeiconsIcon
        icon={UnfoldMoreIcon}
        strokeWidth={2}
        className="top-1/2 right-1.5 absolute size-3.5 group-data-[size=sm]/native-select:size-3 text-muted-foreground -translate-y-1/2 group-data-[size=sm]/native-select:-translate-y-[calc(--spacing(1.25))] pointer-events-none select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
