import * as React from "react";
import clsx from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={clsx(
        "h-12 w-full px-4 bg-gray-900 rounded-md border-2 border-gray-900 outline-none transition-all",
        "placeholder:text-gray-500 focus:border-green-500"
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
