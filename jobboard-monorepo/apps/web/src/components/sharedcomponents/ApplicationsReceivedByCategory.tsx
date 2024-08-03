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
import { CategoryCounts } from "@/lib/types/Application";

const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

interface Props {
  category: CategoryCounts;
}

const ApplicationsReceivedByCategory: React.FC<Props> = ({ category }) => {
  const chartData = Object.keys(category).map((key) => ({
    category: key,
    count: category[key],
    fill: getRandomColor(), // Random color for each category
  }));
  useEffect(()=>{
    console.log(category)
  },[category])

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
            dataKey="count"
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
              content={({ value, x, y }) => (
                <text
                  x={x}
                  y={y}
                  fill="#26A4FF"
                  className="fill-background"
                  textAnchor="middle"
                  fontSize={12}
                >
                  {value}
                </text>
              )}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
      <CardFooter className="text-center">
        <div className="flex items-center justify-center w-full">
          <TrendingUp className="mr-2 h-4 w-4" />
          <p>Trending up by 5.2% this month</p>
        </div>
      </CardFooter>
      <CardFooter className="text-center">
        <p>Showing total applications for the last 6 months</p>
      </CardFooter>
    </Card>
  );
};

export default ApplicationsReceivedByCategory;
