import React, { useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Cell, LabelList, Pie, PieChart, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartConfig = {
  applications: { label: "Applications" },
};

const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const transformApiData = (apiData) => {
  if (!Array.isArray(apiData)) {
    console.error("Invalid category data:", apiData);
    return [];
  }

  return apiData.map((item) => ({
    category: item.category,
    applications: parseInt(item.count, 10),
    fill: getRandomColor(),
  }));
};

const ApplicationsReceivedByCategory = ({ category }) => {
  const chartData = transformApiData(category);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Applications Received by Category</CardTitle>
        <CardDescription>Pie Chart</CardDescription>
      </CardHeader>
      <CardContent>
        <PieChart width={500} height={500}>
          <Pie
            data={chartData}
            dataKey="applications"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="category"
              position="outside"
              content={({ value, name }) => (
                <text
                  x={name && name.x}
                  y={name && name.y}
                  fill="26A4FF"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                >
                  {chartConfig[name]?.label || name}
                </text>
              )}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
      <CardFooter className="text-center">
        <div className="flex items-center text-center">
          <TrendingUp className="mr-2 h-4 w-4" />
          <p className="text-center">Trending up by 5.2% this month</p>
        </div>
      </CardFooter>
      <CardFooter className="text-center">
        <p className="text-center">
          Showing total applications for the last 6 months
        </p>
      </CardFooter>
    </Card>
  );
};

export default ApplicationsReceivedByCategory;
