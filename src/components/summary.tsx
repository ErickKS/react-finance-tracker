import { CircleArrowUp, CircleArrowDown, DollarSign } from "lucide-react";

import { useSummary } from "../hooks/useSummary";
import { priceFormatter } from "../utils/formatter";

export function Summary() {
  const summary = useSummary();

  return (
    <section className="grid grid-cols-3 gap-8 items-center max-w-5xl mx-auto -mt-20 px-5">
      <div className="flex flex-col gap-4 py-6 px-8 bg-gray-600 rounded-md">
        <header className="flex justify-between">
          <span>Income</span>
          <CircleArrowUp size={28} className="text-green-300" />
        </header>

        <span className="text-3xl text-gray-100 font-medium">{priceFormatter.format(summary.income)}</span>
      </div>

      <div className="flex flex-col gap-4 py-6 px-8 bg-gray-600 rounded-md">
        <header className="flex justify-between">
          <span>Outcome</span>
          <CircleArrowDown size={28} className="text-red-300" />
        </header>

        <span className="text-3xl text-gray-100 font-medium">{priceFormatter.format(summary.outcome)}</span>
      </div>

      <div className="flex flex-col gap-4 py-6 px-8 bg-green-700 rounded-md">
        <header className="flex justify-between">
          <span>Total</span>
          <DollarSign size={28} className="text-white" />
        </header>

        <span className="text-3xl text-gray-100 font-medium">{priceFormatter.format(summary.total)}</span>
      </div>
    </section>
  );
}
