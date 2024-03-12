import { Banknote, CircleArrowDown, CircleArrowUp } from "lucide-react";

import { useSummary } from "../hooks/useSummary";
import { priceFormatter } from "../utils/formatter";

import { SummaryRoot, SummaryHeader, SummaryPrice } from "./summary-card";

export function Summary() {
  const summary = useSummary();

  return (
    <section className=" flex items-center gap-4 overflow-x-scroll max-w-5xl mx-auto mt-10 px-5 lg:grid lg:grid-cols-3 lg:overflow-x-hidden">
      <SummaryRoot>
        <SummaryHeader>
          <span className="font-semibold">Income</span>
          <CircleArrowUp size={24} strokeWidth={1.5} className="text-green" />
        </SummaryHeader>

        <SummaryPrice price={priceFormatter.format(summary.income)} />
      </SummaryRoot>

      <SummaryRoot>
        <SummaryHeader>
          <span className="font-semibold">Outcome</span>
          <CircleArrowDown size={24} strokeWidth={1.5} className="text-red" />
        </SummaryHeader>

        <SummaryPrice price={priceFormatter.format(summary.outcome)} />
      </SummaryRoot>

      <SummaryRoot>
        <SummaryHeader>
          <span className="font-semibold">Total</span>
          <Banknote size={24} strokeWidth={1.5} className="text-white" />
        </SummaryHeader>

        <SummaryPrice price={priceFormatter.format(summary.total)} />
      </SummaryRoot>
    </section>
  );
}
