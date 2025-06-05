"use client";

import * as React from "react";
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
import { Label, Pie, PieChart } from "recharts";

interface Props {
  incoming: number;
  outgoing: number;
  net: number;
}

function CashFlowChartClient({ incoming, outgoing, net }: Props) {
  const now = new Date();
  const monthAndYear = now.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const chartData = [
    {
      type: "incoming",
      amount: incoming,
      fill: "var(--chart-incoming)",
    },
    {
      type: "outgoing",
      amount: outgoing,
      fill: "var(--chart-outgoing)",
    },
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

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>This month&apos;s cash flow</CardTitle>
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
                          {net.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Net Gain
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

function EmptyCashFlowChart() {
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

export { CashFlowChartClient, EmptyCashFlowChart };
