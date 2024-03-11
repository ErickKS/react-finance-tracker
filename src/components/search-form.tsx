import { memo } from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import * as z from "zod";

import { TransactionsContext } from "../contexts/transactions-context";

import { Input } from "./input";
import { Button } from "./button";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormData = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormData) {
    await fetchTransactions(data.query);
  }

  return (
    <form onSubmit={handleSubmit(handleSearchTransactions)} className="flex gap-4">
      <Input type="text" id="query" placeholder="Search transaction" {...register("query")} />

      <Button type="submit" variant="outline" disabled={isSubmitting}>
        <Search size={20} />
        Search
      </Button>
    </form>
  );
}

export const SearchForm = memo(SearchFormComponent);
