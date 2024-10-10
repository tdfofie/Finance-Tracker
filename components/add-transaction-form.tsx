"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define the validation schema using Zod
const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
  type: z.enum(["income", "expense"], {
    required_error: "You need to select a transaction type.",
  }),
});

// Define props for the AddTransactionForm component
interface AddTransactionFormProps {
  onAddTransaction: (transaction: {
    description: string;
    amount: number;
    type: "income" | "expense";
  }) => void;
}

// Functional component for adding transactions
export function AddTransactionForm({ onAddTransaction }: AddTransactionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "expense", // Default type
    },
  });

  // Function to handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddTransaction({
      description: values.description,
      amount: values.type === "expense" ? -values.amount : values.amount,
      type: values.type,
    });
    form.reset(); // Reset form after submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter transaction description" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of your transaction.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormDescription>
                Enter the transaction amount.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value} // Ensure this is set correctly
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="income" id="income" />
                    </FormControl>
                    <FormLabel htmlFor="income" className="font-normal">
                      Income
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="expense" id="expense" />
                    </FormControl>
                    <FormLabel htmlFor="expense" className="font-normal">
                      Expense
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Transaction</Button>
      </form>
    </Form>
  );
}
