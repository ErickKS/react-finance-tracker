import clsx from "clsx";

interface SummaryProps {
  children: React.ReactNode;
  extraClassName: string;
}

export function SummaryRoot({ children, extraClassName }: SummaryProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5 min-w-64 w-full py-6 px-8 border border-gray rounded-md transition-all duration-300",
        extraClassName
      )}
    >
      {children}
    </div>
  );
}

interface SummaryHeaderProps {
  children: React.ReactNode;
}

export function SummaryHeader({ children }: SummaryHeaderProps) {
  return <header className="flex justify-between items-center">{children}</header>;
}

interface SummaryPriceProps {
  price: string;
}

export function SummaryPrice({ price }: SummaryPriceProps) {
  return <span className="text-2xl font-semibold">{price}</span>;
}
