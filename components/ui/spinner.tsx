import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoaderCircle, LoaderIcon } from "lucide-react";

import {
  LoaderPinwheelIcon,
  Loading01Icon,
  Loading03Icon,
  Loading04Icon,
} from "@hugeicons/core-free-icons";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      // data-slot="spinner"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
