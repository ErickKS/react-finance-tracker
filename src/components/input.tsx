import * as React from "react";
import clsx from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={clsx(
        "h-10 w-full px-3 bg-transparent border border-gray rounded-md outline-none transition-all",
        "text-sm",
        "placeholder:text-gray-light focus:border-white"
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
