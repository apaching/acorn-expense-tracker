"use client";

import {
  ChartConfig,
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { month: "January", incoming: 186, outgoing: 80 },
  { month: "February", incoming: 305, outgoing: 200 },
  { month: "March", incoming: 237, outgoing: 120 },
  { month: "April", incoming: 73, outgoing: 190 },
  { month: "May", incoming: 209, outgoing: 130 },
  { month: "June", incoming: 214, outgoing: 140 },
  { month: "July", incoming: 186, outgoing: 80 },
  { month: "August", incoming: 305, outgoing: 200 },
  { month: "September", incoming: 237, outgoing: 120 },
  { month: "October", incoming: 73, outgoing: 190 },
  { month: "November", incoming: 209, outgoing: 130 },
  { month: "December", incoming: 214, outgoing: 140 },
];

const chartConfig = {
  incoming: {
    label: "Incoming",
    color: "hsl(var(--chart-incoming)",
  },
  outgoing: {
    label: "Outgoing",
    color: "hsl(var(--chart-outgoing))",
  },
} satisfies ChartConfig;

function MonthlyExpensesChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="lg:w-[1025px] h-[250px]"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="incoming" fill="var(--chart-incoming)" radius={4} />
            <Bar dataKey="outgoing" fill="var(--chart-outgoing)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export { MonthlyExpensesChart };
