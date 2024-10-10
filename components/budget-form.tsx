"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
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

const formSchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  amount: z.coerce.number().positive({
    message: "Budget amount must be a positive number.",
  }),
});

interface Budget {
  id: number;
  amount: number;
  category: string;
}

interface BudgetFormProps {
  onAddBudget: (newBudget: Omit<Budget, "id">) => void;
}



export function BudgetForm({ onAddBudget }: BudgetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onAddBudget(values); // Call the function to add budget
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter budget category" {...field} />
              </FormControl>
              <FormDescription>
                This is the category for your budget (e.g., Groceries, Rent, Entertainment).
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
              <FormLabel>Budget Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter budget amount" {...field} />
              </FormControl>
              <FormDescription>
                Enter the amount you want to budget for this category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Set Budget</Button>
      </form>
    </Form>
  );
}
