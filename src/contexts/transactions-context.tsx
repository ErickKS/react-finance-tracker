import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: Partial<Transaction>) => Promise<void>;
  fetchHasError: boolean;
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, seTransactions] = useState<Transaction[]>([]);
  const [fetchHasError, setFetchHasError] = useState(false);

  const fetchTransactions = useCallback(async (query?: string) => {
    try {
      const response = await api.get("/transactions", {
        params: {
          _sort: "createdAt",
          _order: "desc",
          q: query,
        },
      });

      seTransactions(response.data);
    } catch (err) {
      setFetchHasError(true);
    }
  }, []);

  const createTransaction = useCallback(async (data: Partial<Transaction>) => {
    const { description, price, type, category } = data;

    const response = await api.post("/transactions", {
      description,
      type,
      category,
      price,
      createdAt: new Date(),
    });

    seTransactions((state) => [response.data, ...state]);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchHasError, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
