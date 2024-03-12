import { clsx } from "clsx";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant: "primary" | "outline";
  children: React.ReactNode;
}

export function Button({ variant, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex justify-center items-center gap-2 h-10 px-4 rounded-md outline-none transition-all duration-200",
        "text-sm font-medium text-center",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        { "bg-white text-black focus-visible:bg-white/80 hover:bg-white/80": variant === "primary" },
        { "border border-gray hover:bg-gray focus-visible:bg-gray": variant === "outline" }
      )}
      {...props}
    >
      {children}
    </button>
  );
}
