import { TransactionsProvider } from "./contexts/transactions-context";

import { HomePage } from "./pages/home";

export function App() {
  return (
    <TransactionsProvider>
      <HomePage />
    </TransactionsProvider>
  );
}
