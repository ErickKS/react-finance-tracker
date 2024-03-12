import { useContextSelector } from "use-context-selector";
import clsx from "clsx";

import { TransactionsContext } from "../contexts/transactions-context";
import { dateFormatter, priceFormatter } from "../utils/formatter";

import { Header } from "../components/header";
import { Summary } from "../components/summary";
import { SearchForm } from "../components/search-form";
import { Bookmark } from "lucide-react";

export function HomePage() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <div>
      <Header />
      <Summary />

      <section className="max-w-5xl w-full mt-16 mx-auto px-5">
        <SearchForm />

        <div className="flex flex-col gap-3 w-full mt-5 sm:gap-2">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex flex-col gap-3 bg-gray/50 px-8 py-4 rounded-md sm:flex-row">
              <div className="flex flex-col gap-1 sm:flex-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="rounded-tl-md rounded-bl-md">{transaction.description}</span>

                <span
                  className={clsx(
                    "flex-1 text-xl font-medium sm:flex-initial",
                    { "text-green/90": transaction.type === "income" },
                    { "text-red/90": transaction.type === "outcome" }
                  )}
                >
                  {transaction.type === "outcome" && "- "}
                  {priceFormatter.format(transaction.price)}
                </span>
              </div>

              <div className="flex-1 flex justify-between items-center sm:flex-initial sm:w-2/5">
                <span className="flex items-center gap-1 sm:flex-1 sm:justify-end">
                  <Bookmark size={18} className="sm:hidden" />
                  {transaction.category}
                </span>

                <span className="flex-1 flex justify-end">{dateFormatter.format(new Date(transaction.createdAt))}</span>
              </div>
            </div>

            // <tr key={transaction.id} >
            //   <td className="rounded-tl-md rounded-bl-md" width="40%">
            //     {transaction.description}
            //   </td>
            //   <td className={clsx({ "text-green/90": transaction.type === "income" }, { "text-red/90": transaction.type === "outcome" })}>
            //     {transaction.type === "outcome" && "- "}
            //     {priceFormatter.format(transaction.price)}
            //   </td>
            //   <td>{transaction.category}</td>
            //   <td className="rounded-tr-md rounded-br-md">{dateFormatter.format(new Date(transaction.createdAt))}</td>
            // </tr>
          ))}
        </div>
      </section>
    </div>
  );
}
