import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as z from "zod";
import { useContextSelector } from "use-context-selector";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { CircleArrowDown, CircleArrowUp, X } from "lucide-react";

import { TransactionsContext } from "../contexts/transactions-context";

import { Button } from "./button";
import { Input } from "./input";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    reset();
  }, [isDialogOpen]);

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
    setIsDialogOpen(false);
  }

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <Button variant="primary">New transaction</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed h-screen w-screen inset-0 bg-background/80 backdrop-blur-sm" />

        <Dialog.Content className="fixed z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[26rem] w-full p-2">
          <div className="w-full p-6 bg-background border border-gray rounded-md ">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-lg font-semibold">New Transaction</Dialog.Title>
              <Dialog.Close className="rounded-md ring-2 ring-transparent outline-none focus-visible:ring-white">
                <X size={20} />
              </Dialog.Close>
            </div>

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
                    <RadioGroup.Item
                      className={clsx(
                        "flex flex-1 justify-center items-center gap-2 h-12 px-5 border border-gray rounded-md outline-none transition-all duration-200",
                        "font-medium",
                        "focus-visible:border-white data-[state=unchecked]:hover:border-white",
                        "data-[state=checked]:border-green data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-green/10 hover:to-transparent data-[state=checked]:text-green"
                      )}
                      value={"income"}
                    >
                      <CircleArrowUp size={20} />
                      Income
                    </RadioGroup.Item>

                    <RadioGroup.Item
                      className={clsx(
                        "flex flex-1 justify-center items-center gap-2 h-12 px-5 border border-gray rounded-md outline-none transition-all duration-200",
                        "font-medium",
                        "focus-visible:border-white data-[state=unchecked]:hover:border-white",
                        "data-[state=checked]:border-red data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-red/10 hover:to-transparent data-[state=checked]:text-red"
                      )}
                      value={"outcome"}
                    >
                      <CircleArrowDown size={20} />
                      Outcome
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                )}
              />

              <Button type="submit" variant="primary" disabled={isSubmitting}>
                Create
              </Button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
