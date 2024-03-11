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
        "flex flex-1 justify-center items-center gap-3 h-12 px-5 bg-gray-700 rounded-md outline-none transition-all duration-200",
        "text-gray-300 font-medium",
        "ring-2 ring-transparent focus-visible:ring-white data-[state=unchecked]:hover:bg-gray-600 data-[state=checked]:text-white",
        { "data-[state=checked]:bg-green-700": variant === "income" },
        { "data-[state=checked]:bg-red-500": variant === "outcome" }
      )}
      {...props}
    >
      {children}
    </RadioGroup.Item>
  );
}
