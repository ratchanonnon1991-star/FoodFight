import * as React from "react";
import { Card } from "@/components/ui/Card";

export interface AdminTrendChartPoint {
  period: string;
  value: number | null;
}

export interface AdminTrendChartProps {
  title: string;
  description: string;
  data: AdminTrendChartPoint[];
  variant?: "line" | "bar";
  valueFormatter?: (value: number) => string;
  periodFormatter?: (period: string) => string;
  emptyLabel?: string;
}

interface PlotPoint {
  x: number;
  y: number;
}

const CHART_WIDTH = 640;
const CHART_HEIGHT = 260;
const PLOT_LEFT = 48;
const PLOT_RIGHT = 16;
const PLOT_TOP = 18;
const PLOT_BOTTOM = 42;
const PLOT_WIDTH = CHART_WIDTH - PLOT_LEFT - PLOT_RIGHT;
const PLOT_HEIGHT = CHART_HEIGHT - PLOT_TOP - PLOT_BOTTOM;

function defaultValueFormatter(value: number) {
  return value.toLocaleString();
}

function defaultPeriodFormatter(period: string) {
  return new Date(period).toLocaleDateString(undefined, {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  });
}

function getLabelIndexes(length: number) {
  if (length <= 6) {
    return Array.from({ length }, (_, index) => index);
  }

  const indexes = new Set<number>([0, length - 1]);
  const interval = (length - 1) / 4;
  for (let index = 1; index < 4; index += 1) {
    indexes.add(Math.round(interval * index));
  }
  return Array.from(indexes).sort((left, right) => left - right);
}

function getLineSegments(points: Array<PlotPoint | null>) {
  const segments: PlotPoint[][] = [];
  let current: PlotPoint[] = [];

  for (const point of points) {
    if (point === null) {
      if (current.length > 1) {
        segments.push(current);
      }
      current = [];
      continue;
    }

    current.push(point);
  }

  if (current.length > 1) {
    segments.push(current);
  }

  return segments;
}

export function AdminTrendChart({
  title,
  description,
  data,
  variant = "line",
  valueFormatter = defaultValueFormatter,
  periodFormatter = defaultPeriodFormatter,
  emptyLabel = "No data for this period.",
}: AdminTrendChartProps) {
  const titleId = React.useId();
  const descriptionId = `${titleId}-description`;
  const availableValues = data
    .map((point) => point.value)
    .filter((value): value is number => value !== null);
  const hasData = availableValues.length > 0;

  if (!hasData) {
    return (
      <Card variant="default" className="overflow-hidden p-4">
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        <p className="mt-1 text-xs text-text-secondary">{description}</p>
        <div className="flex min-h-48 items-center justify-center text-sm text-text-secondary">
          {emptyLabel}
        </div>
      </Card>
    );
  }

  const maxValue = Math.max(...availableValues, 1);
  const linePoints: Array<PlotPoint | null> = data.map((point, index) => {
    if (point.value === null) {
      return null;
    }

    const x =
      PLOT_LEFT +
      (data.length === 1 ? PLOT_WIDTH / 2 : (index / (data.length - 1)) * PLOT_WIDTH);
    const y = PLOT_TOP + PLOT_HEIGHT - (point.value / maxValue) * PLOT_HEIGHT;
    return { x, y };
  });
  const lineSegments = getLineSegments(linePoints);
  const labelIndexes = getLabelIndexes(data.length);
  const tickValues = [0, maxValue / 2, maxValue];

  return (
    <Card variant="default" className="overflow-hidden p-4">
      <h3 id={titleId} className="text-base font-semibold text-text-primary">
        {title}
      </h3>
      <p id={descriptionId} className="mt-1 text-xs text-text-secondary">
        {description}
      </p>
      <div className="mt-4 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto min-h-48 w-full text-brand-primary"
          role="img"
          aria-labelledby={`${titleId} ${descriptionId}`}
        >
          {tickValues.map((value) => {
            const y = PLOT_TOP + PLOT_HEIGHT - (value / maxValue) * PLOT_HEIGHT;
            return (
              <g key={value}>
                <line
                  x1={PLOT_LEFT}
                  x2={CHART_WIDTH - PLOT_RIGHT}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.12"
                />
                <text
                  x={PLOT_LEFT - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="currentColor"
                  opacity="0.7"
                >
                  {valueFormatter(value)}
                </text>
              </g>
            );
          })}

          {variant === "bar" &&
            data.map((point, index) => {
              if (point.value === null) {
                return null;
              }

              const barWidth = Math.max(6, (PLOT_WIDTH / data.length) * 0.55);
              const x =
                PLOT_LEFT +
                ((index + 0.5) / data.length) * PLOT_WIDTH -
                barWidth / 2;
              const height = (point.value / maxValue) * PLOT_HEIGHT;
              const y = PLOT_TOP + PLOT_HEIGHT - height;
              return (
                <rect
                  key={point.period}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(height, 1)}
                  rx="2"
                  fill="currentColor"
                  fillOpacity="0.75"
                />
              );
            })}

          {variant === "line" &&
            lineSegments.map((segment, index) => (
              <polyline
                key={`segment-${index}`}
                points={segment.map((point) => `${point.x},${point.y}`).join(" ")}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

          {variant === "line" &&
            linePoints.map((point, index) =>
              point === null ? null : (
                <circle
                  key={data[index].period}
                  cx={point.x}
                  cy={point.y}
                  r="3.5"
                  fill="currentColor"
                />
              ),
            )}

          {labelIndexes.map((index) => {
            const point = data[index];
            const x =
              variant === "bar"
                ? PLOT_LEFT + ((index + 0.5) / data.length) * PLOT_WIDTH
                : linePoints[index]?.x ??
                  PLOT_LEFT +
                    (data.length === 1
                      ? PLOT_WIDTH / 2
                      : (index / (data.length - 1)) * PLOT_WIDTH);
            return (
              <text
                key={`${point.period}-label`}
                x={x}
                y={CHART_HEIGHT - 14}
                textAnchor="middle"
                fontSize="11"
                fill="currentColor"
                opacity="0.7"
              >
                {periodFormatter(point.period)}
              </text>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
