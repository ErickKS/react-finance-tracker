import { clsx } from "clsx";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant: "primary" | "outline";
  children: React.ReactNode;
}

export function Button({ variant, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex justify-center items-center gap-3 h-12 px-5 rounded-md outline-none transition-all duration-200",
        "font-medium text-center",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        { "bg-green-500 text-white ring-2 ring-transparent focus-visible:ring-white hover:bg-green-700": variant === "primary" },
        {
          "border-2 border-green-500 text-green-500 hover:bg-green-500 hover:border-green-500 hover:text-white focus-visible:bg-green-500 focus-visible:border-green-500 focus-visible:text-white":
            variant === "outline",
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
}
