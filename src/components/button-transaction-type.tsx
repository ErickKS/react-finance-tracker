import clsx from "clsx";
import * as RadioGroup from "@radix-ui/react-radio-group";

interface ButtonTransactionTypeProps extends React.ComponentProps<"button"> {
  variant: "income" | "outcome";
  children: React.ReactNode;
}

export function ButtonTransactionType({ variant, children, ...props }: ButtonTransactionTypeProps) {
  return (
    <RadioGroup.Item
      className={clsx(
        "flex flex-1 justify-center items-center gap-2 h-12 px-5 border border-gray rounded-md outline-none transition-all duration-200",
        "font-medium",
        "focus-visible:border-white data-[state=unchecked]:hover:border-white data-[state=checked]:bg-gray",
        { "data-[state=checked]:text-green": variant === "income" },
        { "data-[state=checked]:text-red": variant === "outcome" }
      )}
      {...props}
    >
      {children}
    </RadioGroup.Item>
  );
}
