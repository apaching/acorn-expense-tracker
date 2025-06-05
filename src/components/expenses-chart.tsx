"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

interface Props {
  f_and_d: number;
  transport: number;
  groceries: number;
  bills: number;
  luxury: number;
  healthcare: number;
  others: number;
  total: number;
}

function ExpensesChartClient({
  f_and_d,
  transport,
  groceries,
  bills,
  luxury,
  healthcare,
  others,
  total,
}: Props) {
  const now = new Date();
  const monthAndYear = now.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const chartData = [
    { type: "foods_and_drinks", amount: f_and_d, fill: "var(--chart-1)" },
    { type: "transport", amount: transport, fill: "var(--chart-2)" },
    { type: "groceries", amount: groceries, fill: "var(--chart-3)" },
    { type: "bills", amount: bills, fill: "var(--chart-4)" },
    { type: "luxury", amount: luxury, fill: "var(--chart-5)" },
    { type: "healthcare", amount: healthcare, fill: "var(--chart-6)" },
    { type: "others", amount: others, fill: "var(--chart-7)" },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    foods_and_drinks: {
      label: "Foods & Drinks",
      color: "hsl(var(--chart-4))",
    },
    transport: {
      label: "Transport",
      color: "hsl(var(--chart-2))",
    },
    groceries: {
      label: "Groceries",
      color: "hsl(var(--chart-4))",
    },
    bills: {
      label: "Bills",
      color: "hsl(var(--chart-2))",
    },
    luxury: {
      label: "Luxury",
      color: "hsl(var(--chart-4))",
    },
    healthcare: {
      label: "Healthcare",
      color: "hsl(var(--chart-2))",
    },
    others: {
      label: "Others",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>This month&apos;s expenses</CardTitle>
        <CardDescription>{monthAndYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function EmptyExpensesChart() {
  const now = new Date();
  const monthAndYear = now.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>This month&apos;s cash flow</CardTitle>
        <CardDescription>{monthAndYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto flex aspect-square max-h-[250px] items-center justify-center">
          <h1 className="text-sm font-semibold">
            No transactions yet for this month.
          </h1>
        </div>
      </CardContent>
    </Card>
  );
}

export { ExpensesChartClient, EmptyExpensesChart };
