import type { ReactNode } from "react";
import { YAxis, type YAxisProps } from "recharts";
import { Card, CardHeader } from "@/components/ui/cards";
import { ChartPlot } from "@/components/ui/charts/ChartPlot";
import { CHART_AXIS_TICK } from "@/components/ui/charts/chartLayout";
import { cn } from "@/lib/cn";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  legend?: ReactNode;
  className?: string;
  chartClassName?: string;
}

export function ChartCard({
  title,
  description,
  children,
  legend,
  className,
  chartClassName,
}: ChartCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <CardHeader title={title} description={description} className="mb-2" />
      <ChartPlot className={cn("h-56", chartClassName)}>{children}</ChartPlot>
      {legend ? (
        <div className="mt-4 border-t border-border/60 pt-3">{legend}</div>
      ) : null}
    </Card>
  );
}

export function ChartYAxis(props: YAxisProps) {
  return (
    <YAxis
      allowDecimals={false}
      width={36}
      tickMargin={8}
      tick={CHART_AXIS_TICK}
      axisLine={false}
      tickLine={false}
      {...props}
    />
  );
}
