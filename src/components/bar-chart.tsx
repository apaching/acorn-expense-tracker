"use client";

import {
  ChartConfig,
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthlyTransaction {
  incoming: number;
  outgoing: number;
}

interface Props {
  jan: MonthlyTransaction;
  feb: MonthlyTransaction;
  mar: MonthlyTransaction;
  apr: MonthlyTransaction;
  may: MonthlyTransaction;
  jun: MonthlyTransaction;
  jul: MonthlyTransaction;
  aug: MonthlyTransaction;
  sep: MonthlyTransaction;
  oct: MonthlyTransaction;
  nov: MonthlyTransaction;
  dec: MonthlyTransaction;
}

function BarChartClient({
  jan,
  feb,
  mar,
  apr,
  may,
  jun,
  jul,
  aug,
  sep,
  oct,
  nov,
  dec,
}: Props) {
  const chartData = [
    { month: "January", incoming: jan.incoming, outgoing: jan.outgoing },
    { month: "February", incoming: feb.incoming, outgoing: feb.outgoing },
    { month: "March", incoming: mar.incoming, outgoing: mar.outgoing },
    { month: "April", incoming: apr.incoming, outgoing: apr.outgoing },
    { month: "May", incoming: may.incoming, outgoing: may.outgoing },
    { month: "June", incoming: jun.incoming, outgoing: jun.outgoing },
    { month: "July", incoming: jul.incoming, outgoing: jul.outgoing },
    { month: "August", incoming: aug.incoming, outgoing: aug.outgoing },
    { month: "September", incoming: sep.incoming, outgoing: sep.outgoing },
    { month: "October", incoming: oct.incoming, outgoing: oct.outgoing },
    { month: "November", incoming: nov.incoming, outgoing: nov.outgoing },
    { month: "December", incoming: dec.incoming, outgoing: dec.outgoing },
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[250px] lg:w-[1025px]"
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

export { BarChartClient };
