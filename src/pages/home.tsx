import { useContextSelector } from "use-context-selector";
import clsx from "clsx";

import { Header } from "../components/header";
import { Summary } from "../components/summary";
import { SearchForm } from "../components/search-form";
import { TransactionsContext } from "../contexts/transactions-context";
import { dateFormatter, priceFormatter } from "../utils/formatter";

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

        <table className="w-full border-separate border-spacing-y-2 mt-4">
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="[&>td]:bg-gray-700 [&>td]:px-8 [&>td]:py-6">
                <td className="rounded-tl-md rounded-bl-md" width="40%">
                  {transaction.description}
                </td>
                <td
                  className={clsx({ "text-green-300": transaction.type === "income" }, { "text-red-300": transaction.type === "outcome" })}
                >
                  {transaction.type === "outcome" && "- "}
                  {priceFormatter.format(transaction.price)}
                </td>
                <td>{transaction.category}</td>
                <td className="rounded-tr-md rounded-br-md">{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
