import * as React from "react";
import LineChart from "@cloudscape-design/components/line-chart";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";


 const LineChartComponent = () => {
  return (
    <LineChart
      series={[
        {
          title: "Site 1",
          type: "line",
          data: [
            { x: new Date(1609459200000), y: 32 },
{ x: new Date(1609462800000), y: 34 },
{ x: new Date(1609466400000), y: 33 },
{ x: new Date(1609470000000), y: 31 },
{ x: new Date(1609473600000), y: 35 },
{ x: new Date(1609477200000), y: 38 },
{ x: new Date(1609480800000), y: 42 },
{ x: new Date(1609484400000), y: 40 },
{ x: new Date(1609488000000), y: 39 },
{ x: new Date(1609491600000), y: 37 },
{ x: new Date(1609495200000), y: 36 },
{ x: new Date(1609498800000), y: 34 },
{ x: new Date(1609502400000), y: 33 },
{ x: new Date(1609506000000), y: 32 },
{ x: new Date(1609509600000), y: 30 },
{ x: new Date(1609513200000), y: 29 },
{ x: new Date(1609516800000), y: 28 },
{ x: new Date(1609520400000), y: 27 },
{ x: new Date(1609524000000), y: 29 },
{ x: new Date(1609527600000), y: 31 },
{ x: new Date(1609531200000), y: 32 },
{ x: new Date(1609534800000), y: 33 },
{ x: new Date(1609538400000), y: 34 },
{ x: new Date(1609542000000), y: 36 },
{ x: new Date(1609545600000), y: 35 },
{ x: new Date(1609549200000), y: 33 },
{ x: new Date(1609552800000), y: 32 },
{ x: new Date(1609556400000), y: 30 },
{ x: new Date(1609560000000), y: 28 },
{ x: new Date(1609563600000), y: 26 },
{ x: new Date(1609567200000), y: 28 },
{ x: new Date(1609570800000), y: 30 },
{ x: new Date(1609574400000), y: 32 }

          ],
          valueFormatter: function s(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                  "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
                "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
                "K"
              : e.toFixed(2);
          }
        },
        {
          title: "Ice forms",
          type: "threshold",
          x: new Date(1609520400000)
        }
      ]}
      xDomain={[
        new Date(1609462800000),
        new Date(1609574400000)
      ]}
      yDomain={[10, 50]}
      i18nStrings={{
        xTickFormatter: e =>
          e
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: !1
            })
            .split(",")
            .join("\n"),
        yTickFormatter: function s(e) {
          return Math.abs(e) >= 1e9
            ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                "G"
            : Math.abs(e) >= 1e6
            ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
              "M"
            : Math.abs(e) >= 1e3
            ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
              "K"
            : e.toFixed(2);
        }
      }}
      detailPopoverSeriesContent={({ series, x, y }) => ({
        key: (
          <Link>
            {series.title}
          </Link>
        ),
        value: (y)
      })}
      ariaLabel="Single data series line chart"
      height={300}
      hideFilter
      hideLegend
      xScaleType="time"
      xTitle="Time (UTC)"
      yTitle="Temperature (F)"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
          <Button>Clear filter</Button>
        </Box>
      }
    />
  );
}

export default LineChartComponent;