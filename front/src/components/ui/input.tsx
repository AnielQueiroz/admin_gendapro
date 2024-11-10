import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & React.ComponentProps<"input">
>(({ error, errorMessage, className, type, ...props }, ref) => {
  return (
    <>
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-zinc-200 focus-visible:ring-zinc-950",
          "dark:border-zinc-800 dark:focus-visible:ring-zinc-300 dark:placeholder:text-zinc-400",
          className
        )}
        ref={ref}
        {...props}
      />

      {error && errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </>
  );
});
Input.displayName = "Input";

export { Input };
