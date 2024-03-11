import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { CircleArrowDown, CircleArrowUp, X } from "lucide-react";

import { TransactionsContext } from "../contexts/transactions-context";

import { Button } from "./button";
import { Input } from "./input";
import { ButtonTransactionType } from "./button-transaction-type";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction;
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  async function handleCreateNewTransaction(data: newTransactionFormInputs) {
    createTransaction(data);

    reset();
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="primary">New transaction</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed h-screen w-screen inset-0 bg-black/75" />

        <Dialog.Content className="fixed z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-w-[32rem] p-12 bg-gray-800 rounded-md">
          <Dialog.Title className="text-2xl text-gray-100 font-semibold">New Transaction</Dialog.Title>

          <form onSubmit={handleSubmit(handleCreateNewTransaction)} className="flex flex-col mt-8">
            <div className="flex flex-col gap-4">
              <Input type="text" id="description" placeholder="Description" required {...register("description")} />
              <Input type="number" id="price" placeholder="Amount" required {...register("price", { valueAsNumber: true })} />
              <Input type="text" id="category" placeholder="Category" required {...register("category")} />
            </div>

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <RadioGroup.Root onValueChange={field.onChange} value={field.value} className="flex gap-4 mt-6 mb-8">
                  <ButtonTransactionType variant="income" value={"income"}>
                    <CircleArrowUp size={28} />
                    Income
                  </ButtonTransactionType>

                  <ButtonTransactionType variant="outcome" value={"outcome"}>
                    <CircleArrowDown size={28} />
                    Outcome
                  </ButtonTransactionType>
                </RadioGroup.Root>
              )}
            />

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Register
            </Button>
          </form>

          <Dialog.Close className="absolute top-7 right-7 rounded-md ring-2 ring-transparent outline-none focus-visible:ring-green-500">
            <X size={24} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
