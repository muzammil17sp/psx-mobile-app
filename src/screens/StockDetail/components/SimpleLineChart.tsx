import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polyline, Line, Circle, G, Text as SvgText } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 48; // Account for padding
const CHART_HEIGHT = 250;
const CHART_PADDING = 20;

interface SimpleLineChartProps {
  data: number[];
  labels?: string[];
  color?: string;
}

const SimpleLineChart = ({ data, labels, color = '#81C784' }: SimpleLineChartProps) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No chart data available</Text>
      </View>
    );
  }

  // Calculate min and max values
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1; // Avoid division by zero

  // Calculate chart dimensions
  const chartWidth = CHART_WIDTH - CHART_PADDING * 2;
  const chartHeight = CHART_HEIGHT - CHART_PADDING * 2;

  // Generate points
  const points = data.map((value, index) => {
    const x = CHART_PADDING + (index / (data.length - 1 || 1)) * chartWidth;
    const y = CHART_PADDING + chartHeight - ((value - minValue) / range) * chartHeight;
    return { x, y, value };
  });

  // Create polyline points string (format: "x1,y1 x2,y2 x3,y3")
  const pointsString = points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

  // Generate Y-axis labels
  const yAxisSteps = 5;
  const yAxisLabels = [];
  for (let i = 0; i <= yAxisSteps; i++) {
    const value = minValue + (range * i) / yAxisSteps;
    const y = CHART_PADDING + chartHeight - (i / yAxisSteps) * chartHeight;
    yAxisLabels.push({ value, y });
  }

  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {/* Grid lines */}
        {yAxisLabels.map((label, index) => (
          <Line
            key={`grid-${index}`}
            x1={CHART_PADDING}
            y1={label.y}
            x2={CHART_WIDTH - CHART_PADDING}
            y2={label.y}
            stroke="#2C2C2C"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
        ))}

        {/* Y-axis labels */}
        {yAxisLabels.map((label, index) => (
          <G key={`y-label-${index}`}>
            <SvgText
              x={CHART_PADDING - 5}
              y={label.y + 4}
              fontSize="10"
              fill="#757575"
              textAnchor="end"
            >
              {label.value.toFixed(2)}
            </SvgText>
          </G>
        ))}

        {/* Chart line */}
        <Polyline
          points={pointsString}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={color}
          />
        ))}

        {/* X-axis labels (show first, middle, last) */}
        {labels && labels.length > 0 && (
          <>
            {[0, Math.floor(labels.length / 2), labels.length - 1].map((index) => {
              if (index >= labels.length) return null;
              const point = points[index];
              return (
                <SvgText
                  key={`x-label-${index}`}
                  x={point.x}
                  y={CHART_HEIGHT - 5}
                  fontSize="10"
                  fill="#757575"
                  textAnchor="middle"
                >
                  {labels[index]}
                </SvgText>
              );
            })}
          </>
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    height: CHART_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#757575',
    fontSize: 14,
  },
});

export default SimpleLineChart;

