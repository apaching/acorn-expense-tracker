"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";

function CashFlowChart() {
  const chartData = [
    { type: "incoming", amount: 28000, fill: "var(--chart-incoming)" },
    { type: "outgoing", amount: 12384, fill: "var(--chart-outgoing)" },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    incoming: {
      label: "Incoming",
      color: "hsl(var(--chart-incoming))",
    },
    outgoing: {
      label: "Outgoing",
      color: "hsl(var(--chart-outgoing))",
    },
  } satisfies ChartConfig;

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>This month&apos;s cash flow</CardTitle>
        <CardDescription>January 2024</CardDescription>
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
                          {totalVisitors.toLocaleString()}
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
            <ChartLegend
              content={<ChartLegendContent nameKey="type" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function ExpensesChart() {
  const chartData = [
    { type: "foods_and_drinks", amount: 275, fill: "var(--chart-1)" },
    { type: "transport", amount: 200, fill: "var(--chart-2)" },
    { type: "groceries", amount: 275, fill: "var(--chart-3)" },
    { type: "bills", amount: 200, fill: "var(--chart-4)" },
    { type: "luxury", amount: 275, fill: "var(--chart-5)" },
    { type: "healthcare", amount: 275, fill: "var(--chart-6)" },
    { type: "others", amount: 200, fill: "var(--chart-7)" },
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

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>This month&apos;s expenses</CardTitle>
        <CardDescription>January 2024</CardDescription>
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
                          {totalVisitors.toLocaleString()}
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

export { CashFlowChart, ExpensesChart };

// export { CashFlowChart, ExpensesChart };
