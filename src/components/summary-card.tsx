interface SummaryProps {
  children: React.ReactNode;
}

export function SummaryRoot({ children }: SummaryProps) {
  return <div className="flex flex-col gap-5 min-w-64 w-full py-6 px-8 border border-gray rounded-md">{children}</div>;
}

export function SummaryHeader({ children }: SummaryProps) {
  return <header className="flex justify-between items-center">{children}</header>;
}

interface SummaryPriceProps {
  price: string;
}

export function SummaryPrice({ price }: SummaryPriceProps) {
  return <span className="text-2xl font-semibold">{price}</span>;
}
