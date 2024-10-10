"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { AddTransactionForm } from "@/components/add-transaction-form"
import { BudgetForm } from "@/components/budget-form"
import { Transaction } from '@/components/types';


// Define the type for a budget (modify as needed)
interface Budget {
  id: number;
  amount: number;
  category: string;
}


export default function DashboardPage() {
  const [balance, setBalance] = useState<number>(5000);
  
  // Transactions state initialized with example data
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, description: 'Salary', amount: 3000, type: 'income' },
    { id: 2, description: 'Rent', amount: 1000, type: 'expense' }, // Use positive amount, since expense is handled separately
    { id: 3, description: 'Groceries', amount: 200, type: 'expense' }, // Use positive amount
  ]);
  
  // Budgets state initialized as an empty array
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Function to add a new transaction
  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const updatedTransactions = [
      ...transactions,
      { id: Date.now(), ...newTransaction },
    ];
    setTransactions(updatedTransactions);
    
    // Update the balance
    setBalance(balance + (newTransaction.type === 'income' ? newTransaction.amount : -newTransaction.amount));
  };

  // Function to add a new budget
  const addBudget = (newBudget: Omit<Budget, 'id'>) => {
    const updatedBudgets = [
      ...budgets,
      { id: Date.now(), ...newBudget },
    ];
    setBudgets(updatedBudgets);
  };

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Balance
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₵{balance.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Income
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₵{transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₵{Math.abs(transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Budgets
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{budgets.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 since last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    You made {transactions.length} transactions this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions transactions={transactions} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <AddTransactionForm onAddTransaction={addTransaction} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentTransactions transactions={transactions} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Set Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <BudgetForm onAddBudget={addBudget} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Budgets</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {budgets.map((budget) => (
                    <li key={budget.id} className="mb-2">
                      {budget.category}: ₵{budget.amount}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}